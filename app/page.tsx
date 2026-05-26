"use client";

import React, { useState, useEffect } from "react";
import ContactForm from "@/components/ContactForm";

export default function LandingPage() {
  // Deployment trigger: Final synchronization with verified secrets
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span>Bangalore-based HR & Payroll Partner</span>
          <div className="right">
            <a href="mailto:connect@talnetthrive.com">connect@talnetthrive.com</a>
            <a href="tel:+918105681476">+91 8105681476</a>
          </div>
        </div>
      </div>

      <header className="site-header bg-[#0f2b46] text-white">
        <nav className="wrap nav flex justify-between items-center">
          <a href="#home" className="brand" aria-label="Talnet Thrive Solutions home">
            <img 
              className="brand-logo" 
              src="https://i.ibb.co/LzdhXqBf/logo-talnet.png" style={{ width: '154px', height: '76px', objectFit: 'contain' }} 
              alt="Talnet Thrive logo"
            />
            <span className="brand-text">
              <strong>Talnet Thrive</strong>
              <span>Solutions Pvt. Ltd.</span>
            </span>
          </a>

          <div className={`links ${menuOpen ? 'open' : ''}`} id="links">
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#compliance" onClick={closeMenu}>Payroll & Compliance</a>
            <a href="#process" onClick={closeMenu}>How We Work</a>
            <a href="#why" onClick={closeMenu}>Why Us</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </div>

          <div className="nav-actions">
            <a className="btn btn-light" href="mailto:connect@talnetthrive.com">Email Us</a>
            <a className="btn btn-primary" href="#contact">Send Enquiry</a>
            <button 
              className="menu" 
              type="button" 
              aria-label="Open menu" 
              onClick={toggleMenu}
            >
              ☰
            </button>
          </div>
        </nav>
      </header>

      <main id="home">
        {/* HERO SECTION */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="tag">Strategic HR • Recruitment • Payroll • Compliance</span>
              <h1 className="text-[#0f2b46] font-bold">Professional HR support for hiring, payroll and compliance.</h1>
              <p className="lead">
                Talnet Thrive Solutions Pvt. Ltd. helps businesses build reliable teams, run smoother payroll cycles, and manage PF, ESI, PT and labour-related queries through a practical HR partnership model.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#services">Explore Services</a>
                <a className="btn btn-light" href="https://wa.me/918105681476" target="_blank" rel="noopener">WhatsApp Enquiry</a>
              </div>

              <div className="hero-trust">
                <div className="trust-item">
                  <b>Quality hiring pipeline</b>
                  <span>Structured sourcing, screening and shortlist coordination.</span>
                </div>
                <div className="trust-item">
                  <b>Payroll discipline</b>
                  <span>Organized monthly inputs, processing support and reports.</span>
                </div>
                <div className="trust-item">
                  <b>Statutory support</b>
                  <span>PF, ESI, PT and labour query coordination for employers.</span>
                </div>
              </div>
            </div>

            <aside className="hero-card executive-hero-card" aria-label="Talnet Thrive service summary">
              <div className="exec-top">
                <div className="exec-logo">
                  <img src="https://i.ibb.co/LzdhXqBf/logo-talnet.png" style={{ width: '154px', height: '76px', objectFit: 'contain' }} 
                    alt="Talnet Thrive logo"
                  />
                </div>
                <div className="exec-title">
                  <span>Talnet Thrive Solutions Pvt. Ltd.</span>
                  <strong>HR, Payroll & Compliance Partner</strong>
                </div>
              </div>

              <div className="exec-summary">
                <h3>People operations made structured, responsive and business-ready.</h3>
                <p>We help employers manage hiring, payroll coordination and statutory queries with a clear process and dependable follow-up.</p>
              </div>

              <div className="exec-metrics">
                <div>
                  <b>48–72 hrs</b>
                  <span>Initial hiring shortlist target for suitable roles</span>
                </div>
                <div>
                  <b>4 Core Areas</b>
                  <span>Recruitment, Staffing, Payroll and Compliance</span>
                </div>
              </div>

              <div className="exec-focus">
                <span>Recruitment</span>
                <span>RPO</span>
                <span>Contract Staffing</span>
                <span>Payroll</span>
                <span>PF / ESI / PT</span>
                <span>Labour Queries</span>
              </div>
            </aside>
          </div>
        </section>

        {/* HR OVERVIEW SECTION */}
        <section className="hr-overview" id="home-overview">
          <div className="wrap overview-grid">
            <div className="overview-copy">
              <div className="kicker">Professional HR Partner</div>
              <h2>People operations support for companies that want clarity, speed and control.</h2>
              <p>
                Many businesses lose time when hiring is delayed, payroll inputs are scattered, or compliance queries are handled at the last minute.
                Talnet Thrive brings recruitment, payroll and statutory coordination into a more organized process so management teams can focus on business delivery.
              </p>
              <p>
                Our role is simple: understand your requirement, set the right process, communicate clearly, and follow through until the work is completed.
              </p>
            </div>

            <div className="overview-panel">
              <h3>What we help you improve</h3>
              <div className="overview-list">
                <div>
                  <b>Hiring turnaround</b>
                  <span>Clear role intake, relevant sourcing channels and faster shortlist movement.</span>
                </div>
                <div>
                  <b>Candidate quality</b>
                  <span>Screening focused on skills, communication, availability and role fit.</span>
                </div>
                <div>
                  <b>Payroll accuracy</b>
                  <span>Better coordination of monthly inputs, employee data and reporting.</span>
                </div>
                <div>
                  <b>Compliance confidence</b>
                  <span>Support for PF, ESI, PT and labour-related query management.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="kicker">HR Service Portfolio</div>
                <h2>End-to-end support across recruitment, staffing, payroll and compliance.</h2>
              </div>
              <p>Our services are designed for growing companies that need dependable HR execution without adding unnecessary complexity to their internal team.</p>
            </div>

            <div className="services">
              <article className="service">
                <div className="service-num">01</div>
                <h3>Specialized Recruitment</h3>
                <p>Candidate sourcing and shortlisting for roles where quality and fit matter.</p>
                <ul>
                  <li>IT, Engineering, Sales and Operations</li>
                  <li>Role understanding and sourcing plan</li>
                  <li>Screened profiles before submission</li>
                </ul>
              </article>

              <article className="service">
                <div className="service-num">02</div>
                <h3>RPO & Bulk Hiring</h3>
                <p>Recruitment support for growth phases, project hiring and repeated requirements.</p>
                <ul>
                  <li>Dedicated hiring coordination</li>
                  <li>Pipeline building for multiple roles</li>
                  <li>Interview and offer follow-up</li>
                </ul>
              </article>

              <article className="service">
                <div className="service-num">03</div>
                <h3>Contract Staffing</h3>
                <p>Flexible workforce support for time-bound projects and changing business needs.</p>
                <ul>
                  <li>Project-based manpower support</li>
                  <li>Quick onboarding coordination</li>
                  <li>Reduced internal HR workload</li>
                </ul>
              </article>

              <article className="service">
                <div className="service-num">04</div>
                <h3>Payroll & Compliance</h3>
                <p>Monthly payroll and statutory support for companies that need reliable execution.</p>
                <ul>
                  <li>Salary processing support</li>
                  <li>PF, ESI and PT assistance</li>
                  <li>Labour compliance query support</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* INDUSTRY SECTION */}
        <section className="industry-section">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="kicker">Industries & Hiring Focus</div>
                <h2>Recruitment support across business-critical functions.</h2>
              </div>
              <p>We support employers who need dependable hiring coordination across technical, operational and business roles.</p>
            </div>

            <div className="industry-grid-home">
              <div className="industry-card">
                <h3>IT & Digital</h3>
                <p>Application support, software, cloud, data, ERP and business technology roles.</p>
              </div>
              <div className="industry-card">
                <h3>Engineering</h3>
                <p>Project, maintenance, design, quality, production and technical operations roles.</p>
              </div>
              <div className="industry-card">
                <h3>Sales & Business</h3>
                <p>Inside sales, field sales, business development, account management and support roles.</p>
              </div>
              <div className="industry-card">
                <h3>Operations</h3>
                <p>Back-office, coordination, administration, customer support and workforce operations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* EMPLOYER CHALLENGES SECTION */}
        <section className="employer-challenges">
          <div className="wrap challenges-grid">
            <div>
              <div className="kicker">Challenges We Solve</div>
              <h2>HR support made practical for daily business problems.</h2>
              <p>Companies often come to us when internal teams are stretched, hiring is taking too long, payroll needs better control, or statutory queries need careful handling.</p>
            </div>
            <div className="challenge-list">
              <div><b>Slow hiring closure</b><span>Open positions remain vacant and affect delivery timelines.</span></div>
              <div><b>Too many irrelevant profiles</b><span>Hiring managers spend time reviewing unsuitable candidates.</span></div>
              <div><b>Payroll input gaps</b><span>Attendance, joining, exit and salary inputs need structured coordination.</span></div>
              <div><b>PF / ESI / PT confusion</b><span>Employee and employer queries need proper follow-up and documentation support.</span></div>
            </div>
          </div>
        </section>

        {/* PAYROLL & LABOUR BAND */}
        <section className="split-band" id="compliance">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="kicker">Payroll & Labour Support</div>
                <h2>Clear help for PF, ESI, PT and labour queries.</h2>
              </div>
              <p>Compliance can become confusing when teams grow. We help businesses stay organized with practical support, documentation follow-up and monthly coordination.</p>
            </div>

            <div className="compliance-grid">
              <div className="compliance-card">
                <h3>Payroll operations</h3>
                <p>Support for monthly payroll cycles, salary inputs, attendance inputs, reporting and employee-level coordination.</p>
                <div className="chips">
                  <span className="chip">Monthly payroll</span>
                  <span className="chip">Salary reports</span>
                  <span className="chip">Employee data</span>
                  <span className="chip">Input validation</span>
                </div>
              </div>
              <div className="compliance-card">
                <h3>Statutory query assistance</h3>
                <p>Guidance and coordination support for common PF, ESI, professional tax and labour compliance related queries.</p>
                <div className="chips">
                  <span className="chip">PF support</span>
                  <span className="chip">ESI support</span>
                  <span className="chip">PT support</span>
                  <span className="chip">Labour queries</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section id="process">
          <div className="wrap process">
            <div className="sticky-box">
              <div className="kicker">How We Work</div>
              <h2>A simple process your team can follow.</h2>
              <p>Our process is designed for real business teams: fewer confusing steps, clear ownership, quick updates and practical follow-through.</p>
            </div>

            <div className="steps">
              <div className="step">
                <div className="step-no">01</div>
                <div>
                  <h3>Understand</h3>
                  <p>We discuss your roles, workforce structure, payroll setup, compliance concerns and expected outcome.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-no">02</div>
                <div>
                  <h3>Plan</h3>
                  <p>We decide the right approach: recruitment, RPO, staffing, payroll processing or statutory support.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-no">03</div>
                <div>
                  <h3>Execute</h3>
                  <p>We work on sourcing, screening, coordination, payroll inputs, reporting and compliance query tracking.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-no">04</div>
                <div>
                  <h3>Follow up</h3>
                  <p>We keep communication open until the requirement is closed and the business team has clarity.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY US SECTION */}
        <section id="why" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="kicker">Why Talnet Thrive</div>
                <h2>Built for companies that want practical HR support.</h2>
              </div>
              <p>We avoid complicated language and focus on what matters: suitable candidates, accurate payroll coordination, compliance awareness and dependable response.</p>
            </div>

            <div className="proof-grid">
              <div className="proof">
                <h3>Domain understanding</h3>
                <p>We support hiring across Engineering, IT, Sales and Operations, with attention to role clarity and candidate fit.</p>
              </div>
              <div className="proof">
                <h3>Compliance-first mindset</h3>
                <p>PF, ESI, PT and labour-related queries are handled with a careful, documentation-focused approach.</p>
              </div>
              <div className="proof">
                <h3>Flexible engagement</h3>
                <p>Recruitment, RPO, contract staffing, payroll or compliance support can be handled based on your exact need.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section" id="contact">
          <div className="wrap contact-grid">
            <div className="contact-card">
              <h2>Let us know what support you need.</h2>
              <p>Share your hiring, payroll or compliance requirement. We will review it and respond with the next practical step.</p>

              <div className="contact-line">
                <b>Company</b>
                <span>Talnet Thrive Solutions Pvt. Ltd.</span>
              </div>
              <div className="contact-line">
                <b>Location</b>
                <span>Bangalore, Karnataka</span>
              </div>
              <div className="contact-line">
                <b>Email</b>
                <a href="mailto:connect@talnetthrive.com">connect@talnetthrive.com</a>
              </div>
              <div className="contact-line">
                <b>Phone / WhatsApp</b>
                <a href="tel:+918105681476">+91 8105681476</a><span> / </span><a href="tel:+919535183723">+91 9535183723</a>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <p>© {currentYear} Talnet Thrive Solutions Pvt. Ltd. All rights reserved.</p>
          <p>Recruitment • Payroll • PF / ESI / PT • Labour Query Support</p>
        </div>
      </footer>

      <a className="whatsapp" href="https://wa.me/918105681476" target="_blank" rel="noopener" aria-label="WhatsApp Talnet Thrive">☎</a>
    </>
  );
}
