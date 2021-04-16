export const clearArgs = (args: string[]): string[] =>
  args.filter(Boolean).map((arg) => arg.trim());
