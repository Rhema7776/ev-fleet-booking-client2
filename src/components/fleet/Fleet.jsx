import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Plus, Zap, Home, Calendar, Car, Wallet, MoreHorizontal, ChevronRight } from "lucide-react";

// ---- Mock data, shaped like the /api/v1/vehicles response ----
const VEHICLES = [
  { id: 1, name: "VW e-Golf", plate: "DEF-789-CD", category: "Economy", status: "ACTIVE", pricePerHour: 12000, isElectric: true, image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=400&auto=format&fit=crop" },
  { id: 2, name: "Ford Mustang Mach-E", plate: "XYZ-456-AB", category: "VIP", status: "AVAILABLE", pricePerHour: 18500, isElectric: true, image: "https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=400&auto=format&fit=crop" },
  { id: 3, name: "Chevrolet Bolt EV", plate: "GHI-012-EF", category: "Economy", status: "AVAILABLE", pricePerHour: 10500, isElectric: true, image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=400&auto=format&fit=crop" },
  { id: 4, name: "Nissan Leaf", plate: "JKL-345-GH", category: "Economy", status: "AVAILABLE", pricePerHour: 9500, isElectric: true, image: "https://images.unsplash.com/photo-1554744512-d6c603f27307?q=80&w=400&auto=format&fit=crop" },
  { id: 5, name: "Land Cruiser Prado", plate: "MNO-678-IJ", category: "Executive", status: "RESERVED", pricePerHour: 15000, isElectric: false, image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=400&auto=format&fit=crop" },
];

const TABS = ["All cars", "Economy", "Executive", "VIP"];

const STATUS_STYLE = {
  ACTIVE: { dot: "bg-emerald-500", label: "Active", pill: "bg-emerald-50 text-emerald-700" },
  AVAILABLE: { dot: "bg-sky-500", label: "Available", pill: "bg-sky-50 text-sky-700" },
  RESERVED: { dot: "bg-amber-500", label: "Reserved", pill: "bg-amber-50 text-amber-700" },
  BOOKED: { dot: "bg-rose-500", label: "Booked", pill: "bg-rose-50 text-rose-700" },
};

function formatNaira(n) {
  return `₦${n.toLocaleString("en-NG")}`;
}

function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.AVAILABLE;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${s.pill}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

function VehicleCard({ v, onSelect }) {
  return (
    <button
      onClick={() => onSelect(v)}
      className="flex flex-col items-start rounded-2xl border border-zinc-100 bg-white p-3 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition active:scale-[0.98]"
    >
      <div className="relative mb-2 h-24 w-full overflow-hidden rounded-xl bg-zinc-100">
        <img src={v.image} alt={v.name} className="h-full w-full object-cover" />
        {v.isElectric && (
          <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white/90 shadow-sm">
            <Zap className="h-3 w-3 fill-amber-400 text-amber-400" />
          </span>
        )}
      </div>
      <p className="line-clamp-1 text-[13px] font-semibold text-zinc-900">{v.name}</p>
      <p className="mb-1.5 text-[11px] text-zinc-400">Plate: {v.plate}</p>
      <StatusBadge status={v.status} />
      <p className="mt-1.5 text-[13px] font-semibold text-zinc-900">
        {formatNaira(v.pricePerHour)}<span className="text-[11px] font-normal text-zinc-400">/hr</span>
      </p>
    </button>
  );
}

function BookedVehicleCard({ v }) {
  const accent = v.id % 2 === 0 ? "from-blue-700 to-blue-900" : "from-rose-700 to-rose-950";
  return (
    <div className={`relative flex min-w-[220px] items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-br ${accent} p-3 text-white`}>
      <img src={v.image} alt={v.name} className="h-14 w-16 rounded-lg object-cover" />
      <div className="min-w-0">
        <p className="truncate text-[13px] font-semibold">{v.name}</p>
        <p className="text-[11px] text-white/70">is booked at {formatNaira(v.pricePerHour)}/hr</p>
        <button className="mt-1 rounded-full bg-black/80 px-2.5 py-1 text-[11px] font-medium">View booking</button>
      </div>
    </div>
  );
}

export default function Fleet() {
  const [tab, setTab] = useState("Cars");
  const [category, setCategory] = useState("All cars");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const booked = useMemo(() => VEHICLES.filter((v) => v.status === "RESERVED" || v.status === "BOOKED"), []);

  const filtered = useMemo(() => {
    return VEHICLES.filter((v) => {
      const matchesCategory = category === "All cars" || v.category === category;
      const matchesQuery = v.name.toLowerCase().includes(query.toLowerCase()) || v.plate.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="mx-auto flex h-[844px] w-[390px] flex-col overflow-hidden rounded-[2.5rem] bg-white font-sans shadow-2xl">
      {/* status bar spacer */}
      <div className="h-11 shrink-0" />

      {/* header */}
      <div className="flex items-center justify-between px-5 pb-3">
        <h1 className="text-[19px] font-bold tracking-tight text-zinc-900">
          My <span className="rounded-md bg-amber-300 px-1.5 py-0.5">fleet</span>
        </h1>
        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200">
          <Plus className="h-4 w-4 text-zinc-700" />
        </button>
      </div>

      {/* Cars / Drivers tabs */}
      <div className="flex gap-6 border-b border-zinc-100 px-5">
        {["Cars", "Drivers"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative pb-2.5 text-[14px] font-medium transition ${
              tab === t ? "text-zinc-900" : "text-zinc-400"
            }`}
          >
            {t}
            {tab === t && <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-emerald-500" />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 pt-3">
        {/* search */}
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-zinc-100 px-3 py-2.5">
          <Search className="h-4 w-4 text-zinc-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cars"
            className="flex-1 bg-transparent text-[13px] text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
          />
          <SlidersHorizontal className="h-4 w-4 text-zinc-400" />
        </div>

        {/* booked vehicles */}
        {booked.length > 0 && (
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[14px] font-semibold text-zinc-900">Booked vehicles</p>
              <button className="flex items-center gap-0.5 text-[12px] font-medium text-emerald-600">
                See all <ChevronRight className="h-3 w-3" />
              </button>
            </div>
            <div className="flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none]">
              {booked.map((v) => (
                <BookedVehicleCard key={v.id} v={v} />
              ))}
            </div>
          </div>
        )}

        {/* category pills */}
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setCategory(t)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition ${
                category === t ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* vehicle grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Car className="mb-2 h-8 w-8 text-zinc-300" />
            <p className="text-[13px] font-medium text-zinc-500">No cars match that search</p>
            <p className="text-[12px] text-zinc-400">Try a different name, plate, or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((v) => (
              <VehicleCard key={v.id} v={v} onSelect={setSelected} />
            ))}
          </div>
        )}
      </div>

      {/* bottom nav */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-zinc-100 bg-white/95 px-2 py-3 backdrop-blur">
        {[
          { icon: Home, label: "Home" },
          { icon: Calendar, label: "Bookings" },
          { icon: Car, label: "Fleet", active: true },
          { icon: Wallet, label: "Earnings" },
          { icon: MoreHorizontal, label: "More" },
        ].map(({ icon: Icon, label, active }) => (
          <button key={label} className="flex flex-col items-center gap-1">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${active ? "bg-amber-300" : ""}`}>
              <Icon className={`h-[18px] w-[18px] ${active ? "text-zinc-900" : "text-zinc-400"}`} />
            </span>
            <span className={`text-[10px] font-medium ${active ? "text-zinc-900" : "text-zinc-400"}`}>{label}</span>
          </button>
        ))}
      </div>

      {/* selected vehicle detail sheet */}
      {selected && (
        <div className="absolute inset-0 flex items-end bg-black/40" onClick={() => setSelected(null)}>
          <div className="w-full rounded-t-3xl bg-white p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-zinc-200" />
            <img src={selected.image} alt={selected.name} className="mb-3 h-36 w-full rounded-xl object-cover" />
            <p className="text-[16px] font-bold text-zinc-900">{selected.name}</p>
            <p className="mb-2 text-[12px] text-zinc-400">Plate: {selected.plate}</p>
            <div className="mb-3 flex items-center gap-2">
              <StatusBadge status={selected.status} />
              <span className="text-[12px] text-zinc-400">· {selected.category}</span>
            </div>
            <p className="mb-4 text-[16px] font-bold text-zinc-900">
              {formatNaira(selected.pricePerHour)}<span className="text-[12px] font-normal text-zinc-400">/hr</span>
            </p>
            <button className="w-full rounded-xl bg-zinc-900 py-3 text-[14px] font-semibold text-white">
              Manage vehicle
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
