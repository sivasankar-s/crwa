import { Sidebar } from "./Sidebar"
import { PostList } from "./PostList"
import { fetchPosts } from "./fetchPosts"
import { useState, useEffect } from "react"
import { Post } from "./Post"
import { getToken } from "firebase/messaging"
import { messaging } from "../config/firebase"
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const HomePage =() => {

  const [posts, setPosts] = useState([]);

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if(permission === 'granted'){
      const token = await getToken(messaging, {
        vapidKey:
        "BBtdGjq4E3OhOtgrFzDub8auNqqzE2XhHETAa-P3Q9OPdggNgg5PQDX20KzNpwtTya7yfId9WrdEdZ2d_5jaOzw"
      });
      console.log("token gen: ", token);
      // firebase.firestore().collection('tokens').add(token);
      await addDoc(collection(db, 'tokens'), {
        token
      });
    } else if(permission === 'denied'){
      alert("Allow notifications to get instant alerts");
    }

  }

  
  

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
      requestPermission();
    };

    fetchData();
  }, []);

    return (
        
        <div className="flex bg-gray-300">
          <div className="fixed top-0 left-0 bg-gray-900 w-1/8 p-6 h-full flex flex-col justify-between">
          <Sidebar />
          </div>
      
      {/* <div className="w-full p-6 bg-white shadow-lg rounded-lg"> */}
      <div className="ml-1/8 ml-56 p-6 flex-1 flex flex-col items-center justify-center">
      {/* <div className="ml-1 container justify-center mx-auto"> */}
        <h1 className="text-3xl font-bold text-gray-950 mb-16">Crime Incidents</h1>
        
      {/* <h1 className="text-3xl font-semibold mb-4">Posts</h1> */}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    {/* </div> */}
      {/* </div> */}
    </div>
    </div>
       
    )
}