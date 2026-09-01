export type ClassValue = string | number | null | undefined | false | ClassValue[];

/**
 * Joins conditional class names into a single string.
 * Keeps JSX readable without pulling in an extra runtime dependency.
 */
export function cn(...values: ClassValue[]): string {
  const classes: string[] = [];

  for (const value of values) {
    if (!value && value !== 0) continue;

    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) classes.push(nested);
      continue;
    }

    classes.push(String(value));
  }

  return classes.join(' ');
}
