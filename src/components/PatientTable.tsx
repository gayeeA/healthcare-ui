import { MoreHorizontal, Heart } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import type { Patient } from '../types';
import { cn } from '../lib/utils';

interface PatientTableProps {
  patients: Patient[];
  className?: string;
}

export default function PatientTable({ patients }: PatientTableProps) {
  return (
    <div className="w-full border rounded-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Patient
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Age
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Condition
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Status
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Doctor
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Last Visit
              </th>
              <th className="text-right align-middle font-medium text-muted-foreground w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {patients.map((patient, i) => (
              <tr key={patient.id} className={cn("hover:bg-muted/50 transition-colors", i % 2 === 0 && "bg-background/20")}>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-3 font-medium">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <span>{patient.name}</span>
                  </div>
                </td>
                <td className="p-4 align-middle font-medium">
                  {patient.age}
                </td>
                <td className="p-4 align-middle">
                  <Badge variant="outline">{patient.condition}</Badge>
                </td>
                <td className="p-4 align-middle">
                  <Badge variant={patient.status === 'critical' ? 'destructive' : patient.status === 'active' ? 'default' : 'secondary'}>
                    {patient.status}
                  </Badge>
                </td>
                <td className="p-4 align-middle font-medium">
                  Dr. {patient.doctor.split(' ')[1]}
                </td>
                <td className="p-4 align-middle text-sm">
                  {new Date(patient.lastVisit).toLocaleDateString()}
                </td>
                <td className="p-4 align-middle text-right">
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

