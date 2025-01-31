import SideBar from "./sideBar/SideBar";
import Header from "./header/Header"
import AddCategory from "./mainBar/category/AddCategory"

export default function AdminAddCategory(){
    return(
        <div className="h-screen flex bg-slate-200">
            {/* sidebar */}
            <SideBar/>

            {/* main Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* header */}
                <Header/>

                {/* main content */}
                <AddCategory/>
            </div>
        </div>
    )
}