import { useState, useRef, useEffect } from 'react'
// If your main component file has a different name (for example ClaudeApp.jsx),
// change ONLY this line, e.g.:  import App from './ClaudeApp.jsx'
import App from './ClaudeApp.jsx'

/* ------------------------------------------------------------------ */
/* FRONTEND DEMO ONLY: this is NOT real authentication.                */
/* Accounts live in this browser's localStorage. Passwords are never   */
/* stored in plain text (salted PBKDF2 hash), but this is still not    */
/* secure. See the notes in the instructions.                          */
/* ------------------------------------------------------------------ */

const SESSION_KEY = 'ks_session'
const ACCOUNTS_KEY = 'ks_accounts'
const LANG_KEY = 'ks_lang' // same key the main app uses for its language

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'mr', label: 'मराठी' },
]
const EDU = ['1', '2', '3', '4']

/* ---------------------------- translations ---------------------------- */
const AT = {
  en: {
    tagline: 'Learn a skill. Build your future.',
    welcomeTitle: 'Welcome to KaushalSetu',
    welcomeText: 'Discover your strengths, learn useful skills and find opportunities.',
    loginBtn: 'Login', createBtn: 'Create Account',
    demoBanner: 'DEMO ONLY: accounts are saved only on this device. This is not a real, secure login. Do not use a password that you use anywhere else.',
    langLabel: 'Language',
    loginTitle: 'Login', registerTitle: 'Create your account',
    contact: 'Email or mobile number', contactHint: 'Example: name@example.com or 9876543210',
    password: 'Password', pwHint: 'At least 6 characters',
    confirm: 'Type the password again',
    show: 'Show', hide: 'Hide',
    fullName: 'Full name', education: 'Education level',
    prefLang: 'Preferred language', district: 'District or village (optional)',
    selectPh: 'Select one',
    e_1: 'Class 9–10', e_2: 'Class 11–12', e_3: 'Diploma', e_4: 'Graduation',
    back: 'Back',
    toRegister: 'New here? Create an account', toLogin: 'Already have an account? Login',
    wait: 'Please wait…',
    errSummary: 'Please fix the marked fields.',
    errName: 'Please enter your full name (at least 2 letters).',
    errContact: 'Enter a valid email or a 10-digit mobile number.',
    errPwShort: 'Password must have at least 6 characters.',
    errPwEmpty: 'Please enter your password.',
    errPwMatch: 'The two passwords do not match.',
    errEdu: 'Please choose your education level.',
    errLang: 'Please choose a language.',
    errLogin: 'Email/mobile or password is not correct. Please check and try again. Demo accounts exist only on this device.',
    errExists: 'An account with this email or mobile already exists on this device. Please login.',
    errNoCrypto: 'This browser cannot protect passwords on this address. Open the app on localhost or an https address.',
    errStorage: 'Could not save the account. Browser storage may be blocked or full.',
    errTitle: 'Problem:',
    logout: 'Log out', logoutLabel: 'Log out of KaushalSetu',
  },
  hi: {
    tagline: 'एक कौशल सीखें। अपना भविष्य बनाएं।',
    welcomeTitle: 'कौशलसेतु में आपका स्वागत है',
    welcomeText: 'अपनी ताकत खोजें, उपयोगी कौशल सीखें और अवसर पाएं।',
    loginBtn: 'लॉगिन', createBtn: 'खाता बनाएं',
    demoBanner: 'केवल डेमो: खाते सिर्फ़ इसी डिवाइस पर सहेजे जाते हैं। यह असली, सुरक्षित लॉगिन नहीं है। ऐसा पासवर्ड न डालें जो आप कहीं और इस्तेमाल करते हैं।',
    langLabel: 'भाषा',
    loginTitle: 'लॉगिन करें', registerTitle: 'अपना खाता बनाएं',
    contact: 'ईमेल या मोबाइल नंबर', contactHint: 'जैसे: name@example.com या 9876543210',
    password: 'पासवर्ड', pwHint: 'कम से कम 6 अक्षर',
    confirm: 'पासवर्ड दोबारा लिखें',
    show: 'दिखाएं', hide: 'छिपाएं',
    fullName: 'पूरा नाम', education: 'शिक्षा का स्तर',
    prefLang: 'पसंदीदा भाषा', district: 'जिला या गांव (वैकल्पिक)',
    selectPh: 'एक चुनें',
    e_1: 'कक्षा 9–10', e_2: 'कक्षा 11–12', e_3: 'डिप्लोमा', e_4: 'स्नातक',
    back: 'वापस',
    toRegister: 'नए हैं? खाता बनाएं', toLogin: 'पहले से खाता है? लॉगिन करें',
    wait: 'कृपया प्रतीक्षा करें…',
    errSummary: 'कृपया चिह्नित खाने ठीक करें।',
    errName: 'कृपया अपना पूरा नाम लिखें (कम से कम 2 अक्षर)।',
    errContact: 'सही ईमेल या 10 अंकों का मोबाइल नंबर लिखें।',
    errPwShort: 'पासवर्ड में कम से कम 6 अक्षर होने चाहिए।',
    errPwEmpty: 'कृपया अपना पासवर्ड लिखें।',
    errPwMatch: 'दोनों पासवर्ड एक जैसे नहीं हैं।',
    errEdu: 'कृपया अपनी शिक्षा का स्तर चुनें।',
    errLang: 'कृपया भाषा चुनें।',
    errLogin: 'ईमेल/मोबाइल या पासवर्ड सही नहीं है। कृपया जांचकर दोबारा कोशिश करें। डेमो खाते केवल इसी डिवाइस पर होते हैं।',
    errExists: 'इस ईमेल या मोबाइल से इस डिवाइस पर खाता पहले से है। कृपया लॉगिन करें।',
    errNoCrypto: 'इस पते पर यह ब्राउज़र पासवर्ड सुरक्षित नहीं कर सकता। ऐप को localhost या https पते पर खोलें।',
    errStorage: 'खाता सहेजा नहीं जा सका। ब्राउज़र स्टोरेज बंद या भरा हो सकता है।',
    errTitle: 'समस्या:',
    logout: 'लॉग आउट', logoutLabel: 'कौशलसेतु से लॉग आउट करें',
  },
  mr: {
    tagline: 'एक कौशल्य शिका. आपले भविष्य घडवा.',
    welcomeTitle: 'कौशलसेतूमध्ये आपले स्वागत आहे',
    welcomeText: 'आपली बलस्थाने शोधा, उपयुक्त कौशल्ये शिका आणि संधी मिळवा.',
    loginBtn: 'लॉगिन', createBtn: 'खाते तयार करा',
    demoBanner: 'फक्त डेमो: खाती फक्त याच उपकरणावर जतन होतात. हे खरे, सुरक्षित लॉगिन नाही. इतरत्र वापरता तो पासवर्ड वापरू नका.',
    langLabel: 'भाषा',
    loginTitle: 'लॉगिन करा', registerTitle: 'आपले खाते तयार करा',
    contact: 'ईमेल किंवा मोबाइल नंबर', contactHint: 'उदा.: name@example.com किंवा 9876543210',
    password: 'पासवर्ड', pwHint: 'किमान 6 अक्षरे',
    confirm: 'पासवर्ड पुन्हा लिहा',
    show: 'दाखवा', hide: 'लपवा',
    fullName: 'पूर्ण नाव', education: 'शिक्षणाचे स्तर',
    prefLang: 'पसंतीची भाषा', district: 'जिल्हा किंवा गाव (ऐच्छिक)',
    selectPh: 'एक निवडा',
    e_1: 'इयत्ता ९–१०', e_2: 'इयत्ता ११–१२', e_3: 'डिप्लोमा', e_4: 'पदवी',
    back: 'मागे',
    toRegister: 'नवीन आहात? खाते तयार करा', toLogin: 'आधीच खाते आहे? लॉगिन करा',
    wait: 'कृपया थांबा…',
    errSummary: 'कृपया खूण केलेली रकाने दुरुस्त करा.',
    errName: 'कृपया तुमचे पूर्ण नाव लिहा (किमान 2 अक्षरे).',
    errContact: 'योग्य ईमेल किंवा 10 अंकी मोबाइल नंबर लिहा.',
    errPwShort: 'पासवर्डमध्ये किमान 6 अक्षरे असावीत.',
    errPwEmpty: 'कृपया तुमचा पासवर्ड लिहा.',
    errPwMatch: 'दोन्ही पासवर्ड सारखे नाहीत.',
    errEdu: 'कृपया तुमचे शिक्षणाचे स्तर निवडा.',
    errLang: 'कृपया भाषा निवडा.',
    errLogin: 'ईमेल/मोबाइल किंवा पासवर्ड बरोबर नाही. कृपया तपासून पुन्हा प्रयत्न करा. डेमो खाती फक्त याच उपकरणावर असतात.',
    errExists: 'या ईमेल किंवा मोबाइलने या उपकरणावर खाते आधीच आहे. कृपया लॉगिन करा.',
    errNoCrypto: 'या पत्त्यावर हा ब्राउझर पासवर्ड सुरक्षित करू शकत नाही. अ‍ॅप localhost किंवा https पत्त्यावर उघडा.',
    errStorage: 'खाते जतन करता आले नाही. ब्राउझर स्टोरेज बंद किंवा भरलेले असू शकते.',
    errTitle: 'अडचण:',
    logout: 'लॉग आउट', logoutLabel: 'कौशलसेतूमधून लॉग आउट करा',
  },
}

