import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'Tim ini membantu kami menyusun ulang strategi risiko dalam 90 hari. Sangat praktis.',
    name: 'Arianto W.',
    role: 'Direktur Operasional, BPR',
    image: '/images/testimonial_portrait_a.jpg',
    layout: 'image-top',
  },
  {
    quote:
      'Restrukturisasi kredit berjalan lebih tenang karena ada pendampingan profesional.',
    name: 'Lina S.',
    role: 'Pemilik Usaha',
    image: '/images/testimonial_portrait_b.jpg',
    layout: 'image-bottom',
  },
];

export default function Testimonials() {
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
            { y: 100, opacity: 0, rotate: 1 },
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
      id="testimonials"
      className="w-full bg-[#F4F2EE] py-[8vh] px-[6vw] z-section-7 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16">
          <h2 className="headline-lg text-[#111111]">Testimoni Klien</h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="testimonial-card overflow-hidden"
            >
              {testimonial.layout === 'image-top' ? (
                <>
                  {/* Image Top */}
                  <div className="h-[55%] overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 lg:p-8">
                    <Quote className="w-8 h-8 text-[#2F6BFF] mb-4 opacity-50" />
                    <p className="text-[#111111] text-lg font-medium mb-4 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p className="font-semibold text-[#111111]">
                        {testimonial.name}
                      </p>
                      <p className="body-text text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Quote Top */}
                  <div className="p-6 lg:p-8">
                    <Quote className="w-8 h-8 text-[#2F6BFF] mb-4 opacity-50" />
                    <p className="text-[#111111] text-lg font-medium mb-4 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p className="font-semibold text-[#111111]">
                        {testimonial.name}
                      </p>
                      <p className="body-text text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="h-[55%] overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
