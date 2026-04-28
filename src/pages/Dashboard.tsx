import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="p-4 grid grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100">Patients: 120</div>
        <div className="p-4 bg-gray-100">Doctors: 25</div>
        <div className="p-4 bg-gray-100">Active Cases: 32</div>
      </div>
    </div>
  );
}