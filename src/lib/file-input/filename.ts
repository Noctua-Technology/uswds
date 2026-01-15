/**
 * Extracts a filename from a Response's Content-Disposition header.
 * Returns the filename string if found, otherwise null.
 */
export function filenameFromResponse(response: Response): string {
  const contentDisposition = response.headers.get('content-disposition');
  // Use a safe fallback if the response URL doesn't contain a filename (handles empty string)

  let url: URL | null = null;

  if (response.url) {
    url = new URL(response.url);
  }

  const fallback = url?.pathname.split('/').pop() || 'downloaded-file';

  if (!contentDisposition) {
    return fallback;
  }

  // Try RFC 5987 filename* (e.g., filename*=UTF-8''file.jpg)
  const filenameStarMatch = contentDisposition.match(/filename\*\s*=\s*([^;]+)/i);

  if (filenameStarMatch) {
    try {
      let value = filenameStarMatch[1].trim().replace(/^"|"$/g, '');

      // Strip optional charset'lang' prefix (e.g., UTF-8''file.jpg)
      const starParts = value.split("''");

      if (starParts.length === 2) {
        value = starParts[1];
      }

      return decodeURIComponent(value);
    } catch (_e) {
      return fallback;
    }
  }

  // Try simple filename="file.jpg" or filename=file.jpg
  const filenameMatch =
    contentDisposition.match(/filename\s*=\s*"([^"]+)"/i) || contentDisposition.match(/filename\s*=\s*([^;]+)/i);

  if (filenameMatch) {
    return decodeURIComponent(filenameMatch[1].trim().replace(/^"|"$/g, ''));
  }

  return fallback;
}
