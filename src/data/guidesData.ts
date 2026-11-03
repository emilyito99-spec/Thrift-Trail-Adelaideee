import { GuideArticle } from '../types';
import guideStyleImg from '../assets/images/guide_vintage_style_1793692072317.jpg';
import heroThriftImg from '../assets/images/hero_thrift_fashion_1793692054727.jpg';
import storeVintageImg from '../assets/images/store_vintage_racks_1793692055147.jpg';
import storeOpShopImg from '../assets/images/store_op_shop_treasures_1793692072902.jpg';

export const GUIDES_DATA: GuideArticle[] = [
  {
    id: 'personal-vintage-style-adelaide',
    title: 'Finding Your Personal Vintage Aesthetic in Adelaide',
    subtitle: 'How 18–30s can cut through trend micro-cycles, discover authentic silhouettes, and avoid shopping overwhelm.',
    readTime: '5 min read',
    category: 'Style & Curation',
    imageUrl: guideStyleImg,
    summary: 'Second-hand shopping can feel chaotic when you don’t know what you’re looking for. Here is a realistic roadmap to discovering what fits your lifestyle, body, and personal flair in Adelaide’s vintage stores.',
    keyTakeaways: [
      'Define 3 core words for your daily uniform before visiting any store',
      'Pay attention to garment drape, armhole fit, and fabric weight rather than modern numerical sizes',
      'Mix 70% functional basics with 30% vintage statement pieces for effortless styling',
    ],
    contentSections: [
      {
        heading: 'Why Vintage Sizes Lie (And How to Measure Instead)',
        paragraphs: [
          'One of the fastest ways to get discouraged in Adelaide op shops is looking exclusively at the size tag. Sizing standards shifted dramatically across decades: a vintage 1980s size 14 often fits like a modern Australian size 10.',
          'Instead of hunting for a specific number, learn your key body measurements in centimetres: waist circumference, shoulder width, and inseam. Keep a small flexible tape measure in your pocket or measure against a trusted pair of jeans you wear regularly.',
        ],
        tips: [
          'Vintage denim rarely has elastane: look for 100% cotton with zero stretch that moulds to your hips over time.',
          'Always try items on or check shoulder seams first: tailoring a waist or hem is easy, but restructuring shoulders is costly.',
        ],
      },
      {
        heading: 'Curating The Adelaide Young Adult Capsule',
        paragraphs: [
          'Adelaide’s climate shifts from hot dry Mediterranean summers to crisp, drizzly winters. An ideal second-hand capsule wardrobe for students focuses on versatile layering:',
          '1. Outerwear: A heavyweight 90s chore jacket or broken-in leather bomber that pairs with casual tees or knitwear.',
          '2. Mid-layers: Chunky Australian wool or mohair-blend sweaters, easily found at suburban op shops like Vinnies Norwood or Unley.',
          '3. Foundation: Crisp vintage cotton button-downs and relaxed straight-leg denim from curated spots like Street Vintage Co. or Plant 4.',
        ],
      },
      {
        heading: 'Avoiding the "Thrift Trap": Only Buy What You Truly Wear',
        paragraphs: [
          'Because second-hand pieces are affordable, it is tempting to purchase garments simply because they are cheap or quirky. Before bringing an item to the register, ask yourself three questions:',
          'Can I style this with at least three garments already in my wardrobe right now? Does this suit my genuine daily lifestyle (university lectures, casual cafe catchups, weekend outings)? Does it feel comfortable against bare skin?',
        ],
      },
    ],
  },
  {
    id: 'smart-student-thrift-playbook',
    title: 'The Smart Adelaide Student Thrift Playbook',
    subtitle: 'Insider strategies to find high-quality garments on a student budget without wasting whole days.',
    readTime: '6 min read',
    category: 'Budget & Saving',
    imageUrl: storeOpShopImg,
    summary: 'Living out of home or studying on a budget? Here is the tactical guide to shopping Adelaide charity stores, timing discount days, and scoring true bargains.',
    keyTakeaways: [
      'Take advantage of recurring student discounts: Salvos 20% off Wednesdays and color tag rotation days',
      'Suburban charity shops near established neighborhoods yield higher-end donated labels',
      'Go with a defined shopping list rather than browsing aimlessly',
    ],
    contentSections: [
      {
        heading: 'Adelaide Op Shop Discount Calendar',
        paragraphs: [
          'Most major charity shops in Adelaide follow consistent markdown schedules that seasoned thrifters swear by:',
          '• Salvos Stores: Wednesday is dedicated Student Day in South Australia, offering 20% off with your current uni or TAFE student ID card.',
          '• Vinnies & Red Cross: Use a 4-colour plastic tag rotation. Every Monday, garments marked with the week’s designated colour tag are discounted by 50% or down to $3–$5.',
          '• Savers Churchill Centre: Join the free loyalty program on your phone to unlock 20% to 50% off during seasonal student sales.',
        ],
      },
      {
        heading: 'Neighborhood Targeting: Where to Find What',
        paragraphs: [
          'Different Adelaide precincts attract distinct donation streams based on demographics:',
          '• The Eastern Suburbs (The Parade Norwood, Kensington, Burnside): Outstanding for tailored workwear, pure merino wool cardigans, linen, and preloved formal wear.',
          '• Coastal Precincts (Glenelg, Brighton): Great for relaxed casual wear, denim jackets, vintage swimwear, and lightweight summer cottons.',
          '• Inner West (Bowden, Croydon, Kilburn): The sweet spot for 90s streetwear, workwear jackets, oversized flannels, and graphic tees.',
        ],
      },
      {
        heading: 'The 10-Minute Store Scan Routine',
        paragraphs: [
          'Instead of checking every single hangar in a 3,000-item store, scan with your hands and eyes simultaneously. Touch the fabrics: high quality natural fibres (heavy cotton, soft wool, crisp linen) immediately feel distinct from flimsy synthetic polyester.',
          'Scan the outerwear and denim racks first, as these offer the highest return on investment compared to buying new retail clothing.',
        ],
      },
    ],
  },
  {
    id: 'fabric-and-garment-longevity-guide',
    title: 'Fabric & Garment Longevity: Reading Tags & Spotting Quality',
    subtitle: 'How to spot 100% natural fibres, evaluate stitching, and give second-hand finds a new lease of life.',
    readTime: '7 min read',
    category: 'Sustainable Care',
    imageUrl: heroThriftImg,
    summary: 'True sustainable fashion isn’t just buying preloved—it’s keeping garments in circulation for years. Master the art of tag reading and simple care.',
    keyTakeaways: [
      'Prioritise natural fibres: Australian wool, linen, pure silk, and heavyweight cotton',
      'Check armpit seams, collar edges, and zipper teeth before purchasing',
      'Gentle cold washing and air drying prolongs vintage garments by over 500%',
    ],
    contentSections: [
      {
        heading: 'The Natural Fibre Cheat Sheet',
        paragraphs: [
          'Fast fashion relies heavily on virgin polyester and acrylic, which shed microplastics and pill rapidly after a few washes. Vintage clothing excels because mid-to-late 20th century garments utilized significantly more natural raw materials:',
          '• Wool & Merino: Adelaide op shops are goldmines for Australian wool. Wool is naturally odour-resistant, temperature-regulating, and exceptionally durable.',
          '• Linen: Look for vintage linen shirts and trousers. Linen softens beautifully with age and provides unmatched breathability during Adelaide summers.',
          '• 100% Cotton: Check the weight. Vintage cotton tees from the 1990s usually feature 200+ GSM jersey with thick ribbed neckbands that do not bacon.',
        ],
      },
      {
        heading: 'The 5-Point Quality Inspection Checklist',
        paragraphs: [
          'Before heading to the cash register, spend 60 seconds performing this inspection:',
          '1. Neckband & Hem: Tug gently. Does it snap back, or has the elastic thread degraded?',
          '2. Hardware: Test metal zippers (YKK, Talon, Ideal). Metal zippers can be lubricated with a dab of wax or graphite pencil if stiff.',
          '3. Underarm & Inner Thigh: Look for fabric thinning, friction wear, or yellowing.',
          '4. Seam Construction: Authentic vintage often features French seams or flat-felled double stitching rather than quick single overlocking.',
          '5. Odour & Care: Musty thrift smell vanishes after a cold soak with white vinegar and sunlight; oil grease stains are harder to shift.',
        ],
      },
      {
        heading: 'Simple Mending that Anyone Can Do in a Student Dorm',
        paragraphs: [
          'A tiny tear or loose button shouldn’t stop you from buying a great piece. Learning to sew on a button takes under 5 minutes on YouTube, and a quick hem tape iron can shorten trousers without a sewing machine.',
          'Adelaide also has community repair cafes (such as the Adelaide Repair Cafe in the city and western suburbs) where local volunteers help you repair beloved clothes for free.',
        ],
      },
    ],
  },
  {
    id: 'adelaide-transit-thrift-trail',
    title: 'The Adelaide Public Transport Thrift Trail: Step-by-Step Itinerary',
    subtitle: 'Spend a car-free Saturday visiting 6 top vintage stores and op shops across the CBD, Bowden, and Glenelg.',
    readTime: '5 min read',
    category: 'Adelaide Trails',
    imageUrl: storeVintageImg,
    summary: 'You don’t need a car to thrift like a pro in Adelaide. Follow this curated route using the Adelaide Metro tram and train network with student concession fares.',
    keyTakeaways: [
      'Take advantage of the Adelaide CBD Free Tram Zone from South Terrace to the Entertainment Centre',
      'Combine shopping with local coffee stops and parklands',
      'Bring a sturdy canvas tote bag and reusable water bottle',
    ],
    contentSections: [
      {
        heading: 'Morning: East End Heritage & Streetwear (9:30 AM – 12:00 PM)',
        paragraphs: [
          'Start your morning at the East End of Rundle Street. Grab a flat white from a local laneway cafe and head to Street Vintage Co. and Fox On The Run Vintage right as doors open.',
          'Next, walk 3 minutes over to the Australian Red Cross Shop on Rundle Street to browse designer donations and tailored coats.',
        ],
      },
      {
        heading: 'Midday: Free Tram to Bowden / Plant 4 Precinct (12:30 PM – 2:30 PM)',
        paragraphs: [
          'Hop on the tram heading towards the Adelaide Entertainment Centre (completely free!). Get off at the Entertainment Centre stop and cross over into Bowden’s leafy green streets.',
          'Stop at Plant 4 Bowden for street food lunch and explore the rotating vintage stalls, reworked streetwear racks, and eco-friendly sellers.',
        ],
      },
      {
        heading: 'Afternoon: Glenelg Coastal Op Shop Loop (3:00 PM – 5:30 PM)',
        paragraphs: [
          'Board the Glenelg Tram from the city or Entertainment Centre straight to Moseley Square / Jetty Road, Glenelg. The tram ride is smooth and scenic.',
          'Browse Salvos Stores on Jetty Road and take the short walk around the corner to the Red Cross Op Shop on Gordon Street. Wrap up your day watching the sunset over the Gulf St Vincent with some local fish and chips!',
        ],
      },
    ],
  },
];
