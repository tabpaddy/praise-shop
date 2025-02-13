import Header from "./header/Header";
import EditProduct from "./mainBar/product/EditProduct";
import SideBar from "./sideBar/SideBar";

export default function AdminEditProduct() {
     return (
        <div className="h-screen flex bg-slate-200">
          {/* Sidebar */}
          <SideBar />
    
          {/* Main Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <Header />
    
            {/* Main Content */}
            <EditProduct />
          </div>
        </div>
      );
}