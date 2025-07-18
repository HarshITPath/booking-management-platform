import client, { METHODS } from "./client";

export const api = {
  bookings: {
    getAvailableSlots: ({ data, ...configs }: { [key: string]: any }) =>
      client({
        url: "/agent/1/available-slots",
        method: METHODS.GET,
        data,
        ...configs,
      }),
  },
};
