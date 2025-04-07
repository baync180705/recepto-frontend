import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { SourceCardProps } from '../types/charts';
import { lineOptions } from '../data/line_options';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


const SourceCard: React.FC<SourceCardProps> = ({ icon, title, total, chartData, stats }) => {

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-3">
                    {icon === 'recepto' ? (
                        <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                        </div>
                    ) : (
                        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </div>
                    )}
                </div>
                <div>
                    <h2 className="text-sm font-medium text-gray-600">{title}</h2>
                    <div className="flex items-center">
                        <span className="text-2xl font-bold">{total}</span>
                        <span className="ml-2 text-xs text-gray-500">Total</span>
                    </div>
                </div>
                <div className="ml-auto">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>

            <div className="h-40 mb-4">
                <Line
                    data={chartData}
                    options={lineOptions}
                />
            </div>

            <div className="flex items-center justify-between">
                {stats.map((stat, index) => (
                    <div key={index} className="flex items-center">
                        <div
                            className={`w-3 h-3 rounded-full mr-2 ${stat.color === 'blue' ? 'bg-blue-500' :
                                    stat.color === 'orange' ? 'bg-orange-500' : 'bg-gray-300'
                                }`}
                        ></div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500">{stat.label}</span>
                            <span className="text-sm font-medium">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SourceCard;