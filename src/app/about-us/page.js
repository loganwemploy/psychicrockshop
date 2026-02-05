import HeaderBar from "../components/HeaderBar";
import {
  CheckCircle2,
  Compass,
  Handshake,
  Mail,
  Target,
  Users,
  Heart,
} from "lucide-react";
import styles from "./about-us.module.css";
import TestimonialsCarousel from "./TestimonialsCarousel";
import PhotoGallery from "../components/PhotoGallery";

export const metadata = {
  title: "About Mission 007 NFP | Youth Mentorship & Empowerment",
  description:
    "Mission 007 NFP empowers youth ages 16-25 through mentorship, resources, and community support to build confidence, set goals, and achieve meaningful futures.",
};

async function getTestimonials() {
  try {
    const res = await fetch(
      "https://mmission007.org/wp-json/wp/v2/testimonials",
      { next: { revalidate: 300 } }
    );
    if (!res.ok) {
      return { testimonials: [], error: true };
    }
    const data = await res.json();
    const testimonials = data.map((item) => {
      const acf = item.acf || {};
      return {
        quote: acf.quote || item.content?.rendered?.replace(/<[^>]+>/g, "")?.trim() || "",
        year: acf.year ? String(acf.year) : (item.date ? new Date(item.date).getFullYear().toString() : ""),
        name: acf.name || item.title?.rendered || "",
        age: acf.age != null ? Number(acf.age) : null,
      };
    }).filter((t) => t.quote && t.name);
    return { testimonials, error: false };
  } catch {
    return { testimonials: [], error: true };
  }
}

export default async function AboutUsPage() {
  const { testimonials: apiTestimonials } = await getTestimonials();
  return (
    <div className={styles.page}>
      <HeaderBar />
      <h2 className="page-title-hero">About Us</h2>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <img
              src="https://mmission007.org/wp-content/uploads/2025/10/IMG_6765.webp"
              alt="ribbon cutting moment with Mission 007 "
              className={styles.heroImage}
            />
            <p className={styles.eyebrow}>About <strong>Mission 007 NFP</strong></p>
            <h1>Empowering youth to lead with purpose and confidence</h1>
            <p className={styles.lead}>
              At <strong>Mission 007 NFP</strong>, our purpose is to empower and inspire youth ages
              16-25 to unlock their full potential and pursue their dreams with
              confidence. We provide mentorship, resources, and a supportive
              community to help young individuals set meaningful goals, develop
              essential skills, and overcome challenges.
            </p>
          </div>
          <div className={styles.heroCard}>
            <div className={styles.heroCardBody}>
              <h2>Our Mission</h2>
              <p>
                At <strong>Mission 007 NFP</strong>, our purpose is to empower and inspire youth
                ages 16-25 to unlock their full potential and pursue their dreams
                with confidence. We provide mentorship, resources, and a
                supportive community to help young individuals set meaningful
                goals, develop essential skills, and overcome challenges.
              </p>
              <div className={styles.heroHighlights}>
                <div>
                  <span className={styles.highlightIcon}>
                    <Users aria-hidden="true" />
                  </span>
                  <span>16-25</span>
                  <p>Target youth ages</p>
                </div>
                <div>
                  <span className={styles.highlightIcon}>
                    <Handshake aria-hidden="true" />
                  </span>
                  <span>Mentorship</span>
                  <p>Guidance that builds confidence</p>
                </div>
                <div>
                  <span className={styles.highlightIcon}>
                    <Heart aria-hidden="true" />
                  </span>
                  <span>Community</span>
                  <p>Support that lasts beyond programs</p>
                </div>
              </div>
              <a href="#" className={styles.heroCardCta}>
                Contact Us
              </a>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>What we provide</h2>
          <p>
            <strong>Mission 007 NFP</strong> connects youth with trusted mentors, practical
            resources, and experiences that turn goals into action. Our programs
            are designed to be accessible, affirming, and focused on real-world
            outcomes.
          </p>
          <div className={styles.grid}>
            <article className={styles.card}>
              <span className={styles.cardIcon}>
                <Handshake aria-hidden="true" />
              </span>
              <h3>Mentorship that meets them where they are</h3>
              <p>
                We pair youth with caring mentors who offer accountability,
                encouragement, and guidance through life and career decisions.
              </p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>
                <Target aria-hidden="true" />
              </span>
              <h3>Goal setting and skill development</h3>
              <p>
                Participants build essential life skills like communication,
                leadership, and problem-solving while working toward personal
                and professional goals.
              </p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>
                <Compass aria-hidden="true" />
              </span>
              <h3>Resources for meaningful opportunities</h3>
              <p>
                We connect youth to educational pathways, job readiness tools,
                and opportunities that help them move forward with confidence.
              </p>
            </article>
          </div>
        </section>

        <div className={styles.gallerySection}>
          <PhotoGallery />
        </div>

        <section className={styles.split}>
          <div>
            <h2>Where mentorship meets momentum</h2>
            <p>
              Young people gain clarity when they can see what is possible.
              Through consistent mentorship and guidance, we help them map a
              path forward, stay motivated, and celebrate progress along the
              way.
            </p>
          </div>
          <img
            src="https://dl4.pushbulletusercontent2.com/SYkqw6oZFKbHI28KnzfQalZqlkyRXbpj/IMG_0282.JPEG"
            alt="Mentor meeting with Mission 007 youth"
            className={styles.imageBlock}
          />
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.sectionCopy}>
            <h2>How we make an impact</h2>
            <p>
              Our approach centers on trust, growth, and belonging. By
              surrounding young people with positive role models and
              individualized support, we help them build resilience and a
              clearer vision for their future.
            </p>
          </div>
          <ul className={styles.list}>
            <li>
              <CheckCircle2 className={styles.listIcon} aria-hidden="true" />
              Confidence-building experiences that elevate leadership.
            </li>
            <li>
              <CheckCircle2 className={styles.listIcon} aria-hidden="true" />
              Supportive community spaces that encourage collaboration.
            </li>
            <li>
              <CheckCircle2 className={styles.listIcon} aria-hidden="true" />
              Practical tools that remove barriers to success.
            </li>
            <li>
              <CheckCircle2 className={styles.listIcon} aria-hidden="true" />
              Inspiration to dream big and pursue new possibilities.
            </li>
          </ul>
        </section>

        <TestimonialsCarousel testimonials={apiTestimonials} />

        <section className={styles.section}>
          <h2>Our promise to youth and families</h2>
          <p>
            <strong>Mission 007 NFP</strong> is committed to showing up consistently for young
            people. We listen, we advocate, and we celebrate progress at every
            step. Our work is rooted in respect, accountability, and a belief
            that every young person deserves the chance to thrive.
          </p>
        </section>

        <section className={styles.cta}>
          <h2>Join the Mission 007 community</h2>
          <p>
            Whether you are a young person seeking mentorship, a family member,
            or a community partner, we welcome you. Together, we help youth
            become confident leaders and change-makers.
          </p>
          <a href="mailto:007mmission@gmail.com" className={styles.ctaButton}>
            <Mail className={styles.ctaIcon} aria-hidden="true" />
            Connect with us
          </a>
        </section>
      </main>
    </div>
  );
}
