"use client";
import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScrolling({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothTouch: false }}>
      {children}
    </ReactLenis>
  );
}
