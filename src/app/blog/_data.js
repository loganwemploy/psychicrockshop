/**
 * Mock blog data (WordPress API simulation).
 * Replace with real fetch when endpoint is ready.
 */

const mentorshipPosts = [
  {
    id: "m007-001",
    title: "Mentorship007: 10 Years of Empowering Communities Through Action",
    excerpt:
      "For the past 10 years, non-profit organization <strong>Mission 007 NFP</strong> has supported underserved communities through education, mentorship, and direct outreach.",
    slug: "mentorship007-10-years-impact",
    topic: "community-impact",
    status: "active",
    publishedAt: "2025-01-12",
    author: "Jane Doe",
    color: "#0baeb7",
    content:
      "<p>This is the full, detailed content for the 10 Years of Empowering Communities Through Action blog post. It elaborates on the organization's history, key milestones, and testimonials from beneficiaries. <strong>Mission 007 NFP</strong> is committed to creating lasting positive change.</p><p>The past decade has seen remarkable growth and impact, touching thousands of lives. From humble beginnings, the dedication of volunteers and partners has built a strong foundation for future initiatives.</p>",
    fullpageImg:
      "https://lh3.googleusercontent.com/nrg9bZ_V5sCJ8pJSxiEh3C0vS8NKM7Vx0n3u5mCTdqvoKvunwcsxbci6j2tJBrF4Su09Z3uyDkz77Xm-rlV2elV2elWc207brKal1e-tELeUXw=s960",
  },
  {
    id: "m007-002",
    title: "How Mentorship Programs Create Long-Term Change",
    excerpt:
      "<strong>Mission 007 NFP</strong> continues to prove that consistent guidance and real-world resources can change the trajectory of young lives.",
    slug: "mentorship-programs-long-term-change",
    topic: "education",
    status: "active",
    publishedAt: "2025-02-03",
    author: "John Smith",
    color: "rgb(34, 197, 94)",
    content:
      "<p>Our mentorship programs are designed to provide young individuals with the tools they need to succeed. Through one-on-one guidance, skill-building workshops, and access to professional networks, we foster an environment of growth and empowerment. Many of our mentees go on to achieve great success in their academic and professional lives, demonstrating the long-term impact of dedicated mentorship.</p><p>We believe in nurturing potential and helping youth navigate challenges with confidence. Each success story is a testament to the power of human connection and sustained support, core values of <strong>Mission 007 NFP</strong>.</p>",
  },
  {
    id: "m007-003",
    title: "Behind the Scenes: Planning Community Events That Matter",
    excerpt:
      "A look into how <strong>Mission 007 NFP</strong> plans and executes impactful community events with volunteers and partners.",
    slug: "planning-community-events",
    topic: "operations",
    status: "active",
    publishedAt: "2025-02-18",
    author: "Emily White",
    color: "slateblue",
    content:
      "<p>Planning impactful community events requires meticulous coordination, passionate volunteers, and strong partnerships. This article takes you behind the curtain to show the effort involved in organizing initiatives like our annual food drive and school supply giveaway. It's a collaborative process that truly embodies the spirit of <strong>Mission 007 NFP</strong>.</p><p>From logistics and fundraising to volunteer training and community outreach, every step is crucial to ensuring our events are successful and truly meet the needs of the communities we serve. We are always looking for more hands to help make a difference!</p>",
    fullpageImg:
      "https://lh3.googleusercontent.com/nrg9bZ_V5sCJ8pJSxiEh3C0vS8NKM7Vx0n3u5mCTdqvoKvunwcsxbci6j2tJBrF4Su09Z3uyDkz77Xm-rlV2elV2elWc207brKal1e-tELeUXw=s960",
  },
  {
    id: "m007-004",
    title: "Building Confidence: Why Soft Skills Matter for Youth",
    excerpt:
      "At <strong>Mission 007 NFP</strong>, we help young people develop the communication, teamwork, and resilience that employers look for—and that life demands.",
    slug: "soft-skills-matter-for-youth",
    topic: "education",
    status: "active",
    publishedAt: "2025-03-01",
    author: "Marcus Johnson",
    color: "#8b5cf6",
    content:
      "<p>Soft skills—communication, teamwork, problem-solving, and resilience—are often the differentiator between youth who thrive and those who struggle. <strong>Mission 007 NFP</strong> weaves these into every program, from mentorship check-ins to group workshops.</p><p>Employers and educators consistently tell us that technical skills can be taught, but attitude, reliability, and the ability to work with others are what open doors. We're proud to help our participants build both the mindset and the practice.</p>",
    fullpageImg:
      "https://lh3.googleusercontent.com/nrg9bZ_V5sCJ8pJSxiEh3C0vS8NKM7Vx0n3u5mCTdqvoKvunwcsxbci6j2tJBrF4Su09Z3uyDkz77Xm-rlV2elV2elWc207brKal1e-tELeUXw=s960",
  },
  {
    id: "m007-005",
    title: "Partner Spotlight: How Local Businesses Support Our Mission",
    excerpt:
      "Community partnerships allow <strong>Mission 007 NFP</strong> to offer real-world experiences, internships, and job shadows to the youth we serve.",
    slug: "partner-spotlight-local-businesses",
    topic: "community-impact",
    status: "active",
    publishedAt: "2025-03-15",
    author: "Sarah Chen",
    color: "#ea580c",
    content:
      "<p>None of our work would be possible without the generosity of local businesses and civic partners. They provide space, time, mentorship, and often first jobs or internships for the young people in our programs.</p><p>This post highlights a few partners who have gone above and beyond—and how their involvement has changed lives. <strong>Mission 007 NFP</strong> is grateful for every hand that helps us expand opportunity for youth ages 16–25.</p>",
    fullpageImg:
      "https://lh3.googleusercontent.com/nrg9bZ_V5sCJ8pJSxiEh3C0vS8NKM7Vx0n3u5mCTdqvoKvunwcsxbci6j2tJBrF4Su09Z3uyDkz77Xm-rlV2elV2elWc207brKal1e-tELeUXw=s960",
  },
];

/** Active posts only (for client use, e.g. home page). */
export const activeBlogPosts = mentorshipPosts.filter((post) => post.status === "active");

export async function getBlogPosts() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mentorshipPosts.filter((post) => post.status === "active");
}

export async function getBlogPostBySlug(slug) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mentorshipPosts.find((post) => post.slug === slug) ?? null;
}
