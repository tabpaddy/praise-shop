import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../../context/AdminContext";
import DeleteAdminModel from "./DeleteAdminModal";
import api from "../../../../../axiosInstance/api";

export default function ManageAdmin() {
  const [manageAdmin, setManageAdmin] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(null); //store admin id
  const [selectedAdminName, setSelectedAdminName] = useState(null); //store admin name

  const { admin } = useContext(AdminContext);

  const fetchAdminData = async () => {
    try {
      const response = await api.get("/api/admin/sub-admin", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin?.adminToken}`,
        },
      });
      //console.log(response.data.subAdmin)
      setManageAdmin(response.data.subAdmin); // get all the subadmin
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [admin.adminToken]); // Dependancy array

  if (!admin || !admin.adminToken) {
    console.error("Admin token is missing or invalid");
    return;
  }

  const deleteAdminModelClick = (id) => {
    setSelectedAdminId(id[0]);
    setSelectedAdminName(id[1]);
    setDeleteModal(true);
  };
  return (
    <div className="overflow-y-auto bg-slate-200 font-outfit p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-8">Manage Admin</h1>
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
                    email
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Array.isArray(manageAdmin) && manageAdmin.length > 0 ? (
                  manageAdmin.map((admin, index) => {
                    return (
                      <tr
                        key={admin.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {admin.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {admin.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-slate-700">
                          <button
                            className="text-red-500 hover:text-red-800"
                            onClick={() =>
                              deleteAdminModelClick([admin.id, admin.name])
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={"6"}
                      className="text-center py-4 text-slate-600"
                    >
                      No admin available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DeleteAdminModel
        modalOpen={deleteModal}
        modalClose={() => setDeleteModal(false)}
        adminId={selectedAdminId}
        adminName={selectedAdminName}
        refreshAdmin={fetchAdminData()}
      />
    </div>
  );
}
