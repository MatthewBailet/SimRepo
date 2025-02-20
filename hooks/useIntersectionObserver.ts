"use client";

import { useEffect, useState, useRef, RefObject } from 'react';

export function useIntersectionObserver(threshold = 0.1): [RefObject<any>, boolean] {
  const [isInView, setIsInView] = useState(true);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, isInView];
} 