import type { Post } from './posts.interface';
import axios from "axios";

export async  function getPostsApi(): Promise<Post[]> {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`,
    {
        headers:{
token: localStorage.getItem("userToken")

        }
    }
)
console.log("GET POSTS RESPONSE:", response.data.data.posts)
return response.data.data.posts;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message);
        }
        throw new Error('An unknown error occurred');
    }
}