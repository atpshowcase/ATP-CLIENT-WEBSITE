import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Clock, MapPin, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Info block animation
      gsap.fromTo(
        infoRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Form card animation
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', contact: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full bg-[#111111] py-[8vh] px-[6vw] z-section-10 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Info Block - Left */}
          <div ref={infoRef}>
            <h2 className="headline-lg text-[#F4F2EE] mb-4">Hubungi Kami</h2>
            <p className="text-[rgba(244,242,238,0.65)] mb-10 max-w-[42ch]">
              Isi formulir atau hubungi langsung. Kami siap membantu.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[rgba(244,242,238,0.1)] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#2F6BFF]" />
                </div>
                <div>
                  <p className="text-sm text-[rgba(244,242,238,0.5)] mb-1">
                    Email
                  </p>
                  <p className="text-[#F4F2EE] font-medium">
                    halo@hadiatmoconsulting.id
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[rgba(244,242,238,0.1)] flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#2F6BFF]" />
                </div>
                <div>
                  <p className="text-sm text-[rgba(244,242,238,0.5)] mb-1">
                    Telepon
                  </p>
                  <p className="text-[#F4F2EE] font-medium">
                    +62 812‑3456‑7890
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[rgba(244,242,238,0.1)] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#2F6BFF]" />
                </div>
                <div>
                  <p className="text-sm text-[rgba(244,242,238,0.5)] mb-1">
                    Jam Operasional
                  </p>
                  <p className="text-[#F4F2EE] font-medium">
                    Senin–Jumat, 08.00–17.00 WIB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[rgba(244,242,238,0.1)] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#2F6BFF]" />
                </div>
                <div>
                  <p className="text-sm text-[rgba(244,242,238,0.5)] mb-1">
                    Area Layanan
                  </p>
                  <p className="text-[#F4F2EE] font-medium">
                    Jakarta, Surabaya, Bandung & Online
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card - Right */}
          <div ref={formRef}>
            <div className="bg-[#F4F2EE] rounded-[26px] p-8 lg:p-10">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#2F6BFF] flex items-center justify-center mx-auto mb-6">
                    <Send className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="headline-md text-[#111111] mb-2">
                    Pesan Terkirim!
                  </h3>
                  <p className="body-text">
                    Tim kami akan menghubungi Anda dalam 1×24 jam.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="headline-md text-[#111111] mb-6">
                    Kirim Pesan
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-2">
                        Nama
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Nama lengkap Anda"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-2">
                        Email atau Telepon
                      </label>
                      <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="email@anda.com atau 0812xxxx"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111111] mb-2">
                        Pesan
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="form-input resize-none"
                        placeholder="Ceritakan kebutuhan Anda..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-accent w-full flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Kirim Pesan
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[rgba(244,242,238,0.1)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[rgba(244,242,238,0.5)] text-sm">
              © 2024 Hadi Atmo Consulting. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button className="text-[rgba(244,242,238,0.5)] text-sm hover:text-[#F4F2EE] transition-colors">
                Kebijakan Privasi
              </button>
              <button className="text-[rgba(244,242,238,0.5)] text-sm hover:text-[#F4F2EE] transition-colors">
                Syarat & Ketentuan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
