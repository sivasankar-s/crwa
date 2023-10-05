import { Sidebar } from "./Sidebar"
import { PostList } from "./PostList"
import { fetchPosts } from "./fetchPosts"
import { useState, useEffect } from "react"
import { Post } from "./Post"


export const HomePage =() => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };

    fetchData();
  }, []);

    return (
        <div>
        <div className="flex  bg-gray-100">
      <Sidebar />
      {/* <div className="w-full p-6 bg-white shadow-lg rounded-lg"> */}
      <div className="container justify-center mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Crime Incidents</h1>
        
      {/* <h1 className="text-3xl font-semibold mb-4">Posts</h1> */}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
      {/* </div> */}
    </div>
        </div>
    )
}