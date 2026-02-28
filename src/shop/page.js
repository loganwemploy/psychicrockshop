import HeaderBar from "../components/HeaderBar";
import Link from "next/link";
import CountdownTimer from "./CountdownTimer";
import styles from "./shop.module.css";

export const metadata = {
  title: "Shop | Valentine's Day Teddy Bears | Mission 007",
  description:
    "Valentine's Day teddy bears with record-your-own-phrase speech bubbles. Show your love with a personalized gift.",
};

const FEATURED_PRODUCTS = [
  {
    id: "VB-001",
    sku: "LB-RHT-001",
    img: "https://images.pexels.com/photos/860882/pexels-photo-860882.jpeg?auto=compress&cs=tinysrgb&w=400",
    brand: "Love Bears",
    name: "Red Heart Teddy — Record Your Phrase",
    price: 28,
    speech: "Record your own phrase",
    flag: "hot",
  },
  {
    id: "VB-002",
    sku: "LB-PBT-002",
    img: "https://images.pexels.com/photos/708774/pexels-photo-708774.jpeg?auto=compress&cs=tinysrgb&w=400",
    brand: "Love Bears",
    name: "Pink Blush Teddy — Record Your Phrase",
    price: 28,
    speech: "Record your own phrase",
    flag: "best-seller",
  },
  {
    id: "VB-003",
    sku: "LB-WCT-003",
    img: "https://images.pexels.com/photos/6182241/pexels-photo-6182241.jpeg?auto=compress&cs=tinysrgb&w=400",
    brand: "Love Bears",
    name: "White Cloud Teddy — Record Your Phrase",
    price: 28,
    speech: "Record your own phrase",
    flag: "only-3-left",
    stockLeft: 3,
  },
  {
    id: "VB-004",
    sku: "LB-CHT-004",
    img: "https://images.pexels.com/photos/5743449/pexels-photo-5743449.jpeg?auto=compress&cs=tinysrgb&w=400",
    brand: "Love Bears",
    name: "Cream Hug Teddy — Record Your Phrase",
    price: 28,
    speech: "Record your own phrase",
    flag: "best-seller",
  },
  {
    id: "VB-005",
    sku: "LB-RGT-005",
    img: "https://images.pexels.com/photos/6771365/pexels-photo-6771365.jpeg?auto=compress&cs=tinysrgb&w=400",
    brand: "Love Bears",
    name: "Rose Gold Teddy — Record Your Phrase",
    price: 32,
    speech: "Record your own phrase",
  },
  {
    id: "VB-006",
    sku: "LB-CBT-006",
    img: "https://images.pexels.com/photos/11168018/pexels-photo-11168018.jpeg?auto=compress&cs=tinysrgb&w=400",
    brand: "Love Bears",
    name: "Classic Brown Teddy — Record Your Phrase",
    price: 28,
    speech: "Record your own phrase",
    flag: "out-of-stock",
  },
];

const NEW_ARRIVALS = [
  {
    id: "VB-007",
    sku: "LB-BMT-007",
    img: "https://images.pexels.com/photos/2815377/pexels-photo-2815377.jpeg?auto=compress&cs=tinysrgb&w=400",
    brand: "Love Bears",
    name: "Be Mine Teddy — Record Your Phrase",
    price: 30,
    flag: "hot",
  },
  {
    id: "VB-008",
    sku: "LB-KMT-008",
    img: "https://images.pexels.com/photos/832999/pexels-photo-832999.jpeg?auto=compress&cs=tinysrgb&w=400",
    brand: "Love Bears",
    name: "Kiss Me Teddy — Record Your Phrase",
    price: 30,
    flag: "only-5-left",
    stockLeft: 5,
  },
  {
    id: "VB-009",
    sku: "LB-SHT-009",
    img: "https://images.pexels.com/photos/11582259/pexels-photo-11582259.jpeg?auto=compress&cs=tinysrgb&w=400",
    brand: "Love Bears",
    name: "Sweetheart Teddy — Record Your Phrase",
    price: 30,
  },
  {
    id: "VB-010",
    sku: "LB-FYT-010",
    img: "https://images.pexels.com/photos/4022247/pexels-photo-4022247.jpeg?auto=compress&cs=tinysrgb&w=400",
    brand: "Love Bears",
    name: "Forever Yours Teddy — Record Your Phrase",
    price: 30,
    flag: "best-seller",
  },
  {
    id: "VB-011",
    sku: "LB-XOT-011",
    img: "https://images.pexels.com/photos/22696149/pexels-photo-22696149.jpeg?auto=compress&cs=tinysrgb&w=400",
    brand: "Love Bears",
    name: "XOXO Teddy — Record Your Phrase",
    price: 32,
    flag: "only-2-left",
    stockLeft: 2,
  },
  {
    id: "VB-012",
    sku: "LB-TLT-012",
    img: "https://images.pexels.com/photos/11149386/pexels-photo-11149386.jpeg?auto=compress&cs=tinysrgb&w=400",
    brand: "Love Bears",
    name: "True Love Teddy — Record Your Phrase",
    price: 30,
  },
];

const FEATURES = [
  { img: "https://i.postimg.cc/PrN2Y6Cv/f1.png", title: "Free Shipping" },
  { img: "https://i.postimg.cc/qvycxW4q/f2.png", title: "Online Order" },
  { img: "https://i.postimg.cc/1Rdphyz4/f3.png", title: "Save Money" },
  { img: "https://i.postimg.cc/GpYc2JFZ/f4.png", title: "Promotions" },
  { img: "https://i.postimg.cc/4yFCwmv6/f5.png", title: "Happy Sell" },
  { img: "https://i.postimg.cc/gJN1knTC/f6.png", title: "24/7 Support" },
];

