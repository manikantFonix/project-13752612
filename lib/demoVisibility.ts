let visible = true;
const subs = new Set<() => void>();

export function getDemoVisible() {
  return visible;
}

export function setDemoVisible(v: boolean) {
  if (v === visible) return;
  visible = v;
  subs.forEach((cb) => cb());
}

export function toggleDemoVisible() {
  setDemoVisible(!visible);
}

export function subscribeDemoVisible(cb: () => void) {
  subs.add(cb);
  return () => {
    subs.delete(cb);
  };
}