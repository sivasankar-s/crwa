import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PhotographIcon, FilmIcon } from "@heroicons/react/outline";
import { Tooltip } from "react-tippy"; 
import "react-tippy/dist/tippy.css"; 
import { addDoc, collection, Timestamp, getDocs, setDoc, doc } from 'firebase/firestore';
import { auth, db, storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(null);
  const [videos, setVideos] = useState(null);
  const [anonymous, setAnonymous] = useState(false);

  const user = auth?.currentUser;
  let name;

  let downloadURL=null;
  let videoURL=null;

  const navigate = useNavigate();

  const handleToggleAnonymous = () => {
    setAnonymous(!anonymous);
  };

  const handleImageChange = (e) => {
    // Handle image file selection and set it to the 'image' state
    const file = e.target.files[0];
    setImages(file);
    console.log(file.name)
  };

  const handleVideoChange = (e) => {
    // Handle video file selection and set it to the 'video' state
    const file = e.target.files[0];
    setVideos(file);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the server or Firebase)

    const userRef = collection(db, "users");
          const docData = await getDocs(userRef);

          

          const filteredData = docData.docs.map((doc) => ({...doc.data(), id: doc.id}))
          console.log(filteredData)

          filteredData.forEach((doc) => {
            if(doc.userId == auth.currentUser.uid){
              name = doc.fullName;
            //   phone = doc.phoneNo;
            }
          })
          
          if(images){
          const fileFolderRef = ref(storage, `images/${images?.name}`)
          try {
            await uploadBytes(fileFolderRef, images)
            .then(async (snapshot) => {
                console.log('File uploaded successfully:', snapshot);
                // Get the download URL after the upload is complete
                await getDownloadURL(fileFolderRef)
                .then((url) => {
                    downloadURL=url;
                console.log('Download URL:', downloadURL);
                })
                .catch((error) => {
                console.error('Error getting download URL:', error);
                 });
              })
              .catch((error) => {
                console.error('Error uploading file:', error);
              });
          } catch(err){
            console.error(err);
          }
        }

        if(videos){
            const fileFolderRef = ref(storage, `images/${videos?.name}`)
            try {
              await uploadBytes(fileFolderRef, videos)
              .then(async (snapshot) => {
                  console.log('Video uploaded successfully:', snapshot);
                  // Get the download URL after the upload is complete
                  await getDownloadURL(fileFolderRef)
                  .then((url) => {
                      videoURL=url;
                  console.log('Video URL:', videoURL);
                  })
                  .catch((error) => {
                  console.error('Error getting video URL:', error);
                   });
                })
                .catch((error) => {
                  console.error('Error uploading video:', error);
                });
            } catch(err){
              console.error(err);
            }
          }

    try {
        const postRef = await addDoc(collection(db, 'posts'), {
          title,
          description,
          image: downloadURL,
          videos: videoURL,
          authorId: user.uid, 
          authorName: name,
          date: Timestamp.now(),
          anonymous
        });
    
        // return postRef.id; // Return the ID of the newly created post

        const postId = postRef.id; // Get the ID of the newly created post

    // Update the post with the postId field
        // await setDoc(doc(db, 'posts', postId), { postId }, { merge: true });

        navigate('/home')

      } catch (error) {
        console.error('Error creating post:', error);
      }
    
  };

  return (
    <body className="bg-slate-900">
    <div className="flex justify-center items-center h-screen">
  <div className="relative bg-white rounded-lg p-6 shadow-md w-3/5 ">
      <h1 className="text-2xl font-semibold mb-4">Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          {/* <label htmlFor="title" className="block text-gray-700">Title</label> */}
          <input
            type="text"
            id="title"
            className="w-4/5 text-2xl border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            value={title}
            placeholder="What crime happened?..."
            
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          {/* <label htmlFor="description" className="block text-gray-700">Description</label> */}
          <textarea
            id="description"
            className="w-full h-60 border-gray-300 rounded-md px-3 py-2 focus:outline-none 0 text-base text-gray-800"
            value={description}
            placeholder="Tell about the Crime..."
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex mb-4 center space-x-10">
  <Tooltip title="Upload Image" arrow={true} position="top">
    <label htmlFor="image" className="rounded-full p-2 bg-blue-500 hover:bg-blue-600 cursor-pointer flex items-center justify-center">
      <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
      <PhotographIcon className="w-6 h-6 display: inline-block text-white" />
      {images && (
                <span className="text-white ml-2">{images.name}</span>
              )}
    </label>
  </Tooltip>
  <Tooltip title="Upload Video" arrow={true} position="top">
    <label htmlFor="video" className="rounded-full p-2 bg-red-500 hover:bg-red-600 cursor-pointer flex items-center justify-center">
      <input type="file" id="video" accept="video/*" onChange={handleVideoChange} className="hidden" />
      <FilmIcon className="w-6 h-6 display: inline-block text-white" />
      {videos && (
                <span className="text-white ml-2">{videos.name}</span>
              )}
    </label>
  </Tooltip>
</div>

<div className="relative inline-block w-12 h-6 bg-gray-900 rounded-full">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={handleToggleAnonymous}
          id="toggle"
          className="sr-only"
        />
        <label
          htmlFor="toggle"
          className={`absolute left-0 w-6 h-6 bg-white rounded-full transition-transform duration-300 ease-in-out transform ${
            anonymous ? 'translate-x-6 bg-gray-400' : ''
          }`}
        ></label>
      </div>
      <label className="text-gray-600 ml-2">Post Anonymously</label>

        <button
          type="submit"
          onClick={handleSubmit}
          className="absolute right-4 bottom-4 bg-blue-500 mt-20 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Create Post
        </button>
      </form>
    </div>
    </div>
    </body>
  );
};

