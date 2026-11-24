import { useCallback, useRef, useState } from "react";

/** A short message at the bottom of the screen that hides itself. */
export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const hide = useRef<number | null>(null);
  const toast = useCallback((m: string) => {
    setMessage(m);
    if (hide.current) window.clearTimeout(hide.current);
    hide.current = window.setTimeout(() => setMessage(null), 1600);
  }, []);
  return { message, toast };
}
