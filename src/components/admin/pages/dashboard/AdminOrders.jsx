import Header from "./header/Header";
import Orders from "./mainBar/order/Orders";
import SideBar from "./sideBar/SideBar";

export default function AdminOrders() {
  return (
    <div className="h-screen flex bg-white">
      {/* Sidebar */}
      <SideBar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <Orders />
      </div>
    </div>
  );
}
