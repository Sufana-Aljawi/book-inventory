export interface userRegistration{
  username: string;   // backend uses this as Email too
  fullName: string;
  password: string;
}

export interface userRegistrationResponse{
    message : string;
    assignedRole : string;
}