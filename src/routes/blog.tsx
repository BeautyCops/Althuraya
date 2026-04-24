import { createFileRoute } from "@tanstack/react-router";
import { ContentPageLayout } from "@/components/site/ContentPageLayout";
import { staticPages } from "@/lib/static-pages";

const page = staticPages.blog;

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: `الثريا — ${page.title}` },
      { name: "description", content: page.intro },
    ],
  }),
  component: () => <ContentPageLayout page={page} />,
});
