// Policies page
import React from 'react';

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Privacy Policies
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Generate New Privacy Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Use our AI-powered tool to generate a DSGVO-compliant privacy policy for your organization.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
              Generate Policy
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Policies
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              No policies generated yet. Create your first policy using the button above.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
