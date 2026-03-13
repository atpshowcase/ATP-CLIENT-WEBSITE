import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Entrance animation (on load)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Initial states
      gsap.set(imageRef.current, { x: '60vw', opacity: 0, scale: 1.06 });
      gsap.set([labelRef.current, headlineRef.current, subheadlineRef.current, ctaRef.current], {
        y: 40,
        opacity: 0,
      });

      // Animate in
      tl.to(imageRef.current, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.1,
      })
        .to(
          labelRef.current,
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.7'
        )
        .to(
          headlineRef.current,
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.5'
        )
        .to(
          subheadlineRef.current,
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .to(
          ctaRef.current,
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.to(imageRef.current, { x: 0, opacity: 1, duration: 0.3 });
            gsap.to(contentRef.current, { x: 0, opacity: 1, duration: 0.3 });
            gsap.to(ctaRef.current, { y: 0, opacity: 1, duration: 0.3 });
          },
        },
      });

      // Phase 1 (0% - 70%): Hold - no animation
      // Phase 2 (70% - 100%): Exit animation
      scrollTl.fromTo(
        contentRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: 18, opacity: 0, ease: 'power2.in' },
        0.85
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('corporate-services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#F4F2EE] flex items-center z-section-1"
    >
      {/* Content Block - Left */}
      <div
        ref={contentRef}
        className="absolute left-[6vw] top-[18vh] w-[88vw] lg:w-[38vw] z-10"
      >
        <span ref={labelRef} className="micro-label block mb-6">
          KONSULTAN PERBANKAN
        </span>
        <h1
          ref={headlineRef}
          className="headline-xl text-[#111111] mb-6"
        >
          Solusi Finansial Tepat
        </h1>
        <p ref={subheadlineRef} className="body-text mb-8 max-w-[42ch]">
          Dari praktisi bank senior. Pendekatan yang tuntas, terukur, dan
          rahasia.
        </p>
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
          <button onClick={scrollToContact} className="btn-accent btn-hover">
            Konsultasi Gratis
          </button>
          <button
            onClick={scrollToServices}
            className="flex items-center gap-2 text-[#111111] font-medium hover:text-[#2F6BFF] transition-colors"
          >
            Lihat Layanan
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image Card - Right */}
      <div
        ref={imageRef}
        className="hidden lg:block absolute right-[4vw] top-[10vh] w-[46vw] h-[80vh] image-card card-shadow"
      >
        <img
          src="/images/hero_architecture.jpg"
          alt="Modern banking consulting office"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Mobile Image */}
      <div className="lg:hidden absolute bottom-[10vh] left-[6vw] right-[6vw] h-[40vh] image-card card-shadow opacity-30">
        <img
          src="/images/hero_architecture.jpg"
          alt="Modern banking consulting office"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
