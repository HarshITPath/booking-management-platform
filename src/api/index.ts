import client, { METHODS } from "./client";

export const api = {
  bookings: {
    getAvailableSlots: ({ data, id, ...configs }: { [key: string]: any }) =>
      client({
        url: `/agent/${id}/available-slots`,
        method: METHODS.GET,
        data,
        ...configs,
      }),
    booking: ({ ...configs }: { [key: string]: any } = {}) =>
      client({
        // isServer: true,
        url: '/booking',
        method: METHODS.POST,
        ...configs,
      }),
  },
  timeZones:{
    getAvailableTimeZones: ({ data, ...configs }: { [key: string]: any }) =>
      client({
        url: "/common/timezones",
        method: METHODS.GET,
        data,
        ...configs,
      }),
  }
};