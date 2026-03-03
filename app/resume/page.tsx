import React from 'react';

export default function ResumePage() {
  return (
    <section className="page section-fade">
      <div className="hero">
        <p className="eyebrow">Resume</p>
        <h1>Resume</h1>
        <p>Embedded below. If your browser blocks embeds, use the direct link.</p>
      </div>
      <div className="card stagger-item">
        <object data="/resume/resume.pdf" type="application/pdf" className="resume-object">
          <p>
            Unable to display PDF inline.{' '}
            <a href="/resume/resume.pdf" target="_blank" rel="noreferrer">
              Open resume
            </a>
            .
          </p>
        </object>
        <p>
          <a href="/resume/resume.pdf" target="_blank" rel="noreferrer">
            Open or download resume PDF
          </a>
        </p>
      </div>
    </section>
  );
}
