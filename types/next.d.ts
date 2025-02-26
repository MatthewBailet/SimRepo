declare module 'next/link' {
  import { ComponentType } from 'react';
  
  const Link: ComponentType<{
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    legacyBehavior?: boolean;
    children: React.ReactNode;
    [key: string]: any;
  }>;
  
  export default Link;
}

declare module 'next/image' {
  import { ComponentType } from 'react';
  
  const Image: ComponentType<{
    src: string | object;
    alt: string;
    width?: number;
    height?: number;
    layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
    sizes?: string;
    quality?: number;
    priority?: boolean;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    [key: string]: any;
  }>;
  
  export default Image;
} 