function ProductCard({ product }) {
  const isOutOfStock = product.flag === "out-of-stock";

  const flagLabel =
    product.flag === "hot"
      ? "Hot"
      : product.flag === "best-seller"
        ? "Best Seller"
        : product.flag?.startsWith("only-")
          ? `Only ${product.stockLeft} left`
          : product.flag === "out-of-stock"
            ? "Out of Stock"
            : null;

  const flagClass =
    product.flag === "hot"
      ? styles.flagHot
      : product.flag === "best-seller"
        ? styles.flagBestSeller
        : product.flag?.startsWith("only-")
          ? styles.flagLowStock
          : product.flag === "out-of-stock"
            ? styles.flagOutOfStock
            : null;

  return (
    <div
      className={styles.pro}
      data-id={product.id}
      data-sku={product.sku}
      data-out-of-stock={isOutOfStock ? "true" : undefined}
    >
      {flagLabel && (
        <span className={`${styles.productFlag} ${flagClass || ""}`}>
          {product.flag === "hot" && <span aria-hidden="true">🔥 </span>}
          {flagLabel}
        </span>
      )}
      <img src={product.img} alt={product.name} />
      <div className={styles.des}>
        <span>{product.brand}</span>
        <span className={styles.sku}>SKU: {product.sku}</span>
        <h5>{product.name}</h5>
        {product.speech && (
          <span className={styles.speechBadge}>🎤 {product.speech}</span>
        )}
        <div className={styles.star}>
          <span>♥</span>
          <span>♥</span>
          <span>♥</span>
          <span>♥</span>
          <span>♥</span>
        </div>
        <h4>${product.price}</h4>
      </div>
      {!isOutOfStock && (
        <a href="#" className={styles.cart} aria-label="Add to cart">
          <i className="bx bx-cart-alt" />
        </a>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className={styles.page}>
      <HeaderBar />
      <section className={styles.hero}>
        <h4>Valentine&apos;s Day</h4>
        <h2>Show Your Love</h2>
        <h1>Personalized Teddy Bears</h1>
        <p>Record your own phrase — the perfect way to say &quot;I love you&quot;</p>
        <p className={styles.heroUrgency}>Limited time — act now before stock runs out</p>
        <Link href="#product1" className={styles.heroBtn}>
          Shop Now
        </Link>
      </section>

      <section className={styles.countdownWrap}>
        <CountdownTimer />
      </section>

      <section className={styles.feature}>
        {FEATURES.map((fe, i) => (
          <div key={i} className={styles.feBox}>
            <img src={fe.img} alt="" />
            <h6>{fe.title}</h6>
          </div>
        ))}
      </section>

      <section id="product1" className={styles.product1}>
        <h2>Featured Products</h2>
        <p>Valentine&apos;s Collection — Teddy Bears with Record Your Own Phrase</p>
        <div className={styles.proContainer}>
          {FEATURED_PRODUCTS.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </section>

      <section className={styles.banner}>
        <h4>Valentine&apos;s Special</h4>
        <h2>Up to <span>70% off</span> — All Teddy Bears</h2>
        <p className={styles.bannerUrgency}>Sale ends soon — don&apos;t miss out on these savings. Act now.</p>
        <Link href="#product2" className={styles.btnNormal}>
          Explore More
        </Link>
      </section>

      <section id="product2" className={styles.product1}>
        <h2>New Arrivals</h2>
        <p>Love-Themed Teddy Bears — Record Your Own Phrase</p>
        <div className={styles.proContainer}>
          {NEW_ARRIVALS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className={styles.smBanner}>
        <div className={styles.bannerBox}>
          <h4>Crazy Deals</h4>
          <h2>Buy 1 Get 1 Free</h2>
          <span>Perfect for couples — record your phrases together</span>
          <p className={styles.smBannerUrgency}>Limited time only — act now before this offer ends</p>
          <button type="button" className={styles.btnWhite}>
            Learn More
          </button>
        </div>
        <div className={`${styles.bannerBox} ${styles.bannerBox2}`}>
          <h4>Spring / Summer</h4>
          <h2>Upcoming Season</h2>
          <span>New love-themed designs coming soon</span>
          <button type="button" className={styles.btnWhite}>
            Collection
          </button>
        </div>
      </section>

      <section className={styles.banner3}>
        <div className={styles.bannerBox}>
          <h2>SEASONAL SALES</h2>
          <h3>Valentine&apos;s Collection — 50% OFF</h3>
        </div>
        <div className={`${styles.bannerBox} ${styles.bannerImg2}`}>
          <h2>SEASONAL SALES</h2>
          <h3>Valentine&apos;s Collection — 50% OFF</h3>
          <p className={styles.banner3Urgency}>Final hours — don&apos;t miss out</p>
        </div>
        <div className={`${styles.bannerBox} ${styles.bannerImg3}`}>
          <h2>SEASONAL SALES</h2>
          <h3>Valentine&apos;s Collection — 50% OFF</h3>
          <p className={styles.banner3Urgency}>Final hours — don&apos;t miss out</p>
        </div>
      </section>

      <section className={styles.newsletter}>
        <div className={styles.newstext}>
          <h4>Sign Up for Newsletters</h4>
          <p>
            Get email updates about our latest shop and <span>special offers.</span>
          </p>
          <p className={styles.newsletterUrgency}>Join now — exclusive deal alerts you won&apos;t want to miss</p>
        </div>
        <div className={styles.form}>
          <input type="email" placeholder="Your email address" maxLength={254} aria-label="Email for newsletter" />
          <button type="button" className={styles.btnNormal}>
            Sign Up
          </button>
        </div>
      </section>
    </div>
  );
}
