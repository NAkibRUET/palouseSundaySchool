import { Profile } from "./ProfileMode";

export interface Registration {
  email: String;
  phone?: String
  password: String;
  confirmPassword: String;
  profile: Profile;
  role: Number;
}
