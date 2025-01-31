import Header from "./header/Header";
import ManageCategory from "./mainBar/category/ManageCategory";
import SideBar from "./sideBar/SideBar";

export default function AdminManageCategory(){
    return (
        <div className="h-screen flex bg-slate-200">
            {/* sidebar */}
            < SideBar/>

            {/* main area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* header */}
                <Header/>

                {/* Main content */}
                <ManageCategory/>
            </div>
        </div>
    )
}