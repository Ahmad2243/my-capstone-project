import React, { useState, useMemo, useCallback } from "react";
import { Check, X, Eye, EyeOff, AlertCircle, CheckCircle2, User } from "lucide-react";

const FONT_IMPORT = "@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');";

const INITIAL = {
  fullName: "Maren Okafor",
  username: "maren_o",
  email: "maren@example.com",
  bio: "Product designer based in Amsterdam. I like slow mornings and fast prototypes.",
  phone: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function validateField(name, value, all) {
  switch (name) {
    case "fullName": {
      const v = value.trim();
      if (!v) return "Enter your full name.";
      if (v.length < 2) return "Name must be at least 2 characters.";
      if (v.length > 60) return "Name must be under 60 characters.";
      return "";
    }
    case "username": {
      const v = value.trim();
      if (!v) return "Choose a username.";
      if (v.length < 3 || v.length > 20) return "Username must be 3–20 characters.";
      if (!/^[a-zA-Z0-9_]+$/.test(v)) return "Only letters, numbers, and underscores.";
      if (/^[0-9]/.test(v)) return "Username can't start with a number.";
      return "";
    }
    case "email": {
      const v = value.trim();
      if (!v) return "Enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address.";
      return "";
    }
    case "bio": {
      if (value.length > 160) return "Bio must be 160 characters or fewer.";
      return "";
    }
    case "phone": {
      if (!value.trim()) return "";
      if (!/^[+]?[\d\s().-]{7,20}$/.test(value.trim())) return "Enter a valid phone number.";
      return "";
    }
    case "currentPassword": {
      const wantsChange = all.newPassword || all.confirmPassword;
      if (wantsChange && !value) return "Enter your current password.";
      return "";
    }
    case "newPassword": {
      if (!value) return "";
      if (value.length < 8) return "Use at least 8 characters.";
      if (!/[A-Z]/.test(value)) return "Add an uppercase letter.";
      if (!/[0-9]/.test(value)) return "Add a number.";
      return "";
    }
    case "confirmPassword": {
      if (!all.newPassword) return "";
      if (value !== all.newPassword) return "Passwords don't match.";
      return "";
    }
    default:
      return "";
  }
}

function passwordStrength(pw) {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 4);
}

const STRENGTH_LABELS = ["Weak", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["#B3432E", "#B3432E", "#C08A2E", "#2B4C5C", "#3F7A54"];

function FieldLabel({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10.5px",
        fontWeight: 500,
        letterSpacing: "0.09em",
        textTransform: "uppercase",
        color: "#6B6D70",
      }}
      className="block mb-1.5"
    >
      {children}
    </label>
  );
}

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p
      className="flex items-center gap-1 mt-1.5"
      style={{ fontSize: "12.5px", color: "#B3432E", fontFamily: "Inter, sans-serif" }}
    >
      <AlertCircle size={12} strokeWidth={2.25} className="shrink-0" />
      {message}
    </p>
  );
}

function baseInputStyle(hasError, hasValue) {
  return {
    fontFamily: "Inter, sans-serif",
    fontSize: "14.5px",
    color: "#17181A",
    background: "#FFFFFF",
    border: `1.5px solid ${hasError ? "#B3432E" : "#E2E1DC"}`,
    borderRadius: "7px",
    padding: "9px 12px",
    width: "100%",
    outline: "none",
    transition: "border-color 120ms ease",
  };
}

