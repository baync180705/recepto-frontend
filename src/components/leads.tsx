import React, { useState, useEffect } from 'react';
import { Lead } from '../types/leads';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { setCredit } from '../slices/credit_slice';
import { useAppSelector } from '../app/hooks';
import { setReceptoScore, setOtherScore } from '../slices/score_slice';
import { setUnlockedCardsId } from '../slices/unlocked_leads_slice';
import { teamMembers } from '../data/team';
import { setOtherLeadsGenerated, setReceptoLeadsGenerated, updateUnlocked } from '../slices/leads_generated_slice';
import { setAssignedLead } from '../slices/assigned_leads_slice';

interface LeadCardProps {
  lead: Lead;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {

  const dispatch = useDispatch();
  const credit = useAppSelector((state) => state.credit.credit);
  const user = useAppSelector((state) => state.user.name);
  const isUnlocked: number[] = useAppSelector((state) => state.unlockedCards.unlockedCardsId);
  const assignedLeads = useAppSelector((state) => state.assignedLeads);
  const assignedLeadIds = assignedLeads.map((assignedLead) => assignedLead.id);
  const assignedLeadNames = assignedLeads.map((assignedLead) => assignedLead.name);
  const isAssigned = assignedLeadIds.includes(lead.id);
  const assignedMember = assignedLeadNames[assignedLeadIds.indexOf(lead.id)];

  const [score, setScore] = useState<number>(() => {
    const storedScore = localStorage.getItem(`lead_score_${lead.id}`);
    return storedScore ? parseInt(storedScore) : (lead.score || 0);
  });

  const [userAction, setUserAction] = useState<string | null>(() => {
    return localStorage.getItem(`user_action_${user}_${lead.id}`);
  });

  useEffect(() => {
    const action = localStorage.getItem(`user_action_${user}_${lead.id}`);
    setUserAction(action);
  }, [user, lead.id]);

  const updateScore = (scoreChange: number) => {
    if (lead.source === "ReceptoNet") {
      dispatch(setReceptoScore(scoreChange));
    } else {
      dispatch(setOtherScore(scoreChange));
    }
  };

  const handleLike = () => {
    let scoreChange = 0;
    let newScore = score;
    let newAction: string | null = null;

    if (userAction === '1') {
      newAction = null;
      scoreChange = -1;
      newScore = score - 1;
    }
    else if (userAction === '0') {
      newAction = '1';
      scoreChange = 2;
      newScore = score + 2;
    }
    else {
      newAction = '1';
      scoreChange = 1;
      newScore = score + 1;
    }

    setUserAction(newAction);
    setScore(newScore);

    if (newAction === null) {
      localStorage.removeItem(`user_action_${user}_${lead.id}`);
    } else {
      localStorage.setItem(`user_action_${user}_${lead.id}`, newAction);
    }
    localStorage.setItem(`lead_score_${lead.id}`, newScore.toString());

    updateScore(scoreChange);
  };

  const handleDislike = () => {
    let scoreChange = 0;
    let newScore = score;
    let newAction: string | null = null;

    if (userAction === '0') {
      newAction = null;
      scoreChange = 1;
      newScore = score + 1;
    }
    else if (userAction === '1') {
      newAction = '0';
      scoreChange = -2;
      newScore = score - 2;
    }
    else {
      newAction = '0';
      scoreChange = -1;
      newScore = score - 1;
    }

    setUserAction(newAction);
    setScore(newScore);

    if (newAction === null) {
      localStorage.removeItem(`user_action_${user}_${lead.id}`);
    } else {
      localStorage.setItem(`user_action_${user}_${lead.id}`, newAction);
    }
    localStorage.setItem(`lead_score_${lead.id}`, newScore.toString());

    updateScore(scoreChange);
  };


  const handleAssign = (teamMemberName: string, id: number) => {
    dispatch(setAssignedLead({ id: lead.id, name: teamMemberName }));
    dispatch(updateUnlocked(id));
    if (lead.source === "ReceptoNet") {
      dispatch(setReceptoLeadsGenerated(1));
    }
    else {
      dispatch(setOtherLeadsGenerated(1));
    }
  };

  return (
    <div className={`border-l-4 ${!isUnlocked.includes(lead.id) ? 'border-blue-500' : 'border-green-500'} bg-white p-4 rounded-lg shadow`}>
      <div className="flex items-start">
        <div className="relative flex-shrink-0">
          {lead.avatarColor === "#ffffff" ? (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
              {lead.name.charAt(0)}
            </div>
          ) : (
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
              style={{ backgroundColor: lead.avatarColor }}
            >
              {lead.name.charAt(0)}
            </div>
          )}

          {!isUnlocked.includes(lead.id) && (
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
              <LockClosedIcon className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        <div className="ml-4 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`${lead.source === 'ReceptoNet' && !isUnlocked.includes(lead.id) ? 'blur-sm pointer-events-none select-none' : ''} font-medium text-gray-900`}>
                {lead.name}
              </h3>              <div className="flex items-center text-sm text-gray-500">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{lead.location}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {!isUnlocked.includes(lead.id) ? (
                <button className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-1 rounded" onClick={() => {
                  dispatch(setCredit((typeof (lead.unlockCredits) == "number") ? credit - lead.unlockCredits : credit));
                  dispatch(setUnlockedCardsId(lead.id));
                }}>
                  <LockOpenIcon className="w-4 h-4" />
                  <span>Unlock</span>
                  {lead.unlockCredits !== undefined && (
                    <span className="flex items-center">
                      <span className="mx-1">•</span>
                      <span>{lead.unlockCredits}</span>
                    </span>
                  )}
                </button>
              ) : (
                <>(
                  <div className="flex space-x-2">
                    <div className="relative">
                      {isAssigned ? (
                        <div className="text-sm text-gray-700 font-medium">
                          Assigned to: <span className="text-blue-600">{assignedMember}</span>
                        </div>
                      ) : (
                        <>
                          <select
                            className="border border-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-50 cursor-pointer"
                            onChange={(e) => handleAssign(teamMembers[parseInt(e.target.value) - 1].name, parseInt(e.target.value))}
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Assign
                            </option>
                            {teamMembers.map((member) => (
                              <option key={member.id} value={member.id}>
                                {member.name}
                              </option>
                            ))}
                          </select>

                          <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-50">
                            View Details
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  )
                </>
              )}

              {lead.score && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${lead.score > 90 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  } font-medium text-sm`}>
                  {score}
                </div>
              )}

              <div className="flex space-x-4">

                <button
                  className={`custom flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${userAction === '1'
                      ? 'bg-green-500 text-white'
                      : 'text-gray-400 hover:text-green-500 hover:bg-green-100'
                    }`}
                  onClick={handleLike}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </button>
                <button
                  className={`custom flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${userAction === '0'
                      ? 'bg-red-500 text-white'
                      : 'text-gray-400 hover:text-red-500 hover:bg-red-100'
                    }`}
                  onClick={handleDislike}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {lead.message && (
            <div className="mt-2 text-gray-700">
              {lead.message}
            </div>
          )}

          <div className="mt-3 flex items-center space-x-4">
            {lead.timeStatus && (
              <div className="flex items-center text-xs text-gray-500">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span>{lead.timeStatus}</span>
              </div>
            )}

            {lead.source && (
              <div className="flex items-center text-xs text-orange-500">
                <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                <span>{lead.source}</span>
              </div>
            )}

            {lead.updatedTime && (
              <div className="flex items-center text-xs text-gray-500">
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                <span>{lead.updatedTime}</span>
              </div>
            )}

            {lead.groupName && (
              <div className="flex items-center text-xs text-green-600">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span>{lead.groupName}</span>
              </div>
            )}

            {lead.company && (
              <div className="ml-auto flex items-center">
                <div className="flex">
                  {Array.from({ length: lead.companyTier || 0 }).map((_, i) => (
                    <div key={i} className="w-5 h-5 rounded-full bg-yellow-500 border-2 border-white -ml-1 first:ml-0"></div>
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium">{lead.company}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;