import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import SourceCard from '../../components/source_card';
import StatCard from '../../components/stat_card';
import TeamTable from '../../components/team_table';
import Pagination from '../../components/pagination';
import { useAppSelector } from '../../app/hooks';
import { sourceCards } from '../../data/charts';
import { statCards } from '../../data/stats';
import { useDispatch } from 'react-redux';
import { setName } from '../../slices/user_slice';
import users from '../../data/users';


const Dashboard: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(`${localStorage.getItem("isAuthenticated")}` === "true");
  const receptoNetScore: number = useAppSelector(state => state.receptoScore.score);
  const otherNetScore: number = useAppSelector(state => state.otherScore.score);
  const receptoLeadsGenerated: number = useAppSelector(state => state.receptoLeads.leadsGenerated);
  const otherLeadsGenerated: number = useAppSelector(state => state.otherLeads.leadsGenerated);
  const credits: number = useAppSelector(state => state.credit.credit);

  const isAuthenticated: string | null = localStorage.getItem("isAuthenticated");

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

  return (
    <div className={`${!isUserAuthenticated ? 'blur-sm pointer-events-none select-none' : ''} flex h-screen w-screen`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto pb-6">
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                <svg className="h-6 w-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                <h1 className="text-xl font-semibold text-gray-800">Company name</h1>
              </div>
              <div className="ml-auto flex items-center">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <span>{credits} credits</span>
                </button>
                <div className="ml-4 flex items-center space-x-2">
                  <div className="flex items-center">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-gray-900">{localStorage.getItem('user')}</span>
                      <span className="text-xs text-gray-500">Admin</span>
                    </div>
                    <div className="relative ml-3">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white"></span>
                    </div>
                    <svg className="h-5 w-5 ml-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {sourceCards.map(card => {
                card.chartData.datasets[0].data[2] = card.title.split(' ')[0] === 'ReceptoNet' ? receptoLeadsGenerated : otherLeadsGenerated;
                card.stats[0].value = card.title.split(' ')[0] === 'ReceptoNet' ? `${receptoLeadsGenerated} users` : `${otherLeadsGenerated} users`;
                card.stats[1].value = card.title.split(' ')[0] === 'ReceptoNet' ? `${card.total - receptoLeadsGenerated} users` : `${card.total - otherLeadsGenerated} users`;
                return (
                  <SourceCard
                    key={card.key}
                    icon={card.icon}
                    title={card.title}
                    total={card.total}
                    chartData={card.chartData}
                    stats={card.stats}
                  />
                )
              })}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

              {statCards.map(card => {
                if (card.title.split(' ')[1] === 'Liked') {
                  return (
                    <StatCard
                      key={card.key}
                      title={card.title}
                      countValue={card.title.split(' ')[0] === 'ReceptoNet' ? receptoNetScore : otherNetScore}
                      icon={card.icon}
                      color={card.color}
                    />
                  )
                }
                if (card.title.split(' ')[1] === 'Assigned') {
                  return (
                    <StatCard
                      key={card.key}
                      title={card.title}
                      countValue={card.title.split(' ')[0] === 'ReceptoNet' ? receptoLeadsGenerated : otherLeadsGenerated}
                      icon={card.icon}
                      color={card.color}
                    />
                  )
                }
              })}
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <TeamTable/>
              <Pagination currentPage={1} totalPages={7} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;