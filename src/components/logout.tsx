import React from 'react';
import { LogoutProps } from '../types/logout';

const Logout: React.FC<LogoutProps> = ({ onConfirm, onCancel }) => {

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm mx-auto p-6">
                <div className="flex flex-col items-center">
                    <div className="text-blue-600 font-bold text-xl mb-6">
                        Recepto
                    </div>

                    <h2 className="text-2xl font-semibold mb-2">Log out ?</h2>

                    <p className="text-gray-600 text-center mb-6">
                        You'd have to login again to the platform.
                    </p>

                    <div className="w-full space-y-3">
                        <button
                            onClick={onConfirm}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium"
                        >
                            Logout
                        </button>

                        <button
                            onClick={onCancel}
                            className="w-full border border-gray-300 hover:bg-gray-50 text-blue-600 py-3 px-4 rounded-lg font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logout;
