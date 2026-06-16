export const BASE_URL =
  process.env.BASE_URL ?? 'https://automationexercise.com';

export function url(path: string): string {
  return new URL(path, BASE_URL).toString();
}
