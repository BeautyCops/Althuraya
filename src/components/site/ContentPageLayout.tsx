import { Link } from "@tanstack/react-router";
import { BackgroundField } from "./BackgroundField";
import { Footer } from "./Footer";
import { Logo } from "./Logo";

type ContentSection = {
  title: string;
  paragraphs?: Array<string>;
  bullets?: Array<string>;
};

export type ContentPageData = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<ContentSection>;
};

export function ContentPageLayout({ page }: { page: ContentPageData }) {
  return (
    <>
      <BackgroundField />
      <main className="relative min-h-screen" dir="rtl">
        <header className="relative z-20">
          <div className="container mx-auto px-4 sm:px-6 pt-4">
            <nav className="glass-strong rounded-full px-4 sm:px-6 py-3 flex items-center justify-between shadow-soft">
              <Logo />
              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="text-sm text-th-cream/80 hover:text-th-cream px-4 py-2 transition-colors"
                >
                  الرئيسية
                </Link>
                <a
                  href="/#contact"
                  className="text-sm bg-gradient-primary text-th-cream px-5 py-2.5 rounded-full font-medium hover:shadow-glow transition-all"
                >
                  تواصل معنا
                </a>
              </div>
            </nav>
          </div>
        </header>

        <section className="relative pt-32 pb-12 sm:pt-40">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex glass rounded-full px-4 py-1.5 text-xs text-th-lavender-soft mb-5">
                {page.eyebrow}
              </div>
              <h1
                className="text-gradient text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
                style={{ fontFamily: "var(--font-serif-arabic)" }}
              >
                {page.title}
              </h1>
              <p className="text-th-cream/75 text-lg leading-relaxed">
                {page.intro}
              </p>
            </div>
          </div>
        </section>

        <section className="relative pb-24 sm:pb-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {page.sections.map((section) => (
                <article
                  key={section.title}
                  className="glass rounded-3xl p-7 sm:p-8"
                >
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-th-cream mb-4"
                    style={{ fontFamily: "var(--font-serif-arabic)" }}
                  >
                    {section.title}
                  </h2>

                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-th-cream/75 leading-8 mb-4 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="space-y-3 text-th-cream/75 leading-8">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span className="mt-3 h-1.5 w-1.5 rounded-full bg-th-lavender flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
