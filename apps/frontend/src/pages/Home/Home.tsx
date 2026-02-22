import {
  withPreviewData,
  withPublishedData,
} from "@/components/withDocument.tsx";
// Internal utilities
import { Route } from "@/routes/index.tsx";
import { homeQuery } from "@/sanity/queries/homeQuery.ts";
import { previewStore } from "@/stores/previewStore.ts";
import type { PageProps } from "@/types/PageProps.ts";
import type { HomeDocument } from "@/types/home.ts";
import { useStore } from "@tanstack/react-store";
// Styles
import { divider, homeContainer } from "./Home.css.ts";

import { ContentCardsSection } from "./sections/ContentCardsSection.tsx";
// Types
import { HeroSection } from "./sections/HeroSection.tsx";

type HomePagePayload = {
  homeData: HomeDocument;
};

const Home = ({ data }: PageProps<HomePagePayload>) => {
  const homeData = data?.homeData ?? {
    title: null,
    subTitle: null,
    headingCard1: null,
    headingCard2: null,
    headingCard3: null,
    card1: null,
    card2: null,
    card3: null,
  };

  return (
    <div className={homeContainer}>
      <HeroSection title={homeData.title} subTitle={homeData.subTitle} />
      <div className={divider} />
      <ContentCardsSection homeData={homeData} />
      <div className={divider} />
    </div>
  );
};

const HomePreview = withPreviewData(Home);
const HomePublished = withPublishedData(Home);

export function HomePage() {
  const loaderData = Route.useLoaderData();

  // Use the reactive preview store instead of only the loader's isPreview
  // This allows the component to switch when preview mode is detected client-side
  const { isPreview: isPreviewFromStore } = useStore(
    previewStore,
    (state) => state,
  );

  const {
    initial,
    options,
    query,
    params,
    sanity: { isPreview: isPreviewFromLoader },
  } = loaderData;

  // Use the store value (client-side reactive) with loader as fallback (SSR)
  const isPreview = isPreviewFromStore || isPreviewFromLoader;

  // Note: We pass loader's isPreview to determine which wrapper to use,
  // but the Home component itself reads from the store for reactive updates
  return isPreview ? (
    <HomePreview initial={initial} query={query} params={params} />
  ) : (
    <HomePublished initial={initial?.data} tanstackQuery={homeQuery(options)} />
  );
}
