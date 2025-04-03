import React from 'react';
import { Lead } from '../types/leads';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';

interface LeadCardProps {
  lead: Lead;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
  return (
    <div className={`border-l-4 ${lead.isLocked ? 'border-blue-500' : 'border-green-500'} bg-white p-4 rounded-lg shadow`}>
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
          
          {lead.isLocked && (
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
              <LockClosedIcon className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{lead.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{lead.location}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {lead.isLocked ? (
                <button className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-1 rounded">
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
                <>
                  {lead.unlockCredits !== undefined ? (
                    <button className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-1 rounded">
                      <LockOpenIcon className="w-4 h-4" />
                      <span>Unlock</span>
                      <span className="flex items-center">
                        <span className="mx-1">•</span>
                        <span>{lead.unlockCredits}</span>
                      </span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-50">
                        Assign
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-50">
                        View Details
                      </button>
                    </div>
                  )}
                </>
              )}
              
              {lead.score && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  lead.score > 90 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                } font-medium text-sm`}>
                  {lead.score}
                </div>
              )}
              
              <button className="text-gray-400 hover:text-green-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </button>
              
              <button className="text-gray-400 hover:text-red-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2" />
                </svg>
              </button>
            </div>
          </div>
          
          {lead.message && (
            <div className="mt-2 text-gray-700">
              "{lead.message}"
            </div>
          )}
          
          {lead.jobDescription && (
            <div className="mt-2 text-gray-700">
              {lead.jobDescription}
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