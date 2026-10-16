import React, { useState } from "react";
import "./Settings.css";

const emptyProfile = {
  firstName: "",
  lastName: "",
  gender: "",
  birthMonth: "",
  birthDay: "",
  birthYear: "",
  email: "",
  bloodGroup: "",
  location: "",
  phone: "",
  height: "",
  weight: "",
};

const steps = [
  { id: "profile", label: "Profile information", short: "Profile" },
  { id: "contact", label: "Contact information", short: "Contact" },
  { id: "physical", label: "Physical information", short: "Physical" },
];

function Field({ label, children }) {
  return (
    <label className="nc-settings-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Card({ title, description, children, danger = false }) {
  return (
    <section className={`nc-settings-card${danger ? " nc-settings-danger-card" : ""}`}>
      <header className="nc-settings-card-heading">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </header>
      {children}
    </section>
  );
}

function ProfileStep({ profile, setProfile, onNext }) {
  const update = (key) => (event) =>
    setProfile((current) => ({ ...current, [key]: event.target.value }));
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <Card title="Profile Information" description="Start by adding your personal details.">
      <form className="nc-settings-grid" onSubmit={onNext}>
        <Field label="First name">
          <input value={profile.firstName} onChange={update("firstName")} placeholder="First name" autoComplete="given-name" required />
        </Field>
        <Field label="Last name">
          <input value={profile.lastName} onChange={update("lastName")} placeholder="Last name" autoComplete="family-name" required />
        </Field>
        <Field label="Gender">
          <select value={profile.gender} onChange={update("gender")} required>
            <option value="">Select gender</option><option>Female</option><option>Male</option><option>Prefer not to say</option>
          </select>
        </Field>
        <Field label="Birth month">
          <select value={profile.birthMonth} onChange={update("birthMonth")} required>
            <option value="">Month</option>{months.map((month) => <option key={month}>{month}</option>)}
          </select>
        </Field>
        <Field label="Birth day">
          <select value={profile.birthDay} onChange={update("birthDay")} required>
            <option value="">Day</option>{Array.from({ length: 31 }, (_, i) => String(i + 1)).map((day) => <option key={day}>{day}</option>)}
          </select>
        </Field>
        <Field label="Birth year">
          <select value={profile.birthYear} onChange={update("birthYear")} required>
            <option value="">Year</option>{Array.from({ length: 100 }, (_, i) => String(new Date().getFullYear() - i)).map((year) => <option key={year}>{year}</option>)}
          </select>
        </Field>
        <div className="nc-settings-actions">
          <button className="nc-settings-btn nc-settings-primary" type="submit">Save profile &amp; continue <span aria-hidden="true">→</span></button>
        </div>
      </form>
    </Card>
  );
}

function ContactStep({ profile, setProfile, onNext, onBack }) {
  const update = (key) => (event) =>
    setProfile((current) => ({ ...current, [key]: event.target.value }));

  return (
    <Card title="Contact Information" description="Add the details we can use to contact you.">
      <form className="nc-settings-grid" onSubmit={onNext}>
        <Field label="Email address">
          <input type="email" value={profile.email} onChange={update("email")} placeholder="name@example.com" autoComplete="email" required />
        </Field>
        <Field label="Phone number">
          <input type="tel" value={profile.phone} onChange={update("phone")} placeholder="+93 ..." autoComplete="tel" required />
        </Field>
        <Field label="Your location">
          <input value={profile.location} onChange={update("location")} placeholder="City, country" autoComplete="address-level2" />
        </Field>
        <Field label="Blood group">
          <select value={profile.bloodGroup} onChange={update("bloodGroup")}>
            <option value="">Select blood group (optional)</option>{["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"].map((group) => <option key={group}>{group}</option>)}
          </select>
        </Field>
        <div className="nc-settings-actions nc-settings-actions-between">
          <button className="nc-settings-btn nc-settings-outline" type="button" onClick={onBack}>← Previous</button>
          <button className="nc-settings-btn nc-settings-primary" type="submit">Save contact &amp; continue <span aria-hidden="true">→</span></button>
        </div>
      </form>
    </Card>
  );
}

