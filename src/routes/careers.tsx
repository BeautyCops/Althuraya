import { createFileRoute } from "@tanstack/react-router";
import { ContentPageLayout } from "@/components/site/ContentPageLayout";
import { staticPages } from "@/lib/static-pages";

const page = staticPages.careers;

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: `الثريا — ${page.title}` },
      { name: "description", content: page.intro },
    ],
  }),
  component: () => <ContentPageLayout page={page} />,
});
