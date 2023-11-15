declare type ResponseMessage = {
  message: string;
  error?: string;
};

declare type AppAPIRespose<T> = {
  data: T;
};
