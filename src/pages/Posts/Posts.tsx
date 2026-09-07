import { useContext, useEffect, useState } from "react"
import { getPostsApi } from "./posts.api";
import type { Post } from "./posts.interface";
import Loading from "../../Components/Loading/Loading";
import PostCard from "./postcards/PostCard";
import { tokenContext } from "../context/AuthTokenContext";
import CreatePost from "./createpost/CreatePost";

export default function Posts() {
  const [posts, setPosts] = useState< null|Post[]>(null);
 const {userData}= useContext(tokenContext)!;
 console.log("USER DATA IN POSTS PAGE:", userData);
  useEffect(function() {
    getPostsApi().then(date => setPosts(date));
  }, [])
return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 md:pt-36 pb-12">
      {posts && userData ? (
        <div className="flex flex-col gap-6 sm:gap-8 max-w-4xl mx-auto">
          <CreatePost user={userData} />
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
      <div className="flex flex-col justify-center items-center h-full">
        <Loading />

      </div>
      )}
    </div>
  );
}
