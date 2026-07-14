import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function AppLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex flex-col flex-1">

                <Navbar />

                <main className="flex-1 p-8">

                    {children}

                </main>

            </div>

        </div>
    );
}

export default AppLayout;