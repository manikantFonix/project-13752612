'use client';

import Link from 'next/link';
import { useState } from 'react';
import AuthShell from '../../components/auth/AuthShell';
import TextField from '../../components/auth/TextField';
import AuthButton from '../../components/auth/AuthButton';
import AuthStateControl from '../../components/auth/AuthStateControl';
import { TEXT_LINK } from '../../components/auth/tokens';

type Scenario = 'default' | 'submitting' | 'sent';

export default function ForgotPassword() {
  const [scenario, setScenario] = useState<Scenario>('default');
  const [email, setEmail] = useState('');
  const [phase, setPhase] = useState<'idle' | 'submitting'>('idle');

  const canSubmit = email.trim() !== '';
  const reason = 'Enter your email to continue.';

  const submit = () => {
    if (!canSubmit) return;
    setPhase('submitting');
    window.setTimeout(() => {
      setPhase('idle');
      setScenario('sent');
    }, 900);
  };

  const shownEmail = email.trim() || 'your email';

  if (scenario === 'sent') {
    return (
      <AuthShell
        footer={
          <Link href="/sign-in" className={TEXT_LINK}>
            Back to sign in
          </Link>
        }
      >
        <h1 className="text-[22px] font-semibold text-[#16233E]">Check your email</h1>
        <p className="mt-3 text-[13px] text-[#16233E]">
          If there&apos;s an account for {shownEmail}, we&apos;ve sent a link to it.
        </p>
        <p className="mt-2 text-[13px] text-[#5D6C8A]">
          The link works once and expires. If it doesn&apos;t arrive, check your spam folder.
        </p>

        <AuthStateControl
          value={scenario}
          onChange={(v) => setScenario(v as Scenario)}
          groups={[
            {
              label: 'Reset',
              options: [
                { value: 'default', label: 'Default' },
                { value: 'submitting', label: 'Submitting' },
                { value: 'sent', label: 'Sent' },
              ],
            },
          ]}
        />
      </AuthShell>
    );
  }

  return (
    <AuthShell
      footer={
        <>
          Remembered it?{' '}
          <Link href="/sign-in" className={TEXT_LINK}>
            Sign in
          </Link>
        </>
      }
    >
      <h1 className="text-[22px] font-semibold text-[#16233E]">Reset your password</h1>
      <p className="mt-1 text-[13px] text-[#5D6C8A]">
        We&apos;ll email you a link to set a new one.
      </p>

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
        <AuthButton
          submitting={phase === 'submitting'}
          disabled={!canSubmit}
          reason={reason}
          busyLabel="Sending…"
        >
          Send reset link
        </AuthButton>
      </form>

      <AuthStateControl
        value={scenario}
        onChange={(v) => setScenario(v as Scenario)}
        groups={[
          {
            label: 'Reset',
            options: [
              { value: 'default', label: 'Default' },
              { value: 'submitting', label: 'Submitting' },
              { value: 'sent', label: 'Sent' },
            ],
          },
        ]}
      />
    </AuthShell>
  );
}