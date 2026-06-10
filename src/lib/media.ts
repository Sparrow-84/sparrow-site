/**
 * Photography is gathered in a later content pass (plan Phase C). Until real images
 * live under /public/images, image components render branded placeholders instead of
 * broken <img> tags. Flip PHOTOS_READY to true once photos are in place and the
 * frontmatter image paths actually resolve.
 */
export const PHOTOS_READY = true;

export function photo(path?: string): string | undefined {
  return PHOTOS_READY && path ? path : undefined;
}
