function FAQ() {
  try {
    const [openIndex, setOpenIndex] = React.useState(null);

    const faqs = [
      {
        question: 'What liasoning authorities do you work with?',
        answer: 'We work with all major regulatory bodies in Mumbai including BMC (Brihanmumbai Municipal Corporation), MCGM, MHADA (Maharashtra Housing and Area Development Authority), and SRA (Slum Rehabilitation Authority). Our team has deep relationships and expertise across all these authorities to ensure smooth approvals.'
      },
      {
        question: 'How long does the liasoning and approval process typically take?',
        answer: 'The timeline varies depending on the project type and authority involved. BMC/MCGM approvals typically take 3–6 months, while MHADA and SRA projects may take 6–12 months due to their complexity. Our 25+ years of experience and proactive approach significantly reduce these timelines — we guarantee zero unnecessary delays.'
      },
      {
        question: 'Do you handle DCPR 2034 compliance?',
        answer: 'Yes, DCPR 2034 compliance is a core competency of ours. Our team stays continuously updated on all Development Control and Promotion Regulations, ensuring every project we handle is fully compliant from the planning stage through final approval.'
      },
      {
        question: 'Can you manage MHADA and SRA redevelopment projects?',
        answer: 'Absolutely. We have extensive experience in MHADA redevelopment and SRA (Slum Rehabilitation Authority) projects, including multi-authority coordination, tenant NOCs, and phased approvals. Our end-to-end management covers documentation, authority liaising, and on-site compliance.'
      },
      {
        question: 'What makes Radius Architects different from other consultancies?',
        answer: 'With 25+ years of experience, a team of 22+ licensed professionals, and a track record of zero-delay guarantees, we bring unmatched depth to every project. We handle the full spectrum — from architectural design and structural engineering to interior design and multi-authority liasoning — all under one roof.'
      },
      {
        question: 'How do I get started with my project?',
        answer: 'Simply fill out the contact form on this page or reach us directly at our Vile Parle office. Share your project details — type, location, and current status — and our team will schedule a consultation to assess your requirements and outline the path forward.'
      }
    ];

    const toggle = (idx) => {
      setOpenIndex(prev => prev === idx ? null : idx);
    };

    return (
      <section id="faq" className="py-20 bg-gradient-to-b from-gray-50 to-white" data-name="faq" data-file="components/FAQ.js">
        <div className="mx-auto px-4 sm:px-6 lg:px-20">

          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl text-[var(--primary-color)] mb-3">Frequently Asked Questions</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">Everything you need to know before starting your project with us</p>
            <div className="w-16 h-1 bg-[var(--secondary-color)] mx-auto mt-5 rounded-full"></div>
          </div>

          {/* Accordion list */}
          <div className="max-w-6xl mx-auto faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`relative rounded-2xl bg-white overflow-hidden faq-card ${isOpen ? 'faq-card-open' : ''}`}
                >
                  {/* Animated left accent bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl faq-accent ${isOpen ? 'faq-accent-open' : ''}`}
                  ></div>

                  {/* Ghost index number */}
                  <span
                    className="absolute top-2 right-14 text-6xl font-black select-none leading-none pointer-events-none faq-ghost-index"
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Question row */}
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 px-7 py-5"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-xl font-semibold pr-2 faq-question-text ${isOpen ? 'faq-question-text-open' : ''}`}
                    >
                      {faq.question}
                    </span>

                    {/* Chevron circle */}
                    <span
                      className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center faq-chevron ${isOpen ? 'faq-chevron-open' : ''}`}
                    >
                      <i className="icon-chevron-down faq-chevron-icon"></i>
                    </span>
                  </button>

                  {/* Answer panel */}
                  <div
                    className={`faq-answer-panel ${isOpen ? 'faq-answer-panel-open' : ''}`}
                  >
                    <div className="px-7 pb-6">
                      <div className="w-full h-px bg-gray-100 mb-4"></div>
                      <p className="leading-relaxed faq-answer-text">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('FAQ component error:', error);
    return null;
  }
}
