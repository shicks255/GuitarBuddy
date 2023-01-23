import { RefObject, SyntheticEvent, useEffect } from 'react';

function useClickOutside(
  refs: RefObject<HTMLDivElement | null>[],
  callback: (e: SyntheticEvent) => void
): void {
  useEffect(() => {
    function handle(e) {
      let fire = true;
      refs.forEach((ref) => {
        if (ref.current && ref.current.contains(e.target)) {
          fire = false;
        }
      });

      if (fire) {
        callback(e);
      }
    }

    document.addEventListener('click', handle);
    return () => {
      document.removeEventListener('click', handle);
    };
  }, [refs, callback]);
}

export default useClickOutside;
