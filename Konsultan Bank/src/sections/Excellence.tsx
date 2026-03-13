import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Target, Shield, Network } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const criteria = [
  {
    icon: Users,
    title: 'Keahlian Tim',
    description:
      'Mantan praktisi bank senior dengan pengalaman >20 tahun.',
  },
  {
    icon: Target,
    title: 'Solusi Tuntas',
    description:
      'Fokus pada solusi yang terukur, bukan sekadar teori.',
  },
  {
    icon: Shield,
    title: 'Kerahasiaan',
    description:
      'Jaminan kerahasiaan data dengan standar profesional tertinggi.',
  },
  {
    icon: Network,
    title: 'Jaringan',
    description:
      'Akses dan pemahaman mendalam terhadap kebijakan perbankan & regulator.',
  },
];

export default function Excellence() {
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
            { y: 60, opacity: 0, rotate: -1 },
            {
              y: 0,
              opacity: 1,
              rotate: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 55%',
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
      className="w-full bg-[#F4F2EE] py-[8vh] px-[6vw] z-section-2 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16">
          <h2 className="headline-lg text-[#111111] mb-4">
            Kriteria Keunggulan Kami
          </h2>
          <p className="body-text max-w-[52ch]">
            Empat pilar yang memastikan setiap solusi berkualitas dan
            terpercaya.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {criteria.map((item, index) => (
            <div
              key={item.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="content-card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="service-icon mb-5">
                <item.icon className="w-5 h-5 text-[#2F6BFF]" />
              </div>
              <h3 className="headline-md text-[#111111] mb-3">{item.title}</h3>
              <p className="body-text">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
