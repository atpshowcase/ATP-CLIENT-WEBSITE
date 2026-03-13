import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'Apakah konsultasi pertama berbayar?',
    answer:
      'Konsultasi awal gratis. Kami akan menentukan scope setelah memahami kebutuhan Anda.',
  },
  {
    question: 'Berapa lama proses restrukturisasi?',
    answer:
      'Tergantung kompleksitas, biasanya 2–8 minggu dengan pendampingan penuh.',
  },
  {
    question: 'Apakah data saya dijamin rahasia?',
    answer:
      'Ya. Kami menerapkan standar kerahasiaan profesional dan perjanjian NDA bila diperlukan.',
  },
  {
    question: 'Apakah melayani seluruh Indonesia?',
    answer:
      'Kami melayani secara online dan onsite, dengan prioritas wilayah Jakarta, Surabaya, dan Bandung.',
  },
  {
    question: 'Bagaimana cara memulai?',
    answer:
      'Klik tombol konsultasi, isi formulir singkat, dan tim kami akan menghubungi dalam 1×24 jam.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

      // Items animation
      itemsRef.current.forEach((item) => {
        if (item) {
          gsap.fromTo(
            item,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                end: 'top 70%',
                scrub: 0.4,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="w-full bg-[#F4F2EE] py-[8vh] px-[6vw] z-section-8 relative"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h2 className="headline-lg text-[#111111]">Pertanyaan Umum</h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="faq-item"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="faq-question w-full text-left"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 ml-4 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
