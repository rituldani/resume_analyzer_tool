import React from 'react'

const ResumeDetails = ({ resume, onClose }) => {
  console.log("resume selected")
  const topJobs = resume.matchedJobs
  ?.sort((a, b) => b.matchPercentage - a.matchPercentage)
  ?.slice(0, 3);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-md w-[90%] md:w-[60%] shadow-lg h-[90%] overflow-x-auto">
        <button onClick={onClose} className="float-right text-red-500 font-bold text-xl">&times;</button>
        <h2 className="text-2xl font-semibold mb-4">{resume.name}</h2>
        <div className='text-start'>
          <p><strong>Email:</strong> {resume.email}</p>
          <p><strong>Phone:</strong> {resume.phone}</p>
          <p><strong>Education:</strong> {resume.education?.join(', ')}</p>
          <p><strong>Skills:</strong> {resume.skills?.join(', ')}</p>
          <p><strong>Experience:</strong></p>
          <ul className="list-disc list-inside">
            {resume.experience?.map((exp, index) => (
              <li key={index}>{exp}</li>
            ))}
          </ul>
          <p><strong>Resume Score: </strong>{resume.score}</p>
          <p><strong>Suggestions: </strong>
            {resume.suggestions?.map((sugg, index) => (
              <span key={index}>{sugg}</span>
            ))}
          </p>
          <p><strong>Matched Jobs: </strong></p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topJobs?.map((job, index) => (
              <div key={index} className="bg-zinc-600 shadow-md rounded-md p-2 border border-zinc-800 hover:shadow-lg transition">
                <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                <p className="text-sm mb-2">{job.description}</p>

                <div className="mb-2">
                  <span className="font-semibold text-sm">Skills: </span>
                  <span className="text-sm text-zinc-900">{job.skills.join(', ')}</span>
                </div>

                <div className="mt-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Match: {job.matchPercentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* <ul className="">
            {resume.matchedJobs?.map((job, index) => (
              <li key={index}>
                <p><strong>Title:</strong> {job.title}</p>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
                <p><strong>Match Percentage:</strong> {job.matchPercentage}%</p>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  )
}
export default ResumeDetails;