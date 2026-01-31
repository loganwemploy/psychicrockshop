import HeaderBar from "../components/HeaderBar";
import {
  CheckCircle2,
  Compass,
  Handshake,
  Heart,
  Mail,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import styles from "./learn-where-to-start.module.css";

export const metadata = {
  title: "Learn Where to Start | Mission 007 Mentorship",
  description:
    "Mission 007 Mentorship is a not-for-profit supporting youth ages 16-25 through mentorship, resources, and six core focus areas.",
};

async function getEvents() {
  try {
    const res = await fetch(
      "https://mmission007.org/wp-json/wp/v2/eventinfo",
      { next: { revalidate: 300 } }
    );
    if (!res.ok) {
      return { events: [], error: true };
    }
    const data = await res.json();
    const events = data.map((event) => ({
      ...event.acf,
      event_image: event.acf?.event_image,
    }));
    return { events, error: false };
  } catch {
    return { events: [], error: true };
  }
}

export default async function LearnWhereToStartPage() {
  const { events, error } = await getEvents();
  return (
    <div className={styles.page}>
      <HeaderBar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Learn Where to Start</p>
            <h1>A not-for-profit built to help youth thrive</h1>
            <p className={styles.lead}>
              Mission 007 Mentorship is a not-for-profit organization dedicated
              to empowering young people ages 16-25. We help youth overcome
              obstacles and build thriving futures through evidence-based
              mentoring, social-emotional learning, and career readiness
              programs. Our support helps them identify goals, develop life
              skills, and transition into meaningful education, careers, and
              adult-life opportunities.
            </p>
          </div>
          <div className={styles.heroCard}>
            <h2>Our mission in action</h2>
            <p>
              We exist to serve youth and the community. Every program is
              designed to provide mentorship, resources, and a supportive
              network that builds confidence and momentum.
            </p>
            <div className={styles.heroHighlights}>
              <div>
                <span className={styles.highlightIcon}>
                  <Heart aria-hidden="true" />
                </span>
                <span>Not-for-profit</span>
                <p>Centered on community impact</p>
              </div>
              <div>
                <span className={styles.highlightIcon}>
                  <Users aria-hidden="true" />
                </span>
                <span>Youth-focused</span>
                <p>Supporting ages 16-25</p>
              </div>
              <div>
                <span className={styles.highlightIcon}>
                  <Handshake aria-hidden="true" />
                </span>
                <span>Mentorship</span>
                <p>Guidance that opens doors</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>What we focus on</h2>
          <p>
            Our mission comes to life through six focus areas that guide every
            workshop, mentoring relationship, and youth experience.
          </p>
          <div className={styles.grid}>
            <article className={styles.card}>
              <span className={styles.cardIcon}>
                <Sparkles aria-hidden="true" />
              </span>
              <h3>Empowerment</h3>
              <p>
                Building confidence, leadership, and self-belief so youth can
                take ownership of their future.
              </p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>
                <Handshake aria-hidden="true" />
              </span>
              <h3>Mentorship</h3>
              <p>
                Connecting youth with trusted guides who provide accountability,
                encouragement, and support.
              </p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>
                <Target aria-hidden="true" />
              </span>
              <h3>Skill Development</h3>
              <p>
                Teaching practical skills like communication, goal setting, and
                career readiness.
              </p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>
                <Compass aria-hidden="true" />
              </span>
              <h3>Inspiration</h3>
              <p>
                Sparking big dreams through exposure to role models and success
                stories.
              </p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>
                <Users aria-hidden="true" />
              </span>
              <h3>Community Building</h3>
              <p>
                Creating safe, supportive spaces where youth feel seen and
                connected.
              </p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>
                <Target aria-hidden="true" />
              </span>
              <h3>Pathways to Success</h3>
              <p>
                Linking youth to education, career opportunities, and the
                resources they need to move forward.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.split}>
          <div>
            <h2>Where support meets opportunity</h2>
            <p>
              As a not-for-profit, our goal is to remove barriers and offer
              consistent support. We help young people take the next right step
              with confidence, clarity, and community.
            </p>
          </div>
          <img
            src="https://dl4.pushbulletusercontent2.com/75qN098eZFz5Qnxq9NMSnW07Ur2hEshS/image.png"
            alt="Mentor helping a young person plan next steps"
            className={styles.imageBlock}
          />
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.sectionCopy}>
            <h2>How we help youth move forward</h2>
            <p>
              We meet young people where they are and provide the tools,
              encouragement, and relationships they need to thrive.
            </p>
          </div>
          <ul className={styles.list}>
            <li>
              <CheckCircle2 className={styles.listIcon} aria-hidden="true" />
              Identify goals and personal strengths.
            </li>
            <li>
              <CheckCircle2 className={styles.listIcon} aria-hidden="true" />
              Build confidence through guided mentorship.
            </li>
            <li>
              <CheckCircle2 className={styles.listIcon} aria-hidden="true" />
              Practice skills that open doors to opportunity.
            </li>
            <li>
              <CheckCircle2 className={styles.listIcon} aria-hidden="true" />
              Stay connected to a supportive community.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Upcoming events</h2>
          <p>
            Explore upcoming Mission 007 Mentorship events and find the right
            opportunity to get involved.
          </p>
          {error && (
            <div className={styles.eventNotice}>
              We are unable to load events right now. Please check back soon.
            </div>
          )}
          {!error && events.length === 0 && (
            <div className={styles.eventNotice}>
              No upcoming events are listed at the moment.
            </div>
          )}
          {!error && events.length > 0 && (
            <div className={styles.eventGrid}>
              {events.map((event, index) => {
                const dateObj = event.date_and_time
                  ? new Date(event.date_and_time)
                  : null;
                const month = dateObj
                  ? dateObj.toLocaleString("en-US", { month: "short" })
                  : "TBD";
                const day = dateObj ? dateObj.getDate() : "--";
                const startTime = dateObj
                  ? dateObj.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : "TBD";

                return (
                  <article key={index} className={styles.eventCard}>
                    <div className={styles.eventDate}>
                      <span className={styles.eventMonth}>{month}</span>
                      <span className={styles.eventDay}>{day}</span>
                    </div>
                    <div className={styles.eventInfo}>
                      <p className={styles.eventLabel}>Upcoming event</p>
                      <h3 className={styles.eventTitle}>
                        {event.event_name || "Mission 007 Event"}
                      </h3>
                      <p className={styles.eventDescription}>
                        {event.event_description ||
                          "Join us for an upcoming Mission 007 Mentorship experience."}
                      </p>
                      <dl className={styles.eventMeta}>
                        <div>
                          <dt>Time</dt>
                          <dd>
                            {startTime} – {event.event_end_time || "TBD"}
                          </dd>
                        </div>
                        <div>
                          <dt>Location</dt>
                          <dd>{event.event_location_name || "Location TBD"}</dd>
                        </div>
                        {event.event_address && (
                          <div>
                            <dt>Address</dt>
                            <dd className={styles.eventAddress}>
                              {event.event_address}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className={styles.cta}>
          <h2>Ready to begin?</h2>
          <p>
            Connect with Mission 007 Mentorship to learn which programs or
            resources are the best fit for you.
          </p>
          <a href="mailto:007mmission@gmail.com" className={styles.ctaButton}>
            <Mail className={styles.ctaIcon} aria-hidden="true" />
            Get guidance
          </a>
        </section>
      </main>
    </div>
  );
}
