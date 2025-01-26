import axios from "axios";
import { useEffect } from "react";

export default function ManageUser() {
  // Sample data for demonstration
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", ipAddress: "192.168.1.1", dateCreated: "2023-10-01" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", ipAddress: "192.168.1.2", dateCreated: "2023-10-02" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", ipAddress: "192.168.1.3", dateCreated: "2023-10-03" },
  ];

  // useEffect(() => {
  //   const fetchUserData = async axios.get('',)
  // })

  return (
    <div className="overflow-y-auto bg-slate-100 font-outfit p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-8">Manage Users</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">S/N</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-700">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{user.ipAddress}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{user.dateCreated}</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}