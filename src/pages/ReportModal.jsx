import { useState } from "react";

export const ReportModal = ({ handleClose, handleReport }) => {

    const [reason, setReason] = useState('');

    const handleTextareaChange = (e) => {
        setReason(e.target.value);
    };


    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-bg fixed inset-0 bg-gray-800 opacity-50"></div>
        <div className="w-2/5 h-3/5 modal p-6 bg-white rounded-lg shadow-lg z-50">
          <h2 className="text-2xl font-semibold mb-5">Report Post</h2>
          <textarea
            className="w-full h-3/4 px-3 py-2 border rounded-lg focus:outline-none"
            placeholder="Enter your reason for reporting..."
            value={reason}
            onChange={handleTextareaChange}
          />
          <div className="mt-4 flex justify-center">
            <button
              className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg mr-4"
              onClick={() => handleReport(reason)}
            >
              Submit
            </button>
            <button
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-lg"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };