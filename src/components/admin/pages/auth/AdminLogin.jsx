import AdminLoginForm from "./AdminLoginForm";

export default function AdminLogin() {
    return (
        <div className="flex justify-center items-center h-screen">
        <div className="mx-auto w-full max-w-md">
            <div className="text-center my-2 mt-10">
                <h3 className="text-slate-700 font-prata font-normal text-2xl sm:text-3xl">Admin Login</h3>
            </div>
            <div>
               <AdminLoginForm/>
            </div>
        </div>
        </div>
    )
}