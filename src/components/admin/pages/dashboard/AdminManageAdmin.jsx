import Header from "./header/Header";
import ManageAdmin from "./mainBar/admin/ManageAdmin";
import SideBar from "./sideBar/SideBar";

export default function AdminManageAdmin() {
  return (
    <div className="h-screen flex bg-white">
      {/* Sidebar */}
      <SideBar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <ManageAdmin />
      </div>
    </div>
  );
}