/* ------------------------------ helpers ------------------------------- */
const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
const writeJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}
const readAccounts = () => {
  const list = readJSON(ACCOUNTS_KEY, [])
  return Array.isArray(list) ? list : []
}

// Accepts an email or an Indian 10-digit mobile number. Returns a normalised id or null.
function parseContact(raw) {
  const v = (raw || '').trim()
  if (!v) return null
  if (v.includes('@')) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? 'e:' + v.toLowerCase() : null
  }
  let d = v.replace(/[\s\-()]/g, '')
  if (d.startsWith('+91')) d = d.slice(3)
  else if (/^91\d{10}$/.test(d)) d = d.slice(2)
  else if (/^0\d{10}$/.test(d)) d = d.slice(1)
  return /^[6-9]\d{9}$/.test(d) ? 'p:' + d : null
}

const cryptoOk = () => Boolean(window.crypto && window.crypto.subtle && window.crypto.getRandomValues)
const toHex = (buf) => Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
const fromHex = (hex) => new Uint8Array(hex.match(/../g).map((h) => parseInt(h, 16)))
const newSalt = () => toHex(window.crypto.getRandomValues(new Uint8Array(16)))

// Salted PBKDF2 hash. The password itself is never stored.
async function hashPassword(password, saltHex) {
  const key = await window.crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await window.crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: fromHex(saltHex), iterations: 100000, hash: 'SHA-256' },
    key,
    256
  )
  return toHex(bits)
}

