import $http from "./xhr";

export const AuthRegister = async (data: any) => $http.post(`/auth/register`, data).then((res) => res.data);
export const AuthLogin = async (data: any) => $http.post(`/auth/login`, data).then((res) => res.data);

export const UserGetSession = async () => $http.get(`/users/session`).then((res) => res.data);
