'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ComplianceReports() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [reports, setReports] = useState<any[]>([
    {
      id: 1,
      name: 'GDPR Compliance Report',
      generated: '2023-05-15',
      status: 'Completed',
      format: 'PDF',
    },
    {
      id: 2,
      name: 'CCPA Compliance Report',
      generated: '2023-05-10',
      status: 'Completed',
      format: 'PDF',
    },
    {
      id: 3,
      name: 'Data Inventory Report',
      generated: '2023-05-05',
      status: 'Completed',
      format: 'CSV',
    },
    {
      id: 4,
      name: 'DSR Processing Report',
      generated: '2023-04-28',
      status: 'Completed',
      format: 'PDF',
    },
  ]);
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }
    
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [session, status, router]);
  
  if (status === 'loading') {
    return <div className="p-8">Loading...</div>;
  }
  
  if (!session) {
    return null;
  }
  
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Reports</h1>
        <p className="text-gray-600">Generate and manage compliance reports for your organization</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Generated Reports</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Generate New Report
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.generated}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.format}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Download</button>
                      <button className="text-green-600 hover:text-green-900 mr-3">View</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{reports.length}</span> of{' '}
                <span className="font-medium">{reports.length}</span> results
              </div>
              <div className="flex space-x-2">
                <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Generate Custom Report</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Data Inventory</option>
                <option>Consent Management</option>
                <option>DSR Processing</option>
                <option>Vendor Compliance</option>
                <option>Custom Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input 
                    type="date" 
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input 
                    type="date" 
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input type="radio" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" name="format" defaultChecked />
                  <span className="ml-2 text-gray-700">PDF</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" name="format" />
                  <span className="ml-2 text-gray-700">CSV</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" name="format" />
                  <span className="ml-2 text-gray-700">Excel</span>
                </label>
              </div>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Generate Report
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Scheduled Reports</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <h4 className="font-medium text-gray-900">Monthly Compliance Summary</h4>
                <p className="text-sm text-gray-500">Generated on 1st of every month</p>
              </div>
              <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">Edit</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <h4 className="font-medium text-gray-900">Quarterly Data Inventory</h4>
                <p className="text-sm text-gray-500">Generated every 3 months</p>
              </div>
              <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">Edit</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <h4 className="font-medium text-gray-900">Weekly DSR Report</h4>
                <p className="text-sm text-gray-500">Generated every Monday</p>
              </div>
              <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">Edit</button>
            </div>
            <button className="w-full border-2 border-dashed border-gray-300 rounded-md p-4 text-center text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
              + Add Scheduled Report
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Score Trends</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Compliance score trend visualization would appear here</p>
        </div>
      </div>
    </div>
  );
}
