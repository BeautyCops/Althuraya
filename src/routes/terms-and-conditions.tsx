import { createFileRoute } from "@tanstack/react-router";
import { ContentPageLayout } from "@/components/site/ContentPageLayout";
import { staticPages } from "@/lib/static-pages";

const page = staticPages.terms;

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: `الثريا — ${page.title}` },
      { name: "description", content: page.intro },
    ],
  }),
  component: () => <ContentPageLayout page={page} />,
});
