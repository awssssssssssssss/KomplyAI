'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiDatabase, FiFile, FiArrowRight, FiRefreshCw, FiPlus, FiEdit, FiTrash2, FiFilter, FiSearch, FiGitBranch } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function DataInventoryDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [organizationId, setOrganizationId] = useState('');
  const [dataSources, setDataSources] = useState<any[]>([]);
  const [dataAssets, setDataAssets] = useState<any[]>([]);
  const [dataFlows, setDataFlows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Mock data for charts
  const sourceTypeData = [
    { name: 'Database', value: 2 },
    { name: 'API', value: 1 },
    { name: 'File System', value: 1 },
  ];
  
  const assetTypeData = [
    { name: 'Table', value: 2 },
    { name: 'Collection', value: 1 },
    { name: 'File', value: 2 },
  ];
  
  const flowTypeData = [
    { name: 'Real-time', value: 3 },
    { name: 'Batch', value: 1 },
  ];
  
  const assetCategoryData = [
    { name: 'Personal', value: 3, color: '#3b82f6' },
    { name: 'Financial', value: 1, color: '#f59e0b' },
    { name: 'Sensitive', value: 1, color: '#ef4444' },
    { name: 'Other', value: 2, color: '#8b5cf6' },
  ];
  
  const dataGrowthData = [
    { month: 'Jan', sources: 1, assets: 2, flows: 1 },
    { month: 'Feb', sources: 1, assets: 3, flows: 1 },
    { month: 'Mar', sources: 2, assets: 4, flows: 2 },
    { month: 'Apr', sources: 2, assets: 4, flows: 3 },
    { month: 'May', sources: 3, assets: 5, flows: 4 },
  ];
  
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
  
  const fetchData = useCallback(async (orgId: string) => {
    try {
      setLoading(true);
      
      // Fetch data sources with search and filter params
      const sourcesRes = await fetch(`/api/data-inventory/sources?organizationId=${orgId}&search=${encodeURIComponent(searchTerm)}&status=${filterStatus}`);
      const sources = await sourcesRes.json();
      setDataSources(sources);
      
      // Fetch data assets with search and filter params
      const assetsRes = await fetch(`/api/data-inventory/assets?organizationId=${orgId}&search=${encodeURIComponent(searchTerm)}&category=${filterStatus}`);
      const assets = await assetsRes.json();
      setDataAssets(assets);
      
      // Fetch data flows with search and filter params
      const flowsRes = await fetch(`/api/data-inventory/flows?organizationId=${orgId}&search=${encodeURIComponent(searchTerm)}&frequency=${filterStatus}`);
      const flows = await flowsRes.json();
      setDataFlows(flows);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterStatus]);
  
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }
    
    // Get organization ID from query params or default
    const orgId = searchParams?.get('orgId') || 'default-org-id';
    setOrganizationId(orgId);
    
    // Fetch data
    fetchData(orgId);
  }, [session, status, router, searchParams, fetchData]);
  
  // Refetch data when search term or filter changes
  useEffect(() => {
    if (organizationId) {
      fetchData(organizationId);
    }
  }, [searchTerm, filterStatus, organizationId, fetchData]);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Add a small delay to show the refresh animation
    await new Promise(resolve => setTimeout(resolve, 500));
    await fetchData(organizationId);
    setIsRefreshing(false);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'personal': return 'bg-blue-100 text-blue-800';
      case 'financial': return 'bg-yellow-100 text-yellow-800';
      case 'sensitive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!session) {
    return null;
  }
  
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Data Inventory</h1>
            <p className="text-gray-600">Manage and monitor your organization&apos;s data assets</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <FiRefreshCw className={`mr-1 sm:mr-2 ${isRefreshing ? 'animate-spin' : ''}`} /> 
              <span className="hidden xs:inline">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
            <button className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FiPlus className="mr-1 sm:mr-2" /> 
              <span className="hidden xs:inline">Add New</span>
            </button>
          </div>
        </div>
        
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'sources' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('sources')}
          >
            Data Sources
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'assets' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('assets')}
          >
            Data Assets
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'flows' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('flows')}
          >
            Data Flows
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('sources')}>
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <FiDatabase size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Data Sources</p>
                  <p className="text-2xl font-semibold text-gray-900">{dataSources.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('assets')}>
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-50 text-green-600">
                  <FiFile size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Data Assets</p>
                  <p className="text-2xl font-semibold text-gray-900">{dataAssets.length}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center text-sm gap-2">
                <span className="text-blue-600 font-medium">{dataAssets.filter(a => a.category === 'personal').length} personal</span>
                <span className="text-gray-300">•</span>
                <span className="text-yellow-600 font-medium">{dataAssets.filter(a => a.category === 'financial').length} financial</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Data Flows</p>
                  <p className="text-2xl font-bold text-purple-600">{dataFlows.length}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <FiArrowRight className="text-purple-600 text-xl" />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center text-sm gap-2">
                <span className="text-green-600 font-medium">3 real-time</span>
                <span className="text-gray-300">•</span>
                <span className="text-blue-600 font-medium">1 batch</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FiDatabase className="mr-2 text-blue-500" /> Data Sources by Type
                </h2>
              </div>
              <div className="p-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {sourceTypeData.map((entry, index) => (
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
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FiFile className="mr-2 text-green-500" /> Data Assets by Type
                </h2>
              </div>
              <div className="p-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assetTypeData}>
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
                    <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FiGitBranch className="mr-2 text-purple-500" /> Data Flows
                </h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search flows..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Frequencies</option>
                    <option value="real_time">Real-time</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
              <div className="p-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={flowTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {flowTypeData.map((entry, index) => (
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
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FiFile className="mr-2 text-yellow-500" /> Data Assets by Category
                </h2>
              </div>
              <div className="p-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assetCategoryData}>
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
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {assetCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <FiDatabase className="mr-2 text-blue-500" /> Data Growth Over Time
              </h2>
            </div>
            <div className="p-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px', 
                      border: '1px solid #e5e7eb' 
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="sources" name="Sources" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="assets" name="Assets" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="flows" name="Flows" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FiDatabase className="mr-2 text-blue-500" /> Data Sources
                </h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search sources..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="error">Error</option>
                  </select>
                </div>
              </div>
              <div className="p-6">
                {dataSources.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dataSources.map((source) => (
                          <tr key={source.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => console.log('View source details:', source.id)}>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{source.name}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{source.type.replace('_', ' ')}</td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(source.status)}`}>
                                {source.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <button 
                                  className="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded hover:bg-blue-50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Edit source:', source.id);
                                  }}
                                >
                                  <FiEdit />
                                </button>
                                <button 
                                  className="text-red-600 hover:text-red-900 transition-colors p-1 rounded hover:bg-red-50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Delete source:', source.id);
                                  }}
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FiDatabase className="mx-auto text-gray-400 text-2xl" />
                    <p className="mt-2 text-gray-500">No data sources found</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FiFile className="mr-2 text-green-500" /> Recent Data Assets
                </h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search assets..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="personal">Personal</option>
                    <option value="financial">Financial</option>
                    <option value="sensitive">Sensitive</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="p-6">
                {dataAssets.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dataAssets.slice(0, 5).map((asset) => (
                          <tr key={asset.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => console.log('View asset details:', asset.id)}>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.name}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{asset.type.replace('_', ' ')}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(asset.category || 'other')}`}>
                                {asset.category || 'Uncategorized'}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <button 
                                  className="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded hover:bg-blue-50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Edit asset:', asset.id);
                                  }}
                                >
                                  <FiEdit />
                                </button>
                                <button 
                                  className="text-red-600 hover:text-red-900 transition-colors p-1 rounded hover:bg-red-50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Delete asset:', asset.id);
                                  }}
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FiFile className="mx-auto text-gray-400 text-2xl" />
                    <p className="mt-2 text-gray-500">No data assets found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <FiArrowRight className="mr-2 text-purple-500" /> Data Flow Visualization
              </h2>
            </div>
            <div className="p-6">
              {dataFlows.length > 0 ? (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md mb-4">
                      <FiArrowRight className="text-purple-600 text-2xl" />
                    </div>
                    <p className="text-gray-600">Data flow visualization would appear here</p>
                    <p className="text-sm text-gray-500 mt-1">Interactive diagram showing data movement between sources</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiArrowRight className="mx-auto text-gray-400 text-2xl" />
                  <p className="mt-2 text-gray-500">No data flows to visualize</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
