// Mocks all files ending in `.vue` showing them as plain Vue instances
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'