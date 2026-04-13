import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Camera,
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import useUser from "../hooks/useUser";
import { getRoleHomePath } from "../utils/getRoleHomePath";

function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const { register, isRegistering } = useRegister();
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

  /* ── password validation ── */
  const passwordMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const passwordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  /* ── 3D tilt ── */
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

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file); // للرفع على Supabase
    setAvatar(URL.createObjectURL(file)); // للـ preview بس
  };

  /* ── submit ── */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordMismatch) return;

    register({ email, password, fullName, avatarFile });
  };

  /* ── colors ── */
  const colors = {
    bg: "#0F1117",
    surface: "#1A1D2E",
    surface2: "#232741",
    border: "#2E3250",
    primary: "#6C8EF5",
    primaryGlow: "rgba(108,142,245,0.15)",
    accent: "#5ECFB1",
    danger: "#E05C6A",
    text: "#E8EAF6",
    textMuted: "#7B82A8",
  };

  /* ── reusable style helpers ── */
  const inputStyle = (field) => ({
    width: "100%",
    height: 42,
    paddingLeft: 40,
    paddingRight: field === "password" || field === "confirm" ? 42 : 12,
    background: colors.surface2,
    border: `1px solid ${
      field === "confirm" && passwordMismatch
        ? colors.danger
        : field === "confirm" && passwordMatch
          ? colors.accent
          : focusedInput === field
            ? colors.primary
            : colors.border
    }`,
    borderRadius: 10,
    color: colors.text,
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow:
      focusedInput === field
        ? `0 0 0 3px ${colors.primaryGlow}`
        : field === "confirm" && passwordMismatch
          ? "0 0 0 3px rgba(224,92,106,0.12)"
          : field === "confirm" && passwordMatch
            ? "0 0 0 3px rgba(94,207,177,0.12)"
            : "none",
    boxSizing: "border-box",
  });

  const iconStyle = (field) => ({
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    width: 16,
    height: 16,
    color: focusedInput === field ? colors.primary : colors.textMuted,
    transition: "color 0.2s",
  });

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
      {/* توهجات الخلفية */}
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
            "radial-gradient(ellipse, rgba(108,142,245,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "50vw",
          height: "40vh",
          background:
            "radial-gradient(ellipse, rgba(94,207,177,0.07) 0%, transparent 70%)",
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
          maxWidth: 420,
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
            {/* خط علوي بلون accent */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "20%",
                right: "20%",
                height: 2,
                background: `linear-gradient(to right, transparent, ${colors.accent}, transparent)`,
                opacity: 0.5,
              }}
            />

            {/* هيدر */}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
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
                  margin: "0 0 4px",
                  fontSize: 22,
                  fontWeight: 700,
                  color: colors.text,
                  fontFamily: '"Sora", sans-serif',
                }}
              >
                Create Account
              </h1>
              <p style={{ margin: 0, fontSize: 13, color: colors.textMuted }}>
                Join Clarify today
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* ---- صورة البروفايل ---- */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <div style={{ position: "relative" }}>
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => fileInputRef.current.click()}
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      cursor: "pointer",
                      background: colors.surface2,
                      border: `2px dashed ${avatar ? colors.accent : colors.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      position: "relative",
                      transition: "border-color 0.2s",
                      boxShadow: avatar
                        ? "0 0 16px rgba(94,207,177,0.2)"
                        : "none",
                    }}
                  >
                    <AnimatePresence mode='wait'>
                      {avatar ? (
                        <motion.img
                          key='avatar'
                          src={avatar}
                          alt='avatar'
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <motion.div
                          key='placeholder'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Camera
                            style={{
                              width: 20,
                              height: 20,
                              color: colors.textMuted,
                            }}
                          />
                          <span
                            style={{ fontSize: 10, color: colors.textMuted }}
                          >
                            Photo
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* زرار إزالة الصورة */}
                  <AnimatePresence>
                    {avatar && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        type='button'
                        onClick={() => setAvatar(null)}
                        style={{
                          position: "absolute",
                          top: -4,
                          right: -4,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: colors.danger,
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        <X style={{ width: 11, height: 11, color: "white" }} />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
              </div>

              {/* ---- Full Name ---- */}
              <div style={{ position: "relative", marginBottom: 10 }}>
                <User style={iconStyle("name")} />
                <input
                  type='text'
                  placeholder='Full name'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                  style={inputStyle("name")}
                />
              </div>

              {/* ---- Email ---- */}
              <div style={{ position: "relative", marginBottom: 10 }}>
                <Mail style={iconStyle("email")} />
                <input
                  type='email'
                  placeholder='Email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                  style={inputStyle("email")}
                />
              </div>

              {/* ---- Password ---- */}
              <div style={{ position: "relative", marginBottom: 10 }}>
                <Lock style={iconStyle("password")} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                  style={inputStyle("password")}
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

              {/* ---- Confirm Password ---- */}
              <div style={{ position: "relative", marginBottom: 10 }}>
                <Lock
                  style={{
                    ...iconStyle("confirm"),
                    color: passwordMatch
                      ? colors.accent
                      : passwordMismatch
                        ? colors.danger
                        : focusedInput === "confirm"
                          ? colors.primary
                          : colors.textMuted,
                  }}
                />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedInput("confirm")}
                  onBlur={() => setFocusedInput(null)}
                  style={inputStyle("confirm")}
                />
                {/* أيقونة يمين — check / x + toggle */}
                <div
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <AnimatePresence>
                    {passwordMatch && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check
                          style={{
                            width: 14,
                            height: 14,
                            color: colors.accent,
                          }}
                        />
                      </motion.div>
                    )}
                    {passwordMismatch && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <X
                          style={{
                            width: 14,
                            height: 14,
                            color: colors.danger,
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div
                    onClick={() => setShowConfirm(!showConfirm)}
                    style={{
                      cursor: "pointer",
                      color: colors.textMuted,
                      display: "flex",
                    }}
                  >
                    {showConfirm ? (
                      <Eye style={{ width: 16, height: 16 }} />
                    ) : (
                      <EyeOff style={{ width: 16, height: 16 }} />
                    )}
                  </div>
                </div>
              </div>

              {/* رسالة خطأ passwords */}
              <AnimatePresence>
                {passwordMismatch && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      margin: "0 0 8px",
                      fontSize: 11,
                      color: colors.danger,
                      paddingLeft: 4,
                    }}
                  >
                    Passwords don't match
                  </motion.p>
                )}
              </AnimatePresence>

              {/* ---- Register Button ---- */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type='submit'
                disabled={isRegistering || passwordMismatch}
                style={{
                  width: "100%",
                  height: 42,
                  borderRadius: 10,
                  marginTop: 8,
                  background: passwordMismatch
                    ? colors.surface2
                    : `linear-gradient(135deg, ${colors.primary}, #5a7de8)`,
                  color: passwordMismatch ? colors.textMuted : "white",
                  border: `1px solid ${passwordMismatch ? colors.border : "transparent"}`,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: passwordMismatch ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  boxShadow: passwordMismatch
                    ? "none"
                    : "0 4px 20px rgba(108,142,245,0.3)",
                  transition: "all 0.2s",
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                <AnimatePresence mode='wait'>
                  {isRegistering ? (
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
                      Create Account{" "}
                      <ArrowRight style={{ width: 15, height: 15 }} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Divider */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "16px 0",
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
                Sign up with Google
              </motion.button>

              {/* Sign In link */}
              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: colors.textMuted,
                  marginTop: 16,
                  marginBottom: 0,
                }}
              >
                Already have an account?{" "}
                <Link
                  to='/login'
                  style={{
                    color: colors.accent,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Sign in
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

export default RegisterForm;
