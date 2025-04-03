import React from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import SourceCard from '../components/source_card';
import StatCard from '../components/stat_card';
import TeamTable from '../components/team_table';
import Pagination from '../components/pagination';

const Dashboard: React.FC = () => {
  // Sample data
  const sourceCards = [
    {
      id: 1,
      icon: 'recepto',
      title: 'ReceptoNet Leads',
      total: 404,
      chartData: {
        labels: ['Jan', 'Mar', 'May'],
        datasets: [
          {
            label: 'Leads',
            data: [200, 250, 394],
            borderColor: 'rgba(59, 130, 246, 1)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
          }
        ]
      },
      stats: [
        { label: 'Unlocked', value: '179 users', color: 'blue' },
        { label: 'Yet to Unlock', value: '394 users', color: 'gray' }
      ]
    },
    {
      id: 2,
      icon: 'facebook',
      title: 'Org Network Leads',
      total: 594,
      chartData: {
        labels: ['Jan', 'Mar', 'May'],
        datasets: [
          {
            label: 'Leads',
            data: [200, 300, 394],
            borderColor: 'rgba(249, 115, 22, 1)',
            backgroundColor: 'rgba(249, 115, 22, 0.1)',
            tension: 0.4,
            fill: true,
          }
        ]
      },
      stats: [
        { label: 'Contacted', value: '179 users', color: 'orange' },
        { label: 'Yet to Contact', value: '394 users', color: 'gray' }
      ]
    }
  ];

  const statCards = [
    { id: 1, title: 'Liked Leads', value: '23.4K', icon: 'like', color: 'blue' },
    { id: 2, title: 'Assigned Leads', value: '23.4K', icon: 'user', color: 'green' },
    { id: 3, title: 'Liked Leads', value: '23.4K', icon: 'like', color: 'blue' },
    { id: 4, title: 'Assigned Leads', value: '23.4K', icon: 'user', color: 'green' }
  ];

  const teamMembers = [
    { id: 1, name: 'Olivia Rhye', lastActive: '2min ago', role: 'Admin', generated: 123, unlocked: 123, assigned: 40 },
    { id: 2, name: 'Olivia Rhye', lastActive: '2min ago', role: 'Removed', generated: 23, unlocked: 23, assigned: 25 },
    { id: 3, name: 'Olivia Rhye', lastActive: '2min ago', role: 'Member', generated: 56, unlocked: 56, assigned: 15 },
    { id: 4, name: 'Olivia Rhye', lastActive: '2min ago', role: 'Admin', generated: 12, unlocked: 12, assigned: 10 },
    { id: 5, name: 'Olivia Rhye', lastActive: '2min ago', role: 'Member', generated: 123, unlocked: 123, assigned: 5 }
  ];

  return (
    <div className="flex h-screen w-screen">
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
                  <span>0 credits</span>
                </button>
                <div className="ml-4 flex items-center space-x-2">
                  <div className="flex items-center">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-gray-900">Anand Kumar</span>
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
            
            {/* Source Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {sourceCards.map(card => (
                <SourceCard 
                  key={card.id}
                  icon={card.icon}
                  title={card.title}
                  total={card.total}
                  chartData={card.chartData}
                  stats={card.stats}
                />
              ))}
            </div>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {statCards.map(card => (
                <StatCard 
                  key={card.id}
                  title={card.title}
                  value={card.value}
                  icon={card.icon}
                  color={card.color}
                />
              ))}
            </div>
            
            {/* Team Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <TeamTable members={teamMembers} />
              <Pagination currentPage={1} totalPages={7} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;