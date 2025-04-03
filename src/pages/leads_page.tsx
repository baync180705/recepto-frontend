import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import LeadCard from '../components/leads';
import { leads } from '../data/leads';
import users  from '../data/users';

const LeadsPage: React.FC = () => {

  let isAuthenticated: string | null = localStorage.getItem("isAuthenticated");
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
   }, []);

  const checkAuthentication = () => {    
    if (isAuthenticated === null) {
      let user: string | null = prompt("Enter username:");
      if (user) {
        const foundUser = users.find((u) => u.username === user);
        let password = prompt("Enter password:");
        if (foundUser && foundUser.password === password) {
          alert("Login successful");
          isAuthenticated = "true";
          localStorage.setItem("isAuthenticated", `${isAuthenticated}`);
        } else {
          alert("Invalid username or password");
          navigate("/");
        }
      } else {
        alert("Invalid username");
        navigate("/");
      }
    }
  }
  

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-semibold text-gray-800">Company name</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What is the best tool for XYZ XYZ..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>0 credits</span>
                </button>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-center bg-blue-50 text-blue-800 p-2 rounded-lg">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div className="relative">
                    <button className="flex items-center space-x-1">
                      <span>Filters</span>
                      <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center text-xs">2</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {leads.map(lead => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LeadsPage;