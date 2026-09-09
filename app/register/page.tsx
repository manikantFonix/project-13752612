'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AuthShell from '../../components/auth/AuthShell';
import TextField from '../../components/auth/TextField';
import PasswordField from '../../components/auth/PasswordField';
import AuthButton from '../../components/auth/AuthButton';
import AuthStateControl from '../../components/auth/AuthStateControl';
import { TEXT_LINK } from '../../components/auth/tokens';

type Scenario = 'default' | 'submitting' | 'success' | 'short';

export default function Register() {
  const router = useRouter();
  const [scenario, setScenario] = useState<Scenario>('default');
  const [business, setBusiness] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'submitting'>('idle');

  useEffect(() => {
    if (scenario === 'short') {
      setBusiness('Holden & Co');
      setEmail('elena@luxebrand.com');
      setPassword('abc123');
    } else if (scenario === 'default') {
      setBusiness('');
      setEmail('');
      setPassword('');
    }
  }, [scenario]);

  const passwordOk = password.length >= 8;
  const canSubmit = business.trim() !== '' && email.trim() !== '' && passwordOk;
  const reason = 'Enter a business name, an email and a password of at least 8 characters.';

  const submit = () => {
    if (!canSubmit) return;
    setPhase('submitting');
    window.setTimeout(() => {
      setPhase('idle');
      router.push('/verify');
    }, 900);
  };

  return (
    <AuthShell
      footer={
        <>
          Already have an account?{' '}
          <Link href="/sign-in" className={TEXT_LINK}>
            Sign in
          </Link>
        </>
      }
    >
      <h1 className="text-[22px] font-semibold text-[#16233E]">Create your account</h1>
      <p className="mt-1 text-[13px] text-[#5D6C8A]">
        You&apos;ll get a code by email to confirm it&apos;s you.
      </p>

      <form className="mt-5 space-y-5" onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <TextField
          id="business"
          label="Business name"
          autocomplete="organization"
          value={business}
          onChange={setBusiness}
          placeholder="Holden & Co"
        />
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
          autocomplete="new-password"
          value={password}
          onChange={setPassword}
          show={show}
          onToggleShow={() => setShow((s) => !s)}
          hint="At least 8 characters."
        />
        <AuthButton
          submitting={phase === 'submitting'}
          disabled={!canSubmit}
          reason={reason}
          busyLabel="Creating your account…"
        >
          Create account
        </AuthButton>
      </form>

      <AuthStateControl
        value={scenario}
        onChange={(v) => setScenario(v as Scenario)}
        groups={[
          {
            label: 'Register',
            options: [
              { value: 'default', label: 'Default' },
              { value: 'submitting', label: 'Submitting' },
              { value: 'success', label: 'Success' },
              { value: 'short', label: 'Password too short' },
            ],
          },
        ]}
      />
    </AuthShell>
  );
}