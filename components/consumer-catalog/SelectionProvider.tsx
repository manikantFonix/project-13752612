'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';

interface SelectionContextValue {
  selected: string[];
  toggle: (id: string) => void;
  clear: () => void;
  removeMany: (ids: string[]) => void;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({
  token,
  children,
}: {
  token: string;
  children: ReactNode;
}) {
  const key = `consumer-selection:${token}`;
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(key);
      if (raw) setSelected(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, [key]);

  const persist = useCallback(
    (next: string[]) => {
      try {
        window.sessionStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* ignore */
      }
    },
    [key],
  );

  const toggle = useCallback(
    (id: string) => {
      setSelected((prev) => {
        const next = prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id];
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const clear = useCallback(() => {
    setSelected([]);
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }, [key]);

  const removeMany = useCallback(
    (ids: string[]) => {
      setSelected((prev) => {
        const next = prev.filter((x) => !ids.includes(x));
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const value = useMemo(
    () => ({ selected, toggle, clear, removeMany }),
    [selected, toggle, clear, removeMany],
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection(): SelectionContextValue {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error('useSelection must be used within SelectionProvider');
  return ctx;
}