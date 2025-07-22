import React, { useEffect, useMemo, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import useAsyncOperation from "../use-async-operation";
import { booingFormSchema } from "@/utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/api";
import moment, { Moment } from "moment";
import "moment-timezone";

interface AvailableSlotsResponse {
  data: {
    data: {
      availableSlots: string[];
    };
  };
}

interface AvailableSlotsParams {
  date: string;
  meetingDuration: number;
}

interface TimeZonesResponse {
  data?: {
    data?: {
      timezones?: string[];
    };
  };
}

type BookingFormValues = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email_id: string;
  message: string;
};

interface BookingConfirmationData {
  id: number;
  startTime: string;
  endTime: string;
  userName: string;
  userEmail: string;
  userTimezone: string;
  additionalNotes: string;
  agent: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
  };
}

interface BookingResponse {
  data: {
    status: number;
    message: string;
    data: BookingConfirmationData;
  };
}

const useBookingForm = ({
  agentCode,
  slot,
}: {
  agentCode?: string;
  slot?: string;
}) => {
  const initialValues = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email_id: "",
    message: "",
  };

  const methods = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(booingFormSchema),
  });

  // State for API slots (UTC), converted slots, time format, and selected slot
  const [slotsUTC, setSlotsUTC] = useState<string[]>([]);
  const [convertedSlots, setConvertedSlots] = useState<
    {
      local: string;
      utc: string;
      display: string;
    }[]
  >([]);
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h");
  const [selectedSlot, setSelectedSlot] = useState<{
    local: string;
    utc: string;
    display: string;
  } | null>(null);

  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());
  const [showForm, setShowForm] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState<{
    id: string;
    label: string;
  } | null>(null);
  const lastFetchedDateRef = useRef<string | null>(null);
  const [bookingConfirmation, setBookingConfirmation] =
    useState<BookingConfirmationData | null>(null);
  const [isBookingLinkInvalid, setIsBookingLinkInvalid] = useState(false);
  const [blackoutDates, setBlackoutDates] = useState<string[]>([]);
  const [disabledDays, setDisabledDays] = useState<number[]>([]);
  const [eventDetails, setEventDetails] = useState<any | null>(null);

  const [fetchAvailableSlot, slotLoading] = useAsyncOperation<
    AvailableSlotsParams,
    AvailableSlotsResponse
  >(async (params: AvailableSlotsParams) => {
    try {
      const res = (await api.bookings.getAvailableSlots({
        data: { params },
        id: agentCode,
      })) as any;

      const slots = res.data.data.availableSlots || [];
      const blackouts =
        res.data.data.blackoutDates?.map((b: any) => b.date) || [];

      const unavailableDays = (res.data.data.availability || [])
        .filter((item: any) => !item.available)
        .map((item: any) => {
          const daysMap: Record<string, number> = {
            Sunday: 0,
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6,
          };
          return daysMap[item.day];
        });

        const events = res.data.data.events;
        setEventDetails(events?.[0] || null); 

      setBlackoutDates(blackouts);
      setDisabledDays(unavailableDays);
      setSlotsUTC(slots);
      setSelectedSlot(null);
      lastFetchedDateRef.current = params.date;
      setIsBookingLinkInvalid(false);
      return res;
    } catch (err) {
      setIsBookingLinkInvalid(true);
      setSlotsUTC([]);
      setConvertedSlots([]);
      return Promise.reject(err);
    }
  });

  const meetingDuration = slot ? parseInt(slot, 10) : 30;

  useEffect(() => {
    if (selectedDate) {
      const dateString = selectedDate.format("YYYY-MM-DD");
      if (lastFetchedDateRef.current !== dateString) {
        fetchAvailableSlot({
          date: dateString,
          meetingDuration,
        });
      }
    } else {
      setSlotsUTC([]);
      setSelectedSlot(null);
      lastFetchedDateRef.current = null;
    }
  }, [selectedDate]);

  // Convert slots to selected timezone and format
  useEffect(() => {
    if (!selectedTimezone || !slotsUTC.length) {
      setConvertedSlots([]);
      return;
    }
    const formatStr = timeFormat === "12h" ? "h:mm A" : "HH:mm";
    const converted = slotsUTC.map((utc) => {
      const m = moment.utc(utc).tz(selectedTimezone.id);
      return {
        local: m.format(), // ISO string in local tz
        utc,
        display: m.format(formatStr),
      };
    });
    setConvertedSlots(converted);
  }, [slotsUTC, selectedTimezone, timeFormat]);

  // Handler: select date
  const handleDateSelect = (date: Moment | null) => {
    setSelectedDate(date);
    // setShowForm(false);
    setSelectedSlot(null);
  };

  // Handler: select slot
  const handleSlotSelect = (slot: {
    local: string;
    utc: string;
    display: string;
  }) => {
    setSelectedSlot(slot);
  };

  // Handler: toggle time format
  const handleTimeFormatToggle = (format: "12h" | "24h") => {
    setTimeFormat(format);
  };

  // Handler: timezone change
  const handleTimezoneChange = (tz: { id: string; label: string } | null) => {
    setSelectedTimezone(tz);
    setSelectedSlot(null); // Reset slot on timezone change
  };

  // Handler: back click
  const handleBackClick = () => {
    setShowForm(false);
    setSelectedSlot(null);
  };

  // On submit, include selected slot (local, utc), timezone, and format
  const [onSubmit, loading] = useAsyncOperation<BookingFormValues, any>(
    async (values) => {
      if (
        !selectedSlot ||
        !selectedDate ||
        !selectedTimezone ||
        !agentCode ||
        isNaN(Number(agentCode))
      ) {
        return;
      }

      const startTimeUTC = selectedSlot.utc; // already in ISO string
      const endTimeUTC = moment
        .utc(startTimeUTC)
        .add(slot, "minutes")
        .toISOString();

      const payload = {
        startTime: startTimeUTC,
        endTime: endTimeUTC,
        userName: `${values.first_name} ${values.last_name}`,
        userEmail: values.email_id,
        userTimezone: selectedTimezone.id,
        additionalNotes: values.message,
        agentId: agentCode ? Number(agentCode) : "",
      };

      const response = (await api.bookings.booking({
        data: payload,
      })) as BookingResponse;

      if (response.data.status === 201) {
        setBookingConfirmation(response.data.data);
      }
      return response;
    }
  );

  const [timezonData, setTimezonData] = useState<
    { id: string; label: string }[]
  >([]);

  const [fetchAvailableTimeZones, timZonesLoading] = useAsyncOperation(
    async () => {
      const res = (await api.timeZones.getAvailableTimeZones(
        {}
      )) as TimeZonesResponse;
      const tzList = res.data?.data?.timezones?.map((tz: string) => {
        const currentTime = moment().tz(tz).format("HH:mm"); // or "h:mm A" for 12h
        return {
          id: tz,
          label: `${tz} - ${currentTime}`,
        };
      });
      setTimezonData(tzList || []);
      return tzList;
    }
  );

  useEffect(() => {
    fetchAvailableTimeZones();
  }, []);

  useEffect(() => {
    if (!selectedTimezone && timezonData && timezonData.length > 0) {
      // Get user's timezone from browser
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Try to find a matching timezone in your list
      const found = timezonData.find((tz) => tz.id === userTimeZone);

      // If found, use it; otherwise, fallback to the first in the list
      setSelectedTimezone(found || timezonData[0]);
    }
  }, [selectedTimezone, timezonData]);

  // Booking form fields
  const bookingFormFields = useMemo(() => {
    return [
      {
        id: "first_name",
        type: "text",
        name: "first_name",
        label: "First Name",
        required: true,
        gridProps: { size: { xs: 12, sm: 12, md: 6 } },
      },
      {
        id: "last_name",
        type: "text",
        name: "last_name",
        label: "Last Name",
        required: true,
        gridProps: { size: { xs: 12, sm: 12, md: 6 } },
      },
      {
        id: "phone_number",
        type: "text",
        name: "phone_number",
        label: "Phone Number",
        required: true,
        gridProps: { size: { xs: 12, sm: 12, md: 6 } },
      },
      {
        id: "email_id",
        type: "email",
        name: "email_id",
        label: "Email ID",
        required: true,
        gridProps: { size: { xs: 12, sm: 12, md: 6 } },
      },
      {
        id: "message",
        type: "text",
        name: "message",
        label: "Message",
        required: true,
        multiline: true,
        minRows: 2,
        gridProps: { size: { xs: 12 } },
      },
    ];
  }, []);

  return {
    bookingFormFields,
    methods,
    onSubmit,
    loading,
    selectedDate,
    setSelectedDate,
    selectedTimezone,
    setSelectedTimezone: handleTimezoneChange,
    timezonData,
    timeFormat,
    handleTimeFormatToggle,
    showForm,
    setShowForm,
    slotLoading,
    availableSlots: convertedSlots,
    selectedSlot,
    handleSlotSelect,
    handleDateSelect,
    handleBackClick,
    bookingConfirmation,
    setBookingConfirmation,
    isBookingLinkInvalid,
    blackoutDates,
    disabledDays,
    eventDetails
  };
};

export default useBookingForm;
