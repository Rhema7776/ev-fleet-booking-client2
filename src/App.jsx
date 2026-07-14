import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import FleetOwners from "./pages/FleetOwners";
import Bookings from "./pages/Bookings";
import Agents from "./pages/Agents";
import Settings from "./pages/Settings";
import Vehicles from "./pages/Vehicles";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/app/fleet-owners" element={<FleetOwners />} />
                <Route path="/app/vehicles" element={<Vehicles />} />
                <Route path="/app/bookings" element={<Bookings />} />
                <Route path="/app/agents" element={<Agents />} />
                <Route path="/app/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />

            </Routes>

        </BrowserRouter>

    );

}

export default App;