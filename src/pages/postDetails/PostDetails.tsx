import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import type { Post, postDetailsResponse } from "./postdetails.interface"
import Loading from "../../Components/Loading/Loading"
import PostCard from "../Posts/postcards/PostCard"
import type { Comment, commentsResponse } from "./commentsinterface"
import { Button, Input } from "@heroui/react"
import { useForm } from "react-hook-form"
import { DocumentUpload, CloseCircle } from "iconsax-reactjs"
import toast from "react-hot-toast"
import { postComment } from "./createcomment.apt"

interface CommentFormInput {
  content: string 
}

export default function PostDetails() {
  const { id } = useParams<{ id: string }>()
  const [post, setpost] = useState<null | Post>(null)
  const [comment, setcomment] = useState<Comment[]>([])
  const [postImage, setPostImage] = useState<File | null>(null)

  const { register, handleSubmit, reset } = useForm<CommentFormInput>({
    defaultValues: { content: "" },
  })

  const upload = useRef<HTMLInputElement>(null)

  async function getComments() {
    try {
      const comments = await axios.get<commentsResponse>(
        `${import.meta.env.VITE_BASE_URL}/posts/${id}/comments`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      setcomment(comments.data.data.comments)
    } catch (err) {
      console.error(err)
    }
  }

  async function getpostdetail() {
    try {
      const res = await axios.get<postDetailsResponse>(
        `${import.meta.env.VITE_BASE_URL}/posts/${id}`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      setpost(res.data.data.post)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (id) {
      getpostdetail()
      getComments()
    }
  }, [id])

function handlePostComment(data: CommentFormInput) {
  if (!data.content.trim() && !postImage) {
    toast.error("Please enter a comment or attach an image");
    return;
  }

  const formData = new FormData();
  formData.append("content", data.content);

  // Ensure postImage is an instance of File
  if (postImage instanceof File) {
    formData.append("image", postImage); 
  }

  toast.promise(
    postComment(formData, id!).then((newComment) => {
      reset();
      setPostImage(null);
      if (upload.current) upload.current.value = "";
      getComments();
      return newComment;
    }),
    {
      loading: "Posting comment...",
      success: "Comment added successfully!",
      error: (err) => err?.message || "Failed to add comment",
    }
  );
}

 return (
  <div className="pt-20 px-4 max-w-4xl mx-auto flex flex-col gap-6">
    {post ? (
      <PostCard post={post} postdetail comments={comment}>
        {/* Pass the form as a child component */}
        <div className="w-full bg-orange-800/10 rounded-xl p-3 sm:p-4 my-2">
          <form
            onSubmit={handleSubmit(handlePostComment)}
            className="flex flex-col gap-3 w-full"
          >
            <div className="flex items-center gap-2 grow w-full">
              <Input
                {...register("content", { required: true })}
                className="grow focus:ring-orange-300 text-sm sm:text-base w-full"
                placeholder="Write a comment..."
              />

              <button
                type="button"
                aria-label="Upload document or media"
                onClick={() => upload.current?.click()}
                className="p-2 hover:bg-orange-100/50 rounded-lg transition-colors shrink-0"
              >
                <DocumentUpload size="28" color="#FF8A65" />
              </button>

              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2 shrink-0 transition-colors"
              >
                Comment
              </Button>
            </div>

            {postImage && (
              <div className="flex items-center gap-2 text-xs text-orange-700 bg-orange-100/50 px-3 py-1.5 rounded-md w-fit">
                <span>Selected: {postImage.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    setPostImage(null);
                    if (upload.current) upload.current.value = "";
                  }}
                >
                  <CloseCircle size="16" color="#FF8A65" />
                </button>
              </div>
            )}

            <input
              className="hidden"
              type="file"
              ref={upload}
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setPostImage(e.target.files[0]);
                }
              }}
            />
          </form>
        </div>
      </PostCard>
    ) : (
      <Loading />
    )}
  </div>
);
}