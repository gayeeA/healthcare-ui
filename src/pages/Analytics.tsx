import { useState, useMemo, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { analyticsData } from '../services/mockData';

interface FilterProps {
  period: '30d' | '90d';
  metric: 'patients' | 'revenue';
}

export default function Analytics() {
  const [filter, setFilter] = useState<FilterProps>({ period: '30d', metric: 'patients' });
  const [loading, setLoading] = useState(true);

  const filteredData = useMemo(() => {
    return analyticsData.slice(-6);
  }, [filter]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-10 w-24" />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Skeleton className="h-80" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between pb-4">
          <div>
            <CardTitle>Analytics Overview</CardTitle>
            <p className="text-sm text-muted-foreground">
              Trends over the last {filter.period}.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter.metric === 'patients' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter({ ...filter, metric: 'patients' })}
            >
              Patients
            </Button>
            <Button
              variant={filter.metric === 'revenue' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter({ ...filter, metric: 'revenue' })}
            >
              Revenue
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredData}>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#304FFE" stopOpacity={0.4} />
                  <stop offset="75%" stopColor="#304FFE" stopOpacity={0.05} />
                  <stop offset="100%" stopColor="#304FFE" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tickMargin={12}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tickMargin={12}
                tickFormatter={(value) => `$${(value as number).toLocaleString()}`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey={filter.metric} 
                stroke="#304FFE" 
                fillOpacity={1}
                fill="url(#gradient)"
              />
              <Line 
                type="monotone" 
                dataKey={filter.metric} 
                stroke="#304FFE" 
                strokeWidth={3}
                dot={{ fill: '#304FFE', strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Total {filter.metric === 'revenue' ? 'Revenue' : 'Patients'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {filter.metric === 'patients' ? '1,234' : '$45.6K'}
            </div>
            <p className="text-sm text-muted-foreground mt-2">Last {filter.period}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Growth Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">+18.5%</div>
            <p className="text-sm text-muted-foreground mt-2">
              {filter.metric === 'revenue' ? 'Revenue growth' : 'Patient acquisition'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$3,680</div>
            <p className="text-sm text-muted-foreground mt-2">
              {filter.metric === 'revenue' ? 'Revenue per patient' : 'Patients per doctor'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

