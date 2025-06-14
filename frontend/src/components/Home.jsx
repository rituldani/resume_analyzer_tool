import React, { useState } from 'react'
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Home() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("Info");
      // Cookies.remove("jwt");
      localStorage.removeItem("Token")
      toast.success("Logged out sucessfully");
      console.log("Logged out");
      window.location.reload();
    }
    catch (error) {
      console.log("Error in logout", error)
    }
  }

  const handleChange = (e) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {

    if (!file) return setMessage("Please select a file");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const token = localStorage.getItem("Token");
      if (!token) throw new Error("No token found");

      const response = await axios.post("/api/resume/upload", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Uploaded sucessfully!!")
      setMessage("Resume Uploaded");
    }
    catch (error) {
      console.log(error)
      toast.error("Failed to upload resume.");
      setMessage("Upload failed: " + error.response?.data?.error || error.message)
    }
  }

  return (
    <div className='w-[100%] h-[100%]'>
      <button
        onClick={handleLogout}
        type='submit'
        className=" mt-4 left-0 text-white bg-blue-500 font-medium rounded-lg px-4 py-2 text-center "
      >Logout</button>

      <div className='p-4 mt-8'>
        <input onChange={handleChange} type='file' accept='.pdf,.docx' />
        <button className='ml-2 bg-blue-500 text-white px-4 py-2 rounded' onClick={handleUpload}>Upload</button>
        <p className='mt-4 text-sm text-gray-700' >{message}</p>
      </div>

      <div>
        <button
          onClick={() => navigate('/dashboard')}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
          Go to Resume Dashboard
        </button>
      </div>
    </div>
  )
}

export default Home;