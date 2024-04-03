import "next-auth";

declare module "next-auth" {


  interface HeadOffice {
    id: string;
    company_name: string;
  }

interface OfficeId {
  id: string;
  company_name: string;
  head_office: HeadOffice;
  name: string; 
}

  interface User {
  cpf: string;
  img: string;
  detail: string;
  token: string;
  access: string;
  refresh: string;
  accessToken: string;
  branch_offices: OfficeId[];
  company_name: OfficeId[];
  head_offices: OfficeId[];
  profiles: OfficeId[];
  }

  interface Session {
    user: User;
  }
}