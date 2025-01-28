import Header from "./header/Header";
import AddAdmin from "./mainBar/admin/AddAdmin";
import SideBar from "./sideBar/SideBar";

export default function AdminAddAdmin() {
    return (
        <div className="h-screen flex bg-slate-200">
              {/* Sidebar */}
              <SideBar />
        
              {/* Main Area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <Header />
        
                {/* Main Content */}
                <AddAdmin />
              </div>
            </div>
    )
}