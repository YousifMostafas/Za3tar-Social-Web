import { type LoginSchema } from './login.validation';
import axios from "axios";
import type { LoginResponse, ProfileResponse } from "./login.interface";

export async function loginApi(userdata: LoginSchema) {
  try {
    const res = await axios.post<LoginResponse>(
      `${import.meta.env.VITE_BASE_URL}/users/signin`, 
      userdata
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function getUserData(): Promise<ProfileResponse> {
  try {
    const response = await axios.get<ProfileResponse>(
      `${import.meta.env.VITE_BASE_URL}/users/profile-data`, 
      {
        headers: {
          token: localStorage.getItem("userToken") || ""
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}