"use client";

import { useIsClient } from '../hooks/useIsClient';

/**
 * Client-side only wrapper component
 * Prevents SSR issues with components that use browser APIs
 */
export function ClientOnly({ children, fallback = null }) {
  const isClient = useIsClient();

  if (!isClient) {
    return fallback;
  }

  return children;
}

/**
 * Higher-order component to make any component client-only
 */
export function withClientOnly(Component, fallback = null) {
  return function ClientOnlyComponent(props) {
    return (
      <ClientOnly fallback={fallback}>
        <Component {...props} />
      </ClientOnly>
    );
  };
}