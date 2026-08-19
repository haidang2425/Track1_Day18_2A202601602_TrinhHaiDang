import { useEffect } from 'react';

export const usePageTitle = (title) => {
  useEffect(() => {
    const previous = document.title;
    document.title = `VLearn — ${title}`;
    return () => { document.title = previous; };
  }, [title]);
};
