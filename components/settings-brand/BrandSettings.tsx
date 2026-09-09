'use client';

import { useState } from 'react';
import { focusRingVar } from '../settings/theme/tokens';
import LogoField from './LogoField';
import ContactFields from './ContactFields';
import ColorField from './ColorField';
import BrandPreview from './BrandPreview';
import SaveBar from './SaveBar';
import {
  initialValues,
  baseline,
  refusalFor,
  isEmail,
  isHex,
  contrastVsWhite,
  loadingBar,
  type BrandState,
} from './data';

function LoadingForm() {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6 space-y-6">
      <div className={`${loadingBar} w-24`} />
      <div className="h-[140px] w-full rounded-[12px] bg-[#E4E9F4] animate-pulse" />
      <div className={`${loadingBar} w-1/2`} />
      <div className={`${loadingBar} w-3/4`} />
      <div className={`${loadingBar} w-full`} />
    </div>
  );
}

function LoadingPreview() {
  return (
    <div className="space-y-2">
      <div className={`${loadingBar} w-2/3`} />
      <div className="border border-[var(--border)] rounded-[12px] p-5 space-y-3">
        <div className={`${loadingBar} w-1/2`} />
        <div className="h-[240px] w-full rounded-[8px] bg-[#E4E9F4] animate-pulse" />
        <div className={`${loadingBar} w-full`} />
      </div>
    </div>
  );
}

export default function BrandSettings({ state }: { state: BrandState }) {
  const initial = initialValues(state);
  const [brandName, setBrandName] = useState(initial.brandName);
  const [email, setEmail] = useState(initial.email);
  const [phone, setPhone] = useState(initial.phone);
  const [color, setColor] = useState(initial.color);
  const [activeColor, setActiveColor] = useState(
    isHex(initial.color) && contrastVsWhite(initial.color) >= 4.5
      ? initial.color
      : '#152E56'
  );
  const [logo, setLogo] = useState<string | null>(initial.logo);
  const [saved, setSaved] = useState(baseline);
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);

  const dirty =
    brandName !== saved.brandName ||
    email !== saved.email ||
    phone !== saved.phone ||
    color !== saved.color ||
    logo !== saved.logo;

  const nameEmpty = brandName.trim() === '';
  const emailInvalid = email.trim() !== '' && !isEmail(email);
  const colorValid = isHex(color);
  const colorPass = colorValid && contrastVsWhite(color) >= 4.5;
  const canSave = !nameEmpty && !emailInvalid && colorPass;

  const reason = nameEmpty
    ? 'Add a brand name to continue.'
    : !colorPass
    ? 'Choose a color that passes contrast to continue.'
    : emailInvalid
    ? 'Enter a valid email address.'
    : '';

  const savingState = state === 'saving' || saving;
  const failedState = state === 'failed' || failed;

  const handleColor = (hex: string) => {
    setColor(hex);
    if (isHex(hex) && contrastVsWhite(hex) >= 4.5) setActiveColor(hex);
  };

  const handleSave = () => {
    setFailed(false);
    setSaving(true);
    setSuccess(false);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setSaved({ brandName, email, phone, color, logo });
    }, 900);
  };

  const handleDiscard = () => {
    setBrandName(saved.brandName);
    setEmail(saved.email);
    setPhone(saved.phone);
    setColor(saved.color);
    setActiveColor(saved.color);
    setLogo(saved.logo);
    setFailed(false);
    setSuccess(false);
  };

  const group = 'border-t border-[var(--border)] pt-6 mt-6';

  return (
    <div className="min-w-0">
      <h2 className="text-[20px] font-semibold text-[var(--text)]">Brand</h2>
      <p className="mt-1 text-[13px] text-[var(--text-sec)]">
        What your customers see. These appear on your shared catalog, your
        PDFs and the designs you send for approval.
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          {state === 'loading' ? (
            <LoadingForm />
          ) : (
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6">
              <LogoField
                logo={logo}
                refusal={refusalFor(state)}
                onUpload={(d) => setLogo(d)}
                onRemove={() => setLogo(null)}
              />

              <div className={group}>
                <label
                  htmlFor="brand-name"
                  className="text-[13px] font-medium text-[var(--text)]"
                >
                  Brand name
                </label>
                <input
                  id="brand-name"
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className={`mt-2 w-full h-10 px-3 text-[13px] text-[var(--text)] bg-[var(--surface)] border rounded-[12px] outline-none placeholder:[var(--text-sec)] ${focusRingVar} ${
                    nameEmpty
                      ? 'border-[var(--alert)] focus:border-[var(--alert)]'
                      : 'border-[var(--border)] focus:border-[var(--accent)]'
                  }`}
                />
                {nameEmpty ? (
                  <p className="mt-1.5 text-[13px] text-[var(--alert)]">
                    Your brand name can't be empty. Every shared output needs
                    an identity on it.
                  </p>
                ) : (
                  <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">
                    Used wherever you have no logo, so this can't be left empty.
                  </p>
                )}
              </div>

              <div className={group}>
                <ContactFields
                  email={email}
                  phone={phone}
                  emailError={emailInvalid}
                  onEmail={setEmail}
                  onPhone={setPhone}
                />
              </div>

              <div className={group}>
                <ColorField color={color} onChange={handleColor} />
              </div>

              <div className="mt-8">
                <SaveBar
                  dirty={dirty}
                  saving={savingState}
                  failed={failedState}
                  canSave={canSave}
                  reason={reason}
                  onSave={handleSave}
                  onDiscard={handleDiscard}
                />
              </div>
              <span aria-live="polite" className="sr-only">
                {success ? 'Brand settings saved' : ''}
              </span>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          {state === 'loading' ? (
            <LoadingPreview />
          ) : (
            <BrandPreview
              logo={logo}
              brandName={brandName}
              email={email}
              phone={phone}
              color={activeColor}
            />
          )}
        </div>
      </div>
    </div>
  );
}