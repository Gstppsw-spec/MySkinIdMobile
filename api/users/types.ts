export interface User {
  id: string;
  email: string;
  roleid: string;
  companyid?: string;
  locationid?: string;
  isactive: boolean;
  updatedate: string;
}

export interface UserPayload {
  email: string;
  password: string;
  roleid: string;
  companyid?: string;
  locationid?: string;
}
