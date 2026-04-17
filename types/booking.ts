type BookingPayload = {
  name: string;
  email: string;
};

type BookingResponse = {
  message: string;
  error?: string;
  statusCode?: number;
};

export type { BookingPayload, BookingResponse };
