/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_KEY: string;
    // তোমার কাস্টম এনভায়রনমেন্ট ভেরিয়েবলস এখানে যোগ করো
  }
}

declare module 'lovable-tagger' {
  export function componentTagger(): import('vite').Plugin;
}
