declare type GuestDocument = { _id: string };
declare type GuestBody = {
  name?: string;
  peopleCount?: number;
};
declare type Guest = GuestDocument & GuestBody;

declare type ResponseError = {
  message: string;
};
