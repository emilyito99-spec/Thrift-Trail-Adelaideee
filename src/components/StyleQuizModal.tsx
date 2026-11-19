import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, Check } from 'lucide-react';
import { StyleTag, PriceTier, AdelaideRegion } from '../types';
import { formatStyleLabel } from '../data/storesData';

interface StyleQuizModalProps {
  onClose: () => void;
  onApplyMatches: (filters: {
    selectedStyle?: StyleTag;
    selectedPrice?: PriceTier;
    selectedRegion?: AdelaideRegion;
  }) => void;
}

export const StyleQuizModal: React.FC<StyleQuizModalProps> = ({
  onClose,
  onApplyMatches,
}) => {
  const [step, setStep] = useState<number>(1);
  const [styleChoice, setStyleChoice] = useState<StyleTag>('Vintage Streetwear & Sportswear');
  const [priceChoice, setPriceChoice] = useState<PriceTier>('$');
  const [regionChoice, setRegionChoice] = useState<AdelaideRegion | 'Any'>('Any');

  const handleFinish = () => {
    onApplyMatches({
      selectedStyle: styleChoice,
      selectedPrice: priceChoice,
      selectedRegion: regionChoice === 'Any' ? undefined : regionChoice,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-xl border border-[#E8DFD5] overflow-hidden my-6">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#FAF7F2] border-b border-[#E8DFD5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#2F5233] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#FAF7F2]" />
            </div>
            <div>
              <h2 id="quiz-modal-title" className="font-editorial text-lg font-bold text-[#213B24]">
                Adelaide Thrift Style Matcher
              </h2>
              <p className="text-xs text-[#585047]">
                Step {step} of 3 · Find stores matched to your style &amp; budget
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#E8DFD5] text-[#585047] transition-colors cursor-pointer"
            aria-label="Close style quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Content */}
        <div className="p-6 space-y-4">
          {step === 1 && (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#2F5233] uppercase tracking-wider block">
                Question 1
              </span>
              <h3 className="font-editorial text-xl font-bold text-[#213B24]">
                What clothing style are you looking for?
              </h3>
              <p className="text-xs text-[#585047]">
                Pick the style you wear most often so we can match you with relevant Adelaide stores.
              </p>

              <div className="space-y-2 pt-1 max-h-[50vh] overflow-y-auto pr-1">
                {[
                  {
                    style: 'Vintage Streetwear & Sportswear' as StyleTag,
                    desc: 'Graphic tees, oversized fleece, retro sportswear & streetwear',
                  },
                  {
                    style: '90s & Y2K Nostalgia' as StyleTag,
                    desc: '90s/2000s denim, baby tees, casual streetwear & retro cuts',
                  },
                  {
                    style: 'Workwear & Gorpcore' as StyleTag,
                    desc: 'Heavyweight denim, canvas jackets, boots & everyday utility wear',
                  },
                  {
                    style: 'Minimalist & Capsule Essentials' as StyleTag,
                    desc: 'Timeless coats, tailored basics, linen & crisp button-downs',
                  },
                  {
                    style: '60s & 70s Retro & Boho' as StyleTag,
                    desc: '1920s–1980s vintage dresses, retro shirts, flares & accessories',
                  },
                  {
                    style: 'Eclectic Op Shop Mix' as StyleTag,
                    desc: 'Everyday bargain racks, varied donations & unexpected finds',
                  },
                  {
                    style: 'Designer & Archive Pieces' as StyleTag,
                    desc: 'Labelled designer donations, rare vintage & collector garments',
                  },
                ].map((item) => (
                  <button
                    key={item.style}
                    onClick={() => setStyleChoice(item.style)}
                    className={`w-full text-left p-3 rounded-md border transition-all cursor-pointer flex items-start justify-between ${
                      styleChoice === item.style
                        ? 'border-[#2F5233] bg-[#EBF2EC]'
                        : 'border-[#E8DFD5] bg-[#FAF7F2]/60 hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-semibold text-[#213B24] block">
                        {formatStyleLabel(item.style)}
                      </span>
                      <span className="text-[11px] text-[#585047] leading-relaxed">
                        {item.desc}
                      </span>
                    </div>
                    {styleChoice === item.style && (
                      <Check className="w-4 h-4 text-[#2F5233] shrink-0 mt-0.5 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#2F5233] uppercase tracking-wider block">
                Question 2
              </span>
              <h3 className="font-editorial text-xl font-bold text-[#213B24]">
                What kind of price level are you looking for?
              </h3>
              <p className="text-xs text-[#585047]">
                Choose a general store category from everyday charity op shops to specialty vintage (exact item prices vary in-store).
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  {
                    tier: '$' as PriceTier,
                    title: '$ — Budget-Friendly Op Shops',
                    desc: 'Everyday charity op shops and large-format thrift stores.',
                  },
                  {
                    tier: '$$' as PriceTier,
                    title: '$$ — Mid-Range Vintage & Designer Op Shops',
                    desc: 'Approachable curated vintage shops and designer-focused charity op shops.',
                  },
                  {
                    tier: '$$$' as PriceTier,
                    title: '$$$ — Curated Vintage & Streetwear',
                    desc: 'Specialist vintage streetwear, heritage workwear, and curated retro stores.',
                  },
                  {
                    tier: '$$$$' as PriceTier,
                    title: '$$$$ — Premium & Collector Vintage',
                    desc: 'Rare vintage clothing and specialty collector pieces.',
                  },
                  {
                    tier: 'Not confirmed' as PriceTier,
                    title: 'Stores Without Listed Pricing',
                    desc: 'Independent boutiques and multi-vendor collectives where prices vary by stall or piece.',
                  },
                ].map((item) => (
                  <button
                    key={item.tier}
                    onClick={() => setPriceChoice(item.tier)}
                    className={`w-full text-left p-3.5 rounded-md border transition-all cursor-pointer flex items-start justify-between ${
                      priceChoice === item.tier
                        ? 'border-[#2F5233] bg-[#EBF2EC]'
                        : 'border-[#E8DFD5] bg-[#FAF7F2]/60 hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-semibold text-[#213B24] block">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-[#585047] leading-relaxed">
                        {item.desc}
                      </span>
                    </div>
                    {priceChoice === item.tier && (
                      <Check className="w-4 h-4 text-[#2F5233] shrink-0 mt-0.5 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#2F5233] uppercase tracking-wider block">
                Question 3
              </span>
              <h3 className="font-editorial text-xl font-bold text-[#213B24]">
                Where in Adelaide do you want to thrift?
              </h3>
              <p className="text-xs text-[#585047]">
                Choose an area accessible by Adelaide Metro transit or explore city-wide.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {[
                  { region: 'Any' as const, label: 'All Adelaide Areas', note: 'Show all matching stores' },
                  { region: 'Adelaide CBD / East End' as AdelaideRegion, label: 'CBD & East End', note: 'Ebenezer Pl, Rundle St, Adelaide Arcade & Ranelagh St' },
                  { region: 'Norwood / Inner East' as AdelaideRegion, label: 'The Parade Norwood', note: 'Vinnies, Save the Children & A Star Is Worn' },
                  { region: 'Unley, Fullarton & Inner South' as AdelaideRegion, label: 'Unley, Fullarton & Clarence Park', note: 'RSPCA Unley, 2nd Chance Collective & Chaos Bazaar' },
                  { region: 'Prospect / Inner North' as AdelaideRegion, label: 'Prospect / Churchill Rd', note: 'Savers Prospect along Churchill Rd bus routes' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setRegionChoice(item.region)}
                    className={`text-left p-3 rounded-md border transition-all cursor-pointer ${
                      regionChoice === item.region
                        ? 'border-[#2F5233] bg-[#EBF2EC]'
                        : 'border-[#E8DFD5] bg-[#FAF7F2]/60 hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[#213B24] block">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-[#7A7167]">
                      {item.note}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 sm:p-5 bg-[#FAF7F2] border-t border-[#E8DFD5] flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-xs font-medium text-[#585047] hover:text-[#213B24] cursor-pointer"
            >
              Back
            </button>
          ) : (
            <span className="text-[11px] text-[#7A7167]">Fast 60-second matcher</span>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2F5233] rounded hover:bg-[#213B24] transition-colors cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-semibold text-white bg-[#2F5233] rounded hover:bg-[#213B24] transition-colors cursor-pointer shadow-xs"
            >
              <span>See My Matched Stores</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
