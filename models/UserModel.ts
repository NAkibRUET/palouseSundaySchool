import { Profile } from "./ProfileMode";

export interface User {
  _id: String;
  email: String;
  phone?: String;
  profile: Profile;
  role: Number;
  date: String;
  approved: Number;
}