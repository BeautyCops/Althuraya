import { createFileRoute } from "@tanstack/react-router";
import { BackgroundField } from "@/components/site/BackgroundField";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { Services } from "@/components/site/Services";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Pricing } from "@/components/site/Pricing";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "الثريا — منصة الدعوات الإلكترونية الفاخرة" },
      {
        name: "description",
        content:
          "صمّم وأرسل وأدر دعواتك الإلكترونية لحفلات الزفاف والمؤتمرات والفعاليات الخاصة بكل سهولة. نظام RSVP ذكي، وتحليلات لحظية، وتجربة إدارة فاخرة.",
      },
      {
        property: "og:title",
        content: "الثريا — منصة الدعوات الإلكترونية الفاخرة",
      },
      {
        property: "og:description",
        content:
          "دعواتك تستحق لمسة فاخرة — منصة سعودية متكاملة للدعوات الذكية.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <BackgroundField />
      <main className="relative" dir="rtl">
        <Navbar />
        <Hero />
        <Features />
        <Services />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
