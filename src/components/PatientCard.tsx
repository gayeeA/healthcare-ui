import { motion } from 'framer-motion';
import type { Patient } from '../types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Avatar, AvatarFallback } from './ui/Avatar';
import { User, Heart, Calendar, Phone } from 'lucide-react';

interface PatientCardProps {
  patient: Patient;
}

export default function PatientCard({ patient }: PatientCardProps) {
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);

  const statusColor = {
    active: 'default',
    inactive: 'secondary',
    critical: 'destructive'
  }[patient.status] as any;

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group"
    >
      <div className="border bg-card rounded-xl hover:shadow-2xl transition-all overflow-hidden h-full">
        {/* Header */}
        <div className="p-6 pb-4 border-b bg-gradient-to-r from-primary/5 to-background">
          <div className="flex items-start gap-4">
            <Avatar className="flex-shrink-0 ring-2 ring-background/50 shadow-lg">
              <AvatarFallback className="text-primary font-bold text-lg">
                {getInitials(patient.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-xl group-hover:text-primary transition-colors line-clamp-1">
                {patient.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 text-sm opacity-90">
                  <Heart className="h-4 w-4 text-destructive" />
                  <span>{patient.condition}</span>
                </div>
                <Badge variant={statusColor}>
                  {patient.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="font-medium">{patient.lastVisit}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="font-medium">{patient.doctor}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              View Record
            </Button>
            <Button size="sm" variant="ghost">
              <Phone className="h-4 w-4 mr-1" />
              Call
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