function PhysicalStep({ profile, setProfile, onFinish, onBack }) {
  return (
    <Card title="Physical Information" description="These details are optional and can help personalize your care.">
      <form className="nc-settings-grid" onSubmit={onFinish}>
        <Field label="Height (cm)">
          <input type="number" min="1" max="300" value={profile.height} onChange={(event) => setProfile((current) => ({ ...current, height: event.target.value }))} placeholder="e.g. 165" />
        </Field>
        <Field label="Weight (kg)">
          <input type="number" min="1" max="700" value={profile.weight} onChange={(event) => setProfile((current) => ({ ...current, weight: event.target.value }))} placeholder="e.g. 58" />
        </Field>
        <p className="nc-settings-note nc-settings-full-width">You can leave these fields blank and update them later.</p>
        <div className="nc-settings-actions nc-settings-actions-between">
          <button className="nc-settings-btn nc-settings-outline" type="button" onClick={onBack}>← Previous</button>
          <button className="nc-settings-btn nc-settings-primary" type="submit">Finish setup <span aria-hidden="true">✓</span></button>
        </div>
      </form>
    </Card>
  );
}

function PasswordSection() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showRules, setShowRules] = useState(true);
  const [message, setMessage] = useState("");

  function submit(event) {
    event.preventDefault();
    if (next.length < 8) return setMessage("Please use at least 8 characters.");
    if (!/[A-Z]/.test(next)) return setMessage("Add at least one uppercase letter.");
    if (!/[0-9]/.test(next)) return setMessage("Add at least one number.");
    if (next !== confirm) return setMessage("The new passwords do not match.");
    setMessage("The form is valid, but changing a real password requires a secure authentication service.");
    setCurrent(""); setNext(""); setConfirm("");
  }

  return (
    <Card title="Change Password" description="Choose a strong password you do not use elsewhere.">
      <form className="nc-settings-password-form" onSubmit={submit}>
        <Field label="Current password"><input type="password" value={current} onChange={(event) => { setCurrent(event.target.value); setMessage(""); }} autoComplete="current-password" placeholder="Current password" required /></Field>
        <Field label="New password"><input type="password" value={next} onChange={(event) => { setNext(event.target.value); setMessage(""); }} autoComplete="new-password" placeholder="New password" required /></Field>
        <Field label="Confirm new password"><input type="password" value={confirm} onChange={(event) => { setConfirm(event.target.value); setMessage(""); }} autoComplete="new-password" placeholder="Confirm new password" required /></Field>
        <button className="nc-settings-btn nc-settings-primary" type="submit">Update password</button>
      </form>
      {message && <p className="nc-settings-inline-message" role="status">{message}</p>}
      <button className="nc-settings-link-button" type="button" onClick={() => setShowRules((value) => !value)}>{showRules ? "Hide password requirements" : "Show password requirements"}</button>
      {showRules && <div className="nc-settings-rules"><h3>Password requirements</h3><ul><li>At least 8 characters</li><li>At least one uppercase letter</li><li>At least one number</li><li>Use a unique password</li></ul></div>}
    </Card>
  );
}

function SecuritySection() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [keys, setKeys] = useState(false);
  return (
    <Card title="Two-Factor Authentication" description="Add another layer of protection to your account.">
      <div className="nc-settings-status-row"><div><h3>Two-factor authentication</h3><p>{twoFactor ? "Enabled in this interface demo" : "Not configured"}</p></div><span className={`nc-settings-badge${twoFactor ? " active" : ""}`}>{twoFactor ? "Enabled" : "Off"}</span></div>
      <button className="nc-settings-btn nc-settings-outline" type="button" onClick={() => setTwoFactor((value) => !value)}>{twoFactor ? "Turn off demo toggle" : "Configure"}</button>
      <div className="nc-settings-divider" />
      <div className="nc-settings-status-row"><div><h3>Security keys</h3><p>{keys ? "Marked as configured in this demo" : "No security keys added"}</p></div></div>
      <button className="nc-settings-btn nc-settings-outline" type="button" onClick={() => setKeys((value) => !value)}>{keys ? "Undo demo setting" : "Add security key"}</button>
      <p className="nc-settings-note">These controls are demos only. Real two-factor authentication requires an authentication provider or backend.</p>
    </Card>
  );
}

