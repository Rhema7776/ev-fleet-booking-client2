import VehicleCard from "./VehicleCard";

import car1 from "@/assets/images/VWe-Golf1.svg";

const vehicles = [
  {
    id: 1,
    name: "Toyota Hiace",
    location: "Lagos",
    price: "45,000",
    image: car1,
  },
  {
    id: 2,
    name: "Mercedes Sprinter",
    location: "Abuja",
    price: "60,000",
    image: car1,
  },
];

const VehicleGrid = () => {
  return (
    <div className="mt-8 grid gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleGrid;
