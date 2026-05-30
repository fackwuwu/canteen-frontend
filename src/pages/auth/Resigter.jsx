import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, User, Loader2, ArrowRight, Github } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import  { useRegister } from "../../hooks/AuthHook.jsx";
import toast from "react-hot-toast";
import { formatedError } from "../../utils/errorHandler.jsx";
import { motion } from "framer-motion";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { mutateAsync : Login , isLoading: isRegistering } = useRegister();
  const navigate = useNavigate();
  const onSubmit = async (data) => {

    console.log(data);
    
    try{
     const res = await Login(data); 
      console.log("registered successfully", res);
      toast.success("User Registered Successfully");
      navigate("/dashboard" , { replace: true });
    }catch(err){
      toast.error(formatedError(err));
      console.log("regisration error", err);
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-3xl glass p-10 shadow-2xl border border-white/10"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ rotate: 20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-primary text-white shadow-lg shadow-secondary/30"
          >
            <User className="h-10 w-10" />
          </motion.div>

          <div>
            <h2 className="text-4xl font-black tracking-tight text-text">
              Join Us
            </h2>
            <p className="mt-2 text-text-muted">
              Create an account to start your feast
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="mt-10 space-y-5" onSubmit={handleSubmit(onSubmit)}>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-text ml-1 uppercase tracking-wider opacity-70">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 transition-colors group-focus-within:text-primary text-text-muted">
                <User className="h-5 w-5" />
              </div>
              <input
                {...register("name")}
                placeholder="Enter your name"
                className={`w-full glass rounded-2xl py-4 pl-12 pr-4 text-sm outline-none transition-all
                  ${
                    errors.name
                      ? "ring-2 ring-red-500/50 bg-red-500/5"
                      : "ring-1 ring-white/10 focus:ring-2 focus:ring-primary/50"
                  }`}
              />
            </div>
            {errors.name && (
              <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs font-medium text-red-400 ml-1">
                {errors.name.message}
              </motion.p>
            )}
          </div>
  
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
                {...register("email")}
                type="email"
                placeholder="Enter your email"
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
            <label className="text-sm font-bold text-text ml-1 uppercase tracking-wider opacity-70">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 transition-colors group-focus-within:text-primary text-text-muted">
                <Lock className="h-5 w-5" />
              </div>
              <input
                {...register("password")}
                type="password"
                placeholder="Create a password"
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
  
          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-text ml-1 uppercase tracking-wider opacity-70">
              Confirm Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 transition-colors group-focus-within:text-primary text-text-muted">
                <Lock className="h-5 w-5" />
              </div>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm password"
                className={`w-full glass rounded-2xl py-4 pl-12 pr-4 text-sm outline-none transition-all
                  ${
                    errors.confirmPassword
                      ? "ring-2 ring-red-500/50 bg-red-500/5"
                      : "ring-1 ring-white/10 focus:ring-2 focus:ring-primary/50"
                  }`}
              />
            </div>
            {errors.confirmPassword && (
              <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs font-medium text-red-400 ml-1">
                {errors.confirmPassword.message}
              </motion.p>
            )}
          </div>
  
          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isRegistering}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-secondary/20 transition-all hover:bg-secondary/90 disabled:opacity-70 glow"
          >
            {isRegistering ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Get Started
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>
        </form>
  
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-text-muted">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-black text-secondary hover:text-secondary/80 transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
  
}
