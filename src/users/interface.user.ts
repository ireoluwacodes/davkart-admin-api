export interface IUser {
    fullName? : string;
    email? : string;
    gender? : string;
    avatar? : string;
    accessToken? : string;
    refreshValidTill? : Date;
    hash? : string;
    role? : string;
    _id?: string
  }