export interface Location {
  status: Location | undefined;
  id: string;
  email: string;
  roleid: string;
  companyid?: string;
  locationid?: string;
  isactive: boolean;
  updatedate: string;
  data: any
}
