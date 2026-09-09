export type TeamPreview =
  | 'members'
  | 'invited'
  | 'ownerOnly'
  | 'addDialog'
  | 'invalidEmail'
  | 'removeConfirm'
  | 'saving';

export interface Member {
  name: string;
  email: string;
  kind: 'owner' | 'member' | 'invited';
}

const owner: Member = { name: 'Ava Tanaka', email: 'ava@lumina.co', kind: 'owner' };
const priya: Member = { name: 'Priya Menon', email: 'priya@lumina.co', kind: 'member' };
const james: Member = { name: 'James Osei', email: 'james@lumina.co', kind: 'member' };
const lena: Member = { name: 'Lena Fischer', email: 'lena@lumina.co', kind: 'invited' };

export function membersFor(preview: TeamPreview): Member[] {
  if (preview === 'ownerOnly') return [owner];
  if (preview === 'invited') return [owner, james, lena];
  return [owner, priya, james];
}

export function removeTargetFor(preview: TeamPreview): Member {
  return priya;
}

export const teamOptions: { value: TeamPreview; label: string }[] = [
  { value: 'members', label: 'Members' },
  { value: 'invited', label: 'One invited' },
  { value: 'ownerOnly', label: 'Only you' },
  { value: 'addDialog', label: 'Add dialog' },
  { value: 'invalidEmail', label: 'Invalid email' },
  { value: 'removeConfirm', label: 'Remove confirm' },
  { value: 'saving', label: 'Saving' },
];