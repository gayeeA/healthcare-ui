import { useState } from "react";
import PatientCard from "../components/PatientCard";
import PatientTable from "../components/PatientTable";

const patients = [
  { id: 1, name: "John", age: 45, condition: "Diabetes" },
  { id: 2, name: "Sara", age: 30, condition: "Asthma" }
];

export default function Patients() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="p-4">
      <div className="mb-4">
        <button onClick={() => setView("grid")}>Grid</button>
        <button onClick={() => setView("list")}>List</button>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-2 gap-4">
          {patients.map((p) => (
            <PatientCard key={p.id} patient={p} />
          ))}
        </div>
      ) : (
        <PatientTable patients={patients} />
      )}
    </div>
  );
}