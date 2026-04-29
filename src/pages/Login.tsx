import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useToast } from '../hooks/useToast';
import { Heart, Shield, Users } from 'lucide-react';
import type { FormEvent } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addToast } = useToast();

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      addToast('Login successful!', 'success');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
      addToast('Login failed: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <motion.div
        className="w-full max-w-md mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <motion.div
              className="flex justify-center mb-4"
              variants={itemVariants}
            >
              <div className="p-3 rounded-full bg-primary/10">
                <Heart className="h-8 w-8 text-primary" />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardTitle className="text-3xl font-bold fade-in bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                HealthCare Pro
              </CardTitle>
              <p className="text-muted-foreground text-sm mt-2">
                Sign in to your B2B healthcare dashboard
              </p>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <motion.div
                className="p-3 rounded-lg bg-destructive/10 text-destructive border border-destructive/30 animate-pulse"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                {error}
              </motion.div>
            )}
            <motion.form
              onSubmit={login}
              className="space-y-4"
              variants={itemVariants}
            >
              <div>
                <label htmlFor="email" className="text-sm font-medium mb-2 block">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium mb-2 block">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11"
                loading={loading}
                disabled={!email || !password || loading}
              >
                Sign In
              </Button>
            </motion.form>
            <motion.div
              className="text-xs text-muted-foreground text-center pt-4 border-t border-border"
              variants={itemVariants}
            >
              <p className="mb-2">Demo credentials:</p>
              <div className="space-y-1 font-mono text-primary">
                <p>admin@healthcare.com</p>
                <p>password123</p>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        {/* Feature highlights */}
        <motion.div
          className="mt-8 grid grid-cols-3 gap-4 text-center"
          variants={itemVariants}
        >
          <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card/50 backdrop-blur-sm">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xs text-muted-foreground">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card/50 backdrop-blur-sm">
            <Users className="h-6 w-6 text-primary" />
            <span className="text-xs text-muted-foreground">HIPAA Compliant</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card/50 backdrop-blur-sm">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xs text-muted-foreground">Patient-Centric</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

