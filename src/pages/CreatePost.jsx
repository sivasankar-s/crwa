import React, { useState } from "react";
import { PhotographIcon, FilmIcon } from "@heroicons/react/outline";
import { Tooltip } from "react-tippy"; 
import "react-tippy/dist/tippy.css"; 


export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleImageChange = (e) => {
    // Handle image file selection and set it to the 'image' state
  };

  const handleVideoChange = (e) => {
    // Handle video file selection and set it to the 'video' state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the server or Firebase)
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
    </label>
  </Tooltip>
  <Tooltip title="Upload Video" arrow={true} position="top">
    <label htmlFor="video" className="rounded-full p-2 bg-red-500 hover:bg-red-600 cursor-pointer flex items-center justify-center">
      <input type="file" id="video" accept="video/*" onChange={handleVideoChange} className="hidden" />
      <FilmIcon className="w-6 h-6 display: inline-block text-white" />
    </label>
  </Tooltip>
</div>

        <button
          type="submit"
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

