import SideBar from "./sideBar/SideBar";
import Header from "./header/Header";
import ManageSubCategory from "./mainBar/subCategory/ManageSubCategory";

export default function AdminManageSubCategory() {
  return (
    <div className="h-screen flex bg-slate-200">
      {/* sidebar */}
      <SideBar />

      {/* main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* header */}
        <Header />

        {/* main content */}
        <ManageSubCategory />
      </div>
    </div>
  );
}
