import { useEffect } from 'react';

/**
 * Injects a JSON-LD `<script>` into `<head>` for the lifetime of the component,
 * giving search engines structured data for the current page.
 */
export function useStructuredData(schema: Record<string, unknown> | null, id: string): void {
  useEffect(() => {
    if (!schema) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [id, schema]);
}
