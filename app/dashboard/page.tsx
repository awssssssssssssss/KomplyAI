'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FiDatabase, FiFile, FiMail, FiFileText, FiActivity, FiCheckCircle, FiAlertTriangle, FiRefreshCw, FiTrendingUp } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Mock data for charts
  const complianceData = [
    { name: 'Jan', score: 65 },
    { name: 'Feb', score: 68 },
    { name: 'Mar', score: 70 },
    { name: 'Apr', score: 72 },
    { name: 'May', score: 75 },
    { name: 'Jun', score: 78 },
  ];

  const assetData = [
    { name: 'Personal', value: 3 },
    { name: 'Financial', value: 1 },
    { name: 'Sensitive', value: 1 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Quick actions data
  const quickActions = [
    { icon: <FiDatabase className="text-2xl" />, title: 'Scan Data', color: 'bg-blue-100 text-blue-600' },
    { icon: <FiCheckCircle className="text-2xl" />, title: 'Manage Consent', color: 'bg-green-100 text-green-600' },
    { icon: <FiMail className="text-2xl" />, title: 'Process DSR', color: 'bg-yellow-100 text-yellow-600' },
    { icon: <FiFileText className="text-2xl" />, title: 'Generate Policy', color: 'bg-purple-100 text-purple-600' },
  ];

  // Recent activity data
  const recentActivities = [
    { 
      icon: <FiDatabase className="text-blue-600" />, 
      title: 'New data source connected', 
      description: 'Payment Processing API connected successfully', 
      time: '2 hours ago', 
      color: 'bg-blue-100' 
    },
    { 
      icon: <FiCheckCircle className="text-green-600" />, 
      title: 'Data classified', 
      description: '5 data assets classified with 95% average confidence', 
      time: '5 hours ago', 
      color: 'bg-green-100' 
    },
    { 
      icon: <FiAlertTriangle className="text-yellow-600" />, 
      title: 'Compliance alert', 
      description: 'Employee Data asset requires review', 
      time: '1 day ago', 
      color: 'bg-yellow-100' 
    },
    { 
      icon: <FiRefreshCw className="text-purple-600" />, 
      title: 'Data flow updated', 
      description: 'Real-time payment data integration established', 
      time: '2 days ago', 
      color: 'bg-purple-100' 
    },
  ];

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {session.user?.name}!</h1>
          <p className="text-gray-600">Here&apos;s what&apos;s happening with your privacy compliance today.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Data Sources</p>
                <p className="text-2xl font-bold text-blue-600">4</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <FiDatabase className="text-blue-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium flex items-center">
                <FiTrendingUp className="mr-1" /> 3 active
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-red-600 font-medium">1 inactive</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Data Assets</p>
                <p className="text-2xl font-bold text-green-600">5</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <FiFile className="text-green-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-blue-600 font-medium">3 personal</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-yellow-600 font-medium">1 financial</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-red-600 font-medium">1 sensitive</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending Requests</p>
                <p className="text-2xl font-bold text-yellow-600">2</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <FiMail className="text-yellow-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">1 access</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-blue-600 font-medium">1 deletion</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Compliance Score</p>
                <p className="text-2xl font-bold text-purple-600">78%</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <FiCheckCircle className="text-purple-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
              <FiTrendingUp className="mr-1" /> +2% this month
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <FiActivity className="mr-2 text-blue-500" /> Compliance Trend
              </h2>
            </div>
            <div className="p-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={complianceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px', 
                      border: '1px solid #e5e7eb' 
                    }} 
                  />
                  <Bar dataKey="score" fill="#818cf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Data Assets Distribution</h2>
            </div>
            <div className="p-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {assetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px', 
                      border: '1px solid #e5e7eb' 
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <FiActivity className="mr-2 text-blue-500" /> Recent Activity
              </h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <li key={index} className="flex items-start pb-4 last:pb-0 border-b border-gray-50 last:border-0">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${activity.color}`}>
                        {activity.icon}
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <FiActivity className="mr-2 text-blue-500" /> Quick Actions
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-100 hover:border-gray-200"
                  >
                    <div className={`p-3 rounded-lg mb-3 ${action.color}`}>
                      {action.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{action.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
