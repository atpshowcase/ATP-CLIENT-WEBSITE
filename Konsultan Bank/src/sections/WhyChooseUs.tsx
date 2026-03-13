import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    number: '01',
    title: 'Pendekatan Praktis',
    description: 'Solusi berbasis pengalaman kerja lapangan, bukan teori.',
  },
  {
    number: '02',
    title: 'Jaringan Luas',
    description: 'Relasi dengan kebijakan perbankan & regulator.',
  },
  {
    number: '03',
    title: 'Kecepatan Respon',
    description: 'Tim responsif dengan timeline yang jelas.',
  },
  {
    number: '04',
    title: 'Legal & Patut',
    description: 'Seluruh proses sesuai regulasi OJK/BI.',
  },
  {
    number: '05',
    title: 'Fokus Hasil',
    description: 'Metrik yang terukur dan tindak lanjut nyata.',
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.5,
          },
        }
      );

      // Items animation
      itemsRef.current.forEach((item) => {
        if (item) {
          gsap.fromTo(
            item,
            { x: 60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 60%',
                scrub: 0.5,
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
      className="w-full bg-[#F4F2EE] py-[8vh] px-[6vw] z-section-5 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Title - Left */}
          <div ref={titleRef} className="lg:col-span-4">
            <h2 className="headline-lg text-[#111111] sticky top-[20vh]">
              Mengapa Memilih Jasa Konsultan Kami?
            </h2>
          </div>

          {/* List - Right */}
          <div className="lg:col-span-8 space-y-0">
            {reasons.map((reason, index) => (
              <div
                key={reason.number}
                ref={(el) => { itemsRef.current[index] = el; }}
                className="flex items-start gap-6 py-6 border-b border-[rgba(17,17,17,0.08)]"
              >
                <span className="text-2xl font-bold text-[#2F6BFF] w-12 flex-shrink-0">
                  {reason.number}
                </span>
                <div>
                  <h3 className="font-semibold text-[#111111] text-lg mb-1">
                    {reason.title}
                  </h3>
                  <p className="body-text">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
