import React from 'react';
import { GUIDES_DATA } from '../data/guidesData';
import { PageRoute } from '../types';
import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface GuidesPageProps {
  onNavigate: (page: PageRoute) => void;
  selectedGuideId: string | null;
  onSelectGuide: (guideId: string | null) => void;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({
  onNavigate,
  selectedGuideId,
  onSelectGuide,
}) => {
  const selectedArticle = selectedGuideId
    ? GUIDES_DATA.find((article) => article.id === selectedGuideId) || null
    : null;

  const openArticle = (articleId: string) => {
    onSelectGuide(articleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* If an article is open in full page view */}
      {selectedArticle ? (
        <>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-[#7A7167] font-medium border-b border-[#E8DFD5] pb-4"
          >
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#213B24] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <button
              onClick={() => onSelectGuide(null)}
              className="hover:text-[#213B24] transition-colors cursor-pointer"
            >
              Thrift Guides
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#213B24] truncate max-w-xs sm:max-w-md">
              {selectedArticle.title}
            </span>
          </nav>

          <article className="max-w-4xl mx-auto bg-white rounded-xl border border-[#E8DFD5] overflow-hidden shadow-xs">
            {/* Back button & metadata bar */}
            <div className="p-4 sm:p-6 border-b border-[#E8DFD5] bg-[#FAF7F2] flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => onSelectGuide(null)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2F5233] hover:text-[#213B24] cursor-pointer"
              >
                <span>← Back to All Guides</span>
              </button>
              <div className="text-xs text-[#7A7167] flex items-center gap-2">
                <span>{selectedArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.readTime}</span>
              </div>
            </div>

            {/* Hero Banner */}
            <div className="relative aspect-16/9 sm:aspect-16/8 w-full bg-[#F4EFEA] overflow-hidden">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-white/85 block mb-1">
                  {selectedArticle.category}
                </span>
                <h1 className="font-editorial text-xl sm:text-3xl md:text-4xl font-bold leading-tight text-balance">
                  {selectedArticle.title}
                </h1>
                <p className="hidden sm:block text-xs sm:text-sm text-white/90 mt-2 max-w-2xl leading-relaxed">
                  {selectedArticle.subtitle}
                </p>
              </div>
            </div>

            {/* Mobile subtitle shown cleanly under banner */}
            <div className="sm:hidden px-5 pt-5 text-xs text-[#585047] leading-relaxed">
              {selectedArticle.subtitle}
            </div>

            {/* Article Content */}
            <div className="p-5 sm:p-10 space-y-8">
              {/* Key Takeaways Box */}
              <div className="p-4 sm:p-5 bg-[#FAF7F2] rounded-lg border border-[#E8DFD5] space-y-3">
                <p className="text-xs font-bold text-[#213B24] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2F5233] shrink-0" />
                  <span>Quick Student Takeaways</span>
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-[#585047]">
                  {selectedArticle.keyTakeaways.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#2F5233] font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Content Sections (H2 main headings & H3 subheadings) */}
              {selectedArticle.contentSections.map((section, idx) => (
                <section key={idx} className="space-y-4">
                  <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#213B24] leading-snug">
                    {section.heading}
                  </h2>

                  {section.paragraphs && section.paragraphs.length > 0 && (
                    <div className="space-y-3 text-sm sm:text-base text-[#585047] leading-relaxed">
                      {section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  )}

                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2 pl-1 text-sm sm:text-base text-[#585047]">
                      {section.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2F5233] shrink-0 mt-2" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.afterBulletsParagraphs &&
                    section.afterBulletsParagraphs.length > 0 && (
                      <div className="space-y-3 text-sm sm:text-base text-[#585047] leading-relaxed">
                        {section.afterBulletsParagraphs.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>
                    )}

                  {/* Optional Subsections (H3) */}
                  {section.subsections && section.subsections.length > 0 && (
                    <div className="space-y-6 pt-1">
                      {section.subsections.map((sub, subIdx) => (
                        <div key={subIdx} className="space-y-2.5">
                          <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#213B24]">
                            {sub.subheading}
                          </h3>
                          <div className="space-y-3 text-sm sm:text-base text-[#585047] leading-relaxed">
                            {sub.paragraphs.map((p, pIdx) => (
                              <p key={pIdx}>{p}</p>
                            ))}
                          </div>
                          {sub.bullets && sub.bullets.length > 0 && (
                            <ul className="space-y-1.5 pl-1 text-sm sm:text-base text-[#585047]">
                              {sub.bullets.map((bullet, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-2.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F5233] shrink-0 mt-2" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {sub.afterBulletsParagraphs &&
                            sub.afterBulletsParagraphs.length > 0 && (
                              <div className="space-y-3 text-sm sm:text-base text-[#585047] leading-relaxed">
                                {sub.afterBulletsParagraphs.map((p, pIdx) => (
                                  <p key={pIdx}>{p}</p>
                                ))}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Practical Tips Callout if available */}
                  {section.tips && section.tips.length > 0 && (
                    <div className="p-4 bg-[#F4EFEA] rounded-md border border-[#E8DFD5] space-y-2 mt-3">
                      <span className="text-xs font-semibold text-[#213B24] block">
                        Practical Thrifter Rule:
                      </span>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-[#585047]">
                        {section.tips.map((tip, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <span className="text-[#C06443] font-bold">→</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))}

              {/* Find Stores Call-to-Action */}
              <div className="pt-8 border-t border-[#E8DFD5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-[#213B24]">
                    Ready to explore Adelaide&apos;s second-hand stores?
                  </p>
                  <p className="text-xs sm:text-sm text-[#585047] mt-0.5">
                    Compare op shops and vintage stores by clothing style, budget level, and location.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onNavigate('find-stores');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2F5233] text-white rounded-md text-xs sm:text-sm font-semibold hover:bg-[#213B24] transition-colors whitespace-nowrap cursor-pointer shadow-xs w-full sm:w-auto"
                >
                  <span>Find Stores</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        </>
      ) : (
        <>
          {/* Guides Index Header */}
          <div className="border-b border-[#E8DFD5] pb-6">
            <div className="flex items-center gap-2 text-xs text-[#7A7167] mb-2 font-medium">
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-[#213B24] transition-colors cursor-pointer"
              >
                Home
              </button>
              <span aria-hidden="true">/</span>
              <span className="text-[#213B24]">Thrift Guides</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#213B24]">
              Adelaide Vintage &amp; Thrift Guides
            </h1>
            <p className="text-xs sm:text-sm text-[#585047] mt-1 max-w-2xl leading-relaxed">
              Actionable advice on finding personal style, budgeting for second hand clothing Adelaide, spotting natural fabrics (wool, linen, silk), and navigating op shop transit routes.
            </p>
          </div>

          {/* Guides Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GUIDES_DATA.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-lg border border-[#E8DFD5] overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#2F5233]/40 transition-all group"
              >
                <div>
                  <div className="relative aspect-16/10 w-full bg-[#F4EFEA] overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#213B24] text-[11px] font-semibold px-2.5 py-0.5 rounded">
                      {article.category}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h2 className="font-editorial text-2xl font-bold text-[#213B24] leading-snug group-hover:text-[#2F5233] transition-colors">
                      <button
                        onClick={() => openArticle(article.id)}
                        className="text-left cursor-pointer focus:outline-none"
                      >
                        {article.title}
                      </button>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#585047] leading-relaxed line-clamp-2">
                      {article.subtitle}
                    </p>
                    <p className="text-xs text-[#7A7167] leading-relaxed line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-[#F4EFEA] flex items-center justify-between">
                  <span className="text-[11px] text-[#7A7167]">
                    Includes student tips &amp; checklists
                  </span>
                  <button
                    onClick={() => openArticle(article.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2F5233] hover:text-[#213B24] cursor-pointer"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {/* Sustainability Tip Banner */}
      <div className="p-8 bg-[#F4EFEA] rounded-xl border border-[#E8DFD5] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-[#2F5233] uppercase tracking-wider block">
            Adelaide Student Resource
          </span>
          <h3 className="font-editorial text-xl font-bold text-[#213B24]">
            Have a thrift route suggestion or student tip?
          </h3>
          <p className="text-xs text-[#585047]">
            This project welcomes feedback from South Australian university students to expand our local transit itineraries.
          </p>
        </div>
        <button
          onClick={() => onNavigate('about')}
          className="px-4.5 py-2.5 text-xs font-semibold text-[#213B24] bg-white border border-[#E8DFD5] rounded hover:bg-[#FAF7F2] transition-colors whitespace-nowrap cursor-pointer"
        >
          Learn More About Our Research
        </button>
      </div>
    </div>
  );
};