/* -------------------------------- styles ------------------------------ */
const AUTH_CSS = `
.ksa-root{width:100%;min-height:100vh;background:linear-gradient(180deg,#eaf6fb 0%,#ffffff 60%);color:var(--ink-900,#10292b);text-align:left;font-size:1rem;line-height:1.5}
.ksa-root *{box-sizing:border-box}
.ksa-wrap{max-width:520px;margin:0 auto;padding:20px 16px 40px}
.ksa-row{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.ksa-center{justify-content:center}
.ksa-lang{display:flex;gap:6px;justify-content:flex-end;flex-wrap:wrap;margin-bottom:16px}
.ksa-pill,.ksa-btn{font:inherit;min-height:48px;padding:10px 18px;border-radius:12px;border:2px solid var(--teal-700,#0f766e);background:var(--teal-700,#0f766e);color:#fff;font-weight:600;cursor:pointer}
.ksa-pill{padding:8px 14px;border-radius:999px;background:#fff;color:var(--teal-700,#0f766e)}
.ksa-pill[aria-pressed="true"]{background:var(--teal-700,#0f766e);color:#fff}
.ksa-btn.alt{background:#fff;color:var(--teal-700,#0f766e)}
.ksa-btn.block{width:100%}
.ksa-btn:hover,.ksa-pill:hover{filter:brightness(.94)}
.ksa-btn[disabled]{opacity:.6;cursor:not-allowed}
.ksa-btn:focus-visible,.ksa-pill:focus-visible,.ksa-input:focus-visible,.ksa-link:focus-visible,.ksa-title:focus-visible{outline:3px solid #f59e0b;outline-offset:2px}
.ksa-hero{background:var(--teal-100,#ccfbf1);border-radius:20px;padding:32px 20px;text-align:center}
.ksa-hero h1{margin:12px 0 6px;font-size:clamp(1.6rem,6vw,2.2rem);color:var(--teal-700,#0f766e)}
.ksa-tag{font-size:1.15rem;font-weight:600;margin:0 0 8px}
.ksa-card{background:var(--white,#fff);border:1px solid #cfe5e7;border-radius:16px;padding:20px;box-shadow:var(--shadow-md,0 4px 12px rgba(0,0,0,.08))}
.ksa-title{margin:0 0 12px;color:var(--teal-700,#0f766e);font-size:1.5rem}
.ksa-stack>*+*{margin-top:16px}
.ksa-field{display:block}
.ksa-label{display:block;font-weight:600;margin-bottom:4px}
.ksa-hint{margin:0 0 6px;font-size:.9rem;color:#456}
.ksa-input{width:100%;min-height:48px;padding:10px 12px;font:inherit;border:2px solid #9fcfd1;border-radius:12px;background:#fff;color:inherit}
.ksa-input[aria-invalid="true"]{border-color:#b42318}
.ksa-pw{display:flex;gap:8px}
.ksa-pw .ksa-input{flex:1;min-width:0}
.ksa-pw .ksa-btn{padding:8px 14px}
.ksa-err{margin:6px 0 0;color:#b42318;font-size:.95rem}
.ksa-error{background:#fef3f2;border:1px solid #fda29b;color:#b42318;border-radius:12px;padding:10px 14px;margin:0}
.ksa-note{background:#fffbeb;border:1px solid #fcd34d;border-radius:12px;padding:10px 14px;font-size:.95rem;margin:16px 0 0}
.ksa-link{background:none;border:0;padding:12px 4px;min-height:48px;font:inherit;color:var(--teal-700,#0f766e);text-decoration:underline;cursor:pointer;font-weight:600}
.ksa-bar{background:var(--teal-700,#0f766e);color:#fff;padding:8px 16px}
.ksa-bar-in{max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;justify-content:space-between}
.ksa-bar strong{font-weight:700}
.ksa-bar .ksa-btn{min-height:44px;padding:6px 16px;background:#fff;color:var(--teal-700,#0f766e);border-color:#fff}
@media (max-width:600px){.ksa-btn.block-sm{width:100%}}
`

