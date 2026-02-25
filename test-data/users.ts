export interface UserData {
  userEmail: string;
  userPassword: string;
}

export const USERS: Record<string, UserData> = {
  VALID: {
    userEmail: process.env.USER_EMAIL ?? '',
    userPassword: process.env.USER_PASSWORD ?? ''
  }
};

export const URLS = {
  LOGIN:     process.env.BASE_URL ?? '',
  DASHBOARD: `${process.env.BASE_URL}/#/dashboard/dash`
};

export const API = {
  LOGIN: '/api/ecom/auth/login'
};
