export interface IUser {
    fullName? : string;
    email? : string;
    accessToken? : string;
    refreshValidTill? : Date;
    hash? : string;
    role? : string;
    _id?: string
  }