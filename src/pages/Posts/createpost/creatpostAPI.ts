import axios from "axios";
import type { createPostResponce } from "./createpost.interface";

export async function createPostApi(data :FormData):Promise<string> {
    try {
            const response=await axios.post<createPostResponce>(`${import.meta.env.VITE_BASE_URL}/posts`, data ,{
                headers:{
                    token:localStorage.getItem("userToken")

                }
            })
return response.data.message
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message);
        }
        throw new Error('An unknown error occurred');
    }
}