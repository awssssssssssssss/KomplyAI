// Compliance page
import React from 'react';

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Compliance Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Compliance Status
              </h2>
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-gray-700 dark:text-gray-300">Fully Compliant</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Your organization is currently meeting all DSGVO requirements.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Next Review
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <span className="font-medium">Date:</span> December 15, 2025
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                75 days remaining until your next compliance review.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3"></div>
                <div>
                  <p className="text-gray-900 dark:text-white">Privacy policy updated</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">2 days ago</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3"></div>
                <div>
                  <p className="text-gray-900 dark:text-white">Data processing inventory completed</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">1 week ago</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
