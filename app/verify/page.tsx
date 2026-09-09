'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AuthShell from '../../components/auth/AuthShell';
import CodeInput from '../../components/auth/CodeInput';
import AuthButton from '../../components/auth/AuthButton';
import AuthStateControl from '../../components/auth/AuthStateControl';
import { SECONDARY_BTN, TEXT_LINK } from '../../components/auth/tokens';

type Scenario = 'default' | 'partial' | 'wrong' | 'expired' | 'resending' | 'resent';

const EMAIL = 'elena@luxebrand.com';

export default function Verify() {
  const router = useRouter();
  const [scenario, setScenario] = useState<Scenario>('default');
  const [code, setCode] = useState('');
  const [error, setError] = useState<'wrong' | 'expired' | null>(null);
  const [resent, setResent] = useState(false);
  const [sending, setSending] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'submitting'>('idle');

  useEffect(() => {
    if (scenario === 'partial') {
      setCode('123');
      setError(null);
      setResent(false);
    } else if (scenario === 'wrong') {
      setCode('482917');
      setError('wrong');
      setResent(false);
    } else if (scenario === 'expired') {
      setCode('482917');
      setError('expired');
      setResent(false);
    } else if (scenario === 'resending') {
      setError(null);
      setResent(false);
      setSending(true);
    } else if (scenario === 'resent') {
      setError(null);
      setResent(true);
      setSending(false);
    } else {
      setCode('');
      setError(null);
      setResent(false);
      setSending(false);
    }
  }, [scenario]);

  const canSubmit = code.length === 6;
  const reason = 'Enter the 6-digit code to continue.';

  const handleVerify = () => {
    if (!canSubmit) return;
    setPhase('submitting');
    window.setTimeout(() => {
      setPhase('idle');
      if (scenario === 'wrong') setError('wrong');
      else if (scenario === 'expired') setError('expired');
      else router.push('/');
    }, 900);
  };

  const handleResend = () => {
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setResent(true);
    }, 900);
  };

  return (
    <AuthShell
      footer={
        <div className="space-y-2">
          <div>
            Didn&apos;t get it?{' '}
            <button type="button" onClick={handleResend} className={TEXT_LINK}>
              {sending ? 'Sending…' : 'Send a new code'}
            </button>
          </div>
          <div>
            <Link href="/register" className={TEXT_LINK}>
              Use a different email
            </Link>
          </div>
          <div className="pt-2 text-[#5D6C8A]">
            Already have an account?{' '}
            <Link href="/sign-in" className={TEXT_LINK}>
              Sign in
            </Link>
          </div>
        </div>
      }
    >
      <h1 className="text-[22px] font-semibold text-[#16233E]">Check your email</h1>
      <p className="mt-1 text-[13px] text-[#16233E]">
        We&apos;ve sent a 6-digit code to {EMAIL}.
      </p>
      <p className="mt-1 text-[13px] text-[#5D6C8A]">
        Enter it below to finish setting up your account.
      </p>

      {resent && (
        <p className="mt-4 text-[13px] text-[#3D6B54]" aria-live="polite">
          New code sent.
        </p>
      )}

      <form className="mt-5 space-y-5" onSubmit={(e) => { e.preventDefault(); handleVerify(); }}>
        <CodeInput value={code} onChange={setCode} invalid={!!error} />

        {error === 'wrong' && (
          <p className="-mt-2 text-[13px] text-[#A8552A]" aria-live="polite">
            That code isn&apos;t right. Check it and try again.
          </p>
        )}
        {error === 'expired' && (
          <div className="-mt-2">
            <p className="text-[13px] text-[#A8552A]" aria-live="polite">
              That code has expired.
            </p>
            <button type="button" onClick={handleResend} className={`${SECONDARY_BTN} mt-2`}>
              Send a new code
            </button>
          </div>
        )}

        <AuthButton
          submitting={phase === 'submitting'}
          disabled={!canSubmit}
          reason={reason}
          busyLabel="Verifying…"
        >
          Verify and continue
        </AuthButton>
      </form>

      <AuthStateControl
        value={scenario}
        onChange={(v) => setScenario(v as Scenario)}
        groups={[
          {
            label: 'Verify',
            options: [
              { value: 'default', label: 'Default' },
              { value: 'partial', label: 'Partially entered' },
              { value: 'wrong', label: 'Wrong code' },
              { value: 'expired', label: 'Expired code' },
              { value: 'resending', label: 'Resending' },
              { value: 'resent', label: 'Resent' },
            ],
          },
        ]}
      />
    </AuthShell>
  );
}