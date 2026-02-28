# Online Ordering App — Abstracted Wireframes

**Scope:** Layout of the **contents** inside each screen only (no device/iPhone border). Use these as the structural blueprint for the ordering experience.

---

## 1. Home / Menu entry

**Purpose:** Entry to ordering; hero + quick nav.

| Zone | Description |
|------|-------------|
| **Header** | Logo (left), primary nav or back, optional cart icon |
| **Hero** | Full-width: restaurant name, tagline, CTA e.g. "Start order" or "View menu" |
| **Category strip** | Horizontal scroll or grid: Salads, Burgers, Sandwiches, Pasta, Entrees, Steaks, Seafood, Sides |
| **Featured / promos** | Optional strip: daily special, offer, or delivery notice |

---

## 2. Menu list (category view)

**Purpose:** Browse items in a category (e.g. Burgers).

| Zone | Description |
|------|-------------|
| **Header** | Back, title (e.g. "Burgers"), cart icon |
| **Search** | Optional: search input + filters (category, price) |
| **Item list** | Vertical list of cards: image (or placeholder), name, short description, price, optional labels (GF, V, Spicy). Tappable row → item detail |

---

## 3. Item detail

**Purpose:** Single item; modifiers and add to cart.

| Zone | Description |
|------|-------------|
| **Header** | Back only (or back + cart) |
| **Media** | Item image or placeholder (full-width or constrained) |
| **Title / price** | Item name, price, optional labels |
| **Description** | Body copy |
| **Modifiers** | Groups (e.g. "Choose a side", "Add chicken") with options (radio/check) and price deltas |
| **Sticky footer** | "Add to cart" primary button, optional quantity |

---

## 4. Cart

**Purpose:** Review line items and go to checkout.

| Zone | Description |
|------|-------------|
| **Header** | Title "Your order" or "Cart", close/back |
| **Line items** | List: item name, modifiers summary, quantity, line price; edit/remove per line |
| **Totals** | Subtotal, tax (if shown), total |
| **Footer** | Primary CTA "Checkout" (or "Go to checkout") |

---

## 5. Checkout

**Purpose:** Delivery/pickup, payment, place order.

| Zone | Description |
|------|-------------|
| **Header** | Back, title "Checkout" |
| **Delivery** | Delivery address or "Pickup" selector; time slot if needed |
| **Order summary** | Collapsed or short summary (item count, total) with expand |
| **Payment** | Payment method (card, etc.) or "Pay at pickup" |
| **Footer** | "Place order" primary button |

---

## 6. Order confirmation

**Purpose:** Post-purchase feedback.

| Zone | Description |
|------|-------------|
| **Status** | Success icon/message, order number, estimated time |
| **Summary** | Short recap: items, total, pickup/delivery info |
| **Actions** | "View order" / "Track order", "New order" / "Back to menu" |

---

## 7. Support / help (inline or drawer)

**Purpose:** Help during ordering.

| Zone | Description |
|------|-------------|
| **Trigger** | Chat bubble or "Help" in header/footer |
| **Drawer / panel** | Support chat (agent flow): header (Support, status), message thread, quick replies, input |

---

## Layout principles

- **Abstracted:** Define only content regions (header, hero, list, footer). No phone bezel or device frame.
- **Ordering-first:** Every screen supports the path: entry → menu → item → cart → checkout → confirmation; support available when needed.
- **Reuse:** Same header/cart pattern across menu, item, cart; same drawer pattern for support.
- **Mobile-first:** Layouts stack vertically; strips and lists scroll horizontally or vertically as needed.

Use this doc and the `/ordering-wireframes` reference page to align implementation with the intended content layout only.
