import { Bell, Plus, ChevronRight, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";

import walletCarImg from "@/assets/images/wallet-car.svg";
import cyanDesignImg from "@/assets/images/cyan-design.svg";
import walletCarAndCard1Img from "@/assets/images/wallet-carandcard1.svg";
import walletCarAndCard2Img from "@/assets/images/wallet-carandcard2.svg";
import emptyBookingCardsImg from "@/assets/images/emptybooking-cards.svg";

import { getCurrentUser } from "@/services/auth/authService";
import LogoutButton from "@/components/auth/LogoutButton";

// ---- Mock data, matching the shape a real trips/bookings API would
// return. Still placeholder — no such endpoint exists on the backend
// yet, same honest flag as Fleet.tsx's vehicle data. Shaped so swapping
// in real data later is a matter of replacing these two arrays and the
// balance value, not restructuring the page.
interface ActiveTrip {
  id: number;
  vehicleName: string;
  timeRemaining: string;
  status: "Ongoing" | "Upcoming";
}

interface RecentBooking {
  id: number;
  route: string;
  duration: string;
  price: string;
  date: string;
  status: "Dedicated" | "Regular" | "Reserved";
}

const MOCK_LEASE_BALANCE = 600000;

const MOCK_TRIPS: ActiveTrip[] = [{ id: 1, vehicleName: "Vehicle EV-204", timeRemaining: "5h remaining", status: "Ongoing" }];

const MOCK_BOOKINGS: RecentBooking[] = [
  { id: 1, route: "Lekki - Ikoyi", duration: "2 Hours", price: "N15,500", date: "4 August", status: "Dedicated" },
  { id: 2, route: "Ikoyi - Victoria Island", duration: "3 Hours", price: "N28,750", date: "28 May", status: "Regular" },
  { id: 3, route: "Ikoyi - Lekki", duration: "4 Hours", price: "N45,200", date: "19 June", status: "Reserved" },
  { id: 4, route: "Lekki - Victoria Island", duration: "5 Hours", price: "N39,900", date: "12 June", status: "Regular" },
];

const STATUS_STYLE: Record<RecentBooking["status"], { dot: string; text: string }> = {
  Dedicated: { dot: "bg-orange-500", text: "text-orange-600" },
  Regular: { dot: "bg-gray-400", text: "text-gray-500" },
  Reserved: { dot: "bg-blue-500", text: "text-blue-600" },
};

function formatNaira(n: number) {
  return `N${n.toLocaleString("en-NG")}`;
}

export default function Home() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const fullName = user?.fullName || "Partner";

  const initials = fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const hasActivity = MOCK_TRIPS.length > 0 || MOCK_BOOKINGS.length > 0;

  return (
    <div className="min-h-screen bg-gray-100 max-w-md mx-auto px-5 pb-28 overflow-x-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-1 pt-2 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-gray-700">{initials}</span>
          </div>

          <div>
            <p className="text-xs text-gray-500 leading-tight">Good morning,</p>

            <p className="text-sm font-bold text-gray-900 leading-tight">{fullName}</p>
          </div>
        </div>

      <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Notifications"
            className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <Bell className=" text-gray-900" />
          </button>
          <LogoutButton />
          
        </div>
      </div>

      {/* Lease balance card */}
      <div className="flex items-stretch gap-2 mb-4 overflow-hidden">
        <div className="relative flex-1 overflow-hidden rounded-3xl bg-[#0B2B21] px-5 pt-5 pb-4 min-w-0">
          <img
            src={walletCarAndCard1Img}
            alt=""
            className="pointer-events-none select-none absolute -right-6 top-1/2 -translate-y-1/2 w-40 opacity-90"
          />

          <div className="relative flex items-start justify-between">
            <p className="text-sm text-white/80">Your lease hour balance</p>
            <button
              type="button"
              aria-label="Add lease hours"
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0"
            >
              <Plus className="w-4 h-4 text-gray-900" />
            </button>
          </div>

          <p className="relative text-4xl font-extrabold text-[#B9F6CA] mt-2 mb-8">
            {formatNaira(MOCK_LEASE_BALANCE)}
          </p>

          <button
            type="button"
            onClick={() => navigate("/booking")}
            className="relative w-full rounded-full bg-[#E3FBEA] text-gray-900 font-semibold text-sm py-3.5"
          >
            New booking request
          </button>
        </div>
      </div>

      {hasActivity ? (
        <>
          {/* Trips */}
          {MOCK_TRIPS.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2 px-1">
                <p className="text-sm font-bold text-gray-900">Trips</p>
                <button className="text-xs font-semibold text-emerald-600">See all</button>
              </div>

              {MOCK_TRIPS.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white rounded-2xl p-3 flex items-center gap-3 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <Car className="w-4 h-4 text-gray-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">{trip.timeRemaining}</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {trip.vehicleName}
                    </p>
                  </div>

                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 rounded-full px-2.5 py-1 shrink-0">
                    {trip.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Dedicated car promo banner */}
          <div className="relative overflow-hidden rounded-3xl bg-[#B3261E] px-5 pt-5 pb-4 mb-4">
            <p className="relative text-white font-bold text-lg leading-snug max-w-[75%]">
              Own a car for as long as you want.
            </p>

            <button
              type="button"
              className="relative mt-3 rounded-full bg-gray-900 text-white text-sm font-semibold px-4 py-2.5"
            >
              Get a dedicated car
            </button>
          </div>

          {/* Recent Bookings */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2 px-1">
              <p className="text-sm font-bold text-gray-900">Recent Bookings</p>
              <button className="text-xs font-semibold text-emerald-600">See all</button>
            </div>

            <div className="bg-white rounded-2xl divide-y divide-gray-100 shadow-sm">
              {MOCK_BOOKINGS.map((booking) => {
                const style = STATUS_STYLE[booking.status];

                return (
                  <div key={booking.id} className="flex items-center gap-3 p-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-sm">
                      <Car className="w-4 h-4 text-gray-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {booking.route}
                      </p>
                      <p className="text-xs text-gray-400">
                        {booking.duration} · {booking.price}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className={`flex items-center gap-1 text-[11px] font-medium ${style.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                        {booking.status}
                      </span>
                      <span className="text-[11px] text-gray-400">{booking.date}</span>
                    </div>

                    <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Promo card — only shown when there's no real activity yet */}
          <div className="flex items-stretch gap-2 mb-8 overflow-hidden">
            <img
              src={walletCarAndCard2Img}
              alt=""
              className="h-full w-auto object-contain rounded-l-2xl shrink-0"
            />

            <div className="relative flex-1 overflow-hidden rounded-3xl bg-[#6FE3E0] px-5 pt-5 pb-4 min-w-0">
              <img
                src={cyanDesignImg}
                alt=""
                className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="relative">
                <p className="text-base font-bold text-gray-900 leading-snug mb-4 max-w-[70%]">
                  Need a car for next week?
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/booking")}
                  className="rounded-full bg-gray-900 text-white text-sm font-semibold px-4 py-2.5"
                >
                  Reserve a car
                </button>
              </div>
              <img
                src={walletCarImg}
                alt=""
                className="pointer-events-none select-none absolute -right-6 top-1/2 -translate-y-1/2 w-40 opacity-90"
              />
            </div>
          </div>

          {/* Empty bookings state */}
          <div className="px-6 bg-white flex-1 flex flex-col items-center justify-center text-center py-10 rounded-3xl">
            <img src={emptyBookingCardsImg} alt="" className="w-40 mb-6" />
            <p className="text-gray-500 text-sm mb-6">
              Your bookings and activity
              <br />
              will be saved here
            </p>
            <button
              type="button"
              className="rounded-full bg-gray-100 text-gray-900 text-sm font-semibold px-6 py-3"
            >
              Create your first booking
            </button>
          </div>
        </>
      )}
    </div>
    
  );
}
