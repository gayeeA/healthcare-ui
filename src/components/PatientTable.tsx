export default function PatientTable({ patients }: any) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Condition</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((p: any) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.age}</td>
            <td>{p.condition}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}