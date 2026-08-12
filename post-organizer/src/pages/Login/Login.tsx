import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Sparkles, Heart, Flower2, ArrowRight } from 'lucide-react';
import { Input, Button, Card } from '@/shared/components';
import { RoleSelect } from '@/features/change-role';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { login } from '@/entities/user/model';
import type { Role } from '@/shared/types';

export default function Login() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('user');

  if (user) return <Navigate to="/" replace />;

  function handleSubmit() {
    if (!name.trim()) {
      toast.error('Please tell us your name first 🌸');
      return;
    }
    dispatch(login({ name: name.trim(), role }));
    toast.success(`Welcome, ${name.trim()}! ✨`);
    navigate('/');
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left illustration side */}
      <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-babypink via-blush to-pastelPurple p-12 lg:flex">
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="absolute left-10 top-16 text-white/70"
        >
          <Flower2 className="h-16 w-16" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 16, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute bottom-24 right-16 text-white/60"
        >
          <Heart className="h-12 w-12" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute right-24 top-24 text-white/50"
        >
          <Sparkles className="h-10 w-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-sm rounded-3xl border border-white/40 bg-white/20 p-8 text-center text-white backdrop-blur-xl shadow-glow"
        >
          <Sparkles className="mx-auto mb-4 h-10 w-10" />
          <h1 className="mb-2 font-display text-3xl font-extrabold">Post Organizer</h1>
          <p className="font-body text-white/90">
            Curate, publish, and organize your dreamiest posts — all in one soft, sparkly space.
          </p>
        </motion.div>
      </div>

      {/* Right login card */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <Card className="w-full max-w-md p-8" hover={false}>
          <div className="mb-6 text-center">
            <h2 className="font-display text-2xl font-extrabold text-gray-700">Welcome back 🌸</h2>
            <p className="mt-1 text-sm text-gray-400 font-body">Sign in with just your name — no password needed.</p>
          </div>

          <div className="space-y-5">
            <Input
              label="Your Name"
              placeholder="e.g. Aria Blossom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-600 font-body">Select Role</label>
              <RoleSelect value={role} onChange={setRole} />
            </div>

            <Button className="w-full" size="lg" onClick={handleSubmit}>
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
