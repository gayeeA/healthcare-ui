import type { Patient, Activity, StatCard } from '../types';

export const patients: Patient[] = [
  { id: '1', name: 'John Doe', age: 45, condition: 'Diabetes Type 2', status: 'active', doctor: 'Dr. Smith', lastVisit: '2024-04-20' },
  { id: '2', name: 'Jane Smith', age: 32, condition: 'Hypertension', status: 'active', doctor: 'Dr. Johnson', lastVisit: '2024-04-25' },
  { id: '3', name: 'Mike Johnson', age: 28, condition: 'Asthma', status: 'inactive', doctor: 'Dr. Lee', lastVisit: '2024-03-15' },
  { id: '4', name: 'Sarah Wilson', age: 67, condition: 'Arthritis', status: 'critical', doctor: 'Dr. Patel', lastVisit: '2024-04-28' },
  { id: '5', name: 'David Brown', age: 51, condition: 'COPD', status: 'active', doctor: 'Dr. Garcia', lastVisit: '2024-04-22' },
  { id: '6', name: 'Emily Davis', age: 23, condition: 'Migraine', status: 'active', doctor: 'Dr. Kim', lastVisit: '2024-04-26' },
  { id: '7', name: 'Robert Taylor', age: 39, condition: 'Hyperlipidemia', status: 'active', doctor: 'Dr. Nguyen', lastVisit: '2024-04-18' },
  { id: '8', name: 'Lisa Anderson', age: 55, condition: 'Osteoporosis', status: 'inactive', doctor: 'Dr. Wong', lastVisit: '2024-04-10' },
  { id: '9', name: 'James Martinez', age: 41, condition: 'Gastritis', status: 'active', doctor: 'Dr. Singh', lastVisit: '2024-04-24' },
  { id: '10', name: 'Patricia Garcia', age: 62, condition: 'Anemia', status: 'critical', doctor: 'Dr. Rodriguez', lastVisit: '2024-04-27' },
  // Add more up to 30+ for pagination demo...
  { id: '11', name: 'Christopher Lee', age: 34, condition: 'Allergies', status: 'active', doctor: 'Dr. Thompson', lastVisit: '2024-04-23' },
  { id: '12', name: 'Amanda White', age: 29, condition: 'Thyroid', status: 'active', doctor: 'Dr. Davis', lastVisit: '2024-04-19' },
  { id: '13', name: 'Daniel Harris', age: 48, condition: 'GERD', status: 'inactive', doctor: 'Dr. Clark', lastVisit: '2024-04-05' },
  { id: '14', name: 'Jessica Lewis', age: 36, condition: 'Depression', status: 'active', doctor: 'Dr. Walker', lastVisit: '2024-04-21' },
  { id: '15', name: 'Matthew Hall', age: 52, condition: 'Prostate', status: 'active', doctor: 'Dr. Allen', lastVisit: '2024-04-25' },
  { id: '16', name: 'Ashley Young', age: 27, condition: 'Anxiety', status: 'critical', doctor: 'Dr. King', lastVisit: '2024-04-28' },
  { id: '17', name: 'Andrew King', age: 44, condition: 'Gout', status: 'active', doctor: 'Dr. Wright', lastVisit: '2024-04-17' },
  { id: '18', name: 'Stephanie Lopez', age: 38, condition: 'Endometriosis', status: 'inactive', doctor: 'Dr. Hill', lastVisit: '2024-04-12' },
  { id: '19', name: 'Kevin Scott', age: 59, condition: 'Parkinson', status: 'active', doctor: 'Dr. Green', lastVisit: '2024-04-24' },
  { id: '20', name: 'Rachel Adams', age: 31, condition: 'Fibromyalgia', status: 'active', doctor: 'Dr. Baker', lastVisit: '2024-04-26' },
  { id: '21', name: 'Steven Baker', age: 46, condition: 'Hepatitis', status: 'critical', doctor: 'Dr. Gonzalez', lastVisit: '2024-04-29' },
  { id: '22', name: 'Nicole Gonzalez', age: 25, condition: 'IBS', status: 'active', doctor: 'Dr. Nelson', lastVisit: '2024-04-22' },
  { id: '23', name: 'Jonathan Nelson', age: 53, condition: 'Glaucoma', status: 'active', doctor: 'Dr. Carter', lastVisit: '2024-04-20' },
  { id: '24', name: 'Samantha Carter', age: 40, condition: 'Menopause', status: 'inactive', doctor: 'Dr. Mitchell', lastVisit: '2024-04-16' },
  { id: '25', name: 'Timothy Perez', age: 37, condition: 'Psoriasis', status: 'active', doctor: 'Dr. Roberts', lastVisit: '2024-04-27' },
  { id: '26', name: 'Heather Roberts', age: 64, condition: 'Dementia', status: 'critical', doctor: 'Dr. Turner', lastVisit: '2024-04-28' },
  { id: '27', name: 'Ryan Turner', age: 33, condition: 'Crohns', status: 'active', doctor: 'Dr. Phillips', lastVisit: '2024-04-23' },
  { id: '28', name: 'Megan Phillips', age: 49, condition: 'Diverticulitis', status: 'active', doctor: 'Dr. Campbell', lastVisit: '2024-04-25' },
  { id: '29', name: 'Jason Campbell', age: 42, condition: 'Hernia', status: 'inactive', doctor: 'Dr. Parker', lastVisit: '2024-04-14' },
  { id: '30', name: 'Lauren Parker', age: 56, condition: 'Multiple Sclerosis', status: 'active', doctor: 'Dr. Evans', lastVisit: '2024-04-26' },
];

export const stats: StatCard[] = [
  { title: 'Total Patients', value: '1,234', change: 12, trend: 'up', icon: 'Users', color: 'primary' },
  { title: 'Active Cases', value: 456, change: 8, trend: 'up', icon: 'Activity', color: 'success' },
  { title: 'Doctors', value: 28, change: -2, trend: 'down', icon: 'User', color: 'blue' },
  { title: 'Revenue', value: '$45.6k', change: 15, trend: 'up', icon: 'DollarSign', color: 'green' },
];

export const recentActivity: Activity[] = [
  { id: 'a1', patientName: 'John Doe', action: 'Scheduled follow-up', time: '2 min ago', doctor: 'Dr. Smith' },
  { id: 'a2', patientName: 'Sarah Wilson', action: 'Status changed to critical', time: '1 hr ago', doctor: 'Dr. Patel' },
  { id: 'a3', patientName: 'Emily Davis', action: 'Medication updated', time: '3 hrs ago', doctor: 'Dr. Kim' },
  { id: 'a4', patientName: 'David Brown', action: 'Lab results uploaded', time: '5 hrs ago', doctor: 'Dr. Garcia' },
  { id: 'a5', patientName: 'Mike Johnson', action: 'Marked inactive', time: '1 day ago', doctor: 'Dr. Lee' },
  { id: 'a6', patientName: 'Jane Smith', action: 'New prescription', time: 'Yesterday', doctor: 'Dr. Johnson' },
];

export const analyticsData = [
  { month: 'Jan', patients: 230, revenue: 32000 },
  { month: 'Feb', patients: 280, revenue: 38000 },
  { month: 'Mar', patients: 320, revenue: 45000 },
  { month: 'Apr', patients: 410, revenue: 56000 },
  { month: 'May', patients: 480, revenue: 62000 },
];
