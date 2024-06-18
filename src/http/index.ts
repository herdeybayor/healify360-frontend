import $http from "./xhr";

export const AuthRegister = async (data: any) => $http.post(`/auth/register`, data).then((res) => res.data);
export const AuthLogin = async (data: any) => $http.post(`/auth/login`, data).then((res) => res.data);

export const UserGetSession = async () => $http.get(`/users/session`).then((res) => res.data);

export const PatientProfileCreate = async (data: any) => $http.post(`/patients/profile/create`, data).then((res) => res.data);
export const PatientProfileGet = async () => $http.get(`/patients/profile/get`).then((res) => res.data);

export const DoctorProfileCreate = async (data: any) => $http.post(`/doctors/profile/create`, data).then((res) => res.data);
export const DoctorProfileGet = async () => $http.get(`/doctors/profile/get`).then((res) => res.data);
