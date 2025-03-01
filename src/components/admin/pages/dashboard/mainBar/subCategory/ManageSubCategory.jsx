import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../../context/AdminContext";
import DeleteSubCategoryModal from "./DeleteSubCategory";
import EditSubCategory from "./EditSubCategory";
import api from "../../../../../axiosInstance/api";

export default function ManageSubCategory() {
  const [manageSubCategory, setManageSubCategory] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [selectedSubCategoryTitle, setSelectedSubCategoryTitle] =
    useState(null);

  const { admin } = useContext(AdminContext);

  const fetchSubCategoryData = async () => {
    try {
      const response = await api.get("/api/admin/manage-sub-category", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin.adminToken}`,
        },
      });

      //console.log(response.data.sub_categories);
      setManageSubCategory(response.data.sub_categories); // get all the categories
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error(
          "Error fetching categories:",
          error.response.data || error.message
        );
      } else {
        console.error("getting category failed:", error);
      }
    }
  };

  useEffect(() => {
    fetchSubCategoryData();
  }, [admin.adminToken]);

  if (!admin || !admin.adminToken) {
    console.error("admin token is missing");
    return;
  }

  const editSubCategoryModelClick = (id) => {
    setSelectedSubCategoryId(id[0]);
    setSelectedSubCategoryTitle(id[1]);
    setEditModal(true);
  };

  const deleteSubCategoryModelClick = (id) => {
    setSelectedSubCategoryId(id[0]);
    setSelectedSubCategoryTitle(id[1]);
    setDeleteModal(true);
  };
  return (
    <div className="overflow-y-auto bg-slate-200 font-outfit p-6 min-h-screen ">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-8">
          Manage SubCategories
        </h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    S/N
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    SubCategory
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Array.isArray(manageSubCategory) &&
                manageSubCategory.length > 0 ? (
                  manageSubCategory.map((subCategory, index) => {
                    return (
                      <tr
                        key={subCategory.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {subCategory.sub_category_title}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700 flex gap-10 justify-center">
                          <button
                            className="text-blue-500 hover:text-blue-800"
                            onClick={() =>
                              editSubCategoryModelClick([
                                subCategory.id,
                                subCategory.sub_category_title,
                              ])
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-500 hover:text-red-800"
                            onClick={() =>
                              deleteSubCategoryModelClick([
                                subCategory.id,
                                subCategory.sub_category_title,
                              ])
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
                      No subCategories available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DeleteSubCategoryModal
        modalOpen={deleteModal}
        modalClose={() => setDeleteModal(false)}
        subCategoryId={selectedSubCategoryId}
        subCategoryName={selectedSubCategoryTitle}
        refreshSubCategory={fetchSubCategoryData}
      />

      <EditSubCategory
        modalOpen={editModal}
        modalClose={() => setEditModal(false)}
        subCategoryId={selectedSubCategoryId}
        subCategoryName={selectedSubCategoryTitle}
        refreshSubCategory={fetchSubCategoryData}
      />
    </div>
  );
}
