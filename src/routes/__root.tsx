import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import portfolioData from "../data/data.json";

const { profile, roles } = portfolioData;
const siteTitle = `${profile.name} | Portfolio`;
const siteDescription = profile.bio;
const siteUrl = import.meta.env.VITE_SITE_URL || "http://localhost:3000";
const ogImage = `${siteUrl}/assets/ogimg.png`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: siteTitle },
      { name: "description", content: siteDescription },
      { name: "author", content: profile.name },
      { name: "keywords", content: roles.join(", ") },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { property: "og:title", content: siteTitle },
      { property: "og:description", content: siteDescription },
      { property: "og:image", content: ogImage },
      { property: "og:site_name", content: profile.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: siteUrl },
      { name: "twitter:title", content: siteTitle },
      { name: "twitter:description", content: siteDescription },
      { name: "twitter:image", content: ogImage },
      { name: "theme-color", content: "#0a0a0a" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: profile.avatar },
      { rel: "apple-touch-icon", href: profile.avatar },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>{children}<Scripts /></body>
    </html>
  );
}
