import { type LoginSchema } from './login.validation';
import axios from "axios";
import type { LoginResponse, User } from "./login.interface";

export async function loginApi(userdata:LoginSchema ) {
try {
  
const res = await axios.post<LoginResponse>(`${import.meta.env.VITE_BASE_URL}/users/signin`, userdata)
return res.data
} catch (error) {
if (axios.isAxiosError(error)) {
  throw new Error(error.response?.data?.message);
} else {
  throw new Error('An unknown error occurred');
}
}


}
export async function getUserData():Promise<User> {
try {
    const response = await axios.get<User>(`${import.meta.env.VITE_BASE_URL}/users/profile-data`, {
        headers:{
            token: localStorage.getItem("userToken")
        }
    });
    console.log(response.data.data.user)
    return response.data;
        }
 catch (error) {
    if (axios.isAxiosError(error)) {
  throw new Error(error.response?.data?.message);
} else {
  throw new Error('An unknown error occurred');
}
}
}
