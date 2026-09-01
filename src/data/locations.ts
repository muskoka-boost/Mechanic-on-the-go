export interface Location {
  slug: string;
  name: string;
  group: 'Orillia & Townships' | 'Muskoka' | 'Barrie & South Simcoe' | 'Georgian Bay';
  driveTime: string;
  lead: string;
  body: string[];
  landmarks: string[];
  commonJobs: string[];
  nearby: string[];
  lat: number;
  lng: number;
}

/**
 * Every entry carries copy written specifically for that community. Do not
 * template these paragraphs — near-duplicate location pages are treated as
 * doorway pages and will sink the whole site rather than rank it.
 */
export const locations: Location[] = [
  {
    slug: 'orillia',
    name: 'Orillia',
    group: 'Orillia & Townships',
    driveTime: 'Home base',
    lat: 44.6087,
    lng: -79.4207,
    lead:
      'Orillia is home base. If you are inside the city, you are the shortest call of the day — most jobs get same-day or next-day attention.',
    body: [
      'Sitting where Highway 11 meets Highway 12, Orillia puts a lot of highway kilometres on local vehicles. Commuters running south to Barrie and the GTA rack up mileage fast, and the salt that comes with a Couchiching winter is hard on everything underneath, from hard lines to exhaust hangers.',
      'Working out of Orillia means no travel surcharge inside the city and a genuinely fast response when something goes wrong. Whether you are in West Ridge, downtown near the waterfront, up by Soldiers’ Memorial Hospital, or over toward the Lakehead campus, the van comes to your driveway or your workplace parking lot and the repair happens where the vehicle already sits.',
      'That matters most on the jobs where a tow is the expensive part. A dead battery, a failed starter or an alternator that has quit does not need to become a tow bill plus three days without a car when the work can be done on site.',
    ],
    landmarks: ['Downtown & the waterfront', 'West Ridge', 'Soldiers’ Memorial Hospital', 'Lakehead University campus', 'Highway 11 / 12 junction'],
    commonJobs: ['Winter battery and starter no-starts', 'Check engine light diagnostics', 'Highway-mileage oil and fluid service', 'Seasonal tire changeovers'],
    nearby: ['severn', 'ramara', 'oro-medonte', 'washago'],
  },
  {
    slug: 'barrie',
    name: 'Barrie',
    group: 'Barrie & South Simcoe',
    driveTime: 'About 35 minutes from Orillia',
    lat: 44.3894,
    lng: -79.6903,
    lead:
      'Barrie runs on the 400, and a commuter car that lives on that highway wears out on a schedule you can almost set a calendar by.',
    body: [
      'A Barrie vehicle doing the GTA run puts on highway kilometres faster than almost anything else in Simcoe County. That means oil intervals that come due sooner than the dashboard reminder wants to admit, belts and coolant working harder than they ever would around town, and wear that announces itself well before the odometer suggests it should.',
      'The bigger problem is time. If your day already ends with a commute up the 400, giving a shop your Saturday morning is a real cost. Mobile service in Allandale, Painswick, Ardagh, Holly or the east end means the work happens in your own driveway — or in your office lot while you are at your desk — and your weekend stays yours.',
      'Barrie sits at the outer edge of the regular service radius, so booking a day or two ahead gets you a proper slot rather than a squeeze-in.',
    ],
    landmarks: ['Allandale', 'Painswick', 'Ardagh', 'Holly', 'Georgian College', 'Highway 400 corridor'],
    commonJobs: ['Highway-mileage oil and fluid service', 'Check engine light diagnostics', 'Battery and alternator replacement', 'Pre-purchase inspections'],
    nearby: ['innisfil', 'oro-medonte', 'orillia'],
  },
  {
    slug: 'gravenhurst',
    name: 'Gravenhurst',
    group: 'Muskoka',
    driveTime: 'About 25 minutes from Orillia',
    lat: 44.9186,
    lng: -79.3711,
    lead:
      'The gateway to Muskoka, and close enough to Orillia that Gravenhurst calls get handled quickly rather than scheduled a week out.',
    body: [
      'Gravenhurst vehicles live a split life. Year-round residents drive the Highway 11 corridor daily; cottage vehicles sit for weeks, then get asked to tow a boat up a launch ramp on the first warm Saturday in May. Both patterns cause trouble, and they cause different trouble.',
      'A vehicle that sits kills batteries, goes stale in the fuel tank and surface-rusts anything it can reach. A vehicle that tows runs its cooling system at the edge and asks a great deal of a charging system that spent the winter doing nothing. Knowing which of those two lives your vehicle leads changes what actually needs checking.',
      'Because the drive up from Orillia is short, work near the Wharf, along Muskoka Beach Road, or out toward the lakes is straightforward to schedule — including opening-weekend batteries and no-starts on cottage vehicles that have not turned over since October.',
    ],
    landmarks: ['Muskoka Wharf', 'Muskoka Beach Road', 'Highway 11 corridor', 'Sparrow Lake'],
    commonJobs: ['Cottage-season battery replacement', 'Cooling system service before towing season', 'Spring wake-up no-starts', 'Oil and fluid service at the cottage'],
    nearby: ['bracebridge', 'washago', 'severn', 'orillia'],
  },
  {
    slug: 'bracebridge',
    name: 'Bracebridge',
    group: 'Muskoka',
    driveTime: 'About 40 minutes from Orillia',
    lat: 45.0384,
    lng: -79.3108,
    lead:
      'Bracebridge sits at the Highway 11 and 118 split, which means a lot of vehicles here are covering serious distance on mixed roads.',
    body: [
      'Cottage country roads are hard on a vehicle in ways city driving simply is not. Gravel concessions, frost heave, and the winter run down the 118 toward the lakes work exhaust hangers, cooling hoses and drive belts far past what the mileage on the odometer would suggest.',
      'The other Muskoka reality is distance from a shop bay. When a vehicle strands itself out toward Muskoka Falls or up a side road, the tow bill alone can rival the repair. Diagnosing on site and — where it is a battery, alternator, starter, hose or belt — fixing it right there is the difference between an afternoon and a week.',
      'Bracebridge work is best booked ahead so the drive is planned into the route rather than fitted around it, which keeps the callout reasonable.',
    ],
    landmarks: ['Muskoka Falls', 'Highway 118 corridor', 'Downtown Bracebridge', 'Highway 11 north'],
    commonJobs: ['Roadside no-start diagnosis', 'Belt, hose and cooling repairs', 'Check engine light diagnostics', 'Oil and fluid service before winter'],
    nearby: ['gravenhurst', 'huntsville', 'orillia'],
  },
  {
    slug: 'huntsville',
    name: 'Huntsville',
    group: 'Muskoka',
    driveTime: 'About an hour from Orillia',
    lat: 45.3269,
    lng: -79.2166,
    lead:
      'The northern edge of the service area. Huntsville calls are absolutely doable — they just need to be booked in advance rather than same-day.',
    body: [
      'Huntsville is far enough up Highway 11 that a breakdown gets expensive quickly. It is also the staging point for anyone heading into Algonquin, which means a lot of loaded vehicles, roof boxes and trailers asking a great deal of engines and cooling systems on hilly roads.',
      'Loaded and towing vehicles fail differently. Cooling systems running right at the edge on the climbs, charging systems carrying trailer lights and a fridge on top of the vehicle’s own load, and fluids cooked well past their interval are the recurring themes rather than ordinary commuter wear.',
      'Because of the distance, Huntsville is scheduled rather than dispatched — book a day or more ahead and the job gets a proper block of time instead of a rushed window. For anything genuinely urgent this far north, call first and get an honest answer about whether a local option would serve you faster.',
    ],
    landmarks: ['Highway 11 north', 'Arrowhead Provincial Park', 'Deerhurst', 'Algonquin gateway'],
    commonJobs: ['Cooling system repairs on towing vehicles', 'Pre-trip inspections before Algonquin runs', 'Roadside no-start diagnosis', 'Oil and fluid service before towing season'],
    nearby: ['bracebridge', 'gravenhurst'],
  },
  {
    slug: 'midland',
    name: 'Midland',
    group: 'Georgian Bay',
    driveTime: 'About 35 minutes from Orillia',
    lat: 44.7501,
    lng: -79.8896,
    lead:
      'Midland sits on Georgian Bay, and bay air plus road salt is about the harshest combination an Ontario vehicle can be asked to live in.',
    body: [
      'Corrosion is the defining problem here. Fuel lines, exhaust hangers, cooling pipes, subframe mounts and every fastener underneath give up earlier in Midland than they do inland. A bolt that turns easily on a Barrie car can shear clean off on a Midland one, and that changes how a job has to be approached.',
      'That is worth knowing before a repair starts rather than halfway through. Inspections here pay particular attention to hard lines and underbody structure, because a corroded hard line gives very little warning before it lets go — and finding one early is the difference between a planned repair and a bad surprise.',
      'Work happens throughout Midland — near the harbour, up around the hospital, and out along the Highway 12 and 93 approaches.',
    ],
    landmarks: ['Midland harbour', 'Highway 12 & 93 approaches', 'Georgian Bay General Hospital', 'Sainte-Marie among the Hurons'],
    commonJobs: ['Underbody rust inspections', 'Corroded exhaust and cooling repairs', 'Pre-purchase inspections', 'Battery and no-start calls'],
    nearby: ['penetanguishene', 'tay', 'tiny', 'elmvale'],
  },
  {
    slug: 'penetanguishene',
    name: 'Penetanguishene',
    group: 'Georgian Bay',
    driveTime: 'About 40 minutes from Orillia',
    lat: 44.7668,
    lng: -79.9285,
    lead:
      'Penetanguishene shares Midland’s salt-and-bay-air problem, with the added wrinkle of a lot of vehicles that only work part of the year.',
    body: [
      'Between the harbour, the seasonal population and the boats, a good number of Penetanguishene vehicles spend months parked. Sitting is genuinely hard on a car — batteries sulphate, fuel goes stale, coolant sits unturned and tyres take a set. The first drive of the season is when all of it announces itself at once.',
      'Trucks that launch and haul boats get the opposite problem: cooling systems asked to work flat out at the ramp on the hottest weekend of the year, and charging systems running trailer lights on top of everything else.',
      'Both are far better dealt with before the season than during it. A pre-season check in the driveway costs a fraction of a bad Saturday at the launch.',
    ],
    landmarks: ['Discovery Harbour', 'Main Street', 'Highway 93', 'Penetang harbour'],
    commonJobs: ['Post-storage battery replacement', 'Boat-hauling cooling system checks', 'Spring wake-up no-starts', 'Pre-season inspections'],
    nearby: ['midland', 'tiny', 'tay'],
  },
  {
    slug: 'severn',
    name: 'Severn Township',
    group: 'Orillia & Townships',
    driveTime: 'About 10 minutes from Orillia',
    lat: 44.7501,
    lng: -79.5162,
    lead:
      'Severn wraps around the north end of Orillia, which makes it one of the quickest areas to reach and one of the easiest to book.',
    body: [
      'The township covers a lot of ground — Coldwater, Washago, Port Severn and the concessions in between — and much of it is rural road rather than city street. Gravel, frost heave and long driveways add up to exhaust, underbody and filter wear that a purely urban vehicle never sees.',
      'Rural also means distance from help. When a vehicle will not start at the end of a long driveway off a concession road, a tow is both slow and costly. Diagnosing it where it sits usually gets to the cause without the vehicle moving at all.',
      'Because Severn borders Orillia directly, there is no meaningful travel premium and same-week scheduling is normally straightforward.',
    ],
    landmarks: ['Coldwater', 'Washago', 'Port Severn', 'Severn Bridge', 'Highway 400 & 11 corridors'],
    commonJobs: ['No-start diagnosis on rural properties', 'Exhaust and underbody repairs', 'Check engine light diagnostics', 'Routine maintenance at home'],
    nearby: ['orillia', 'washago', 'coldwater', 'gravenhurst'],
  },
  {
    slug: 'ramara',
    name: 'Ramara Township',
    group: 'Orillia & Townships',
    driveTime: 'About 10 minutes from Orillia',
    lat: 44.6333,
    lng: -79.2333,
    lead:
      'Ramara runs along the east side of Lake Simcoe through Atherley, Brechin and Lagoon City — all inside the quick-response zone.',
    body: [
      'This is a mix of year-round households, seasonal properties and a steady flow of traffic to Casino Rama. Vehicles here tend to be either high-mileage daily drivers on Highway 12 or seasonal vehicles that sit for long stretches, and the two need completely different attention.',
      'Seasonal vehicles almost always need the same three things at wake-up: a battery that has given up, fluids that are older than the owner remembers, and a warning light that came on the last time it ran and never got read. All three are straightforward driveway work.',
      'Being minutes from Orillia, Ramara jobs slot easily into the schedule without a travel premium.',
    ],
    landmarks: ['Atherley', 'Brechin', 'Lagoon City', 'Casino Rama', 'Highway 12 along Lake Simcoe'],
    commonJobs: ['Wake-up service on seasonal vehicles', 'Battery replacement', 'Oil and fluid service', 'Highway 12 commuter maintenance'],
    nearby: ['orillia', 'severn', 'washago'],
  },
  {
    slug: 'oro-medonte',
    name: 'Oro-Medonte',
    group: 'Orillia & Townships',
    driveTime: 'About 15 minutes from Orillia',
    lat: 44.5501,
    lng: -79.5501,
    lead:
      'Oro-Medonte sits between Orillia and Barrie, and its line roads and concessions put a very different kind of mileage on a vehicle than the highway does.',
    body: [
      'The township’s grid of line roads, plus the climbs around Horseshoe Valley and Sugarbush, means a lot of gravel, a lot of frost heave and a lot of elevation change. Dust loads up air and cabin filters, stone chips find rad cores, and an engine that spends its life climbing runs hotter and harder than one on flat city pavement.',
      'The other half of the picture is distance. A vehicle that will not start at the end of a long concession-road driveway is an expensive tow and a lost day, and the cause is usually a battery, a starter or an alternator — every one of which gets replaced where the vehicle already sits.',
      'From Hawkestone and Shanty Bay through Horseshoe Valley up to Moonstone, the whole township falls comfortably inside the regular service area.',
    ],
    landmarks: ['Horseshoe Valley', 'Sugarbush', 'Hawkestone', 'Shanty Bay', 'Moonstone', 'Line roads & concessions'],
    commonJobs: ['No-start and battery calls on rural properties', 'Cooling system service on hill-country vehicles', 'Oil, filter and fluid service', 'Check engine light diagnostics'],
    nearby: ['orillia', 'barrie', 'severn'],
  },
  {
    slug: 'washago',
    name: 'Washago',
    group: 'Orillia & Townships',
    driveTime: 'About 15 minutes from Orillia',
    lat: 44.7501,
    lng: -79.3501,
    lead:
      'Washago sits at the top of Lake Couchiching where the Black and Green rivers come in — close to Orillia, and heavily seasonal.',
    body: [
      'A large share of Washago vehicles are cottage vehicles. They get driven hard for a few months, then parked for the rest of the year, which produces a very predictable set of problems: flat batteries, fuel that has been sitting since autumn, coolant nobody has looked at in years and a warning light nobody got round to reading.',
      'The other half of the picture is towing. Boats and trailers going in and out mean cooling systems, charging systems and hitches doing real work on a handful of very demanding weekends.',
      'Because it is only a short run north from Orillia, Washago is easy to schedule — including the spring wake-up calls when a vehicle that sat all winter refuses to turn over.',
    ],
    landmarks: ['Black River', 'Green River', 'North Lake Couchiching', 'Highway 11 north'],
    commonJobs: ['Spring wake-up no-starts', 'Cooling system checks before towing season', 'Oil and fluid service on seasonal vehicles', 'Battery replacement'],
    nearby: ['orillia', 'severn', 'gravenhurst', 'ramara'],
  },
  {
    slug: 'coldwater',
    name: 'Coldwater',
    group: 'Orillia & Townships',
    driveTime: 'About 20 minutes from Orillia',
    lat: 44.6833,
    lng: -79.6500,
    lead:
      'Coldwater sits on Highway 12 west of Orillia — a short, easy run, and a village where a lot of vehicles do real work.',
    body: [
      'Between farm properties, trades vehicles and the trucks that keep them running, Coldwater has a higher-than-average share of vehicles that carry weight, tow, and cover rough ground daily. That shows up as hard-working cooling systems, oil intervals that come round far faster than the calendar suggests, and batteries flattened by winches and work lights rather than ordinary commuter mileage.',
      'It is also a village where downtime is expensive in a direct way. A work truck sitting at a shop for two days is two days of jobs not done, which is exactly the case where driveway or yard-side repair earns its keep.',
      'Coldwater is close enough to Orillia to be scheduled easily, usually within the same week.',
    ],
    landmarks: ['Highway 12', 'Coldwater Mill', 'Village core', 'Surrounding farm concessions'],
    commonJobs: ['Work truck oil and fluid service', 'Battery, starter and alternator replacement', 'Cooling system repairs', 'On-site service to avoid downtime'],
    nearby: ['severn', 'orillia', 'elmvale', 'tay'],
  },
  {
    slug: 'innisfil',
    name: 'Innisfil',
    group: 'Barrie & South Simcoe',
    driveTime: 'About 45 minutes from Orillia',
    lat: 44.3001,
    lng: -79.6001,
    lead:
      'Innisfil is commuter country. Alcona, Lefroy and Stroud send a lot of vehicles down the 400 every single morning.',
    body: [
      'Long daily highway runs are the defining factor here. High-mileage vehicles burn through fluid intervals and tyre life fast, and because the driving is mostly steady highway, problems tend to announce themselves as a noise, a smell or a warning light rather than as anything dramatic.',
      'Commuting also makes shop visits genuinely painful. If your car is the only way you get to work, a two-day shop booking is a real logistical problem — which is precisely why overnight and driveway service suits this area so well.',
      'Innisfil is at the southern edge of the service radius, so it works best booked ahead rather than called in the same morning.',
    ],
    landmarks: ['Alcona', 'Lefroy', 'Stroud', 'Friday Harbour', 'Highway 400 corridor'],
    commonJobs: ['Scheduled fluid and filter service', 'Check engine light diagnostics', 'High-mileage tune-ups', 'Seasonal tire changeovers'],
    nearby: ['barrie', 'orillia'],
  },
  {
    slug: 'tay',
    name: 'Tay Township',
    group: 'Georgian Bay',
    driveTime: 'About 30 minutes from Orillia',
    lat: 44.7501,
    lng: -79.7501,
    lead:
      'Tay Township covers Victoria Harbour, Port McNicoll and Waubaushene along the Highway 12 corridor to Georgian Bay.',
    body: [
      'Tay gets the bay-air corrosion problem along with a strong seasonal swing. Waterfront and near-waterfront vehicles pick up rust on fuel lines, hard lines and exhaust faster than inland ones, and a fair number of them also spend part of the year parked.',
      'The combination is worth taking seriously. A vehicle that both corrodes and sits can develop faults that stay completely hidden until the day it is actually needed, which is not the moment you want to find out about them.',
      'Sitting right on the Highway 12 route between Orillia and Midland, Tay is easy to fold into the day’s schedule.',
    ],
    landmarks: ['Victoria Harbour', 'Port McNicoll', 'Waubaushene', 'Tay Shore Trail', 'Highway 12'],
    commonJobs: ['Seasonal vehicle wake-up service', 'Underbody rust assessment', 'Battery and no-start calls', 'Oil and fluid service'],
    nearby: ['midland', 'coldwater', 'penetanguishene', 'severn'],
  },
  {
    slug: 'tiny',
    name: 'Tiny Township',
    group: 'Georgian Bay',
    driveTime: 'About 45 minutes from Orillia',
    lat: 44.7501,
    lng: -79.9501,
    lead:
      'Tiny Township runs along the Georgian Bay shoreline through Balm Beach, Lafontaine and Perkinsfield — heavily seasonal, and hard on vehicles.',
    body: [
      'Sand, salt and a lot of unpaved shoreline road make Tiny genuinely tough on undercarriages. Add a seasonal population whose vehicles sit for long stretches and you get the two worst wear patterns stacked on top of each other: corrosion plus disuse.',
      'The practical result is that Tiny vehicles need looking over far more often than mileage alone would suggest. A cottage car with 60,000 kilometres on it can easily be in worse shape underneath than a commuter car with three times that.',
      'Tiny is toward the outer edge of the service area, so booking ahead is the way to get a proper appointment window rather than a squeeze-in.',
    ],
    landmarks: ['Balm Beach', 'Lafontaine', 'Perkinsfield', 'Georgian Bay shoreline', 'Concession roads'],
    commonJobs: ['Corrosion and underbody inspection', 'Seasonal vehicle service', 'Oil and fluid service', 'Battery and no-start calls'],
    nearby: ['midland', 'penetanguishene', 'elmvale'],
  },
  {
    slug: 'elmvale',
    name: 'Elmvale',
    group: 'Georgian Bay',
    driveTime: 'About 35 minutes from Orillia',
    lat: 44.5833,
    lng: -79.8667,
    lead:
      'Elmvale sits where Highways 27 and 92 meet in Springwater, surrounded by farm country and the roads that serve it.',
    body: [
      'Farm and trades vehicles dominate here, and they fail differently from commuter cars. Constant loading, towing and time spent on gravel means cooling systems, filters and fluids take the brunt, while the mileage on the dash badly understates how much work the vehicle has actually done.',
      'Downtime carries a direct cost in a working community. A truck that cannot run is a day of work lost, so getting the repair done in the yard rather than at a shop across the county is worth real money.',
      'Elmvale is an easy run out from Orillia and slots naturally into the same route as Midland and Tay work.',
    ],
    landmarks: ['Highway 27 & 92 junction', 'Springwater Township', 'Village core', 'Surrounding farm concessions'],
    commonJobs: ['Work and farm vehicle fluid service', 'Battery, starter and alternator replacement', 'Cooling system service', 'On-site repair to cut downtime'],
    nearby: ['midland', 'tiny', 'coldwater', 'barrie'],
  },
];

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug);

export const locationGroups = [
  'Orillia & Townships',
  'Muskoka',
  'Barrie & South Simcoe',
  'Georgian Bay',
] as const;

export const locationsByGroup = locationGroups.map((group) => ({
  group,
  items: locations.filter((l) => l.group === group),
}));
