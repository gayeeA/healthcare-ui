export default function PatientCard({ patient }: any) {
  return (
    <div className="p-4 border rounded shadow">
      <h2>{patient.name}</h2>
      <p>Age: {patient.age}</p>
      <p>{patient.condition}</p>
    </div>
  );
}