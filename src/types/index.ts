export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: 'active' | 'inactive' | 'critical';
  doctor: string;
  lastVisit: string;
  avatar?: string;
}

export interface Activity {
  id: string;
  patientName: string;
  action: string;
  time: string;
  doctor: string;
}

export interface StatCard {
  title: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down';
  icon: string; // lucide icon name
  color: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
