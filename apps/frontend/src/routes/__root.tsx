// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "@fontsource-variable/source-sans-3";
import "@/styles/globals.css.ts";

import { createRootRouteWithContext } from "@tanstack/react-router";
import appCss from "../styles.css?url";

import { GlobalLayout } from "@/components/GlobalLayout/GlobalLayout.tsx";
import { globalLayout as globalLayoutLoader } from "@/loaders/globalLayout.ts";
import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
  request: Request | null;
  isPreview?: boolean; // Preview state from root loader
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => {
    return {
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          title: "Cape Cod World",
        },
        {
          name: "description",
          content: "Bringing Your Ideas to The World",
        },
      ],
      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },
      ],
    };
  },
  loader: globalLayoutLoader,
  shellComponent: GlobalLayout,
});
