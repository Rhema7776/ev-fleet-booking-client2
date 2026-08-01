import { Bell } from "lucide-react";

function Navbar() {
  return (
    <header className="bg-white border-b h-20 flex items-center justify-between px-8">

      <div>

        <h2 className="text-xl font-semibold">
          Dashboard
        </h2>

      </div>

      <div className="flex items-center gap-6">

        <Bell
          className="cursor-pointer"
          size={22}
        />

        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">

          RC

        </div>

      </div>

    </header>
  );
}

export default Navbar;