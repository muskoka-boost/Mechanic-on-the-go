export interface Service {
  slug: string;
  title: string;
  short: string;
  blurb: string;
  icon: string;
  details: string[];
}

/**
 * The advertised service list. Anything not in this array is not promoted
 * anywhere on the site.
 *
 * NOT THE SAME AS "not offered". Brake work and steering and suspension work
 * ARE done — they are left off deliberately, on the owner's instruction,
 * because he would rather field those questions in person than advertise them.
 * Do not "helpfully" add them back, and do not write copy anywhere saying they
 * are unavailable: that would be untrue.
 *
 * Genuinely NOT possible, because they need a hoist, an inspection station or
 * shop equipment: mounting and balancing tyres onto rims, MTO safety
 * certificates, transmission rebuilds, engine replacement, wheel alignments,
 * and A/C recharge (certification + recovery equipment). Those limits are
 * stated on the services index and in the FAQ.
 *
 * Adding a service here also adds it to the homepage grid, the services index,
 * the footer column and the sitemap — nothing needs listing twice.
 */
export const services: Service[] = [
  {
    slug: 'diagnostics',
    title: 'Computer Diagnostics',
    short: 'Check engine light scanned and properly diagnosed at your door.',
    icon: 'scan',
    blurb:
      'A code reader tells you which circuit is unhappy — it does not tell you which part failed. Every diagnosis starts with a full scan of engine, transmission, ABS and body modules, then live-data testing to prove the fault before a single part gets ordered.',
    details: [
      'Full multi-module scan, not just a generic OBD-II code pull',
      'Live data and freeze-frame analysis to confirm the real fault',
      'Written explanation of what failed and what it will take to fix',
    ],
  },
  {
    slug: 'no-start',
    title: 'No-Start & Roadside Diagnosis',
    short: 'Car will not turn over? Diagnosed and often fixed where it sits.',
    icon: 'bolt',
    blurb:
      'A tow truck moves the problem. It does not solve it. Most no-starts come down to a battery, starter, alternator, fuse or relay — all replaceable on the spot, which means no tow bill and no waiting days for a shop bay.',
    details: [
      'Battery, alternator and starter testing and replacement',
      'Charging system and parasitic draw diagnosis',
      'Fuse, relay and ground fault tracing',
      'Honest call on whether it is fixable on site or genuinely needs a shop',
    ],
  },
  {
    slug: 'oil-and-fluids',
    title: 'Oil & Fluid Changes',
    short: 'Scheduled maintenance without giving up your morning.',
    icon: 'droplet',
    blurb:
      'The job that costs you two hours of sitting in a waiting room takes none of your time when it happens in your own driveway while you work. Full synthetic, correct filter, correct spec.',
    details: [
      'Conventional, synthetic blend and full synthetic oil changes',
      'Manufacturer-spec filters and fluids',
      'Coolant, transmission and differential fluid service',
      'Old parts and used oil can go with the van if you want them gone — just say so on the day',
    ],
  },
  {
    slug: 'cooling-system',
    title: 'Cooling System',
    short: 'Overheating, leaks and heater problems handled on site.',
    icon: 'thermo',
    blurb:
      'An overheating engine is on a clock — keep driving it and a cheap thermostat becomes a head gasket. Cooling faults get pressure-tested to find the actual leak instead of topping it up and hoping.',
    details: [
      'Pressure testing to locate leaks precisely',
      'Thermostat, water pump and radiator hose replacement',
      'Rad fan, sensor and coolant temperature diagnosis',
      'Coolant flush and refill to spec',
    ],
  },
  {
    slug: 'tire-changeover',
    title: 'Seasonal Tire Changeover',
    short: 'Winters on, winters off — in your driveway, on your schedule.',
    icon: 'tire',
    blurb:
      'Every October and April the shops book up three weeks deep and charge you an afternoon of your life. If your winters are already mounted on their own rims, the swap happens in your driveway in under an hour while you carry on with your day.',
    details: [
      'Swap-over of tyres already mounted on separate rims',
      'Torqued to manufacturer spec with a calibrated torque wrench — never an impact gun alone',
      'TPMS sensor check and reset where equipped',
      'Tread depth, wear pattern and pressure check on all four before they go back on',
    ],
  },
  {
    slug: 'pre-purchase-inspection',
    title: 'Pre-Purchase Inspection',
    short: 'Get a used car checked before you hand over the money.',
    icon: 'check',
    blurb:
      'The best money you will ever spend on a used vehicle is the inspection that stops you buying it. Meet you at the seller’s driveway or the lot, go over the vehicle properly, and give you a straight answer on what it needs.',
    details: [
      'Full mechanical, brake, suspension and underbody inspection',
      'Rust assessment — the real killer on Ontario vehicles',
      'Scan for stored and pending fault codes, including cleared-code history',
      'Plain-language written report and a repair cost estimate you can negotiate with',
    ],
  },
  {
    slug: 'tune-ups',
    title: 'Tune-Ups & Ignition',
    short: 'Misfires, rough idle and poor fuel economy sorted out.',
    icon: 'spark',
    blurb:
      'A misfire is not just annoying — it dumps raw fuel into a catalytic converter that costs many times what the plugs did. Ignition and fuel faults get found and fixed before they get expensive.',
    details: [
      'Spark plugs, coil packs and ignition wires',
      'Misfire and rough-idle diagnosis by cylinder',
      'Ignition and fuel delivery component replacement',
      'Belts, hoses and filters',
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
