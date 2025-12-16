export interface MainCategory {
  id: string;
  name: string;
  isactive: boolean;
  updatedate: string;
  subservicecategory: SubCategory | any;
}


export interface SubCategory {
  id: string;
  name: string;
  maincategoryid: string;
  isactive: boolean;
  updatedate: string;
}
