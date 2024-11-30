/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-useless-catch */
import { request } from "../helpers/request";

const bookingService = {
  getBookings: async (authToken) => {
    try {
      const response = await request.get('/admin/bookings', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      throw error;
    }
  },
  deleteBooking: async (id, authToken) => {
    try {
        const response = await request.delete('/admin/bookings', {
            data: { bookingId: id },
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        throw error;
    }
  }
};

export default bookingService;