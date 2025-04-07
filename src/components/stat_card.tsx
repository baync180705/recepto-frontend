import React from 'react';
import { StatCardProps } from '../types/stats';

const StatCard: React.FC<StatCardProps> = ({ title, countValue, icon, color }) => {

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-center mb-4">
        {icon === 'like' ? (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            color === 'blue' ? 'text-blue-600' : 'text-green-600'
          }`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
          </div>
        ) : (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            color === 'green' ? 'text-green-600' : 'text-blue-600'
          }`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
        )}
      </div>
      <div className="text-center">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-300">{countValue}</p>
      </div>
    </div>
  );
};

export default StatCard;