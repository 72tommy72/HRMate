declare module 'qrcode-terminal' {
  export function generate(input: string, options?: { small?: boolean }): void;
  export function setErrorLevel(level: string): void;
}