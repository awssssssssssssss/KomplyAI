// Dashboard page
import React from 'react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Policies
              </h2>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">3</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Active policies</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Data Processes
              </h2>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">12</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Mapped processes</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                DSARs
              </h2>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">1</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Pending requests</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-left">
                Generate Privacy Policy
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-left">
                Map Data Processes
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-left">
                Review Compliance
              </button>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-left">
                Handle DSAR
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Policies
            </h2>
            <ul className="space-y-3">
              <li className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between">
                  <span className="text-gray-900 dark:text-white">Datenschutzerklärung - Example GmbH</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Updated: Aug 28, 2025</span>
                </div>
              </li>
              <li className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between">
                  <span className="text-gray-900 dark:text-white">Datenschutzerklärung - Test AG</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Updated: Aug 15, 2025</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
