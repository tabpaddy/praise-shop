import SideBar from "./sideBar/SideBar";
import Header from "./header/Header";
import AddSubCategory from "./mainBar/subCategory/AddSubCategory";

export default function AdminAddSubCategory() {
  return (
    <div className="h-screen flex bg-slate-200">
      {/* sidebar */}
      <SideBar />

      {/* main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* header */}
        <Header />

        {/* main content */}
        <AddSubCategory />
      </div>
    </div>
  );
}
