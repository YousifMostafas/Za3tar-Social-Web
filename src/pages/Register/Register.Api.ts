import axios from "axios";
import type { RegisterSchema } from "./Register.validation";

export async function registerApi(userdata: RegisterSchema) {
try {
  
const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signup`, userdata)
return res.data.message
} catch (error) {
if (axios.isAxiosError(error)) {
  throw new Error(error.response?.data?.message );
} else {
  throw new Error('An unexpected error occurred');
}
}


}