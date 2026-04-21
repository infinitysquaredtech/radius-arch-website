function ProcessSteps() {
  try {
    const steps = [
      {
        title: 'Submit Required Documents',
        desc: 'Gather and submit all mandatory documents including ownership proof, CTS plans, and consent letters from existing members to initiate the 79(A) application with MHADA.'
      },
      {
        title: 'Project Feasibility Report',
        desc: 'Our team evaluates the structural condition, FSI potential, and financial viability to prepare a comprehensive feasibility report for the proposed redevelopment.'
      },
      {
        title: 'Tendering & Selection of Developers',
        desc: 'A transparent tender process is conducted to shortlist and select a qualified developer, ensuring the best terms and conditions for the existing members of the society.'
      },
      {
        title: 'Development Agreement & Building Plans',
        desc: 'The development agreement is executed between the society and the selected developer. Architectural plans are prepared and submitted for MHADA approval under DCPR 2034.'
      },
      {
        title: 'Construction Process',
        desc: 'Construction commences post-approval with regular site supervision, quality control checks, and compliance monitoring to ensure timely delivery within the sanctioned plans.'
      },
      {
        title: 'Repossession & Defect Liability',
        desc: "Members take possession of their new units upon project completion. A defect liability period ensures the developer addresses any structural or finishing issues post-handover."
      }
    ];

    return (
      <section id="process" className="py-20 bg-gradient-to-b from-white to-gray-50" data-name="process-steps" data-file="components/ProcessSteps.js">
        <div className="mx-auto px-4 sm:px-6 lg:px-20">

          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl text-[var(--primary-color)] mb-3">Section 79(A) Process</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">A step-by-step guide to navigating the redevelopment process with Radius Architects</p>
            <div className="w-16 h-1 bg-[var(--secondary-color)] mx-auto mt-5 rounded-full"></div>
          </div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto relative">

            {/* Vertical connector line */}
            <div
              className="absolute top-7 bottom-7"
              style={{
                left: '1.75rem',
                width: '2px',
                background: 'linear-gradient(to bottom, var(--primary-color), var(--secondary-color))'
              }}
            ></div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start group" style={{ gap: '1.75rem' }}>

                  {/* Step circle */}
                  <div
                    className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                      boxShadow: '0 4px 15px rgba(41,67,141,0.3)'
                    }}
                  >
                    <span className="text-white font-black text-lg">{String(idx + 1).padStart(2, '0')}</span>
                  </div>

                  {/* Content card */}
                  <div
                    className="relative flex-1 bg-white rounded-2xl p-6 border border-gray-100 overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                    style={{
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(41,67,141,0.12), 0 4px 6px -2px rgba(41,67,141,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'}
                  >
                    {/* Top accent bar */}
                    <div
                      className="absolute top-0 left-0 w-full h-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      style={{ background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))' }}
                    ></div>

                    {/* Ghost step number */}
                    <span
                      className="absolute top-2 right-4 text-6xl font-black select-none leading-none pointer-events-none"
                      style={{ color: 'rgba(41,67,141,0.05)' }}
                    >{String(idx + 1).padStart(2, '0')}</span>

                    <h3 className="text-xl font-bold text-[var(--primary-color)] mb-2">{step.title}</h3>
                    <p className="text-[var(--text-secondary)] text-base leading-relaxed">{step.desc}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    );
  } catch (error) {
    console.error('ProcessSteps component error:', error);
    return null;
  }
}
