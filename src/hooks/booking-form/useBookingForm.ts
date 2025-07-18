import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useAsyncOperation from "../use-async-operation";
import { booingFormSchema } from "@/utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/api";
import { Moment } from "moment";

const useBookingForm = ({}) => {
  const initialValues = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email_id: "",
    organization: "",
    message: "",
  };

  const methods = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(booingFormSchema),
  });

  // const { reset } = methods;

  const [onSubmit, loading] = useAsyncOperation(async (value) => {
    console.log("value", value);
  });

  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleDateSelect = (date: Moment | null) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleBackClick = () => {
    setShowForm(false);
  };

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

  const [fetchAvailableSlot, slotLoading] = useAsyncOperation(
    async ({
      date,
      meetingDuration,
    }: {
      date: string;
      meetingDuration: number;
    }) => {
      const res = await api.bookings.getAvailableSlots({
        data: { params: { date, meetingDuration } },
      });
      console.log('res in hook', res)
      return res;
    }
  );

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlot({
        date: selectedDate.format("YYYY-MM-DD"),
        meetingDuration: 30,
      });
    }
  }, [selectedDate]);

  return {
    bookingFormFields,
    methods,
    onSubmit,
    loading,
    // Expose new state and handlers
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    showForm,
    setShowForm,
    handleDateSelect,
    handleBackClick,
    // Expose slots and loading state
    // slots,
    // slotsLoading,
    // slotsError,
  };
};

export default useBookingForm;
