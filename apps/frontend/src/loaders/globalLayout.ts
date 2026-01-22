import { detectPreviewMode } from '@/lib/previewMode';
import type { QueryClient } from '@tanstack/react-query';

export const globalLayout = async ({ context }: { context: { queryClient: QueryClient; request: Request | null } }) => {
  // Detect if preview mode is active
  const isPreviewMode = await detectPreviewMode(context.request);

  return {
    sanity: { isPreview: isPreviewMode },
  };
};
