import { Avatar, Card } from "@heroui/react";
import type { Post } from "../posts.interface";
import { Like1, MessageText, Share } from "iconsax-reactjs";
import TopComment from "../topcomment/TopComment";
import { Link } from "react-router";
import type { Comment } from "../../postDetails/commentsinterface";
import axios from "axios";

interface PostCardProps {
  post: Post;
  postdetail?: boolean;
  comments?: Comment[];
  children?: React.ReactNode; 
}

export default function PostCard({ post, postdetail, comments, children }: PostCardProps) {
  const { likesCount, id,_id, image, createdAt, user: { name, photo }, topComment, body, commentsCount } = post;
async function likes() {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/posts/${id}/like`,
      {}, // 1. Second argument: request body (data)
      {
        headers: {
          token: localStorage.getItem("userToken"), // 2. Third argument: Axios config
        },
      }
    );
    console.log(res);
  } catch (error) {
    console.error("Failed to like post:", error);
  }
}

  return (
    <Card className="w-full max-w-4xl mx-auto rounded-xl shadow-sm">
      <Card.Header className="p-4 sm:p-6">
        <Card.Title className="flex items-center pb-3 border-b border-orange-200 gap-3">
          <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
            <Avatar.Image alt={name} src={photo} />
          </Avatar>

          <div className="flex flex-col text-sm sm:text-base">
            <span className="font-semibold text-gray-900">{name}</span>
            <span className="text-xs sm:text-sm text-gray-500">
              {new Date(createdAt).toLocaleDateString("en-ca").replaceAll("/", "-")}
            </span>
          </div>
        </Card.Title>

        <div className="pt-3">
          {body && <p className="text-sm sm:text-base text-gray-800">{body}</p>}
          {image && (
            <div className="pt-3 rounded-lg">
              <img className="w-full object-cover" src={image} alt="Post content" />
            </div>
          )}
        </div>
      </Card.Header>

      <Card.Footer className="p-4 sm:p-6 pt-0 flex flex-col gap-4">
        <div className="flex justify-between items-center border-t border-orange-200 pt-3 w-full">
          <div className="flex gap-4 items-center">
            {likesCount}
            <button onClick={_=>likes()} aria-label="Like post" className="hover:opacity-80 transition-opacity">
              <Like1 size="24" color="#FF8D14" />
            </button>
            <button aria-label="Share post" className="hover:opacity-80 transition-opacity">
              <Share size="24" color="#FF8D14" />
            </button>
          </div>

          <div className="flex gap-1.5 items-center text-sm sm:text-base font-medium text-gray-700">
            {!postdetail && (
              <Link className="flex gap-1.5 items-center text-sm sm:text-base font-medium text-gray-700" to={`/postdetails/${_id}`}>
                <span>{commentsCount}</span>
                <MessageText size="24" color="#FF8D14" />
                <p className="hidden md:block">Show all comments</p>
              </Link>
            )}
          </div>
        </div>

        {children}

        {postdetail && comments && comments.length > 0 ? (
          <div className="flex flex-col gap-3 w-full pt-1">
            {comments.map((comment) => (
              <TopComment key={comment._id} comment={comment} />
            ))}
          </div>
        ) : (
          !postdetail && topComment && <TopComment comment={topComment} />
        )}
      </Card.Footer>
    </Card>
  );
}