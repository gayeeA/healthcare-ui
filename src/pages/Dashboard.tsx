import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '../components/ui/Skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Users, Activity, UserCheck, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { stats, recentActivity, analyticsData } from '../services/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Activity as ActivityType } from '../types';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={itemVariants}
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.trend === 'up' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                  {stat.icon === 'Users' && <Users className="h-5 w-5" />}
                  {stat.icon === 'Activity' && <Activity className="h-5 w-5" />}
                  {stat.icon === 'UserCheck' && <UserCheck className="h-5 w-5" />}
                  {stat.icon === 'DollarSign' && <DollarSign className="h-5 w-5" />}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                  <p className="text-xs text-muted-foreground">
                    {stat.change}% {stat.trend === 'up' ? 'increase' : 'decrease'} from last month
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={itemVariants}
      >
        <Card>
          <CardHeader>
            <CardTitle>Patient Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="patients"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ fill: '#8884d8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.slice(0, 5).map((activity: ActivityType) => (
              <motion.div
                key={activity.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.patientName}</p>
                </div>
                <Badge variant="outline" className="text-xs">{activity.time}</Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div className="flex flex-col items-center gap-1 p-4 rounded-lg bg-primary/5">
                <span className="text-2xl font-bold text-primary">98%</span>
                <span className="text-muted-foreground">Uptime</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-4 rounded-lg bg-success/5">
                <span className="text-2xl font-bold text-success">24h</span>
                <span className="text-muted-foreground">Avg Response</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-4 rounded-lg bg-success/5">
                <span className="text-2xl font-bold text-success">0.2%</span>
                <span className="text-muted-foreground">Error Rate</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-4 rounded-lg bg-warning/5">
                <span className="text-2xl font-bold text-warning">99.8%</span>
                <span className="text-muted-foreground">Satisfaction</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

