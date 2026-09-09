'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthShell from '../../components/auth/AuthShell';
import TextField from '../../components/auth/TextField';
import PasswordField from '../../components/auth/PasswordField';
import AuthButton from '../../components/auth/AuthButton';
import ErrorBanner from '../../components/auth/ErrorBanner';
import AuthStateControl from '../../components/auth/AuthStateControl';
import { TEXT_LINK } from '../../components/auth/tokens';

type Scenario = 'default' | 'submitting' | 'refused' | 'disabled' | 'expired' | 'shown';

export default function SignIn() {
  const router = useRouter();
  const [scenario, setScenario] = useState<Scenario>('default');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'submitting'>('idle');
  const [result, setResult] = useState<null | 'refused' | 'disabled'>(null);

  const canSubmit = email.trim() !== '' && password !== '';
  const reason = 'Enter your email and password to continue.';
  const shownReady = scenario === 'shown' || show;

  const submit = () => {
    if (!canSubmit) return;
    setPhase('submitting');
    setResult(null);
    window.setTimeout(() => {
      setPhase('idle');
      if (scenario === 'refused') setResult('refused');
      else if (scenario === 'disabled') setResult('disabled');
      else router.push('/');
    }, 900);
  };

  const showSessionExpired = scenario === 'expired' && phase === 'idle' && !result;

  return (
    <AuthShell
      footer={
        <>
          New to CraftsmanAI?{' '}
          <Link href="/register" className={TEXT_LINK}>
            Create an account
          </Link>
        </>
      }
    >
      <h1 className="text-[22px] font-semibold text-[#16233E]">Sign in</h1>
      <p className="mt-1 text-[13px] text-[#5D6C8A]">Welcome back.</p>

      {showSessionExpired && (
        <p className="mt-4 text-[13px] text-[#5D6C8A]" aria-live="polite">
          Your session ended. Sign in and we&apos;ll take you back to where you were.
        </p>
      )}

      {result === 'refused' && (
        <div className="mt-4">
          <ErrorBanner text="That email and password don't match. Check them and try again." />
        </div>
      )}

      {result === 'disabled' && (
        <div className="mt-4">
          <ErrorBanner text="We can't sign you in right now. Please contact support.">
            <button type="button" className={`${TEXT_LINK} mt-1`}>
              Contact support
            </button>
          </ErrorBanner>
        </div>
      )}

      <form className="mt-5 space-y-5" onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <TextField
          id="email"
          label="Email address"
          type="email"
          autocomplete="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
        />
        <PasswordField
          id="password"
          label="Password"
          autocomplete="current-password"
          value={password}
          onChange={setPassword}
          show={shownReady}
          onToggleShow={() => setShow((s) => !s)}
        />
        <div className="flex justify-end -mt-1">
          <Link href="/forgot-password" className={TEXT_LINK}>
            Forgot your password?
          </Link>
        </div>
        <AuthButton
          submitting={phase === 'submitting'}
          disabled={!canSubmit}
          reason={reason}
          busyLabel="Signing in…"
        >
          Sign in
        </AuthButton>
      </form>

      <AuthStateControl
        value={scenario}
        onChange={(v) => setScenario(v as Scenario)}
        groups={[
          {
            label: 'Sign in',
            options: [
              { value: 'default', label: 'Default' },
              { value: 'submitting', label: 'Submitting' },
              { value: 'refused', label: 'Credentials refused' },
              { value: 'disabled', label: 'Disabled account' },
              { value: 'expired', label: 'Session expired' },
              { value: 'shown', label: 'Password shown' },
            ],
          },
        ]}
      />
    </AuthShell>
  );
}