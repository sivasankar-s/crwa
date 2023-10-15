import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faFlag } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import Avatar from 'react-avatar';
// import ReactTooltip from 'react-tooltip';
import { Tooltip } from 'react-tippy';
// import 'tippy.js/dist/tippy.css'; 
import "react-tippy/dist/tippy.css";
import { AiOutlineWarning } from 'react-icons/ai';
import { ReportModal } from './ReportModal';
import { auth, db, storage } from "../config/firebase";
import emailjs from '@emailjs/browser';


export const Post = ({post}) => {

  const [showFullContent, setShowFullContent] = useState(false);
  const contentRef = useRef(null);
  const [isContentOverflown, setIsContentOverflown] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const openReportModal = () => {
    setIsReportModalOpen(true);
  };
  
  const closeReportModal = () => {
    setIsReportModalOpen(false);
  };

  const handleReport = (reason) => {
    
    // Prepare data to send in the email
    const dataToSend = {
      reason,
      reportedUserId: auth.currentUser.uid,
      reportedUserEmail: auth.currentUser.email/* Get the email of the reported user */,
      postTitle: post.title,
      postAuthorName: post.authorName/* Get the post author's name */,
      postAuthorUserId: post.authorId/* Get the post author's user id */,
    };
  
    // Send an email using Firebase or another email service
    // ...
    console.log(dataToSend);

    emailjs.send('service_i8w3pzq','template_qcd2ftb', dataToSend, 'VUAUhcv13TQEsN8cr')
	.then((response) => {
	   console.log('SUCCESS!', response.status, response.text);
	}, (err) => {
	   console.log('FAILED...', err);
	});
  
    // Close the report modal
    setIsReportModalOpen(false);

    window.alert("Your report is sent, and we will take necessary actions..");
  };
  



  const postedAtDate = post.date.toDate();

  // Format the date in the desired format
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const formattedPostedAt = formatter.format(postedAtDate);


  const toggleContentVisibility = () => {
    setShowFullContent(!showFullContent);
  };

  useEffect(() => {
    // Check if content exceeds 5 lines
    if (contentRef.current) {
      const contentElement = contentRef.current;
      const lineHeight = parseInt(getComputedStyle(contentElement).lineHeight);
      const maxHeight = lineHeight * 5; // Maximum height for 5 lines
      const actualHeight = contentElement.clientHeight;

      // if (actualHeight > maxHeight) {
      //   setShowFullContent(false);
      // }

      
      if (actualHeight > maxHeight) {
        setIsContentOverflown(true);
      } else {
        setIsContentOverflown(false);
      }
    }
  }, [post.description]);

    return (
        <div className="w-2/4 bg-white p-4 rounded-lg shadow-md mb-8">


      <div className='flex justify-between items-start mb-2'>
      <div className="flex items-center mb-4">
      {post.anonymous ? (
          <Avatar
          name={"?"} // Use the author's name
          size={40} // Set the size of the profile picture
          round // Make it round
          className="mr-2"
        />
        ) : (
          // Display the generated profile picture
          <Avatar
            name={post.authorName} // Use the author's name
            size={40} // Set the size of the profile picture
            round // Make it round
            className="mr-2"
          />
        )}
      <div className='ml-1'>
        {!post.anonymous ? (
          <p className="text-black font-semibold">{post.authorName}</p>
        ) : (
          <p className="text-black font-semibold">Anonymous</p>
        )}
        <p className="text-gray-600 mb-1">
        Reported at: {formattedPostedAt}
      </p>
      </div>

      </div>
      
        <Tooltip
          title="Report post" // Tooltip text
          position="top"
          trigger="mouseenter"
          arrow={true}
        >
          <button className="mr-2 text-red-500 hover:text-red-700" onClick={openReportModal}>
            <AiOutlineWarning size={20} />
          </button>
        </Tooltip>

        {isReportModalOpen && (
  <ReportModal
    handleClose={closeReportModal}
    handleReport={handleReport}
  />
)}
      
      </div>

      

      <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
      {post.location && (
        <p className="text-gray-600 mb-2 font-semibold">
          <FontAwesomeIcon icon={faMapMarker} className="mr-2 text-red-500" />
          {post.location}
        </p>
      )}
      
      <p className={`text-gray-700 mt-7 mb-4 ${showFullContent ? '' : 'line-clamp-5'}`} ref={contentRef} style={{ whiteSpace: 'pre-wrap' }}>
        {post.description}</p>
      {post.description.length > 5 && (
        <button
          className="text-blue-500 hover:underline mt-2"
          onClick={toggleContentVisibility}
        >
          {showFullContent ? 'Read Less' : 'Read More'}
        </button>
      )}
      {post.image && (
        <div>
         
            <div className="mb-2">
              <img
                src={post.image}
                alt={`Image`}
                className="max-w-full h-auto rounded"
              />
            </div>
          
        </div>
      )}
      {post.videos && (
        <div className="mb-2">
          <video controls className="max-w-full">
            <source src={post.videos} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
    )
}