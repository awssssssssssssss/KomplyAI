'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
    } else {
      setLoading(false);
    }
  }, [session, status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {session.user?.name}!</h1>
        <p className="text-gray-600 mb-8">Here&apos;s what&apos;s happening with your privacy compliance today.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Data Sources</h3>
            <p className="text-3xl font-bold text-blue-600">4</p>
            <p className="text-gray-600">Connected sources</p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span className="text-green-500">3 active</span>
              <span className="mx-1">•</span>
              <span className="text-red-500">1 inactive</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Data Assets</h3>
            <p className="text-3xl font-bold text-green-600">5</p>
            <p className="text-gray-600">Identified assets</p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span className="text-blue-500">3 personal</span>
              <span className="mx-1">•</span>
              <span className="text-yellow-500">1 financial</span>
              <span className="mx-1">•</span>
              <span className="text-red-500">1 sensitive</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Pending Requests</h3>
            <p className="text-3xl font-bold text-yellow-600">2</p>
            <p className="text-gray-600">DSR requests</p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span className="text-green-500">1 access</span>
              <span className="mx-1">•</span>
              <span className="text-blue-500">1 deletion</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Compliance Score</h3>
            <p className="text-3xl font-bold text-purple-600">78%</p>
            <p className="text-gray-600">GDPR/CCPA</p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span className="text-green-500">+2% this month</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                      <span className="text-blue-600">📊</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">New data source connected</p>
                    <p className="text-sm text-gray-600">Payment Processing API connected successfully</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                      <span className="text-green-600">✅</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Data classified</p>
                    <p className="text-sm text-gray-600">5 data assets classified with 95% average confidence</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100">
                      <span className="text-yellow-600">⚠️</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Compliance alert</p>
                    <p className="text-sm text-gray-600">Employee Data asset requires review</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100">
                      <span className="text-purple-600">🔄</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Data flow updated</p>
                    <p className="text-sm text-gray-600">Real-time payment data integration established</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-2xl mb-2">🗄️</div>
                  <span className="text-sm font-medium text-gray-900">Scan Data</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-2xl mb-2">✅</div>
                  <span className="text-sm font-medium text-gray-900">Manage Consent</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-2xl mb-2">📨</div>
                  <span className="text-sm font-medium text-gray-900">Process DSR</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-2xl mb-2">📜</div>
                  <span className="text-sm font-medium text-gray-900">Generate Policy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
