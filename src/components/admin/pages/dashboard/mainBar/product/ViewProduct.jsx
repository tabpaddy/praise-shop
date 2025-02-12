import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../../../context/AdminContext";
import axios from "axios";
import DeleteProduct from "./DeleteProduct";
import { Link } from "react-router-dom";

export default function ViewProduct() {
  const [manageProduct, setManageProduct] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState(null);

  const { admin } = useContext(AdminContext);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/manage-product",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin.adminToken}`,
          },
        }
      );
      //console.log(response.data.product);
      setManageProduct(response.data.product);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error(
          "Error fetching products:",
          error.response.data || error.message
        );
      } else {
        console.error("getting product failed:", error);
      }
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [admin.adminToken]);

  const deleteProductModelClick = (id) => {
    setSelectedProductId(id[0]);
    setSelectedProductName(id[1]);
    setDeleteModal(true);
  };

  return (
    <div className="overflow-y-auto bg-slate-200 font-outfit p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-8">
          Manage Products
        </h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    S/N
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Keyword
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Sub-Category
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Sizes
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    bestSeller
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Image1
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Image2
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Image3
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Image4
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Image5
                  </th>
                  <th className="px-6 py-3 text-center text-sx font-medium text-slate-500 uppercase tracking-wider">
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Array.isArray(manageProduct) && manageProduct.length > 0 ? (
                  manageProduct.map((product, index) => {
                    return (
                      <tr
                        key={product.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {product.description}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {product.keyword}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {product.price}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {product.category.category_title}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {product.sub_category.sub_category_title}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {product.price}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {product.bestseller ? "True" : "False"}
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          <img className="object-contain shadow-md rounded-md w-full" src={product.image1_url} alt={product.name} />
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          <img className="object-contain shadow-md rounded-md w-full" src={product.image2_url} alt={product.name} />
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          <img className="object-contain shadow-md rounded-md w-full" src={product.image3_url} alt={product.name} />
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          <img className="object-contain shadow-md rounded-md w-full" src={product.image4_url} alt={product.name} />
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          <img className="object-contain shadow-md rounded-md w-full" src={product.image5_url} alt={product.name} />
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          <div className="flex gap-10 justify-center">
                            <Link
                              to={`edit-product/${product.id}`}
                              className="text-blue-500 hover:text-blue-800"
                            >
                              Edit
                            </Link>
                            <button
                              className="text-red-500 hover:text-red-800"
                              onClick={() =>
                                deleteProductModelClick([
                                  product.id,
                                  product.name,
                                ])
                              }
                            >
                              Delete
                            </button>
                          </div>
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
                      No Products available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DeleteProduct
        modalOpen={deleteModal}
        modalClose={() => setDeleteModal(false)}
        productId={selectedProductId}
        productName={selectedProductName}
        refreshProduct={fetchProductData}
      />
    </div>
  );
}
