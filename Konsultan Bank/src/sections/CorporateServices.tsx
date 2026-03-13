import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, TrendingUp, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Shield,
    title: 'Manajemen Risiko & Kepatuhan',
    description:
      'Penyusunan kerangka risiko, implementasi Basel III, dan pemenuhan regulasi OJK/BI.',
  },
  {
    icon: TrendingUp,
    title: 'Strategi & Transformasi Bisnis',
    description:
      'Perumusan strategi, digitalisasi layanan, dan peningkatan efisiensi proses.',
  },
  {
    icon: Users,
    title: 'Pengembangan SDM Perbankan',
    description:
      'Pelatihan lending, treasury, dan collection untuk meningkatkan kompetensi tim.',
  },
];

export default function CorporateServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        },
      });

      // Image card animation
      scrollTl.fromTo(
        imageRef.current,
        { x: '-60vw', opacity: 0, scale: 1.05 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Content block animation
      scrollTl.fromTo(
        contentRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Services items staggered
      servicesRef.current.forEach((service, index) => {
        if (service) {
          scrollTl.fromTo(
            service,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.1 + index * 0.05
          );
        }
      });

      // Exit animations (70% - 100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        contentRef.current,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="corporate-services"
      className="section-pinned bg-[#F4F2EE] z-section-3"
    >
      {/* Image Card - Left */}
      <div
        ref={imageRef}
        className="hidden lg:block absolute left-[5vw] top-[10vh] w-[44vw] h-[80vh] image-card card-shadow"
      >
        <img
          src="/images/corporate_meeting.jpg"
          alt="Corporate banking meeting"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Block - Right */}
      <div
        ref={contentRef}
        className="absolute left-[6vw] lg:left-[54vw] top-[14vh] w-[88vw] lg:w-[40vw]"
      >
        <span className="micro-label block mb-4">LAYANAN KORPORASI</span>
        <h2 className="headline-lg text-[#111111] mb-8">
          Layanan untuk Korporasi & Institusi Keuangan
        </h2>

        {/* Services List */}
        <div className="space-y-6 mb-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => { servicesRef.current[index] = el; }}
              className="service-item"
            >
              <div className="service-icon">
                <service.icon className="w-5 h-5 text-[#2F6BFF]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#111111] text-lg mb-1">
                  {service.title}
                </h3>
                <p className="body-text text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={scrollToContact} className="btn-accent btn-hover">
          Diskusi Kebutuhan Institusi
        </button>
      </div>

      {/* Mobile Image */}
      <div className="lg:hidden absolute bottom-[8vh] left-[6vw] right-[6vw] h-[30vh] image-card card-shadow opacity-40">
        <img
          src="/images/corporate_meeting.jpg"
          alt="Corporate banking meeting"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
