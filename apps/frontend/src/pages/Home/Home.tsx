import type { PreviewableComponent } from "@/components/PreviewWrapper.tsx";
import { withPublishedData } from "@/components/withDocument.tsx";
import { Route } from "@/routes/index.tsx";
import { homeQuery } from "@/sanity/queries/homeQuery.ts";
import { previewStore } from "@/stores/previewStore.ts";
import type { PageProps } from "@/types/PageProps.ts";
import type { HomeDocument } from "@/types/home.ts";
import { useStore } from "@tanstack/react-store";
import { Suspense, lazy, useEffect, useState } from "react";
// Styles
import { divider, homeContainer, socialLinksRow } from "./Home.css.ts";

import { SocialLinks } from "@/components/SocialLinks/SocialLinks.tsx";
import { ContentCardsSection } from "./sections/ContentCardsSection.tsx";
import { HeroSection } from "./sections/HeroSection.tsx";

const PreviewWrapper = lazy(() => import("@/components/PreviewWrapper.tsx"));
const WaterShader = lazy(() => import("@/components/WaterShader/WaterShader.tsx"));

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
      <div className={socialLinksRow}>
        <SocialLinks />
      </div>
    </div>
  );
};

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

  // Defer shader load until after first paint to protect Lighthouse scores.
  // Also check for WebGL support before loading the shader bundle at all.
  const [showShader, setShowShader] = useState(false);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (gl) setShowShader(true);
    } catch {
      // No WebGL — skip shader entirely
    }
  }, []);

  return (
    <>
      {showShader && (
        <Suspense fallback={null}>
          <WaterShader />
        </Suspense>
      )}
      {isPreview ? (
        <Suspense fallback={null}>
          <PreviewWrapper
            query={query}
            params={params}
            initial={initial}
            component={Home as PreviewableComponent}
          />
        </Suspense>
      ) : (
        <HomePublished initial={initial?.data} tanstackQuery={homeQuery(options)} />
      )}
    </>
  );
}
