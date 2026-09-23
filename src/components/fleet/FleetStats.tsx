interface Stat {
  title: string;
  value: number;
}

const FleetStats = () => {
  const stats: Stat[] = [
    { title: "Vehicles", value: 12 },
    { title: "Trips", value: 45 },
    { title: "Available", value: 7 },
  ];

  return (
    <div className="mt-8 grid grid-cols-3 gap-4">
      {stats.map((item) => (
        <div key={item.title} className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-2xl font-black">{item.value}</h2>
          <p className="text-xs text-gray-500 mt-1">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default FleetStats;
