
import { Bell, Plus, Home, Car, Wallet } from "lucide-react";

import walletCarImg from "@/assets/images/wallet-car.svg";
import cyanDesignImg from "@/assets/images/cyan-design.svg";
import walletCarAndCard1Img from "@/assets/images/wallet-carandcard1.svg";
import walletCarAndCard2Img from "@/assets/images/wallet-carandcard2.svg";
import emptyBookingCardsImg from "@/assets/images/emptybooking-cards.svg";

export default function Dashboard() {

const user = JSON.parse(
    localStorage.getItem("user") || "{}"
);

const fullName = user.fullName || "Partner";

const initials = fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-100 max-w-md mx-auto px-5 pb-28 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-1 pt-2 mb-6">
        <div className="flex items-center gap-3">

              {/* Profile Avatar */}
              <div
                  className="
                      w-10
                      h-10
                      rounded-full
                      overflow-hidden
                      bg-gray-200
                      flex
                      items-center
                      justify-center
                      shrink-0
                  "
              >
                  {user.profileImage ? (
                      <img
                          src={user.profileImage}
                          alt={fullName}
                          className="w-full h-full object-cover"
                      />
                  ) : (
                      <span className="text-xs font-bold text-gray-700">
                          {initials}
                      </span>
                  )}
              </div>

              {/* Greeting */}
              <div>
                  <p className="text-xs text-gray-500 leading-tight">
                      Good morning,
                  </p>

                  <p className="text-sm font-bold text-gray-900 leading-tight">
                      {fullName}
                  </p>
              </div>
          </div>

          {/* Notification */}
          <button
              type="button"
              aria-label="Notifications"
              className="
                  w-10
                  h-10
                  rounded-full
                  bg-gray-100
                  flex
                  items-center
                  justify-center
              "
          >
              <Bell className="w-5 h-5 text-gray-900" />
          </button>
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
            N0.00
          </p>

          <button
            type="button"
            className="relative w-full rounded-full bg-[#E3FBEA] text-gray-900 font-semibold text-sm py-3.5"
          >
            New booking request
          </button>
        </div>
        {/* <img
          src={walletCarAndCard1Img}
          alt=""
          className="h-full w-auto object-contain rounded-l-2xl shrink-0"
        /> */}
      </div>

      
      <div className="flex items-stretch gap-2 mb-8 overflow-hidden">
        {/* Peek of previous card */}
        <img
          src={walletCarAndCard2Img}
          alt=""
          className="h-full w-auto object-contain rounded-l-2xl shrink-0"
        />

        {/* Active/main card */}
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
      <div className="px-6 bg-white flex-1 flex flex-col items-center justify-center text-center py-10">
        <img
          src={emptyBookingCardsImg}
          alt=""
          className="w-40 mb-6"
        />
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

      {/* Floating bottom nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[280px] px-2">
        <div className="flex items-center justify-between bg-white rounded-full shadow-lg px-3 py-2">
          <button
            type="button"
            aria-label="Home"
            className="w-11 h-11 rounded-full bg-[#0B2B21] flex items-center justify-center"
          >
            <Home className="w-5 h-5 text-[#B9F6CA]" />
          </button>
          <button
            type="button"
            aria-label="Bookings"
            className="w-11 h-11 rounded-full flex items-center justify-center"
          >
            <Car className="w-5 h-5 text-gray-400" />
          </button>
          <button
            type="button"
            aria-label="Wallet"
            className="w-11 h-11 rounded-full flex items-center justify-center"
          >
            <Wallet className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

