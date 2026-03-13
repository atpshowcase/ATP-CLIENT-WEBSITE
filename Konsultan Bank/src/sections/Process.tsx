import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Konsultasi Awal',
    description: 'Kami memahami situasi, tujuan, dan kendala Anda.',
  },
  {
    number: '02',
    title: 'Analisis & Strategi',
    description: 'Menyusun rekomendasi berbasis data dan kebijakan.',
  },
  {
    number: '03',
    title: 'Pendampingan',
    description: 'Eksekusi bersama tim Anda hingga tujuan tercapai.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.4,
          },
        }
      );

      // Cards animation
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 55%',
                scrub: 0.6,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="w-full bg-[#F4F2EE] py-[8vh] px-[6vw] z-section-6 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16">
          <h2 className="headline-lg text-[#111111] mb-4">
            Proses Kerja Sama
          </h2>
          <p className="body-text max-w-[50ch] mx-auto">
            Tiga langkah untuk mendapatkan solusi yang tepat.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="step-card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="step-number">{step.number}</div>
              <h3 className="headline-md text-[#111111] mb-3">{step.title}</h3>
              <p className="body-text">{step.description}</p>
              <div className="step-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
