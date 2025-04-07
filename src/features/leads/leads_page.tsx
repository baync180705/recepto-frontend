import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../slices/user_slice';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import LeadCard from '../../components/leads';
import { leads } from '../../data/leads';
import users from '../../data/users';
import { useAppSelector } from '../../app/hooks';
import FilterBox from '../../components/filter';
import { RootState } from '../../app/store';

const LeadsPage: React.FC = () => {
  const isAuthenticated: string | null = localStorage.getItem("isAuthenticated");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(`${localStorage.getItem("isAuthenticated")}` === "true");
  const creditCount = useAppSelector((state) => state.credit.credit);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);
  const filterBoxRef = useRef<HTMLDivElement>(null);

  const selectedLocations = useSelector((state: RootState) => state.locationFilter.selectedLocations);
  const minScore = useSelector((state: RootState) => state.locationFilter.minScore);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    if (isAuthenticated === null) {
      setIsUserAuthenticated(false);
      const user: string | null = prompt("Enter username:");
      if (user) {
        const foundUser = users.find((u) => u.username === user);
        const password: string | null = prompt("Enter password:");
        if (foundUser && foundUser.password === password) {
          alert("Login successful");
          localStorage.setItem("isAuthenticated", "true");
          setIsUserAuthenticated(true);
          localStorage.setItem("user", user);
          dispatch(setName(user));
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

  const filteredLeads = leads.filter(lead => {
    const matchesLocation =
      selectedLocations.length === 0 || selectedLocations.some(location =>
        lead.location.toLowerCase().includes(location)
      );
    const matchesScore = lead.score >= minScore;
    const matchesSearchTerm = lead.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLocation && matchesScore && matchesSearchTerm;
  });

  const toggleFilterBox = () => {
    setIsFilterBoxVisible((prev) => !prev);
  };

  const closeFilterBox = () => {
    setIsFilterBoxVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterBoxRef.current && !filterBoxRef.current.contains(event.target as Node)) {
        setIsFilterBoxVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${!isUserAuthenticated ? 'blur-sm pointer-events-none select-none' : ''} flex h-screen w-screen`}>
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
                    placeholder="What is the best tool for XYZ..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 placeholder-gray-400 bg-white text-gray-800"
                    onChange={(e => setSearchTerm(e.target.value))}
                  />
                  <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setSearchTerm('')}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>{creditCount} credits</span>
                </button>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <button className="flex items-center space-x-1" onClick={toggleFilterBox}>
                      <span>Filters</span>
                    </button>
                    {isFilterBoxVisible && (
                      <div
                        ref={filterBoxRef}
                        className="absolute top-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-[50vw] overflow-x-auto"
                      >
                        <FilterBox onClose={closeFilterBox} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredLeads.map(lead => (
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