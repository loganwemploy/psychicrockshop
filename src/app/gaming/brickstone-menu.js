/**
 * BrickStone Restaurant menu data (schema 2.0)
 * Used for dynamic menu item cards and filters on gaming page.
 */

export const menuMeta = {
  restaurantName: "BrickStone Restaurant",
  menuName: "BrickStone Main Menu",
  menuYear: "2024",
  currency: "USD",
  status: "published",
};

export const menuCategories = [
  { id: "cat-salads-001", slug: "salads", name: "Salads", sortOrder: 10 },
  { id: "cat-burgers-001", slug: "burgers", name: "Burgers", sortOrder: 20 },
  { id: "cat-sandwiches-001", slug: "sandwiches-wraps", name: "Sandwiches & Wraps", sortOrder: 30 },
  { id: "cat-pasta-001", slug: "pasta", name: "Pasta", sortOrder: 40 },
  { id: "cat-entrees-001", slug: "entrees", name: "Entrees", sortOrder: 50 },
  { id: "cat-steaks-001", slug: "steaks-chops", name: "Steaks & Chops", sortOrder: 60 },
  { id: "cat-seafood-001", slug: "seafood", name: "Seafood", sortOrder: 70 },
  { id: "cat-sides-001", slug: "sides", name: "Sides", sortOrder: 80 },
].sort((a, b) => a.sortOrder - b.sortOrder);

