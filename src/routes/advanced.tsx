import { createFileRoute } from "@tanstack/react-router";
import { AdvancedLayout } from "@/components/advanced/AdvancedShell";

export const Route = createFileRoute("/advanced")({
  head: () => ({
    meta: [
      { title: "JEE Advanced Module — CBT Test Platform" },
      {
        name: "description",
        content:
          "Full JEE Advanced test module: Paper 1, Paper 2, full papers, PYQ practice and analytics.",
      },
      { property: "og:title", content: "JEE Advanced Module — CBT Test Platform" },
      {
        property: "og:description",
        content: "Take Paper 1 + Paper 2 full tests, practice PYQs and track Advanced analytics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdvancedLayout,
});
