import { useEffect, useState } from "react";

const isDarkTheme = () =>
  typeof document !== "undefined" &&
  document.documentElement.getAttribute("data-theme") === "dark";

export const FavIcons = () => {
  const [dark, setDark] = useState(isDarkTheme);

  useEffect(() => {
    setDark(isDarkTheme());

    const observer = new MutationObserver(() => setDark(isDarkTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <link
        rel="icon"
        type="image/png"
        href={dark ? "/favicon-dark-v2.png" : "/favicon-96x96-v2.png"}
        sizes="96x96"
      />
      <link
        rel="icon"
        type="image/svg+xml"
        href={dark ? "/favicon-dark-v2.png" : "/favicon-v2.svg"}
      />
      <link
        rel="shortcut icon"
        href={dark ? "/favicon-dark-v2.png" : "/favicon-v2.ico"}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon-v2.png"
      />
      <meta name="apple-mobile-web-app-title" content="CCW" />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  );
};
