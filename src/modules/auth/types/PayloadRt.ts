import { Payload } from "./payload.type";

export type PayloadRt = Payload & {
  refresh_token: string;
};