/* ------------------------- small shared pieces ------------------------ */
function Logo() {
  return (
    <svg width="56" height="56" viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#0f766e" />
      <path d="M6 32 Q24 10 42 32" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M6 34h36M14 26v8M24 20v14M34 26v8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function Field({ id, label, hint, error, children }) {
  return (
    <div className="ksa-field">
      <label className="ksa-label" htmlFor={id}>{label}</label>
      {hint && <p className="ksa-hint" id={id + '-hint'}>{hint}</p>}
      {children}
      {error && <p className="ksa-err" id={id + '-err'} role="alert">{error}</p>}
    </div>
  )
}

const describe = (id, hasHint, hasError) =>
  [hasHint ? id + '-hint' : '', hasError ? id + '-err' : ''].filter(Boolean).join(' ') || undefined

function PasswordInput({ id, value, onChange, t, autoComplete, hasHint, error }) {
  const [show, setShow] = useState(false)
  return (
    <div className="ksa-pw">
      <input
        id={id} className="ksa-input" type={show ? 'text' : 'password'} value={value}
        onChange={onChange} autoComplete={autoComplete}
        aria-invalid={error ? 'true' : 'false'} aria-describedby={describe(id, hasHint, Boolean(error))}
      />
      <button type="button" className="ksa-btn alt" aria-pressed={show} onClick={() => setShow((s) => !s)}>
        {show ? t('hide') : t('show')}
      </button>
    </div>
  )
}

/* ------------------------------ login form ---------------------------- */
function LoginForm({ t, onAuthed }) {
  const [f, setF] = useState({ contact: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)

  const set = (k, v) => { setF((s) => ({ ...s, [k]: v })); setErrors((e) => ({ ...e, [k]: '' })); setFormError('') }

  const submit = async (ev) => {
    ev.preventDefault()
    const errs = {}
    const contact = parseContact(f.contact)
    if (!contact) errs.contact = 'errContact'
    if (!f.password) errs.password = 'errPwEmpty'
    if (Object.keys(errs).length) { setErrors(errs); setFormError('errSummary'); return }
    if (!cryptoOk()) { setFormError('errNoCrypto'); return }

    setBusy(true)
    try {
      const account = readAccounts().find((a) => a.id === contact)
      const hash = account ? await hashPassword(f.password, account.salt) : null
      if (!account || hash !== account.hash) { setFormError('errLogin'); return }
      if (!writeJSON(SESSION_KEY, { id: account.id, name: account.name })) { setFormError('errStorage'); return }
      writeJSON(LANG_KEY, account.lang) // the main app starts in the learner's preferred language
      onAuthed({ id: account.id, name: account.name })
    } catch {
      setFormError('errStorage')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="ksa-stack" onSubmit={submit} noValidate>
      {formError && <p className="ksa-error" role="alert">{t('errTitle')} {t(formError)}</p>}
      <Field id="ksa-l-contact" label={t('contact')} hint={t('contactHint')} error={errors.contact && t(errors.contact)}>
        <input
          id="ksa-l-contact" className="ksa-input" type="text" inputMode="email" autoComplete="username"
          autoCapitalize="none" spellCheck="false" value={f.contact} onChange={(e) => set('contact', e.target.value)}
          aria-invalid={errors.contact ? 'true' : 'false'} aria-describedby={describe('ksa-l-contact', true, Boolean(errors.contact))}
        />
      </Field>
      <Field id="ksa-l-password" label={t('password')} error={errors.password && t(errors.password)}>
        <PasswordInput id="ksa-l-password" value={f.password} onChange={(e) => set('password', e.target.value)}
          t={t} autoComplete="current-password" hasHint={false} error={errors.password && t(errors.password)} />
      </Field>
      <button type="submit" className="ksa-btn block" disabled={busy}>{busy ? t('wait') : t('loginBtn')}</button>
    </form>
  )
}

/* --------------------------- registration form ------------------------ */
function RegisterForm({ t, ui, onAuthed }) {
  const [f, setF] = useState({ name: '', contact: '', password: '', confirm: '', education: '', lang: ui, district: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)

  const set = (k, v) => { setF((s) => ({ ...s, [k]: v })); setErrors((e) => ({ ...e, [k]: '' })); setFormError('') }

  const submit = async (ev) => {
    ev.preventDefault()
    const name = f.name.trim().replace(/\s+/g, ' ')
    const contact = parseContact(f.contact)
    const errs = {}
    if (name.length < 2) errs.name = 'errName'
    if (!contact) errs.contact = 'errContact'
    if (f.password.length < 6) errs.password = 'errPwShort'
    if (f.confirm !== f.password) errs.confirm = 'errPwMatch'
    if (!EDU.includes(f.education)) errs.education = 'errEdu'
    if (!LANGS.some((l) => l.code === f.lang)) errs.lang = 'errLang'
    if (Object.keys(errs).length) { setErrors(errs); setFormError('errSummary'); return }
    if (!cryptoOk()) { setFormError('errNoCrypto'); return }

    setBusy(true)
    try {
      const accounts = readAccounts()
      if (accounts.some((a) => a.id === contact)) {
        setErrors({ contact: 'errExists' })
        setFormError('errSummary')
        return
      }
      const salt = newSalt()
      const hash = await hashPassword(f.password, salt)
      const account = {
        id: contact, name, salt, hash,
        education: f.education, lang: f.lang, district: f.district.trim().slice(0, 60),
      }
      const saved = writeJSON(ACCOUNTS_KEY, [...accounts, account]) && writeJSON(SESSION_KEY, { id: contact, name })
      if (!saved) { setFormError('errStorage'); return }
      writeJSON(LANG_KEY, f.lang)
      onAuthed({ id: contact, name })
    } catch {
      setFormError('errStorage')
    } finally {
      setBusy(false)
    }
  }

  const err = (k) => (errors[k] ? t(errors[k]) : '')

  return (
    <form className="ksa-stack" onSubmit={submit} noValidate>
      {formError && <p className="ksa-error" role="alert">{t('errTitle')} {t(formError)}</p>}

      <Field id="ksa-r-name" label={t('fullName')} error={err('name')}>
        <input id="ksa-r-name" className="ksa-input" type="text" autoComplete="name" value={f.name}
          onChange={(e) => set('name', e.target.value)} aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={describe('ksa-r-name', false, Boolean(errors.name))} />
      </Field>

      <Field id="ksa-r-contact" label={t('contact')} hint={t('contactHint')} error={err('contact')}>
        <input id="ksa-r-contact" className="ksa-input" type="text" inputMode="email" autoComplete="username"
          autoCapitalize="none" spellCheck="false" value={f.contact} onChange={(e) => set('contact', e.target.value)}
          aria-invalid={errors.contact ? 'true' : 'false'}
          aria-describedby={describe('ksa-r-contact', true, Boolean(errors.contact))} />
      </Field>

      <Field id="ksa-r-password" label={t('password')} hint={t('pwHint')} error={err('password')}>
        <PasswordInput id="ksa-r-password" value={f.password} onChange={(e) => set('password', e.target.value)}
          t={t} autoComplete="new-password" hasHint error={err('password')} />
      </Field>

      <Field id="ksa-r-confirm" label={t('confirm')} error={err('confirm')}>
        <PasswordInput id="ksa-r-confirm" value={f.confirm} onChange={(e) => set('confirm', e.target.value)}
          t={t} autoComplete="new-password" hasHint={false} error={err('confirm')} />
      </Field>

      <Field id="ksa-r-edu" label={t('education')} error={err('education')}>
        <select id="ksa-r-edu" className="ksa-input" value={f.education} onChange={(e) => set('education', e.target.value)}
          aria-invalid={errors.education ? 'true' : 'false'} aria-describedby={describe('ksa-r-edu', false, Boolean(errors.education))}>
          <option value="">{t('selectPh')}</option>
          {EDU.map((v) => <option key={v} value={v}>{t('e_' + v)}</option>)}
        </select>
      </Field>

      <Field id="ksa-r-lang" label={t('prefLang')} error={err('lang')}>
        <select id="ksa-r-lang" className="ksa-input" value={f.lang} onChange={(e) => set('lang', e.target.value)}
          aria-invalid={errors.lang ? 'true' : 'false'} aria-describedby={describe('ksa-r-lang', false, Boolean(errors.lang))}>
          {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
        </select>
      </Field>

      <Field id="ksa-r-district" label={t('district')}>
        <input id="ksa-r-district" className="ksa-input" type="text" maxLength={60} autoComplete="off"
          value={f.district} onChange={(e) => set('district', e.target.value)} />
      </Field>

      <button type="submit" className="ksa-btn block" disabled={busy}>{busy ? t('wait') : t('createBtn')}</button>
    </form>
  )
}

/* ------------------------------ auth screen --------------------------- */
function AuthScreen({ ui, onUi, onAuthed }) {
  const [mode, setMode] = useState('welcome') // 'welcome' | 'login' | 'register'
  const headRef = useRef(null)
  const t = (k) => (AT[ui] && AT[ui][k]) || AT.en[k] || k

  useEffect(() => {
    if (headRef.current) headRef.current.focus({ preventScroll: true })
  }, [mode])

  return (
    <div className="ksa-root" lang={ui}>
      <style>{AUTH_CSS}</style>
      <main className="ksa-wrap">
        <div className="ksa-lang" role="group" aria-label={t('langLabel')}>
          {LANGS.map((l) => (
            <button key={l.code} type="button" className="ksa-pill" aria-pressed={ui === l.code} onClick={() => onUi(l.code)}>
              {l.label}
            </button>
          ))}
        </div>

        {mode === 'welcome' ? (
          <div className="ksa-stack">
            <section className="ksa-hero">
              <Logo />
              <h1 ref={headRef} tabIndex={-1} style={{ outline: 'none' }}>KaushalSetu</h1>
              <p className="ksa-tag">{t('tagline')}</p>
              <p>{t('welcomeText')}</p>
              <div className="ksa-row ksa-center">
                <button type="button" className="ksa-btn block-sm" onClick={() => setMode('login')}>{t('loginBtn')}</button>
                <button type="button" className="ksa-btn alt block-sm" onClick={() => setMode('register')}>{t('createBtn')}</button>
              </div>
            </section>
            <p className="ksa-note" role="note">{t('demoBanner')}</p>
          </div>
        ) : (
          <div className="ksa-card">
            <h1 className="ksa-title" ref={headRef} tabIndex={-1}>
              {mode === 'login' ? t('loginTitle') : t('registerTitle')}
            </h1>
            {mode === 'login' ? (
              <LoginForm t={t} onAuthed={onAuthed} />
            ) : (
              <RegisterForm t={t} ui={ui} onAuthed={onAuthed} />
            )}
            <p className="ksa-note" role="note">{t('demoBanner')}</p>
            <div className="ksa-row" style={{ marginTop: 12 }}>
              <button type="button" className="ksa-link" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
                {mode === 'login' ? t('toRegister') : t('toLogin')}
              </button>
              <button type="button" className="ksa-link" onClick={() => setMode('welcome')}>{t('back')}</button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

/* ------------------------------ main wrapper -------------------------- */
export default function AuthGate() {
  const [session, setSession] = useState(() => {
    const s = readJSON(SESSION_KEY, null)
    return s && typeof s.name === 'string' && s.name ? s : null
  })
  const [ui, setUi] = useState(() => {
    const l = readJSON(LANG_KEY, 'en')
    return AT[l] ? l : 'en'
  })

  const changeUi = (l) => { setUi(l); writeJSON(LANG_KEY, l) }

  const handleAuthed = (s) => { setSession(s); window.scrollTo(0, 0) }

  const logout = () => {
    try { localStorage.removeItem(SESSION_KEY) } catch { /* ignore */ }
    const l = readJSON(LANG_KEY, 'en')
    setUi(AT[l] ? l : 'en')
    setSession(null)
    window.scrollTo(0, 0)
  }

  if (!session) {
    return <AuthScreen ui={ui} onUi={changeUi} onAuthed={handleAuthed} />
  }

  // The bar is deliberately bilingual (English + Hindi/Marathi) because the main app
  // owns the language setting and this wrapper does not re-render when it changes.
  return (
    <>
      <style>{AUTH_CSS}</style>
      <div className="ksa-bar">
        <div className="ksa-bar-in">
          <span>नमस्ते / Hello, <strong>{session.name}</strong></span>
          <button type="button" className="ksa-btn" onClick={logout} aria-label="Log out of KaushalSetu / कौशलसेतु से लॉग आउट">
            Log out / लॉग आउट
          </button>
        </div>
      </div>
      <App />
    </>
  )
}