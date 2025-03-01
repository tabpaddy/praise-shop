import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../../context/AdminContext";
import DeleteUserModal from "./DeleteUserModal";
import api from "../../../../../axiosInstance/api";

export default function ManageUser() {
  const [manageUser, setManageUser] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // Store the user ID
  const [selectedUserName, setSelectedUserName] = useState(null);

  const { admin } = useContext(AdminContext);

  // Sample data for demonstration
  // const users = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "john@example.com",
  //     ipAddress: "192.168.1.1",
  //     dateCreated: "2023-10-01",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     email: "jane@example.com",
  //     ipAddress: "192.168.1.2",
  //     dateCreated: "2023-10-02",
  //   },
  //   {
  //     id: 3,
  //     name: "Alice Johnson",
  //     email: "alice@example.com",
  //     ipAddress: "192.168.1.3",
  //     dateCreated: "2023-10-03",
  //   },
  // ];

  const fetchUserData = async () => {
    try {
      const response = await api.get("/api/admin/manage-user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin?.adminToken}`, // Ensure adminToken exists
        },
      });
      setManageUser(response.data.users); // Assuming users is an array
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [admin?.adminToken]); // Dependency array

  if (!admin || !admin.adminToken) {
    console.error("Admin token is missing or invalid");
    return;
  }

  const deleteUserModelClick = (id) => {
    setSelectedUserId(id[0]); // Set the selected user ID
    setSelectedUserName(id[1]); // set the selected user name
    setDeleteModal(true); // Open the modal
  };

  return (
    <div className="overflow-y-auto bg-slate-100 font-outfit p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-8">Manage Users</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    S/N
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Date Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Array.isArray(manageUser) && manageUser.length > 0 ? (
                  manageUser.map((user, index) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {user.ip_address || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {user.created_at || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-center">
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() =>
                            deleteUserModelClick([user.id, user.name])
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-slate-600">
                      No user available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* import and use the DeleteUserModal */}
      <DeleteUserModal
        modalOpen={deleteModal}
        modalClose={() => setDeleteModal(false)}
        userId={selectedUserId}
        userName={selectedUserName}
        refreshUsers={fetchUserData()}
      />
    </div>
  );
}
