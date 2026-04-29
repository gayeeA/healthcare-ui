import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { patients } from '../services/mockData';
import PatientCard from '../components/PatientCard';
import PatientTable from '../components/PatientTable';
import { Button } from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import type { Patient } from '../types';
import { Search, LayoutGrid, LayoutList, ChevronLeft, ChevronRight, ArrowUpDown, Download } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';

export default function Patients() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [conditionFilter, setConditionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'age' | 'lastVisit'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;

  const conditions = ['all', 'Diabetes', 'Hypertension', 'Asthma', 'Arthritis', 'COPD'] as const;
  const statuses = ['all', 'active', 'inactive', 'critical'] as const;

  const filteredAndSortedPatients = useMemo(() => {
    let filtered = patients;

    if (search) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.doctor.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (conditionFilter !== 'all') {
      filtered = filtered.filter(p => p.condition === conditionFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'age':
          aValue = a.age;
          bValue = b.age;
          break;
        case 'lastVisit':
          aValue = new Date(a.lastVisit).getTime();
          bValue = new Date(b.lastVisit).getTime();
          break;
        default:
          return 0;
      }
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [search, conditionFilter, statusFilter, sortBy, sortOrder]);

  const paginatedPatients = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredAndSortedPatients.slice(start, start + itemsPerPage);
  }, [filteredAndSortedPatients, page]);

  const totalPages = Math.ceil(filteredAndSortedPatients.length / itemsPerPage);

  // Existing filter change effect
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    setPage(1);
    return () => clearTimeout(timer);
  }, [search, conditionFilter, statusFilter, sortBy, sortOrder]);

  // Initial load effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSort = (field: 'name' | 'age' | 'lastVisit') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const exportPatients = () => {
    const csvContent = [
      ['Name', 'Age', 'Condition', 'Status', 'Doctor', 'Last Visit'],
      ...filteredAndSortedPatients.map(p => [p.name, p.age, p.condition, p.status, p.doctor, p.lastVisit])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patients.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const EmptyState = () => (
    <Card className="border-dashed border-muted">
      <CardContent className="p-12 text-center">
        <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-1">No patients found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search or filter criteria
        </p>
        <Button 
          variant="outline" 
          onClick={() => {
            setSearch('');
            setConditionFilter('all');
            setStatusFilter('all');
          }}
        >
          Clear all filters
        </Button>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Skeleton className="h-12 flex-1" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-80" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or doctor..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
            Grid
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('list')}
          >
            <LayoutList className="h-4 w-4" />
            List
          </Button>
          <Button variant="outline" size="sm" onClick={exportPatients}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters and Sort */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Filters & Sort</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-0">
          <div>
            <label className="text-sm font-medium mb-2 block">Condition</label>
            <Select value={conditionFilter} onValueChange={(value) => setConditionFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="All conditions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All conditions</SelectItem>
                {conditions.slice(1).map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {statuses.slice(1).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Sort By</label>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="age">Age</SelectItem>
                <SelectItem value="lastVisit">Last Visit</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button variant="outline" onClick={() => handleSort(sortBy)}>
              <ArrowUpDown className="h-4 w-4 mr-1" />
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patients list */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Patients ({filteredAndSortedPatients.length})</CardTitle>
              <p className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </p>
            </div>
            <Badge>{filteredAndSortedPatients.length} results</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {paginatedPatients.length === 0 ? (
            <EmptyState />
          ) : view === 'grid' ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {paginatedPatients.map((patient: Patient, index) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <PatientCard patient={patient} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <PatientTable patients={paginatedPatients} />
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((page - 1) * itemsPerPage) + 1} to {Math.min(page * itemsPerPage, filteredAndSortedPatients.length)} of {filteredAndSortedPatients.length} results
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline" 
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <span className="px-3 py-1 text-sm border rounded-md">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

