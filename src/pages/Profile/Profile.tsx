import { useContext, useEffect, useState } from 'react';
import { tokenContext } from '../context/AuthTokenContext';
import axios from 'axios';
import PostCard from '../Posts/postcards/PostCard';

export default function Profile() {
  const [posts, setPosts] = useState([]); 
const context = useContext(tokenContext);

if (!context) {
  throw new Error(
    "useContext(tokenContext) must be used within AuthTokenContext"
  );
}
const { userData } = context;

  useEffect(() => {
    async function getUserPosts() {
      if (!userData?.id) return; 

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/${userData.id}/posts`,
          {
            headers: {
              token: localStorage.getItem('userToken'),
            },
          }
        );

        const fetchedPosts = response.data.data.posts;
        setPosts(fetchedPosts);
        console.log('Fetched posts:', fetchedPosts); 
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    }

    getUserPosts();
  }, [userData?.id]); 

  return (
    <div className='mt-20 w-full '>
      <div className="relative w-full max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden animate-fade-in">
        {/* Cover Image Section */}
        <div
          className="h-40 bg-cover bg-center cover-gradient-fallback"
          style={{ backgroundImage: `url(${userData?.cover})` }}
        ></div>

        {/* Profile Picture and Details Section */}
        <div className="relative px-6 -mt-20">
          {/* Profile Picture */}
          <img
            className="w-32 h-32 rounded-full border-4 border-white mx-auto shadow-md object-cover"
            src={userData?.photo}
            alt={userData?.name}
          />

          {/* User Info */}
          <div className="text-center mt-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {userData?.name}
            </h2>
          
          </div>

          {/* Optional: Social Links or Stats */}
          <div className="flex justify-center mt-6 space-x-4 border-t pt-6 border-gray-100">
            <div className="text-center">
              <p className="font-bold text-lg text-gray-800">
                {userData?.followersCount}
              </p>
              <p className="text-gray-500 text-sm">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg text-gray-800">
                {userData?.followingCount}
              </p>
              <p className="text-gray-500 text-sm">Following</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg text-gray-800">50</p>
              <p className="text-gray-500 text-sm">Projects</p>
            </div>
          </div>

          {/* Call to Action Button */}
          <div className="mt-8 mb-4">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">
              Connect
            </button>
          </div>
          {posts.map((pos)=>{
            return <PostCard post={pos} />
          })}
        </div>
      </div>
    </div>
  );
}