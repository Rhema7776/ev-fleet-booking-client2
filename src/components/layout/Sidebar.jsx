import { NavLink } from "react-router-dom";
import navigation from "../../data/navigation";


function Sidebar() {

    return (

        <aside className="w-72 bg-slate-900 text-white flex flex-col">

            <div className="h-20 flex items-center px-8 border-b border-slate-800">

                <h1 className="text-2xl font-bold">

                    EV Fleet

                </h1>

            </div>

            <nav className="flex-1 mt-8">

                {navigation.map((item) => {

                    const Icon = item.icon;

                    return (
                      <NavLink
                          key={item.title}
                          to={item.path}
                          className={({ isActive }) =>
                              `mx-4 mb-2 flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                                  isActive
                                      ? "bg-blue-600 text-white"
                                      : "hover:bg-slate-800"
                              }`
                          }
                      >
                          <Icon size={22} />

                          <span>{item.title}</span>
                      </NavLink>

                        

                    );

                })}

            </nav>

        </aside>

    );

}

export default Sidebar;