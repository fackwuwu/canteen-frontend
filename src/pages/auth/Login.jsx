import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/loginSchema";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/AuthHook";
import { formatedError } from "../../utils/errorHandler";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const { mutate: Login } = useLogin();

  const onSubmit = async (data) => {
    await Login(data, {
      onSuccess: (data) => {
        toast.success("User Logged Successfully");
        navigate("/dashboard");
      },
      onError: (err) => {
        toast.error(formatedError(err));
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-3xl glass p-10 shadow-2xl border border-white/10"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30"
          >
            <Lock className="h-10 w-10" />
          </motion.div>

          <div>
            <h2 className="text-4xl font-black tracking-tight text-text">
              Welcome Back
            </h2>
            <p className="mt-2 text-text-muted">
              Login to start ordering deliciousness
            </p>
          </div>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-text ml-1 uppercase tracking-wider opacity-70">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 transition-colors group-focus-within:text-primary text-text-muted">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className={`w-full glass rounded-2xl py-4 pl-12 pr-4 text-sm outline-none transition-all
                  ${
                    errors.email
                      ? "ring-2 ring-red-500/50 bg-red-500/5"
                      : "ring-1 ring-white/10 focus:ring-2 focus:ring-primary/50"
                  }`}
              />
            </div>
            {errors.email && (
              <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs font-medium text-red-400 ml-1">
                {errors.email.message}
              </motion.p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-sm font-bold text-text uppercase tracking-wider opacity-70">
                Password
              </label>
              <a href="#" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider">
                Forgot?
              </a>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 transition-colors group-focus-within:text-primary text-text-muted">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={`w-full glass rounded-2xl py-4 pl-12 pr-4 text-sm outline-none transition-all
                  ${
                    errors.password
                      ? "ring-2 ring-red-500/50 bg-red-500/5"
                      : "ring-1 ring-white/10 focus:ring-2 focus:ring-primary/50"
                  }`}
              />
            </div>
            {errors.password && (
              <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs font-medium text-red-400 ml-1">
                {errors.password.message}
              </motion.p>
            )}
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-70 glow"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Validating...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>

          {/* Footer */}
          <div className="pt-4 text-center">
            <p className="text-sm text-text-muted">
              New here?{" "}
              <Link
                to="/signup"
                className="font-black text-primary hover:text-primary/80 transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
