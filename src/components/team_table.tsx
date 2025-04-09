import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { updateRole } from '../slices/leads_generated_slice';
import { TeamMember } from '../types/team';

const TeamTable: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const teamData = useAppSelector((state) => state.memberWiseLeads.teamMembers);

  const handleRoleChange = (memberId: number, newRole: string) => {
    dispatch(updateRole({ id: memberId, role: newRole }));
    setActiveDropdown(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Team
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span className="inline-flex items-center">
                Role
                <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span className="inline-flex items-center">
                Generated
                <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span className="inline-flex items-center">
                Unlocked
                <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span className="inline-flex items-center">
                Assigned
                <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {teamData.map((member: TeamMember) => (
            <tr key={member.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 relative">
                    <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white"></span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-500">Last active {member.lastActive}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.role === 'Admin' ? 'bg-blue-100 text-blue-800' :
                    member.role === 'Removed' ? 'bg-red-100 text-red-800' :
                      'bg-green-100 text-green-800'
                  }`}>
                  {member.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {member.generated}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {member.unlocked}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.assigned >= 30 ? 'bg-orange-100 text-orange-800' :
                      member.assigned >= 20 ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                    }`}>
                    {member.assigned}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                <button
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setActiveDropdown(activeDropdown === member.id ? null : member.id)}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>

                {activeDropdown === member.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    {member.role === 'Removed' ? (
                      <button
                        className="custom block w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-gray-100"
                        onClick={() => handleRoleChange(member.id, 'Member')}
                      >
                        Add to team
                      </button>
                    ) : (
                      <>
                        <button
                          className="custom block w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-gray-100"
                          onClick={() => handleRoleChange(member.id, member.role === 'Admin' ? 'Member' : 'Admin')}
                        >
                          {member.role === 'Admin' ? 'Change to Member' : 'Change to Admin'}
                        </button>
                        <button
                          className="custom block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => handleRoleChange(member.id, 'Removed')}
                        >
                          Remove from team
                        </button>
                      </>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;