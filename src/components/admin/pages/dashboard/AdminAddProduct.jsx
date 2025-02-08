import Header from "./header/Header";
import AddProduct from "./mainBar/product/AddProduct";
import SideBar from "./sideBar/SideBar";

export default function AdminAddProduct() {
  return (
    <div className="h-screen flex bg-slate-200">
      {/* Sidebar */}
      <SideBar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <AddProduct />
      </div>
    </div>
  );
}
