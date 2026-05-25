"use client";

import React, { useState, useEffect } from "react";
import ContactForm from "@/components/ContactForm";

export default function LandingPage() {
  // Deployment trigger: Updated environment secrets and simplified workflow
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

      <header className="site-header">
        <nav className="wrap nav">
          <a href="#home" className="brand" aria-label="Talnet Thrive Solutions home">
            <img 
              className="brand-logo" 
              src="data:image/png;base64,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" 
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
              <h1>Professional HR support for hiring, payroll and compliance.</h1>
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
                  <img src="data:image/png;base64,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" 
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
