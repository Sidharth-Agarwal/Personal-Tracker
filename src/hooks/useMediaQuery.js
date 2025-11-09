import { useState, useEffect } from 'react';

/**
 * useMediaQuery Hook
 * Detect responsive breakpoints
 */

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);

    // Create event listener
    const listener = (e) => setMatches(e.matches);
    
    // Add listener
    media.addEventListener('change', listener);

    // Cleanup
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

/**
 * Predefined breakpoint hooks
 */

export const useIsMobile = () => {
  return useMediaQuery('(max-width: 767px)');
};

export const useIsTablet = () => {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
};

export const useIsDesktop = () => {
  return useMediaQuery('(min-width: 1024px)');
};

export const useIsSmallScreen = () => {
  return useMediaQuery('(max-width: 639px)');
};

export const useIsLargeScreen = () => {
  return useMediaQuery('(min-width: 1280px)');
};