export default function ProfileSettingsForm() {
  const [values, setValues] = useState(INITIAL);
  const [touched, setTouched] = useState({});
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved

  const errors = useMemo(() => {
    const e = {};
    Object.keys(values).forEach((key) => {
      e[key] = validateField(key, values[key], values);
    });
    return e;
  }, [values]);

  const isValid = Object.values(errors).every((e) => !e);
  const strength = passwordStrength(values.newPassword);

  const completeness = useMemo(() => {
    const fields = ["fullName", "username", "email", "bio", "phone"];
    const filled = fields.filter((f) => values[f].trim().length > 0).length;
    return Math.round((filled / fields.length) * 100);
  }, [values]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }, []);

  const handleBlur = useCallback((e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  }, []);

  const showError = (name) => (touched[name] || submitted) && errors[name];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) return;
    setSaveState("saving");
    setTimeout(() => {
      setSaveState("saved");
      setValues((v) => ({ ...v, currentPassword: "", newPassword: "", confirmPassword: "" }));
      setTouched({});
      setSubmitted(false);
      setTimeout(() => setSaveState("idle"), 2200);
    }, 700);
  };

  return (
    <div style={{ background: "#F6F5F1", minHeight: "100%", padding: "40px 20px" }}>
      <style>{FONT_IMPORT}</style>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <div className="flex items-center justify-between mb-1">
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 600,
              fontSize: "26px",
              color: "#17181A",
              letterSpacing: "-0.01em",
            }}
          >
            Profile settings
          </h1>
          <div className="flex items-center gap-2">
            <div
              style={{
                width: "40px",
                height: "3px",
                background: "#E2E1DC",
                borderRadius: "2px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: `${completeness}%`,
                  height: "100%",
                  background: "#2B4C5C",
                  transition: "width 200ms ease",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                color: "#6B6D70",
              }}
            >
              {completeness}%
            </span>
          </div>
        </div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6D70" }} className="mb-8">
          Update your personal information and password.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {/* Identity section */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E1DC",
              borderRadius: "12px",
              padding: "22px 22px 26px",
            }}
            className="mb-5"
          >
            <div className="flex items-center gap-2 mb-5">
              <User size={15} strokeWidth={2} color="#2B4C5C" />
              <h2
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 600,
                  fontSize: "15.5px",
                  color: "#17181A",
                }}
              >
                Identity
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <FieldLabel htmlFor="fullName">Full name</FieldLabel>
                <input
                  id="fullName"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={baseInputStyle(showError("fullName"))}
                  placeholder="Jordan Alvarez"
                />
                <FieldError message={showError("fullName")} />
              </div>
              <div>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#B4B2A9",
                      fontSize: "14.5px",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    @
                  </span>
                  <input
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ ...baseInputStyle(showError("username")), paddingLeft: "24px" }}
                    placeholder="jordan_a"
                  />
                </div>
                <FieldError message={showError("username")} />
              </div>
            </div>

            <div className="mb-4">
              <FieldLabel htmlFor="email">Email address</FieldLabel>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                style={baseInputStyle(showError("email"))}
                placeholder="name@company.com"
              />
              <FieldError message={showError("email")} />
            </div>

            <div className="mb-4">
              <div className="flex items-baseline justify-between mb-1.5">
                <FieldLabel htmlFor="bio">Bio</FieldLabel>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10.5px",
                    color: values.bio.length > 160 ? "#B3432E" : "#B4B2A9",
                  }}
                >
                  {values.bio.length}/160
                </span>
              </div>
              <textarea
                id="bio"
                name="bio"
                value={values.bio}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={3}
                style={{ ...baseInputStyle(showError("bio")), resize: "none", lineHeight: 1.5 }}
                placeholder="Tell people a little about yourself"
              />
              <FieldError message={showError("bio")} />
            </div>

            <div>
              <FieldLabel htmlFor="phone">Phone (optional)</FieldLabel>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                style={baseInputStyle(showError("phone"))}
                placeholder="+31 6 1234 5678"
              />
              <FieldError message={showError("phone")} />
            </div>
          </div>

          {/* Password section */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E1DC",
              borderRadius: "12px",
              padding: "22px 22px 26px",
            }}
            className="mb-6"
          >
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 600,
                fontSize: "15.5px",
                color: "#17181A",
              }}
              className="mb-1"
            >
              Password
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6D70" }} className="mb-5">
              Leave blank to keep your current password.
            </p>

            <div className="mb-4">
              <FieldLabel htmlFor="currentPassword">Current password</FieldLabel>
              <div style={{ position: "relative" }}>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  value={values.currentPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ ...baseInputStyle(showError("currentPassword")), paddingRight: "38px" }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((s) => !s)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#6B6D70",
                    cursor: "pointer",
                    padding: "2px",
                    display: "flex",
                  }}
                  aria-label={showCurrent ? "Hide password" : "Show password"}
                >
                  {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <FieldError message={showError("currentPassword")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor="newPassword">New password</FieldLabel>
                <div style={{ position: "relative" }}>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showNew ? "text" : "password"}
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ ...baseInputStyle(showError("newPassword")), paddingRight: "38px" }}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((s) => !s)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#6B6D70",
                      cursor: "pointer",
                      padding: "2px",
                      display: "flex",
                    }}
                    aria-label={showNew ? "Hide password" : "Show password"}
                  >
                    {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {values.newPassword && (
                  <div className="flex items-center gap-1.5 mt-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          height: "3px",
                          flex: 1,
                          borderRadius: "2px",
                          background: i < strength ? STRENGTH_COLORS[strength] : "#E2E1DC",
                          transition: "background 150ms ease",
                        }}
                      />
                    ))}
                  </div>
                )}
                {values.newPassword && (
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10.5px",
                      color: STRENGTH_COLORS[strength],
                      marginTop: "5px",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {STRENGTH_LABELS[strength]}
                  </p>
                )}
                <FieldError message={showError("newPassword")} />
              </div>

              <div>
                <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
                <div style={{ position: "relative" }}>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showNew ? "text" : "password"}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ ...baseInputStyle(showError("confirmPassword")), paddingRight: "38px" }}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  {values.confirmPassword && values.confirmPassword === values.newPassword && (
                    <Check
                      size={15}
                      color="#3F7A54"
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                  )}
                </div>
                <FieldError message={showError("confirmPassword")} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                color: "#FFFFFF",
                background: saveState === "saved" ? "#3F7A54" : "#2B4C5C",
                border: "none",
                borderRadius: "7px",
                padding: "10px 20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "7px",
                transition: "background 150ms ease",
              }}
            >
              {saveState === "saving" && "Saving…"}
              {saveState === "saved" && (
                <>
                  <CheckCircle2 size={15} /> Saved
                </>
              )}
              {saveState === "idle" && "Save changes"}
            </button>
            {submitted && !isValid && (
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#B3432E" }}>
                Fix the errors above to continue.
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
