import { motion } from "motion/react";
import { useState } from "react";
import { StickFigureWithFlame } from "../components/StickIllustrations";
import kuruLogo from "../../imports/kuru-logo.png";

const DEMO_USERS = [
  { email: "member@kurukshetra.in", password: "member2026", role: "member" },
  { email: "head@kurukshetra.in", password: "head2026", role: "head" },
];

export default function LoginScreen({ onLogin }: { onLogin: (role: "member" | "head") => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const user = DEMO_USERS.find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password
    );

    if (!user) {
      setError("Invalid email or password. Try the demo credentials below.");
      setLoading(false);
      return;
    }

    setLoading(false);
    onLogin(user.role as "member" | "head");
  };

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Logo and wordmark */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <div className="mb-4">
          <img
            src={kuruLogo}
            alt="FLAME Kurukshetra"
            className="mx-auto w-44 h-44 object-contain"
          />
        </div>
      </motion.div>

      {/* Login form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm space-y-6"
      >
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
            className="w-full bg-transparent border-b-2 border-white/30 text-white placeholder:text-white/50 pb-3 outline-none focus:border-white transition-colors"
            style={{ fontSize: "16px" }}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
            className="w-full bg-transparent border-b-2 border-white/30 text-white placeholder:text-white/50 pb-3 outline-none focus:border-white transition-colors"
            style={{ fontSize: "16px" }}
          />
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#EF4444] text-center"
            style={{ fontSize: "13px" }}
          >
            {error}
          </motion.p>
        )}

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSignIn}
          disabled={loading}
          className="w-full bg-[#FE5A00] text-white font-semibold rounded-xl py-4 mt-8 disabled:opacity-60 transition-opacity"
          style={{ fontSize: "16px", height: "52px" }}
        >
          {loading ? "Signing in…" : "Sign In"}
        </motion.button>

        {/* Demo credentials hint */}
        <div className="text-center space-y-1">
          <p className="text-white/30" style={{ fontSize: "11px" }}>
            DEMO CREDENTIALS
          </p>
          <p className="text-white/50" style={{ fontSize: "12px" }}>
            member@kurukshetra.in / member2026
          </p>
          <p className="text-white/50" style={{ fontSize: "12px" }}>
            head@kurukshetra.in / head2026
          </p>
        </div>

        <p className="text-center text-[#6B6B6B] mt-6" style={{ fontSize: "13px" }}>
          Kurukshetra '26 — Internal Platform
        </p>
      </motion.div>

      <div className="absolute bottom-8 right-8">
        <StickFigureWithFlame className="w-20 h-20 text-white" />
      </div>
    </div>
  );
}