export const menuItems = [
  { id: "item-classic-greek-salad-001", categoryId: "cat-salads-001", name: "Classic Greek Salad", description: "Crisp greens, ripe tomatoes, cucumbers, kalamata olives, green peppers, red onions, crumbled feta cheese & oregano, served with our house dressing.", basePrice: 14.79, labels: ["Vegetarian", "Gluten-Free"] },
  { id: "item-chicken-tortilla-salad-001", categoryId: "cat-salads-001", name: "Chicken Tortilla Salad", description: "Grilled chicken breast rubbed in southwestern spices, shredded lettuce, fresh pico de gallo, black bean and roasted corn salsa, and Chihuahua cheese, topped with crunchy tortilla chips.", basePrice: 15.99, labels: ["Gluten-Free"] },
  { id: "item-cobb-salad-001", categoryId: "cat-salads-001", name: "Cobb Salad", description: "Grilled chicken atop mixed greens, tomatoes, cucumbers, hard-boiled egg, cheddar cheese, bleu cheese crumbles & bacon bits, served with bleu cheese dressing.", basePrice: 15.79, labels: [] },
  { id: "item-country-chicken-salad-001", categoryId: "cat-salads-001", name: "Country Chicken Salad", description: "Crisp greens, crispy chicken, tomatoes, cucumbers, mushrooms, hard-boiled egg & cheddar cheese, topped with bacon bits, served with honey mustard dressing.", basePrice: 15.79, labels: [] },
  { id: "item-blackened-ahi-tuna-salad-001", categoryId: "cat-salads-001", name: "Blackened Ahi Tuna Salad", description: "Blackened ahi tuna seared rare atop baby spinach leaves, shredded carrots, peppers & tomatoes, served with a vinaigrette dressing.", basePrice: 16.99, labels: ["Gluten-Free"] },
  { id: "item-steak-salad-001", categoryId: "cat-salads-001", name: "Steak Salad", description: "Sliced skirt steak cooked to a medium temperature, roasted tomatoes, bleu cheese crumbles, and bacon atop a bed of mixed greens, served with bleu cheese dressing.", basePrice: 18.99, labels: ["Gluten-Free"] },
  { id: "item-spinach-salad-001", categoryId: "cat-salads-001", name: "Spinach Salad", description: "Fresh baby spinach leaves tossed with candied walnuts, dried cranberries, red onions & crumbled bleu cheese, topped with fire-grilled chicken, served with raspberry vinaigrette.", basePrice: 15.39, labels: [] },
  { id: "item-all-american-burger-001", categoryId: "cat-burgers-001", name: "All American Burger", description: "Fire-grilled & topped with American cheese.", basePrice: 14.99, labels: [] },
  { id: "item-wisconsin-cheddar-burger-001", categoryId: "cat-burgers-001", name: "Wisconsin Cheddar Burger", description: "Fire-grilled burger topped with a cold extra sharp cheddar cheese spread & grilled onions, served on a pretzel bun.", basePrice: 15.59, labels: [] },
  { id: "item-sunrise-burger-001", categoryId: "cat-burgers-001", name: "Sunrise Burger", description: "Fire-grilled and topped with hickory smoked bacon, American cheese, and a fried egg on a pretzel bun.", basePrice: 16.59, labels: [] },
  { id: "item-smashed-burger-001", categoryId: "cat-burgers-001", name: "Smashed Burger", description: "A double-stacked, crafted in-house and topped with American cheese, lettuce, tomato and a signature secret sauce, all served on a toasted bun.", basePrice: 14.59, labels: [] },
  { id: "item-smoked-gouda-burger-001", categoryId: "cat-burgers-001", name: "Smoked Gouda Burger", description: "Fire-grilled & topped with smoked gouda, bacon, peppadew peppers & sun-dried tomato mayo, served on a pretzel bun.", basePrice: 16.39, labels: [] },
  { id: "item-chipotle-burger-001", categoryId: "cat-burgers-001", name: "Chipotle Burger", description: "Fire-grilled and topped with jalapeños, pepperjack, shredded lettuce, pico de gallo & our spicy chipotle sauce.", basePrice: 15.59, labels: ["Spicy"] },
  { id: "item-bleus-burger-001", categoryId: "cat-burgers-001", name: "Bleus Burger", description: "Fire-grilled burger topped with bleu cheese, balsamic caramelized onions, and bacon.", basePrice: 16.39, labels: [] },
  { id: "item-bbq-bacon-jam-burger-001", categoryId: "cat-burgers-001", name: "BBQ Bacon Jam Burger", description: "Fire-grilled burger topped with our chef's special bacon & caramelized onion jam and cheddar cheese.", basePrice: 16.59, labels: [] },
  { id: "item-vodka-parmesan-chicken-sandwich-001", categoryId: "cat-sandwiches-001", name: "Vodka Parmesan Chicken Sandwich", description: "Breaded chicken smothered in a rich tomato vodka cream sauce, basil pesto, roasted tomatoes and melted mozzarella; all served on an herb focaccia.", basePrice: 15.99, labels: [] },
  { id: "item-chimichurri-steak-sandwich-001", categoryId: "cat-sandwiches-001", name: "Chimichurri Steak Sandwich", description: "Marinated skirt steak topped with chimichurri sauce, pickled red onions, and melted mozzarella cheese on a French roll.", basePrice: 18.99, labels: [] },
  { id: "item-herb-focaccia-chicken-sandwich-001", categoryId: "cat-sandwiches-001", name: "Herb Focaccia Chicken Sandwich", description: "Grilled chicken layered with pesto, serrano aioli, tomatoes and melted mozzarella; nestled in an herb focaccia.", basePrice: 15.79, labels: [] },
  { id: "item-bbq-meatloaf-sandwich-001", categoryId: "cat-sandwiches-001", name: "BBQ Meatloaf", description: "Grilled meatloaf, topped with Swiss cheese, Sweet Baby Ray's BBQ sauce & onion strings, served between grilled white bread.", basePrice: 14.99, labels: [] },
  { id: "item-reuben-001", categoryId: "cat-sandwiches-001", name: "Reuben", description: "Thinly sliced corned beef & sauerkraut topped with Swiss cheese on toasted marble rye, served with thousand island dressing.", basePrice: 14.59, labels: [] },
  { id: "item-philly-cheese-steak-001", categoryId: "cat-sandwiches-001", name: "Philly Cheese Steak", description: "Thin sliced tender steak with grilled peppers & onions topped with melted white American cheese on a French roll.", basePrice: 16.79, labels: [] },
  { id: "item-california-turkey-001", categoryId: "cat-sandwiches-001", name: "California Turkey", description: "Oven-roasted turkey breast, thick slices of hickory smoked bacon, guacamole, lettuce, tomato, Swiss cheese and mayonnaise served on a pretzel bun.", basePrice: 13.99, labels: [] },
  { id: "item-avocado-chicken-001", categoryId: "cat-sandwiches-001", name: "Avocado Chicken", description: "Guacamole, grilled chicken, Swiss cheese, lettuce, pico de gallo, sun-dried mayo, and balsamic caramelized onions on ciabatta.", basePrice: 14.79, labels: [] },
  { id: "item-ultimate-prime-rib-sandwich-001", categoryId: "cat-sandwiches-001", name: "Ultimate Prime Rib Sandwich", description: "Our signature 16 hr. slow-roasted, thin sliced prime rib topped with mozzarella cheese, arugula and a thyme rosemary sauce on a rustic roll.", basePrice: 18.99, labels: [] },
  { id: "item-spicy-buffalo-wrap-001", categoryId: "cat-sandwiches-001", name: "Spicy Buffalo Wrap", description: "Breaded chicken tossed in a spicy buffalo sauce, bleu cheese crumbles, red onions, tomatoes & shredded lettuce.", basePrice: 13.99, labels: ["Spicy"] },
  { id: "item-chipotle-chicken-wrap-001", categoryId: "cat-sandwiches-001", name: "Chipotle Chicken Wrap", description: "Grilled chicken, roasted black bean & corn salsa, pico de gallo, shredded lettuce, and chihuahua cheese, drizzled with chipotle ranch.", basePrice: 14.59, labels: [] },
  { id: "item-veggie-wrap-001", categoryId: "cat-sandwiches-001", name: "Veggie Wrap", description: "Mozzarella cheese, portobello mushrooms, seasonal vegetables, mixed greens, and a basil pesto spread wrapped in a tortilla.", basePrice: 13.59, labels: ["Vegetarian"] },
  { id: "item-tuscan-chicken-pasta-001", categoryId: "cat-pasta-001", name: "Tuscan Chicken Pasta", description: "Corkscrew pasta in a parmesan cream sauce with bacon, spinach and grilled chicken.", basePrice: 19.99, labels: [] },
  { id: "item-beer-ale-mac-cheese-001", categoryId: "cat-pasta-001", name: "Beer Ale Mac & Cheese", description: "A creamy beer ale cheese sauce tossed with pasta and bacon.", basePrice: 18.59, labels: [] },
  { id: "item-cajun-pasta-001", categoryId: "cat-pasta-001", name: "Cajun Pasta", description: "Andouille sausage, chicken, onions, peppers, in a bow-tie pasta.", basePrice: 20.99, labels: [] },
  { id: "item-tomato-vodka-rigatoni-001", categoryId: "cat-pasta-001", name: "Tomato Vodka Rigatoni", description: "Rigatoni tossed in our spicy tomato vodka cream sauce & sprinkled with shredded parmesan cheese.", basePrice: 17.99, labels: ["Vegetarian"] },
  { id: "item-new-orleans-jambalaya-001", categoryId: "cat-entrees-001", name: "New Orleans Style Jambalaya", description: "Spicy Cajun style rice tossed with grilled shrimp, fire-grilled chicken & andouille sausage.", basePrice: 22.99, labels: ["Spicy"] },
  { id: "item-grecian-style-chicken-001", categoryId: "cat-entrees-001", name: "Grecian-Style Chicken", description: "Fire-grilled, Grecian-Style chicken breast, served with wild rice and broccoli.", basePrice: 21.99, labels: ["Gluten-Free"] },
  { id: "item-honey-glazed-chicken-001", categoryId: "cat-entrees-001", name: "Honey Glazed Chicken", description: "Fire-grilled chicken breast glazed in a honey pepper sauce and finished with pineapple salsa, served with red-skin mashed potatoes & broccoli.", basePrice: 20.99, labels: ["Gluten-Free"] },
  { id: "item-birria-steak-tacos-001", categoryId: "cat-entrees-001", name: "Birria Steak Tacos", description: "Skirt steak char-grilled then tucked into corn tortilla and topped with chihuahua cheese, onions and fresh cilantro; served with a side of Birria consome' and Spanish rice.", basePrice: 19.99, labels: [] },
  { id: "item-baby-back-ribs-half-slab-001", categoryId: "cat-entrees-001", name: "Baby Back BBQ Ribs (Half Slab)", description: "Slowly cooked ribs smothered in Sweet Baby Ray's BBQ sauce, served with beer-battered French fries.", basePrice: 21.99, labels: [] },
  { id: "item-baby-back-ribs-full-slab-001", categoryId: "cat-entrees-001", name: "Baby Back BBQ Ribs (Full Slab)", description: "Slowly cooked ribs smothered in Sweet Baby Ray's BBQ sauce, served with beer-battered French fries.", basePrice: 30.79, labels: [] },
  { id: "item-brewhouse-meatloaf-001", categoryId: "cat-entrees-001", name: "Brewhouse Meatloaf", description: "Our homemade meatloaf, topped with crispy onion straws & drizzled with a demi-glaze, served with red-skin mashed potatoes & broccoli.", basePrice: 18.99, labels: [] },
  { id: "item-parmesan-crusted-chicken-001", categoryId: "cat-entrees-001", name: "Parmesan Crusted Chicken", description: "Chicken breast topped with a parmesan crust; served atop a creamy orzo pasta.", basePrice: 25.99, labels: [] },
  { id: "item-ribeye-001", categoryId: "cat-steaks-001", name: "Ribeye", description: "A marbleized ribeye, fire-grilled to seal in all of the steak's flavor; served with broccoli and your choice of a side item.", basePrice: 37.99, labels: ["Gluten-Free"] },
  { id: "item-chimichurri-skirt-steak-001", categoryId: "cat-steaks-001", name: "Chimichurri Skirt Steak", description: "Tender strips of skirt steak topped with a chimichurri drizzle and pickled red onions; served with oven-roasted potatoes.", basePrice: 32.99, labels: ["Gluten-Free"] },
  { id: "item-prime-rib-001", categoryId: "cat-steaks-001", name: "Prime Rib", description: "A 14oz Prime Rib slowly roasted for 16 hours for maximum tenderness; served with broccoli and your choice of a side. Only available Saturdays after 4PM.", basePrice: 38.99, labels: ["Gluten-Free", "Limited Availability"] },
  { id: "item-pork-chops-fire-grilled-001", categoryId: "cat-steaks-001", name: "Center-Cut Pork Chops (Fire-Grilled)", description: "Two bone-in 7oz pork chops seasoned with our house blend, then char-grilled to perfection. Served with broccoli and your choice of a side.", basePrice: 22.99, labels: ["Gluten-Free"] },
  { id: "item-pork-chops-greek-style-001", categoryId: "cat-steaks-001", name: "Center-Cut Pork Chops (Greek Style)", description: "Two bone-in 7oz pork chops seasoned with Greek spices and garnished with feta cheese & kalamata olives. Served with broccoli and your choice of a side.", basePrice: 23.99, labels: ["Gluten-Free"] },
  { id: "item-crab-crusted-orange-roughy-001", categoryId: "cat-seafood-001", name: "Crab Crusted Orange Roughy", description: "Orange roughy filet topped with homemade crab cake and a rich Old Bay cream sauce; served with wild rice.", basePrice: 28.99, labels: [] },
  { id: "item-creole-tilapia-001", categoryId: "cat-seafood-001", name: "Creole Tilapia", description: "Pan-fried tilapia breaded with Cajun spices, topped with a cream sauce & shrimp over Cajun rice.", basePrice: 22.99, labels: ["Spicy"] },
  { id: "item-parmesan-crusted-tilapia-001", categoryId: "cat-seafood-001", name: "Parmesan Crusted Tilapia", description: "Baked tilapia coated with our signature garlic parmesan crust, served with bow-tie pasta in a parmesan cream sauce.", basePrice: 21.99, labels: [] },
  { id: "item-honey-pepper-glazed-salmon-001", categoryId: "cat-seafood-001", name: "Honey Pepper Glazed Salmon", description: "Fresh grilled Atlantic salmon filet glazed in a honey pepper sauce and topped with pineapple salsa, served with broccoli and wild rice.", basePrice: 25.99, labels: ["Gluten-Free"] },
  { id: "item-side-broccoli-001", categoryId: "cat-sides-001", name: "Broccoli", description: "", basePrice: 0, labels: [] },
  { id: "item-side-wild-rice-001", categoryId: "cat-sides-001", name: "Wild Rice", description: "", basePrice: 0, labels: [] },
  { id: "item-side-mashed-potatoes-001", categoryId: "cat-sides-001", name: "Red-Skin Mashed Potatoes", description: "", basePrice: 0, labels: [] },
  { id: "item-side-baked-potato-001", categoryId: "cat-sides-001", name: "Baked Potato", description: "", basePrice: 0, labels: [] },
  { id: "item-side-beer-fries-001", categoryId: "cat-sides-001", name: "Beer-Battered French Fries", description: "", basePrice: 0, labels: [] },
  { id: "item-side-onion-rings-001", categoryId: "cat-sides-001", name: "Onion Rings", description: "", basePrice: 0, labels: [] },
];

/** Price filter options for dropdown */
export const priceFilterOptions = [
  { value: "", label: "All prices" },
  { value: "under15", label: "Under $15" },
  { value: "15-20", label: "$15 – $20" },
  { value: "20-30", label: "$20 – $30" },
  { value: "30plus", label: "$30+" },
];
