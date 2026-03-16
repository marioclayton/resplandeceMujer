"use client";

import { useState, useEffect } from 'react';

/**
 * Hook to check if component is mounted on client-side
 * Prevents SSR hydration mismatches and localStorage errors
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Safe localStorage wrapper that works with SSR
 */
export const safeLocalStorage = {
  getItem: (key) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.warn('localStorage.getItem failed:', error);
        return null;
      }
    }
    return null;
  },
  
  setItem: (key, value) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (error) {
        console.warn('localStorage.setItem failed:', error);
        return false;
      }
    }
    return false;
  },
  
  removeItem: (key) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        console.warn('localStorage.removeItem failed:', error);
        return false;
      }
    }
    return false;
  }
};