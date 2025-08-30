'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DataInventoryDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [organizationId, setOrganizationId] = useState('');
  const [dataSources, setDataSources] = useState<any[]>([]);
  const [dataAssets, setDataAssets] = useState<any[]>([]);
  const [dataFlows, setDataFlows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
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
  }, [session, status, router, searchParams]);
  
  const fetchData = async (orgId: string) => {
    try {
      setLoading(true);
      
      // Fetch data sources
      const sourcesRes = await fetch(`/api/data-inventory/sources?organizationId=${orgId}`);
      const sources = await sourcesRes.json();
      setDataSources(sources);
      
      // Fetch data assets
      const assetsRes = await fetch(`/api/data-inventory/assets?organizationId=${orgId}`);
      const assets = await assetsRes.json();
      setDataAssets(assets);
      
      // Fetch data flows
      const flowsRes = await fetch(`/api/data-inventory/flows?organizationId=${orgId}`);
      const flows = await flowsRes.json();
      setDataFlows(flows);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (status === 'loading') {
    return <div className="p-8">Loading...</div>;
  }
  
  if (!session) {
    return null;
  }
  
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Inventory</h1>
        <p className="text-gray-600">Manage and monitor your organization&apos;s data assets</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Data Sources</h3>
            <p className="text-3xl font-bold text-blue-600">{dataSources.length}</p>
            <p className="text-gray-600">Connected sources</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Data Assets</h3>
            <p className="text-3xl font-bold text-green-600">{dataAssets.length}</p>
            <p className="text-gray-600">Identified assets</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Data Flows</h3>
            <p className="text-3xl font-bold text-purple-600">{dataFlows.length}</p>
            <p className="text-gray-600">Active flows</p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Data Sources</h2>
          </div>
          <div className="p-6">
            {dataSources.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dataSources.map((source) => (
                      <tr key={source.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{source.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{source.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${source.status === 'active' ? 'bg-green-100 text-green-800' : 
                              source.status === 'error' ? 'bg-red-100 text-red-800' : 
                              'bg-gray-100 text-gray-800'}`}>
                            {source.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No data sources found</p>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Data Assets</h2>
          </div>
          <div className="p-6">
            {dataAssets.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dataAssets.slice(0, 5).map((asset) => (
                      <tr key={asset.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {asset.category || 'Uncategorized'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No data assets found</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Data Flow Visualization</h2>
        </div>
        <div className="p-6">
          {dataFlows.length > 0 ? (
            <div className="bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center">
              <p className="text-gray-500">Data flow visualization would appear here</p>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No data flows to visualize</p>
          )}
        </div>
      </div>
    </div>
  );
}