function SessionsSection() {
  const [others, setOthers] = useState(true);
  return (
    <Card title="Sessions" description="Review devices that may be signed in to your account.">
      <div className="nc-settings-session"><span className="nc-settings-device" aria-hidden="true">▣</span><div className="nc-settings-session-info"><h3>Current browser session</h3><p>This device · Current session</p></div><span className="nc-settings-badge active">Active</span></div>
      {others && <><div className="nc-settings-session"><span className="nc-settings-device" aria-hidden="true">▣</span><div className="nc-settings-session-info"><h3>Chrome on another device</h3><p>Example session · Demo data</p></div><button className="nc-settings-link-button" type="button" onClick={() => setOthers(false)}>Remove</button></div><div className="nc-settings-session"><span className="nc-settings-device" aria-hidden="true">▯</span><div className="nc-settings-session-info"><h3>Mobile browser</h3><p>Example session · Demo data</p></div><button className="nc-settings-link-button" type="button" onClick={() => setOthers(false)}>Remove</button></div></>}
      <p className="nc-settings-note">Sessions shown here are sample data and do not represent real account sessions.</p>
    </Card>
  );
}

function DeleteSection() {
  const [confirmed, setConfirmed] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <Card title="Delete Account" description="Deleting an account is permanent. Make sure you understand what will be removed." danger>
      <label className="nc-settings-confirm"><input type="checkbox" checked={confirmed} onChange={(event) => { setConfirmed(event.target.checked); setMessage(""); }} /><span>I understand that deleting my account cannot be undone.</span></label>
      <button className="nc-settings-btn nc-settings-danger" type="button" disabled={!confirmed} onClick={() => setMessage("Account deletion is not connected. A secure backend flow is required before an account can be deleted.")}>Delete account</button>
      {message && <p className="nc-settings-inline-message" role="status">{message}</p>}
    </Card>
  );
}

export default function SettingsPage() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState(emptyProfile);
  const [completed, setCompleted] = useState(false);

  function nextStep(event) {
    event.preventDefault();
    setStep((current) => Math.min(current + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function finishSetup(event) {
    event.preventDefault();
    // Demo persistence: keep the profile on this browser so it remains after refresh.
    try {
      window.localStorage.setItem("novacareSettingsProfile", JSON.stringify(profile));
    } catch {
      // The success screen can still be shown if browser storage is unavailable.
    }
    setCompleted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startAgain() {
    setStep(0);
    setCompleted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="nc-settings-page">
      <div className="nc-settings-content">
        <header className="nc-settings-wizard-header">
          <span className="nc-settings-eyebrow">NOVACARE ACCOUNT</span>
          <h1>Complete your profile</h1>
          <p>Complete each step below. Your information stays in this form until you finish.</p>
        </header>

        <div className="nc-settings-stepper" aria-label="Profile setup progress">
          {steps.map((item, index) => (
            <div key={item.id} className={`nc-settings-step${index === step && !completed ? " current" : ""}${index < step || completed ? " completed" : ""}`}>
              <span className="nc-settings-step-number">{index < step || completed ? "✓" : index + 1}</span>
              <span className="nc-settings-step-label">{item.short}</span>
            </div>
          ))}
        </div>

        {!completed && step === 0 && <ProfileStep profile={profile} setProfile={setProfile} onNext={nextStep} />}
        {!completed && step === 1 && <ContactStep profile={profile} setProfile={setProfile} onNext={nextStep} onBack={previousStep} />}
        {!completed && step === 2 && <PhysicalStep profile={profile} setProfile={setProfile} onFinish={finishSetup} onBack={previousStep} />}

        {completed && (
          <section className="nc-settings-success" role="status" aria-live="polite">
            <div className="nc-settings-success-icon" aria-hidden="true">✓</div>
            <span className="nc-settings-eyebrow">SETUP COMPLETE</span>
            <h2>Your profile has been successfully completed!</h2>
            <p>Thank you, {profile.firstName}. Your profile information has been saved in this browser for this demo.</p>
            <div className="nc-settings-success-summary">
              <span><strong>Name</strong>{profile.firstName} {profile.lastName}</span>
              <span><strong>Email</strong>{profile.email}</span>
              <span><strong>Phone</strong>{profile.phone}</span>
            </div>
            <button className="nc-settings-btn nc-settings-primary" type="button" onClick={startAgain}>Edit profile</button>
          </section>
        )}

        <div className="nc-settings-divider" />
        <header className="nc-settings-secondary-heading">
          <h2>Account preferences</h2>
          <p>Other account controls are available below.</p>
        </header>
        <PasswordSection />
        <SecuritySection />
        <SessionsSection />
        <DeleteSection />
        <p className="nc-settings-footer">NovaCare · Account preferences</p>
      </div>
    </main>
  );
}
