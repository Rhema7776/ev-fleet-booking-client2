import { useEffect, useState, useMemo, type ChangeEvent, type MouseEvent } from "react";
import { Search, SlidersHorizontal, Plus, Zap, Car, ChevronRight } from "lucide-react";

import { listVehicles, type Vehicle } from "@/services/vehicle/vehicleService";
import AddVehicleModal from "@/components/fleet/AddVehicleModal";

const TABS = ["All cars", "ECONOMY", "EXECUTIVE", "VIP"] as const;

const STATUS_STYLE: Record<Vehicle["status"], { dot: string; label: string; pill: string }> = {
  ACTIVE: { dot: "bg-emerald-500", label: "Active", pill: "bg-emerald-50 text-emerald-700" },
  AVAILABLE: { dot: "bg-sky-500", label: "Available", pill: "bg-sky-50 text-sky-700" },
  RESERVED: { dot: "bg-amber-500", label: "Reserved", pill: "bg-amber-50 text-amber-700" },
  BOOKED: { dot: "bg-rose-500", label: "Booked", pill: "bg-rose-50 text-rose-700" },
  UNAVAILABLE: { dot: "bg-zinc-400", label: "Unavailable", pill: "bg-zinc-100 text-zinc-600" },
  DEDICATED: { dot: "bg-violet-500", label: "Dedicated", pill: "bg-violet-50 text-violet-700" },
};

function formatNaira(n: number) {
  return `₦${n.toLocaleString("en-NG")}`;
}

function StatusBadge({ status }: { status: Vehicle["status"] }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.AVAILABLE;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${s.pill}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

function VehicleCard({ v, onSelect }: { v: Vehicle; onSelect: (v: Vehicle) => void }) {
  return (
    <button
      onClick={() => onSelect(v)}
      className="flex flex-col items-start rounded-2xl border border-zinc-100 bg-white p-3 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition active:scale-[0.98]"
    >
      <div className="relative mb-2 h-24 w-full overflow-hidden rounded-xl bg-zinc-100 flex items-center justify-center">
        {v.imageUrl ? (
          <img src={v.imageUrl} alt={v.name} className="h-full w-full object-cover" />
        ) : (
          <Car className="h-8 w-8 text-zinc-300" />
        )}
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
        {formatNaira(v.pricePerHour)}
        <span className="text-[11px] font-normal text-zinc-400">/hr</span>
      </p>
    </button>
  );
}

export default function Fleet() {
  const [tab, setTab] = useState<"Cars" | "Drivers">("Cars");
  const [category, setCategory] = useState<(typeof TABS)[number]>("All cars");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    listVehicles()
      .then((data) => {
        if (!cancelled) setVehicles(data);
      })
      .catch(() => {
        if (!cancelled) setError("Unable to load your vehicles.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesCategory = category === "All cars" || v.category === category;
      const matchesQuery =
        v.name.toLowerCase().includes(query.toLowerCase()) ||
        v.plate.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [vehicles, category, query]);

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="flex items-center justify-between px-5 pt-10 pb-3">
        <h1 className="text-[19px] font-bold tracking-tight text-zinc-900">
          My <span className="rounded-md bg-amber-300 px-1.5 py-0.5">fleet</span>
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          aria-label="Add a vehicle"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200"
        >
          <Plus className="h-4 w-4 text-zinc-700" />
        </button>
      </div>

      <div className="flex gap-6 border-b border-zinc-100 px-5">
        {(["Cars", "Drivers"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative pb-2.5 text-[14px] font-medium transition ${
              tab === t ? "text-zinc-900" : "text-zinc-400"
            }`}
          >
            {t}
            {tab === t && (
              <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-emerald-500" />
            )}
          </button>
        ))}
      </div>

      <div className="px-5 pb-28 pt-3">
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-zinc-100 px-3 py-2.5">
          <Search className="h-4 w-4 text-zinc-400" />
          <input
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            placeholder="Search cars"
            className="flex-1 bg-transparent text-[13px] text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
          />
          <SlidersHorizontal className="h-4 w-4 text-zinc-400" />
        </div>

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

        {loading ? (
          <p className="py-16 text-center text-sm text-zinc-400">Loading your vehicles...</p>
        ) : error ? (
          <p className="py-16 text-center text-sm text-red-500">{error}</p>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Car className="mb-2 h-8 w-8 text-zinc-300" />
            <p className="text-[13px] font-medium text-zinc-500">
              {vehicles.length === 0 ? "No vehicles yet" : "No cars match that search"}
            </p>
            <p className="text-[12px] text-zinc-400">
              {vehicles.length === 0 ? "Tap + to add your first one" : "Try a different name, plate, or category"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((v) => (
              <VehicleCard key={v.id} v={v} onSelect={setSelected} />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-end bg-black/40"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full rounded-t-3xl bg-white p-5"
            onClick={(e: MouseEvent) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-zinc-200" />
            <div className="mb-3 flex h-36 w-full items-center justify-center rounded-xl bg-zinc-100">
              {selected.imageUrl ? (
                <img src={selected.imageUrl} alt={selected.name} className="h-full w-full rounded-xl object-cover" />
              ) : (
                <Car className="h-10 w-10 text-zinc-300" />
              )}
            </div>
            <p className="text-[16px] font-bold text-zinc-900">{selected.name}</p>
            <p className="mb-2 text-[12px] text-zinc-400">Plate: {selected.plate}</p>
            <div className="mb-3 flex items-center gap-2">
              <StatusBadge status={selected.status} />
              <span className="text-[12px] text-zinc-400">· {selected.category}</span>
            </div>
            <p className="mb-4 text-[16px] font-bold text-zinc-900">
              {formatNaira(selected.pricePerHour)}
              <span className="text-[12px] font-normal text-zinc-400">/hr</span>
            </p>
          </div>
        </div>
      )}

      {showAddModal && (
        <AddVehicleModal
          onClose={() => setShowAddModal(false)}
          onCreated={(vehicle) => {
            setVehicles((prev) => [vehicle, ...prev]);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}