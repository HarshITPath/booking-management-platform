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

const useBookingForm = ({}) => {
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

  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState<{
    id: string;
    label: string;
  } | null>(null);
  const lastFetchedDateRef = useRef<string | null>(null);

  const [fetchAvailableSlot, slotLoading] = useAsyncOperation<
    AvailableSlotsParams,
    AvailableSlotsResponse
  >(async (params: AvailableSlotsParams) => {
    const res = (await api.bookings.getAvailableSlots({
      data: { params },
    })) as AvailableSlotsResponse;
    const slots = res.data.data.availableSlots || [];
    setSlotsUTC(slots);
    setSelectedSlot(null); // Reset selected slot on new fetch
    lastFetchedDateRef.current = params.date; // Track the date we just fetched
    return res;
  });

  useEffect(() => {
    if (selectedDate) {
      const dateString = selectedDate.format("YYYY-MM-DD");
      // Only fetch if we haven't fetched this date before
      if (lastFetchedDateRef.current !== dateString) {
        fetchAvailableSlot({
          date: dateString,
          meetingDuration: 30,
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
      console.log("values", values);
      // const submission = {
      //   ...(typeof values === "object" && values !== null ? values : {}),
      //   date: selectedDate ? selectedDate.format("YYYY-MM-DD") : null,
      //   time_local: selectedSlot?.local || null,
      //   time_utc: selectedSlot?.utc || null,
      //   time_display: selectedSlot?.display || null,
      //   timezone: selectedTimezone?.id || null,
      //   time_format: timeFormat,
      // };
      // console.log("Booking submission:", submission);
      // Call your API or handle submission here

      console.log('selectedDate in the form submit', selectedDate)

      if (!selectedSlot || !selectedDate || !selectedTimezone) {
        return;
      }

      const startTimeUTC = selectedSlot.utc; // already in ISO string
      const endTimeUTC = moment
        .utc(startTimeUTC)
        .add(30, "minutes")
        .toISOString();

      const payload = {
        startTime: startTimeUTC,
        endTime: endTimeUTC,
        userName: `${values.first_name} ${values.last_name}`,
        userEmail: values.email_id,
        userTimezone: selectedTimezone.id,
        additionalNotes: values.message,
        agent: {
          id: 1, // If agent id is dynamic, replace with the correct value
        },
      };

      console.log("payload", payload);

      const response = await api.bookings.booking({
        data: payload,
      });

      console.log("response", response);
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
      const tzList = res.data?.data?.timezones?.map((tz: string) => ({
        id: tz,
        label: tz,
      }));
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

  console.log("selectedDate", selectedDate);

  return {
    bookingFormFields,
    methods,
    onSubmit,
    loading,
    // Booking state
    selectedDate,
    setSelectedDate,
    selectedTimezone,
    setSelectedTimezone: handleTimezoneChange,
    timezonData,
    timeFormat,
    handleTimeFormatToggle,
    showForm,
    setShowForm,
    slotLoading: false, // always false for static data
    availableSlots: convertedSlots,
    selectedSlot,
    handleSlotSelect,
    handleDateSelect,
    handleBackClick,
  };
};

export default useBookingForm;
