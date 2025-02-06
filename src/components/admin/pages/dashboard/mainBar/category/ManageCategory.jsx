import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../../context/AdminContext";
import axios from "axios";
import DeleteCategoryModal from "./DeleteCategoryModal";
import EditCategory from "./EditCategory";

export default function ManageCategory() {
  const [manageCategory, setManageCategory] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState(null);

  const { admin } = useContext(AdminContext);

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/manage-category",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin.adminToken}`,
          },
        }
      );
      //console.log(response.data.categories);
      setManageCategory(response.data.categories); // get all the categories
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
    fetchCategoryData();
  }, []);

  if (!admin || !admin.adminToken) {
    console.error("admin token is missing");
    return;
  }

  const editCategoryModelClick = (id) => {
    setSelectedCategoryId(id[0]);
    setSelectedCategoryTitle(id[1]);
    setEditModal(true);
  };

  const deleteCategoryModelClick = (id) => {
    setSelectedCategoryId(id[0]);
    setSelectedCategoryTitle(id[1]);
    setDeleteModal(true);
  };

  return (
    <div className="overflow-y-auto bg-slate-200 font-outfit p-6 min-h-screen ">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-8">
          Manage Categories
        </h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  S/N
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Array.isArray(manageCategory) && manageCategory.length > 0 ? (
                manageCategory.map((category, index) => {
                  return (
                    <tr
                      key={category.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {category.category_title}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700 flex gap-10 justify-center">
                        <button
                          className="text-blue-500 hover:text-blue-800"
                          onClick={() =>
                            editCategoryModelClick([
                              category.id,
                              category.category_title,
                            ])
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:text-red-800"
                          onClick={() =>
                            deleteCategoryModelClick([
                              category.id,
                              category.category_title,
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
                  <td colSpan={"6"} className="text-center py-4 text-slate-600">
                    No categories available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteCategoryModal
        modalOpen={deleteModal}
        modalClose={() => setDeleteModal(false)}
        categoryId={selectedCategoryId}
        categoryName={selectedCategoryTitle}
        refreshCategory={fetchCategoryData()}
      />

      <EditCategory
        modalOpen={editModal}
        modalClose={() => setEditModal(false)}
        categoryId={selectedCategoryId}
        categoryName={selectedCategoryTitle}
        refreshCategory={fetchCategoryData()}
      />
    </div>
  );
}
