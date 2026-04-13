import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useLogin from "../hooks/useLogin";
import useUser from "../hooks/useUser";
import { getRoleHomePath } from "../utils/getRoleHomePath";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoggingIn } = useLogin();
  const { user, isFetchingUser } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isFetchingUser && user) {
        navigate(getRoleHomePath(user.role), { replace: true });
      }
    },
    [isFetchingUser, navigate, user],
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }
    login({ email, password });
  };

  // const { user, isFetchingUser } = useUser();
  // console.log(user);

  /* ---- ألوان المشروع ---- */
  const colors = {
    bg: "#0F1117",
    surface: "#1A1D2E",
    surface2: "#232741",
    border: "#2E3250",
    primary: "#6C8EF5",
    primaryGlow: "rgba(108,142,245,0.15)",
    accent: "#5ECFB1",
    text: "#E8EAF6",
    textMuted: "#7B82A8",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: colors.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: '"DM Sans", ui-sans-serif, system-ui',
      }}
    >
      {/* توهج خلفي بلون primary */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70vw",
          height: "50vh",
          borderRadius: "0 0 50% 50%",
          background:
            "radial-gradient(ellipse, rgba(108,142,245,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* توهج سفلي بلون accent */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "50vw",
          height: "40vh",
          background:
            "radial-gradient(ellipse, rgba(94,207,177,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: 400,
          position: "relative",
          zIndex: 10,
          perspective: 1500,
        }}
      >
        <motion.div
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* الكارت */}
          <div
            style={{
              background: colors.surface,
              borderRadius: 20,
              padding: "28px 28px 24px",
              border: `1px solid ${colors.border}`,
              boxShadow: `0 4px 40px rgba(0,0,0,0.5), 0 0 0 0.5px ${colors.border}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* خط علوي بلون primary */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "20%",
                right: "20%",
                height: 2,
                background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`,
                opacity: 0.6,
              }}
            />

            {/* هيدر */}
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.7 }}
                style={{
                  margin: "0 auto 12px",
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: colors.surface2,
                  border: `1px solid ${colors.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 16px ${colors.primaryGlow}`,
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: colors.primary,
                  }}
                >
                  <GraduationCap />
                </span>
              </motion.div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 700,
                  color: colors.text,
                  fontFamily: '"Sora", sans-serif',
                }}
              >
                Welcome Back
              </h1>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 13,
                  color: colors.textMuted,
                }}
              >
                Sign in to continue to Clarify
              </p>
            </div>

            {/* فورم */}
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div style={{ position: "relative", marginBottom: 10 }}>
                <Mail
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 16,
                    height: 16,
                    color:
                      focusedInput === "email"
                        ? colors.primary
                        : colors.textMuted,
                    transition: "color 0.2s",
                  }}
                />
                <input
                  type='email'
                  placeholder='Email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                  style={{
                    width: "100%",
                    height: 42,
                    paddingLeft: 40,
                    paddingRight: 12,
                    background: colors.surface2,
                    border: `1px solid ${focusedInput === "email" ? colors.primary : colors.border}`,
                    borderRadius: 10,
                    color: colors.text,
                    fontSize: 14,
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    boxShadow:
                      focusedInput === "email"
                        ? `0 0 0 3px ${colors.primaryGlow}`
                        : "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Password */}
              <div style={{ position: "relative", marginBottom: 10 }}>
                <Lock
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 16,
                    height: 16,
                    color:
                      focusedInput === "password"
                        ? colors.primary
                        : colors.textMuted,
                    transition: "color 0.2s",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                  style={{
                    width: "100%",
                    height: 42,
                    paddingLeft: 40,
                    paddingRight: 42,
                    background: colors.surface2,
                    border: `1px solid ${focusedInput === "password" ? colors.primary : colors.border}`,
                    borderRadius: 10,
                    color: colors.text,
                    fontSize: 14,
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    boxShadow:
                      focusedInput === "password"
                        ? `0 0 0 3px ${colors.primaryGlow}`
                        : "none",
                    boxSizing: "border-box",
                  }}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: colors.textMuted,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? (
                    <Eye style={{ width: 16, height: 16 }} />
                  ) : (
                    <EyeOff style={{ width: 16, height: 16 }} />
                  )}
                </div>
              </div>

              {/* Remember me + Forgot */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "12px 0 20px",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type='checkbox'
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    style={{
                      accentColor: colors.primary,
                      width: 14,
                      height: 14,
                    }}
                  />
                  <span style={{ fontSize: 12, color: colors.textMuted }}>
                    Remember me
                  </span>
                </label>
                <a
                  href='/forgot-password'
                  style={{
                    fontSize: 12,
                    color: colors.primary,
                    textDecoration: "none",
                  }}
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type='submit'
                disabled={isLoggingIn}
                style={{
                  width: "100%",
                  height: 42,
                  borderRadius: 10,
                  background: `linear-gradient(135deg, ${colors.primary}, #5a7de8)`,
                  color: "white",
                  border: "none",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  boxShadow: `0 4px 20px rgba(108,142,245,0.35)`,
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                <AnimatePresence mode='wait'>
                  {isLoggingIn ? (
                    <motion.div
                      key='loading'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTopColor: "white",
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                        }}
                      />
                    </motion.div>
                  ) : (
                    <motion.span
                      key='text'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      Sign In <ArrowRight style={{ width: 15, height: 15 }} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Divider */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "18px 0",
                }}
              >
                <div
                  style={{ flex: 1, height: 1, background: colors.border }}
                />
                <span
                  style={{
                    margin: "0 12px",
                    fontSize: 12,
                    color: colors.textMuted,
                  }}
                >
                  or
                </span>
                <div
                  style={{ flex: 1, height: 1, background: colors.border }}
                />
              </div>

              {/* Google Button */}
              <motion.button
                whileHover={{ scale: 1.02, borderColor: colors.primary }}
                whileTap={{ scale: 0.97 }}
                type='button'
                style={{
                  width: "100%",
                  height: 42,
                  borderRadius: 10,
                  background: colors.surface2,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  fontWeight: 500,
                  fontSize: 13,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "border-color 0.2s",
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: colors.primary,
                  }}
                >
                  G
                </span>
                Sign in with Google
              </motion.button>

              {/* Sign Up */}
              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: colors.textMuted,
                  marginTop: 18,
                  marginBottom: 0,
                }}
              >
                Don't have an account?{" "}
                <Link
                  to='/register'
                  style={{
                    color: colors.accent,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Sign up
                </Link>
              </p>
            </form>

            <style>{`
              @keyframes spin { to { transform: rotate(360deg); } }
              input::placeholder { color: #7B82A8 !important; }
            `}</style>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LoginForm;
