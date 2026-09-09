'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AuthShell from '../../components/auth/AuthShell';
import TextField from '../../components/auth/TextField';
import PasswordField from '../../components/auth/PasswordField';
import AuthButton from '../../components/auth/AuthButton';
import AuthStateControl from '../../components/auth/AuthStateControl';
import { PRIMARY_BTN } from '../../components/auth/tokens';

type Scenario = 'default' | 'mismatch' | 'submitting' | 'saved' | 'invalid';

export default function ResetPassword() {
  const [scenario, setScenario] = useState<Scenario>('default');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'submitting'>('idle');

  useEffect(() => {
    if (scenario === 'mismatch') {
      setPassword('roses1234');
      setConfirm('roses5678');
    } else if (scenario === 'invalid') {
      setPassword('');
      setConfirm('');
    } else if (scenario === 'default') {
      setPassword('');
      setConfirm('');
    }
  }, [scenario]);

  const ok = password.length >= 8;
  const mismatch = confirm !== '' && confirm !== password;
  const canSubmit = ok && confirm.length >= 8 && !mismatch;
  const reason = !ok
    ? 'Enter a password of at least 8 characters.'
    : mismatch
    ? 'The two passwords don\u2019t match.'
    : '';

  const submit = () => {
    if (!canSubmit) return;
    setPhase('submitting');
    window.setTimeout(() => {
      setPhase('idle');
      setScenario('saved');
    }, 900);
  };

  const confirmError = mismatch ? 'The two passwords don\u2019t match.' : undefined;

  if (scenario === 'saved') {
    return (
      <AuthShell>
        <h1 className="text-[22px] font-semibold text-[#16233E]">Password saved</h1>
        <p className="mt-3 text-[13px] text-[#16233E]">
          You&apos;ve been signed out on your other devices.
        </p>
        <Link
          href="/sign-in"
          className={`${PRIMARY_BTN} mt-6 flex items-center justify-center`}
        >
          Sign in
        </Link>

        <AuthStateControl
          value={scenario}
          onChange={(v) => setScenario(v as Scenario)}
          groups={[{ label: 'Reset password', options: [
            { value: 'default', label: 'Default' },
            { value: 'mismatch', label: 'Mismatch' },
            { value: 'submitting', label: 'Submitting' },
            { value: 'saved', label: 'Saved' },
            { value: 'invalid', label: 'Invalid link' },
          ] }]}
        />
      </AuthShell>
    );
  }

  if (scenario === 'invalid') {
    return (
      <AuthShell>
        <h1 className="text-[22px] font-semibold text-[#16233E]">
          This link doesn&apos;t work any more
        </h1>
        <p className="mt-3 text-[13px] text-[#5D6C8A]">
          Reset links can only be used once and they expire. Ask for a new one.
        </p>
        <Link
          href="/forgot-password"
          className={`${PRIMARY_BTN} mt-6 flex items-center justify-center`}
        >
          Send a new link
        </Link>

        <AuthStateControl
          value={scenario}
          onChange={(v) => setScenario(v as Scenario)}
          groups={[{ label: 'Reset password', options: [
            { value: 'default', label: 'Default' },
            { value: 'mismatch', label: 'Mismatch' },
            { value: 'submitting', label: 'Submitting' },
            { value: 'saved', label: 'Saved' },
            { value: 'invalid', label: 'Invalid link' },
          ] }]}
        />
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <h1 className="text-[22px] font-semibold text-[#16233E]">Set a new password</h1>

      <form className="mt-5 space-y-5" onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <PasswordField
          id="password"
          label="New password"
          autocomplete="new-password"
          value={password}
          onChange={setPassword}
          show={show}
          onToggleShow={() => setShow((s) => !s)}
          hint="At least 8 characters."
        />
        <TextField
          id="confirm"
          label="Confirm new password"
          type="password"
          autocomplete="new-password"
          value={confirm}
          onChange={(v) => setConfirm(v)}
          error={confirmError}
        />
        <div className="bg-[#F3F6FC] border-l-2 border-[#C6D0E6] rounded-[12px] p-3 text-[13px] text-[#5D6C8A]">
          Setting a new password signs you out everywhere else. You&apos;ll need
          to sign in again on your other devices.
        </div>
        <AuthButton
          submitting={phase === 'submitting'}
          disabled={!canSubmit}
          reason={reason}
          busyLabel="Saving…"
        >
          Save new password
        </AuthButton>
      </form>

      <AuthStateControl
        value={scenario}
        onChange={(v) => setScenario(v as Scenario)}
        groups={[{ label: 'Reset password', options: [
          { value: 'default', label: 'Default' },
          { value: 'mismatch', label: 'Mismatch' },
          { value: 'submitting', label: 'Submitting' },
          { value: 'saved', label: 'Saved' },
          { value: 'invalid', label: 'Invalid link' },
        ] }]}
      />
    </AuthShell>
  );
}