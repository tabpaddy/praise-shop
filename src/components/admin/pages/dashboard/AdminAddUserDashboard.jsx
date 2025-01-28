import Header from "./header/Header";
import UserBar from "./mainBar/user/UserBar";
import SideBar from "./sideBar/SideBar";

export default function AdminAddUserDashboard() {
  return (
    <div className="h-screen flex bg-slate-200">
      {/* Sidebar */}
      <SideBar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <UserBar />
      </div>
    </div>
  );
}
