export interface UserData {
  userEmail: string;
  userPassword: string;
}

export const URLS = {
  get LOGIN()     { return process.env.BASE_URL ?? '' },
  get DASHBOARD() { return `${process.env.BASE_URL}/#/dashboard/dash` }
};

export const USERS: Record<string, UserData> = {
  VALID: {
    get userEmail()    { return process.env.USER_EMAIL ?? '' },
    get userPassword() { return process.env.USER_PASSWORD ?? '' }
  }
};

export const API = {
  LOGIN: '/api/ecom/auth/login'
};
