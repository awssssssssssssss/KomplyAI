'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function VendorManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [vendors, setVendors] = useState<any[]>([
    {
      id: 1,
      name: 'Cloud Storage Provider',
      category: 'Infrastructure',
      status: 'Compliant',
      lastAssessment: '2023-05-15',
      nextReview: '2023-11-15',
    },
    {
      id: 2,
      name: 'Email Marketing Service',
      category: 'Marketing',
      status: 'Pending Review',
      lastAssessment: '2023-03-22',
      nextReview: '2023-09-22',
    },
    {
      id: 3,
      name: 'Payment Processor',
      category: 'Financial',
      status: 'Compliant',
      lastAssessment: '2023-04-10',
      nextReview: '2023-10-10',
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Management</h1>
        <p className="text-gray-600">Manage third-party vendors and assess their compliance</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Vendor List</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Add Vendor
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Assessment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Review</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vendors.map((vendor) => (
                  <tr key={vendor.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vendor.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${vendor.status === 'Compliant' ? 'bg-green-100 text-green-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {vendor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.lastAssessment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.nextReview}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900 mr-3">Assess</button>
                      <button className="text-red-600 hover:text-red-900">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{vendors.length}</span> of{' '}
                <span className="font-medium">{vendors.length}</span> results
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
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Vendor Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total Vendors</span>
              <span className="text-2xl font-bold text-gray-900">24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Compliant Vendors</span>
              <span className="text-2xl font-bold text-green-600">18</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Pending Review</span>
              <span className="text-2xl font-bold text-yellow-600">6</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Non-Compliant</span>
              <span className="text-2xl font-bold text-red-600">0</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Reviews</h3>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200">
              <li className="py-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">Email Marketing Service</p>
                    <p className="text-sm text-gray-500 truncate">Review due in 15 days</p>
                  </div>
                </div>
              </li>
              <li className="py-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">Analytics Provider</p>
                    <p className="text-sm text-gray-500 truncate">Review due in 32 days</p>
                  </div>
                </div>
              </li>
              <li className="py-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">Cloud Storage Provider</p>
                    <p className="text-sm text-gray-500 truncate">Review due in 180 days</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Assessment Templates</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
              <h4 className="font-medium text-gray-900">GDPR Compliance Checklist</h4>
              <p className="text-sm text-gray-500">24 questions</p>
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
              <h4 className="font-medium text-gray-900">CCPA Vendor Assessment</h4>
              <p className="text-sm text-gray-500">18 questions</p>
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
              <h4 className="font-medium text-gray-900">Custom Assessment</h4>
              <p className="text-sm text-gray-500">Create your own template</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
