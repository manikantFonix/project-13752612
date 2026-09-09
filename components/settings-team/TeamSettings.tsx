'use client';

import { useState } from 'react';
import { focusRingVar } from '../settings/theme/tokens';
import AddMemberDialog from './AddMemberDialog';
import RemoveMemberDialog from './RemoveMemberDialog';
import { membersFor, removeTargetFor, type Member, type TeamPreview } from './data';

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function TeamSettings({ preview }: { preview: TeamPreview }) {
  const [members, setMembers] = useState<Member[]>(() => membersFor(preview));
  const [addOpen, setAddOpen] = useState(
    preview === 'addDialog' || preview === 'invalidEmail'
  );
  const [removeName, setRemoveName] = useState<Member | null>(
    preview === 'removeConfirm' ? removeTargetFor(preview) : null
  );
  const [saving, setSaving] = useState(preview === 'saving');

  const addName = preview === 'invalidEmail' ? 'Marco Ruiz' : '';
  const addEmail = preview === 'invalidEmail' ? 'marco@lumina' : '';

  const addMember = (name: string, email: string) => {
    setAddOpen(false);
    setSaving(true);
    window.setTimeout(() => {
      setMembers((m) => [...m, { name, email, kind: 'invited' }]);
      setSaving(false);
    }, 800);
  };

  const confirmRemove = () => {
    if (!removeName) return;
    const name = removeName.name;
    setRemoveName(null);
    setSaving(true);
    window.setTimeout(() => {
      setMembers((m) => m.filter((x) => x.name !== name));
      setSaving(false);
    }, 600);
  };

  const lonely = members.length === 1 && members[0].kind === 'owner';

  const addButton = (
    <button
      type="button"
      onClick={() => setAddOpen(true)}
      className={`h-9 px-4 text-[13px] font-medium text-[var(--on-accent)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-full transition-colors duration-150 whitespace-nowrap ${focusRingVar}`}
    >
      Add someone
    </button>
  );

  return (
    <div>
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-[20px] font-semibold text-[var(--text)]">Team</h2>
          <p className="mt-1 text-[13px] text-[var(--text-sec)]">
            People who can use this account.
          </p>
        </div>
        {!lonely && addButton}
      </div>

      <span aria-live="polite" className="sr-only">
        {saving ? 'Saving team…' : ''}
      </span>

      <div className="mt-5 max-w-[720px]">
        {lonely ? (
          <div>
            <p className="text-[13px] text-[var(--text-sec)]">
              It's just you on this account.
            </p>
            <div className="mt-3">{addButton}</div>
          </div>
        ) : (
          <section className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px]">
            <div className="divide-y divide-[var(--border)]">
              {members.map((m) => (
                <div
                  key={m.email}
                  className="flex items-center px-4 min-h-[64px]"
                >
                  <div className="w-9 h-9 rounded-full bg-[var(--muted)] flex items-center justify-center text-[13px] font-medium text-[var(--text-sec)]">
                    {initials(m.name)}
                  </div>
                  <div className="ml-3 min-w-0">
                    <div className="text-[13px] font-medium text-[var(--text)]">
                      {m.name}
                    </div>
                    <div className="mt-0.5 text-[12px] text-[var(--text-sec)] truncate">
                      {m.email}
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-3">
                    {m.kind === 'owner' && (
                      <>
                        <span className="text-[12px] font-medium text-[var(--text-sec)]">
                          You
                        </span>
                        <span className="text-[12px] text-[var(--text-sec)]">
                          You can't remove yourself.
                        </span>
                      </>
                    )}
                    {m.kind === 'invited' && (
                      <span className="text-[12px] font-medium text-[var(--text-sec)]">
                        Invited
                      </span>
                    )}
                    {m.kind !== 'owner' && (
                      <button
                        type="button"
                        onClick={() => setRemoveName(m)}
                        className={`h-9 px-3 text-[13px] font-medium text-[var(--alert)] hover:text-[var(--alert-strong)] transition-colors duration-150 whitespace-nowrap ${focusRingVar}`}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <AddMemberDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={addMember}
        initialName={addName}
        initialEmail={addEmail}
        forceError={preview === 'invalidEmail'}
      />
      <RemoveMemberDialog
        open={!!removeName}
        onClose={() => setRemoveName(null)}
        onConfirm={confirmRemove}
        name={removeName ? removeName.name : ''}
      />
    </div>
  );
}