import axios from "axios";
import type { ChangePasswordPayload, changePasswordResponse } from "./changepassword.interface";

export async function resetApi(data: ChangePasswordPayload): Promise<string> {

  const response = await axios.patch<changePasswordResponse>(
    `${import.meta.env.VITE_BASE_URL}/users/change-password`,
    {
      password: data.password,
      newPassword: data.newPassword,
    },
    {
      headers: {
        token: localStorage.getItem("userToken"), 
      },
    }
  );

  if (response.data.data?.token) {
    localStorage.setItem("userToken", response.data.data.token);
  }

  return response.data.message;
}