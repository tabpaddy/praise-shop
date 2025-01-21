import Header from "./header/Header";
import MainBar from "./mainBar/MainBar";
import SideBar from "./sideBar/SideBar";

export default function AdminDashboard() {
  return (
    <div className="h-screen flex bg-white">
      {/* Sidebar */}
      <SideBar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <MainBar />
      </div>
    </div>
  );
}
