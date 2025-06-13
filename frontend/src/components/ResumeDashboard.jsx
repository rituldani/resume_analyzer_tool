import ResumeList from "./ResumeList.jsx";
import { useNavigate } from 'react-router-dom';
const ResumeDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Resume Analyzer Dashboard</h2>
      <ResumeList />
      <button 
          onClick={()=>navigate('/')}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
          Back
        </button>
    </div>
  );
};

export default ResumeDashboard;