import axios from "axios";
import type { createCommentResponce } from "./createcomment";

export async function postComment(
  data: FormData,
  id: string
): Promise<createCommentResponce["data"]["comment"]> {
  try {
    const response = await axios.post<createCommentResponce>(
      `${import.meta.env.VITE_BASE_URL}/posts/${id}/comments`,
      data,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    return response.data.data.comment;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to upload comment");
    }
    throw new Error("An unknown error occurred");
  }
}