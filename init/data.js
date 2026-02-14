const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy ocean views and easy beach access.",
    image: {
      url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-001",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Eiffel View Apartment",
    description:
      "A stylish Paris apartment with a dreamy Eiffel Tower view and walkable cafés nearby.",
    image: {
      url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-002",
    },
    price: 4200,
    location: "Paris",
    country: "France",
  },
  {
    title: "Canal-Side Studio",
    description:
      "Charming studio overlooking Amsterdam’s iconic canals with warm lighting and minimalist decor.",
    image: {
      url: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-003",
    },
    price: 3800,
    location: "Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Traditional Ryokan Stay",
    description:
      "Authentic ryokan experience with tatami rooms, hot baths, and peaceful surroundings.",
    image: {
      url: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-004",
    },
    price: 4500,
    location: "Kyoto",
    country: "Japan",
  },
  {
    title: "Desert Sky Luxury Villa",
    description:
      "Modern luxury villa in the desert with private pool, premium interiors, and wide open views.",
    image: {
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-005",
    },
    price: 5200,
    location: "Dubai",
    country: "United Arab Emirates",
  },
  {
    title: "Oceanfront Glass House",
    description:
      "Minimalist glass house with panoramic ocean views, natural light, and serene interiors.",
    image: {
      url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-006",
    },
    price: 6000,
    location: "Big Sur",
    country: "United States",
  },
  {
    title: "Historic City Center Loft",
    description:
      "Elegant loft in the heart of a historic city with cobblestone streets and cafés nearby.",
    image: {
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-007",
    },
    price: 3900,
    location: "Prague",
    country: "Czech Republic",
  },
  {
    title: "Downtown Skyline Loft",
    description:
      "Stylish downtown loft with skyline views, modern furniture, and fast Wi-Fi for work trips.",
    image: {
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-008",
    },
    price: 1600,
    location: "Chicago",
    country: "United States",
  },
  {
    title: "Mountain Retreat Cabin",
    description:
      "Unplug and unwind in a quiet cabin surrounded by forests and trails, perfect for a reset.",
    image: {
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-009",
    },
    price: 1200,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Tuscany Hillside Villa",
    description:
      "A restored Tuscan villa surrounded by vineyards, warm sunsets, and old-world charm.",
    image: {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-010",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
  },

  // -------------------- 11 - 20 --------------------
  {
    title: "Secluded Treehouse Getaway",
    description:
      "A private treehouse retreat with forest views, cozy interiors, and a peaceful vibe.",
    image: {
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-011",
    },
    price: 900,
    location: "Portland",
    country: "United States",
  },
  {
    title: "Beachfront Condo Escape",
    description:
      "Step onto the sand from your door. This beachfront condo is built for pure relaxation.",
    image: {
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-012",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
  },
  {
    title: "Rustic Lake Cabin",
    description:
      "A warm cabin by the lake with kayaking access, quiet mornings, and cozy nights.",
    image: {
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-013",
    },
    price: 950,
    location: "Lake Tahoe",
    country: "United States",
  },
  {
    title: "Luxury Penthouse Views",
    description:
      "Premium penthouse living with city views, elegant interiors, and rooftop vibes.",
    image: {
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-014",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "A Swiss-style chalet where the slopes are literally your front yard. Cozy and premium.",
    image: {
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-015",
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
  },
  {
    title: "Serengeti Safari Lodge",
    description:
      "A comfortable lodge in the wild with unforgettable sunsets and nature all around you.",
    image: {
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-016",
    },
    price: 4000,
    location: "Serengeti",
    country: "Tanzania",
  },
  {
    title: "Amsterdam Canal House",
    description:
      "A preserved canal house with classic charm, modern comfort, and a postcard location.",
    image: {
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-017",
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Private Island Retreat",
    description:
      "A full private island experience: beaches, calm waters, and pure luxury isolation.",
    image: {
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-018",
    },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
  },
  {
    title: "Cotswolds Stone Cottage",
    description:
      "Quaint stone cottage with countryside charm, peaceful streets, and cozy interiors.",
    image: {
      url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-019",
    },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
  },
  {
    title: "Historic Brownstone Stay",
    description:
      "Classic brownstone in the heart of the city with timeless interiors and local charm.",
    image: {
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-020",
    },
    price: 2200,
    location: "Boston",
    country: "United States",
  },

  // -------------------- 21 - 30 --------------------
  {
    title: "Bali Beachfront Bungalow",
    description:
      "A beach bungalow with tropical vibes, private pool access, and a relaxing atmosphere.",
    image: {
      url: "https://images.unsplash.com/photo-1602391833977-358a52198938?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-021",
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
  },
  {
    title: "Banff Mountain View Cabin",
    description:
      "A cabin with breathtaking mountain views and quick access to trails and scenic spots.",
    image: {
      url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-022",
    },
    price: 1500,
    location: "Banff",
    country: "Canada",
  },
  {
    title: "Art Deco Miami Apartment",
    description:
      "South Beach style with 1920s glam, modern comfort, and perfect walkability.",
    image: {
      url: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d32?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-023",
    },
    price: 1600,
    location: "Miami",
    country: "United States",
  },
  {
    title: "Infinity Pool Villa Phuket",
    description:
      "Tropical luxury villa with infinity pool, palm views, and a private resort feel.",
    image: {
      url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-024",
    },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
  },
  {
    title: "Scottish Highlands Castle",
    description:
      "Live like royalty in a historic castle surrounded by misty mountains and raw nature.",
    image: {
      url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-025",
    },
    price: 4000,
    location: "Highlands",
    country: "United Kingdom",
  },
  {
    title: "Montana Log Cabin",
    description:
      "A cozy log cabin surrounded by pine trees, wide skies, and total peace.",
    image: {
      url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-026",
    },
    price: 1100,
    location: "Montana",
    country: "United States",
  },
  {
    title: "Eco Treehouse Retreat",
    description:
      "An eco-friendly treehouse nestled in the forest with sustainable design and calm vibes.",
    image: {
      url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-027",
    },
    price: 750,
    location: "Monteverde",
    country: "Costa Rica",
  },
  {
    title: "Modern Tokyo Apartment",
    description:
      "A modern, compact Tokyo apartment near transit, shopping streets, and food spots.",
    image: {
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-028",
    },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
  },
  {
    title: "Overwater Maldives Villa",
    description:
      "Luxury overwater villa with direct lagoon access and unforgettable sunsets.",
    image: {
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-029",
    },
    price: 6000,
    location: "Maldives",
    country: "Maldives",
  },
  {
    title: "Santorini Cliffside Suite",
    description:
      "Iconic Santorini stay with a private terrace, sea views, and sunset magic.",
    image: {
      url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=60&sat=-10",
      filename: "wanderlust_DEV/sample-030",
    },
    price: 5500,
    location: "Santorini",
    country: "Greece",
  },

  // -------------------- 31 - 40 --------------------
  {
    title: "Lisbon Old Town Rooftop",
    description:
      "A cozy rooftop apartment with warm sunlight, tiled streets nearby, and city charm.",
    image: {
      url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-031",
    },
    price: 2100,
    location: "Lisbon",
    country: "Portugal",
  },
  {
    title: "Lapland Glass Igloo",
    description:
      "Sleep under the northern lights in a heated glass igloo with panoramic sky views.",
    image: {
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-032",
    },
    price: 6500,
    location: "Lapland",
    country: "Finland",
  },
  {
    title: "Irish Countryside Farmhouse",
    description:
      "Rustic farmhouse surrounded by green fields, quiet roads, and cozy fireplaces.",
    image: {
      url: "https://images.unsplash.com/photo-1505691619167-0c7d2f07e8b1?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-033",
    },
    price: 1700,
    location: "County Kerry",
    country: "Ireland",
  },
  {
    title: "Ubud Rainforest Eco Lodge",
    description:
      "Stay surrounded by rainforest sounds in a peaceful eco lodge with a natural aesthetic.",
    image: {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60&blur=1",
      filename: "wanderlust_DEV/sample-034",
    },
    price: 1300,
    location: "Ubud",
    country: "Indonesia",
  },
  {
    title: "Seoul Minimal Studio",
    description:
      "A clean, minimal studio near subway access, cafés, and vibrant neighborhoods.",
    image: {
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-035",
    },
    price: 1900,
    location: "Seoul",
    country: "South Korea",
  },
  {
    title: "Qatar Marina Apartment",
    description:
      "Modern apartment near the marina with water views and a premium lifestyle feel.",
    image: {
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-036",
    },
    price: 4100,
    location: "Doha",
    country: "Qatar",
  },
  {
    title: "Jaisalmer Desert Camp",
    description:
      "Traditional desert camp with bonfire nights, local meals, and star-filled skies.",
    image: {
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-037",
    },
    price: 1600,
    location: "Jaisalmer",
    country: "India",
  },
  {
    title: "Jaipur Heritage Haveli",
    description:
      "A royal haveli stay with courtyards, heritage architecture, and cultural charm.",
    image: {
      url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-038",
    },
    price: 2400,
    location: "Jaipur",
    country: "India",
  },
  {
    title: "Goa Beach Shack",
    description:
      "A relaxed beach shack stay with sunsets, sea breeze, and a laid-back vibe.",
    image: {
      url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=60&contrast=10",
      filename: "wanderlust_DEV/sample-039",
    },
    price: 900,
    location: "Goa",
    country: "India",
  },
  {
    title: "Kerala Backwater Houseboat",
    description:
      "Private houseboat with calm backwater views, traditional meals, and slow living.",
    image: {
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-040",
    },
    price: 2200,
    location: "Alleppey",
    country: "India",
  },

  // -------------------- 41 - 50 --------------------
  {
    title: "Manali Snow Cabin",
    description:
      "A cozy cabin surrounded by snowy peaks with warm interiors and mountain air.",
    image: {
      url: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-041",
    },
    price: 1300,
    location: "Manali",
    country: "India",
  },
  {
    title: "Cape Town Ocean Apartment",
    description:
      "Modern apartment with Atlantic views, beautiful sunsets, and quick access to the city.",
    image: {
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-042",
    },
    price: 2300,
    location: "Cape Town",
    country: "South Africa",
  },
  {
    title: "Reykjavik Cozy Nordic Flat",
    description:
      "A warm Nordic flat with clean design, perfect for winter stays and city exploration.",
    image: {
      url: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-043",
    },
    price: 2700,
    location: "Reykjavik",
    country: "Iceland",
  },
  {
    title: "Barcelona Balcony Apartment",
    description:
      "Bright apartment with balcony views, near beaches, markets, and nightlife.",
    image: {
      url: "https://images.unsplash.com/photo-1505692069463-2bcd3a8c2b0b?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-044",
    },
    price: 2400,
    location: "Barcelona",
    country: "Spain",
  },
  {
    title: "Vienna Classical Loft",
    description:
      "A refined loft near classical architecture, museums, and the city’s café culture.",
    image: {
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=60&sharp=10",
      filename: "wanderlust_DEV/sample-045",
    },
    price: 2600,
    location: "Vienna",
    country: "Austria",
  },
  {
    title: "Cairo Nile View Suite",
    description:
      "Suite with Nile views, classic interiors, and easy access to historic attractions.",
    image: {
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60&sat=-20",
      filename: "wanderlust_DEV/sample-046",
    },
    price: 2000,
    location: "Cairo",
    country: "Egypt",
  },
  {
    title: "Marrakesh Riad Retreat",
    description:
      "A traditional riad with courtyard vibes, Moroccan decor, and peaceful privacy.",
    image: {
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60&sat=-15",
      filename: "wanderlust_DEV/sample-047",
    },
    price: 2100,
    location: "Marrakesh",
    country: "Morocco",
  },
  {
    title: "Singapore Skyline Studio",
    description:
      "Modern studio with skyline views, high-end amenities, and perfect transit connectivity.",
    image: {
      url: "https://images.unsplash.com/photo-1560448204-1f47b7f15d2a?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-048",
    },
    price: 4200,
    location: "Singapore",
    country: "Singapore",
  },
  {
    title: "Sydney Harbour Apartment",
    description:
      "Harbour-side apartment with iconic views, bright interiors, and a relaxed coastal feel.",
    image: {
      url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=60&sat=-5",
      filename: "wanderlust_DEV/sample-049",
    },
    price: 4600,
    location: "Sydney",
    country: "Australia",
  },
  {
    title: "Patagonia Wilderness Cabin",
    description:
      "A remote cabin experience surrounded by raw landscapes, fresh air, and total silence.",
    image: {
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=60",
      filename: "wanderlust_DEV/sample-050",
    },
    price: 1700,
    location: "Patagonia",
    country: "Argentina",
  },
];

module.exports = { data: sampleListings };
