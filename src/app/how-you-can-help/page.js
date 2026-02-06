import HeaderBar from "../components/HeaderBar";
import { Building2, HandHeart, Mail } from "lucide-react";
import DonateSection from "./DonateSection";
import styles from "./how-you-can-help.module.css";

export const metadata = {
  title: "How You Can Help | Mission 007 Mentorship",
  description:
    "Support Mission 007 Mentorship to securely donate, send checks, and build community partnerships that empower youth ages 16-25.",
};

export default function HowYouCanHelpPage() {
  return (
    <div className={styles.page}>
      <HeaderBar />
      <h2 className="page-title-hero">How You Can Help</h2>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>How You Can Help</p>
            <h1>Invest in youth mentorship and brighter futures</h1>
            <p className={styles.lead}>
              Mission 007 Mentorship thrives because of supporters like you.
              Your generosity helps us expand mentorship, provide resources, and
              build safe spaces where young people can grow with confidence.
            </p>
          </div>
          {/* <div className={styles.heroCard}>
            <h2>Your impact matters</h2>
            <p>
              Every gift fuels programming, mentorship experiences, and life
              skills development for youth ages 16-25.
            </p>
            <div className={styles.heroHighlights}>
              <div>
                <span>Mentorship</span>
                <p>Guidance that opens doors</p>
              </div>
              <div>
                <span>Resources</span>
                <p>Tools to reach new goals</p>
              </div>
              <div>
                <span>Community</span>
                <p>Support that builds resilience</p>
              </div>
            </div>
          </div> */}
        </section>

        <DonateSection />

        <section className={styles.section}>
          <h2>Become a sponsor or donor</h2>
          <p>
            Sponsors and recurring donors help us plan long-term programs and
            deepen our impact. We would love to talk about sponsorship levels,
            event partnerships, or monthly giving options.
          </p>
          <div className={styles.donationGrid}>
            <article className={styles.card}>
              <Building2 className={styles.cardIcon} aria-hidden="true" />
              <h3>Corporate or community sponsor</h3>
              <p>
                Support a cohort, workshop series, or event and receive tailored
                recognition opportunities.
              </p>
              <a href="mailto:007mmission@gmail.com" className={styles.link}>
                Discuss sponsorship options
              </a>
            </article>
            <article className={styles.card}>
              <HandHeart className={styles.cardIcon} aria-hidden="true" />
              <h3>Monthly donor</h3>
              <p>
                Provide steady support that sustains mentorship, resources, and
                youth programming year-round.
              </p>
              <a href="mailto:007mmission@gmail.com" className={styles.link}>
                Set up recurring giving
              </a>
            </article>
          </div>
        </section>

        <section className={styles.split}>
          <div>
            <h2>More ways to support</h2>
            <p>
              Beyond ways to securely donate, partnerships and community collaborations
              amplify our impact. We welcome volunteers, sponsors, and
              organizations that want to invest in youth development.
            </p>
          </div>
          <img
            src="https://dl4.pushbulletusercontent2.com/BUy8VeVUCeZOVqMD0M8AFdiy3Wb9HfD1/Screenshot%202026-02-03%20at%207.06.53%E2%80%AFPM.png"
            alt="Mission 007 youth community event"
            className={styles.imageBlock}
          />
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.sectionCopy}>
            <h2>Why your support is essential</h2>
            <p>
              Your contribution removes barriers and creates access to
              mentorship, career exploration, and leadership opportunities for
              young people who need it most.
            </p>
          </div>
          <ul className={styles.list}>
            <li>Expand access to mentors and life skill coaching.</li>
            <li>Provide program materials, events, and workshops.</li>
            <li>Create consistent, safe spaces for growth.</li>
            <li>Inspire confidence, resilience, and hope.</li>
          </ul>
        </section>

        <section className={styles.splitReverse}>
          <img
            src="https://dl4.pushbulletusercontent2.com/LhNN8TIaDSyRgH9WE4q2db0nRITi0xRX/shauntiapointingrmbg.png"
            alt="Mission 007 mentoring and partnership highlight"
            className={styles.imageBlock}
          />
          <div>
            <h2>Connect with Mission 007 Mentorship</h2>
            <p>
              For giving questions, partnership inquiries, or additional
              information, contact Shauntia Vasquez at Mission 007 Mentorship.
            </p>
            <div className={styles.contactCard}>
              <p className={styles.contactName}>Shauntia Vasquez</p>
              <p>Mission 007 Mentorship</p>
              <a href="mailto:007mmission@gmail.com" className={styles.link}>
                007mmission@gmail.com
              </a>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Thank you for believing in our youth</h2>
          <p>
            Your support helps young people build the confidence and skills they
            need to pursue their dreams. We are grateful to have you with us.
          </p>
          <a href="mailto:007mmission@gmail.com" className={styles.ctaButton}>
            Get in touch
          </a>
        </section>
      </main>
    </div>
  );
}
