import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      // Image card animation (from right)
      scrollTl.fromTo(
        imageRef.current,
        { x: '60vw', opacity: 0, scale: 1.06 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Content block animation (from left)
      scrollTl.fromTo(
        contentRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Exit animations (70% - 100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        contentRef.current,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
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
      className="section-pinned bg-[#F4F2EE] z-section-9"
    >
      {/* Content Block - Left */}
      <div
        ref={contentRef}
        className="absolute left-[6vw] top-[22vh] w-[88vw] lg:w-[40vw]"
      >
        <h2 className="headline-xl text-[#111111] mb-6">
          Jangan Biarkan Keraguan Menjadi Kerugian
        </h2>
        <p className="body-text text-lg mb-8 max-w-[42ch]">
          Segera ambil kendali atas keputusan finansial Anda.
        </p>
        <button onClick={scrollToContact} className="btn-accent btn-hover mb-4">
          Hubungi Kami
        </button>
        <p className="body-text text-sm">Respon dalam 1×24 jam.</p>
      </div>

      {/* Image Card - Right */}
      <div
        ref={imageRef}
        className="hidden lg:block absolute right-[4vw] top-[10vh] w-[46vw] h-[80vh] image-card card-shadow"
      >
        <img
          src="/images/final_cta_handshake.jpg"
          alt="Professional handshake"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Mobile Image */}
      <div className="lg:hidden absolute bottom-[8vh] left-[6vw] right-[6vw] h-[30vh] image-card card-shadow opacity-40">
        <img
          src="/images/final_cta_handshake.jpg"
          alt="Professional handshake"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
