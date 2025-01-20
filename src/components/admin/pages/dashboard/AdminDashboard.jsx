import MainBar from "./mainBar/MainBar";
import SideBar from "./sideBar/SideBar";

export default function AdminDashboard() {
    return (
        <div className="flex ">
            <div>
                <SideBar/>
            </div>
            <div>
                <MainBar/>
            </div>
        </div>
    )
}