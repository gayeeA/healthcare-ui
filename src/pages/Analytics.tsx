import { LineChart, Line, XAxis, YAxis } from "recharts";

const data = [
  { name: "Jan", patients: 30 },
  { name: "Feb", patients: 50 },
  { name: "Mar", patients: 80 }
];

export default function Analytics() {
  return (
    <LineChart width={400} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Line dataKey="patients" />
    </LineChart>
  );
}