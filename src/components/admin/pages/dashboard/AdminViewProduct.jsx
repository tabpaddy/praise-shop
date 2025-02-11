import Header from "./header/Header";
import ViewProduct from "./mainBar/product/ViewProduct";
import SideBar from "./sideBar/SideBar";

export default function AdminViewProduct(){
    return (
        <div className="h-screen flex bg-slate-200">
              {/* Sidebar */}
              <SideBar />
        
              {/* Main Area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <Header />
        
                {/* Main Content */}
                <ViewProduct />
              </div>
            </div>
    )
}