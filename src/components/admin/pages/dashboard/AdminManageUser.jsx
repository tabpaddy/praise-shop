import Header from "./header/Header";
import ManageUser from "./mainBar/user/ManageUser";
import SideBar from "./sideBar/SideBar";

export default function AdminManageUser() {
    return (
        <div className="h-screen flex bg-white">
                      {/* Sidebar */}
                      <SideBar />
                
                      {/* Main Area */}
                      <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Header */}
                        <Header />
                
                        {/* Main Content */}
                        <ManageUser />
                      </div>
                    </div>
    )}
        