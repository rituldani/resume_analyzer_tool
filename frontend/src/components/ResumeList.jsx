import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import ResumeDetails from './ResumeDetails.jsx';
import toast from 'react-hot-toast'

const ResumeList = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedResume, setSelectedResume] = useState(null);

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const token = localStorage.getItem("Token"); // ✅ Get JWT from storage
                if (!token) throw new Error("No token found");

                const response = await axios.get("/api/resume/all", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // console.log(response.data.data);
                console.log(response.data);
                setResumes(response.data.data);
            }
            catch (error) {
                console.log("Error in fetching Resumes", error);
            } finally {
                setLoading(false)
            }
        };

        setLoading(true);
        fetchResumes();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this resume?");
        if (confirmDelete) {
            try {
                await axios.delete(`/api/resume/${id}`);
                setResumes(prev => prev.filter(resume => resume._id !== id));
                toast.success("Deleted sucessfully!!");
            }
            catch (error) {
                console.error('Error deleting resume:', error);
            }
        }
    };

    const handleCardClick = (resume) => {
        setSelectedResume(resume);
        console.log("Selected resume:", selectedResume)
    }

    if (loading) {
        return <p className="text-center">Loading resumes...</p>;
    };

    return (
        <div className='p-4'>
            <h2 className="text-2xl font-bold mb-4">Uploaded Resumes</h2>
            {
                !Array.isArray(resumes) || resumes.length === 0
                    ? (
                        <p>No resume found.</p>
                    ) : (
                        // <div className="overflow-x-auto">
                        //     <table className="table-auto w-full border border-gray-200">
                        //         <thead className="">
                        //             <tr>
                        //                 <th className="px-4 py-2 border">Name</th>
                        //                 <th className="px-4 py-2 border">Email</th>
                        //                 <th className="px-4 py-2 border">Phone Number</th>
                        //                 <th className="px-4 py-2 border">Skills</th>
                        //                 <th className="px-4 py-2 border">Education</th>
                        //                 <th className="px-4 py-2 border">Experience</th>
                        //                 <th className="px-4 py-2 border">Delete</th>
                        //             </tr>
                        //         </thead>
                        //         <tbody>
                        //             {resumes.map((resume) => (
                        //                 <tr key={resume._id} className="text-sm cursor-pointer" onClick={() => handleCardClick(resume)}>
                        //                     <td className="border px-4 py-2">{resume.name}</td>
                        //                     <td className="border px-4 py-2">{resume.email}</td>
                        //                     <td className="border px-4 py-2">{resume.phone}</td>
                        //                     <td className="border px-4 py-2">
                        //                         <ul>{resume.skills?.map((skill, i) => <li key={i}>{skill}</li>)}</ul>
                        //                     </td>
                        //                     <td className="border px-4 py-2">
                        //                         <ul>{resume.education?.map((edu, i) => <li key={i}>{edu}</li>)}</ul>
                        //                     </td>
                        //                     <td className="border px-4 py-2">
                        //                         <ul>{resume.experience?.map((exp, i) => <li key={i}>{exp}</li>)}</ul>
                        //                     </td>
                        //                     <td className="border px-4 py-1">
                        //                         <button onClick={() => handleDelete(resume._id)}>
                        //                             <Trash2 size={25} />
                        //                         </button>
                        //                     </td>
                        //                 </tr>
                        //             ))}


                        //         </tbody>

                        //     </table>
                        // </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {resumes.map((resume) => (
                                <div
                                    key={resume._id}
                                    onClick={() => handleCardClick(resume)}
                                    className="bg-zinc-800 shadow-md rounded-xl p-4 hover:shadow-lg transition cursor-pointer"
                                >
                                    <h3 className="text-lg font-semibold mb-1">{resume.name}</h3>
                                    <p className="text-sm text-gray-600">{resume.email}</p>
                                    <p className="text-sm text-gray-600">{resume.phone}</p>

                                    <div className="mt-2">
                                        <p className="text-sm font-medium">Resume Score</p>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                            <div
                                                className="bg-green-500 h-2 rounded-full"
                                                style={{ width: `${resume.score}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{resume.score}/100</p>
                                    </div>

                                    <div className="mt-2">
                                        <p className="text-sm text-gray-700">Top Skills:</p>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {resume.skills.slice(0, 4).map((skill, i) => (
                                                <span key={i} className="text-xs bg-zinc-600 px-2 py-0.5 rounded-full">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <p className="text-sm text-gray-700">Best Match:</p>
                                        <p className="text-xs text-blue-600 font-medium">
                                            {resume.matchedJobs?.[0]?.title} ({resume.matchedJobs?.[0]?.matchPercentage}%)
                                        </p>
                                    </div>

                                    <div className="flex justify-end mt-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(resume._id);
                                            }}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
            }

            {selectedResume ? (
                <ResumeDetails
                    resume={selectedResume}
                    onClose={() => setSelectedResume(null)}
                />
            ) : ("")
            }
        </div>
    )
}

export default ResumeList



//     < div className = "p-4" >
//         <h2 className="text-2xl font-bold mb-4">Uploaded Resumes</h2>

// {
//     resumes.length === 0 ? (
//         <p>No resumes found.</p>
//     ) : (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {resumes.map((resume) => (
//             <div
//                 key={resume._id}
//                 onClick={() => handleCardClick(resume)}
//                 className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition cursor-pointer"
//             >
//                 <h3 className="text-lg font-semibold mb-1">{resume.name}</h3>
//                 <p className="text-sm text-gray-600">{resume.email}</p>
//                 <p className="text-sm text-gray-600">{resume.phone}</p>

//                 <div className="mt-2">
//                     <p className="text-sm font-medium">Resume Score</p>
//                     <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
//                         <div
//                             className="bg-green-500 h-2 rounded-full"
//                             style={{ width: `${resume.score}%` }}
//                         ></div>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">{resume.score}/100</p>
//                 </div>

//                 <div className="mt-2">
//                     <p className="text-sm text-gray-700">Top Skills:</p>
//                     <div className="flex flex-wrap gap-1 mt-1">
//                         {resume.skills.slice(0, 4).map((skill, i) => (
//                             <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
//                                 {skill}
//                             </span>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="mt-2">
//                     <p className="text-sm text-gray-700">Best Match:</p>
//                     <p className="text-xs text-blue-600 font-medium">
//                         {resume.matchedJobs?.[0]?.title} ({resume.matchedJobs?.[0]?.matchPercentage}%)
//                     </p>
//                 </div>

//                 <div className="flex justify-end mt-4">
//                     <button
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             handleDelete(resume._id);
//                         }}
//                         className="text-red-500 hover:text-red-700"
//                     >
//                         <Trash2 size={20} />
//                     </button>
//                 </div>
//             </div>
//         ))}
//     </div>
// )
// }
// </div >
