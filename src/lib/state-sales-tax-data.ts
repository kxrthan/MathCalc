export interface StateSalesTaxData {
  slug: string;
  name: string;
  abbreviation: string;
  stateTaxRate: number;
  avgLocalRate: number;
  combinedRate: number;
  taxationType: string;
  specialNotes: string;
  description: string;
}

export const stateSalesTaxData: StateSalesTaxData[] = [
  {
    slug: "alabama",
    name: "Alabama",
    abbreviation: "AL",
    stateTaxRate: 4.0,
    avgLocalRate: 5.22,
    combinedRate: 9.22,
    taxationType: "Origin-based",
    specialNotes: "Alabama has some of the highest combined rates in the US due to local taxes. Groceries are taxed at the full state rate.",
    description: "Alabama levies a 4% state sales tax, with local jurisdictions adding up to 7% more, resulting in an average combined rate of 9.22%. Retail sales of tangible personal property are generally taxable."
  },
  {
    slug: "alaska",
    name: "Alaska",
    abbreviation: "AK",
    stateTaxRate: 0,
    avgLocalRate: 1.76,
    combinedRate: 1.76,
    taxationType: "No state tax",
    specialNotes: "Alaska has no statewide sales tax, but some municipalities levy their own local sales taxes. Always check local rates.",
    description: "Alaska is one of five US states with no statewide sales tax. However, many local municipalities charge their own sales taxes, with an average local rate of 1.76%."
  },
  {
    slug: "arizona",
    name: "Arizona",
    abbreviation: "AZ",
    stateTaxRate: 5.6,
    avgLocalRate: 2.77,
    combinedRate: 8.37,
    taxationType: "Origin-based",
    specialNotes: "Arizona calls its sales tax a Transaction Privilege Tax (TPT), which is technically a tax on the seller's privilege of doing business. Groceries are exempt from state tax.",
    description: "Arizona charges a 5.6% state sales tax (called Transaction Privilege Tax), with county and city taxes adding an average of 2.77%, bringing the combined average to 8.37%."
  },
  {
    slug: "arkansas",
    name: "Arkansas",
    abbreviation: "AR",
    stateTaxRate: 6.5,
    avgLocalRate: 2.93,
    combinedRate: 9.43,
    taxationType: "Destination-based",
    specialNotes: "Arkansas taxes groceries at a reduced 0.125% rate (plus local taxes). Prescription drugs are exempt. The state has one of the highest combined rates nationally.",
    description: "Arkansas has a 6.5% state sales tax plus an average 2.93% in local taxes, for a combined average of 9.43%. The state taxes most tangible personal property."
  },
  {
    slug: "california",
    name: "California",
    abbreviation: "CA",
    stateTaxRate: 7.25,
    avgLocalRate: 1.57,
    combinedRate: 8.82,
    taxationType: "Destination-based",
    specialNotes: "California has the highest base state sales tax rate in the US at 7.25%. Groceries and prescription drugs are exempt. Some localities like Los Angeles reach 10.25%.",
    description: "California imposes the nation's highest statewide sales tax at 7.25%. When combined with local district taxes averaging 1.57%, shoppers in some cities pay up to 10.25% or more."
  },
  {
    slug: "colorado",
    name: "Colorado",
    abbreviation: "CO",
    stateTaxRate: 2.9,
    avgLocalRate: 4.82,
    combinedRate: 7.72,
    taxationType: "Destination-based",
    specialNotes: "Colorado has one of the lowest state rates but complex local taxes. Denver charges 8.81% combined. Groceries are exempt at the state level.",
    description: "Colorado's state sales tax rate is a low 2.9%, but extensive local taxes bring the average combined rate to 7.72%. Denver and other major cities can exceed 8.5%."
  },
  {
    slug: "connecticut",
    name: "Connecticut",
    abbreviation: "CT",
    stateTaxRate: 6.35,
    avgLocalRate: 0,
    combinedRate: 6.35,
    taxationType: "Destination-based",
    specialNotes: "Connecticut has no local sales taxes — the 6.35% state rate is uniform statewide. Groceries and prescription drugs are exempt.",
    description: "Connecticut charges a flat 6.35% sales tax with no local additions, making tax calculations simple and predictable across the entire state."
  },
  {
    slug: "delaware",
    name: "Delaware",
    abbreviation: "DE",
    stateTaxRate: 0,
    avgLocalRate: 0,
    combinedRate: 0,
    taxationType: "No sales tax",
    specialNotes: "Delaware has no sales tax at any level — state or local. This makes Delaware popular for tax-free shopping.",
    description: "Delaware is one of five US states with no sales tax whatsoever. This is why you often see 'tax-free shopping' advertised in Delaware near the borders of neighboring states."
  },
  {
    slug: "florida",
    name: "Florida",
    abbreviation: "FL",
    stateTaxRate: 6.0,
    avgLocalRate: 1.08,
    combinedRate: 7.08,
    taxationType: "Destination-based",
    specialNotes: "Florida does not tax groceries, medicine, or medical supplies. Counties can add up to 2% in discretionary surtaxes. Miami-Dade is at 7%.",
    description: "Florida charges a 6% state sales tax with county-level additions averaging 1.08%. Groceries, medicine, and medical devices are generally exempt."
  },
  {
    slug: "georgia",
    name: "Georgia",
    abbreviation: "GA",
    stateTaxRate: 4.0,
    avgLocalRate: 3.35,
    combinedRate: 7.35,
    taxationType: "Destination-based",
    specialNotes: "Georgia's state rate is 4%, but most counties add a 3% LOST/SPLOST, making Atlanta-area rates around 8.9%. Groceries are exempt from state tax.",
    description: "Georgia levies a 4% state sales tax, with local jurisdictions adding an average of 3.35%. Most purchases of tangible goods are taxable, while groceries are exempt at the state level."
  },
  {
    slug: "hawaii",
    name: "Hawaii",
    abbreviation: "HI",
    stateTaxRate: 4.0,
    avgLocalRate: 0.44,
    combinedRate: 4.44,
    taxationType: "Origin-based",
    specialNotes: "Hawaii uses a General Excise Tax (GET) instead of a traditional sales tax. The GET applies to almost all business activities, including services, and is typically passed on to consumers.",
    description: "Hawaii's 4% General Excise Tax (GET) applies broadly to services and goods alike, unlike most state sales taxes. Maui County adds an extra 0.5% surcharge."
  },
  {
    slug: "idaho",
    name: "Idaho",
    abbreviation: "ID",
    stateTaxRate: 6.0,
    avgLocalRate: 0.03,
    combinedRate: 6.03,
    taxationType: "Destination-based",
    specialNotes: "Idaho has minimal local taxes. Groceries are taxed at the full state rate, though a refundable grocery credit is available on state income taxes.",
    description: "Idaho's 6% state sales tax applies to most retail sales with very low local additions (averaging 0.03%). Prescription drugs are exempt."
  },
  {
    slug: "illinois",
    name: "Illinois",
    abbreviation: "IL",
    stateTaxRate: 6.25,
    avgLocalRate: 2.49,
    combinedRate: 8.74,
    taxationType: "Origin-based",
    specialNotes: "Illinois taxes groceries at a reduced 1% rate. Chicago has a combined rate of 10.25%. Illinois is an origin-based state for sales tax purposes.",
    description: "Illinois levies a 6.25% state sales tax, with local taxes bringing the average combined rate to 8.74%. Chicago residents pay one of the highest combined rates in the country at 10.25%."
  },
  {
    slug: "indiana",
    name: "Indiana",
    abbreviation: "IN",
    stateTaxRate: 7.0,
    avgLocalRate: 0,
    combinedRate: 7.0,
    taxationType: "Destination-based",
    specialNotes: "Indiana has a uniform 7% rate with no local sales taxes. Groceries and prescription drugs are exempt.",
    description: "Indiana applies a flat 7% sales tax statewide with no local additions, simplifying tax calculations for consumers and businesses. Groceries and prescription drugs are exempt."
  },
  {
    slug: "iowa",
    name: "Iowa",
    abbreviation: "IA",
    stateTaxRate: 6.0,
    avgLocalRate: 1.0,
    combinedRate: 7.0,
    taxationType: "Destination-based",
    specialNotes: "Iowa's local option sales tax (LOST) is exactly 1% in most jurisdictions. Groceries are exempt from Iowa sales tax.",
    description: "Iowa charges a 6% state sales tax with many localities adding 1% for a common combined rate of 7%. Groceries, prescription drugs, and farm machinery are generally exempt."
  },
  {
    slug: "kansas",
    name: "Kansas",
    abbreviation: "KS",
    stateTaxRate: 6.5,
    avgLocalRate: 2.22,
    combinedRate: 8.72,
    taxationType: "Destination-based",
    specialNotes: "Kansas eliminated its grocery sales tax in 2024 (reduced to 0%). This was a major change — previously, Kansas was one of the few states taxing groceries at the full rate.",
    description: "Kansas has a 6.5% state rate with local additions averaging 2.22%. A notable 2024 change eliminated the grocery sales tax, making food purchases tax-free at the state level."
  },
  {
    slug: "kentucky",
    name: "Kentucky",
    abbreviation: "KY",
    stateTaxRate: 6.0,
    avgLocalRate: 0,
    combinedRate: 6.0,
    taxationType: "Destination-based",
    specialNotes: "Kentucky has a flat 6% state sales tax with no local sales taxes. Groceries and prescription drugs are exempt.",
    description: "Kentucky applies a simple, uniform 6% sales tax statewide. No local sales taxes are levied, making Kentucky's tax calculation among the simplest in the country."
  },
  {
    slug: "louisiana",
    name: "Louisiana",
    abbreviation: "LA",
    stateTaxRate: 5.0,
    avgLocalRate: 5.1,
    combinedRate: 10.1,
    taxationType: "Destination-based",
    specialNotes: "Louisiana has the highest average combined sales tax rate in the US due to very high local rates. New Orleans charges up to 9.45% total. Groceries are exempt at the state level.",
    description: "Louisiana has the highest combined average sales tax in the nation at 10.1%. The 5% state rate is compounded by extremely high local taxes, especially in New Orleans and surrounding parishes."
  },
  {
    slug: "maine",
    name: "Maine",
    abbreviation: "ME",
    stateTaxRate: 5.5,
    avgLocalRate: 0,
    combinedRate: 5.5,
    taxationType: "Destination-based",
    specialNotes: "Maine has a flat 5.5% state sales tax with no local taxes. Groceries and prescription drugs are exempt. Prepared food and lodging are taxed at higher rates.",
    description: "Maine charges a uniform 5.5% sales tax with no local additions. The state exempts groceries, prescription drugs, and certain agricultural products."
  },
  {
    slug: "maryland",
    name: "Maryland",
    abbreviation: "MD",
    stateTaxRate: 6.0,
    avgLocalRate: 0,
    combinedRate: 6.0,
    taxationType: "Destination-based",
    specialNotes: "Maryland has a flat 6% rate statewide with no local taxes. Groceries and prescription drugs are exempt. Alcohol is taxed at a higher 9% rate.",
    description: "Maryland applies a flat 6% sales tax uniformly across the state. No local sales taxes apply, simplifying compliance. Groceries and drugs are exempt, but alcohol is taxed at 9%."
  },
  {
    slug: "massachusetts",
    name: "Massachusetts",
    abbreviation: "MA",
    stateTaxRate: 6.25,
    avgLocalRate: 0,
    combinedRate: 6.25,
    taxationType: "Destination-based",
    specialNotes: "Massachusetts has a flat 6.25% state sales tax with no local taxes. Groceries, clothing under $175 per item, and prescription drugs are exempt.",
    description: "Massachusetts charges a uniform 6.25% sales tax statewide with no local additions. Notably, clothing items under $175 each and groceries are exempt from the state sales tax."
  },
  {
    slug: "michigan",
    name: "Michigan",
    abbreviation: "MI",
    stateTaxRate: 6.0,
    avgLocalRate: 0,
    combinedRate: 6.0,
    taxationType: "Destination-based",
    specialNotes: "Michigan has a flat 6% state sales tax with no local taxes. Groceries and prescription drugs are exempt.",
    description: "Michigan applies a simple, flat 6% state sales tax with no local taxes. This makes Michigan tax calculations easy and predictable anywhere in the state."
  },
  {
    slug: "minnesota",
    name: "Minnesota",
    abbreviation: "MN",
    stateTaxRate: 6.875,
    avgLocalRate: 0.58,
    combinedRate: 7.46,
    taxationType: "Destination-based",
    specialNotes: "Minnesota exempts groceries, prescription drugs, and clothing. Local option taxes can push rates higher. Minneapolis charges 8.025% combined.",
    description: "Minnesota's 6.875% state rate plus local taxes averages 7.46% combined. Notably, clothing is exempt from Minnesota sales tax — a consumer-friendly policy unique among most states."
  },
  {
    slug: "mississippi",
    name: "Mississippi",
    abbreviation: "MS",
    stateTaxRate: 7.0,
    avgLocalRate: 0.07,
    combinedRate: 7.07,
    taxationType: "Origin-based",
    specialNotes: "Mississippi has one of the higher state rates at 7%. It does not exempt groceries from the standard state tax rate. Prescription drugs are exempt.",
    description: "Mississippi charges a 7% state sales tax on most retail sales with minimal local additions. Unlike most states, Mississippi taxes groceries at the full 7% rate."
  },
  {
    slug: "missouri",
    name: "Missouri",
    abbreviation: "MO",
    stateTaxRate: 4.225,
    avgLocalRate: 4.03,
    combinedRate: 8.26,
    taxationType: "Origin-based",
    specialNotes: "Missouri has a complex tax structure with numerous local jurisdictions. Kansas City and St. Louis area rates can reach 10%+. Groceries are taxed at a reduced 1.225% state rate.",
    description: "Missouri's 4.225% state rate is supplemented by heavy local taxes (averaging 4.03%), pushing combined rates near 8.26%. Some urban areas exceed 10%."
  },
  {
    slug: "montana",
    name: "Montana",
    abbreviation: "MT",
    stateTaxRate: 0,
    avgLocalRate: 0,
    combinedRate: 0,
    taxationType: "No sales tax",
    specialNotes: "Montana has no sales tax at any level. However, Montana has a resort tax in certain resort areas like Big Sky and Whitefish.",
    description: "Montana is one of five US states with no sales tax. Some resort communities do charge a local resort tax on specific goods and services, but general retail purchases are completely tax-free."
  },
  {
    slug: "nebraska",
    name: "Nebraska",
    abbreviation: "NE",
    stateTaxRate: 5.5,
    avgLocalRate: 1.44,
    combinedRate: 6.94,
    taxationType: "Destination-based",
    specialNotes: "Nebraska exempts groceries and prescription drugs. Omaha adds 2.5% local tax, bringing its combined rate to 7%.",
    description: "Nebraska charges a 5.5% state sales tax with local taxes averaging 1.44% for a combined 6.94%. Groceries and prescription drugs are exempt statewide."
  },
  {
    slug: "nevada",
    name: "Nevada",
    abbreviation: "NV",
    stateTaxRate: 6.85,
    avgLocalRate: 1.38,
    combinedRate: 8.23,
    taxationType: "Destination-based",
    specialNotes: "Nevada's effective rate varies significantly by county. Clark County (Las Vegas) charges 8.375% total. Groceries are exempt; prescription drugs are exempt.",
    description: "Nevada has a 6.85% base state rate with local taxes bringing the average to 8.23%. Las Vegas (Clark County) rates reach 8.375%. Groceries and drugs are exempt."
  },
  {
    slug: "new-hampshire",
    name: "New Hampshire",
    abbreviation: "NH",
    stateTaxRate: 0,
    avgLocalRate: 0,
    combinedRate: 0,
    taxationType: "No sales tax",
    specialNotes: "New Hampshire has no sales tax on general goods. However, there is a 9% rooms and meals tax, and a 9% motor vehicle rental tax.",
    description: "New Hampshire is one of five US states with no general sales tax. The state does impose a 9% tax on prepared food, hotel rooms, and rental cars, but retail purchases are tax-free."
  },
  {
    slug: "new-jersey",
    name: "New Jersey",
    abbreviation: "NJ",
    stateTaxRate: 6.625,
    avgLocalRate: -0.03,
    combinedRate: 6.6,
    taxationType: "Destination-based",
    specialNotes: "New Jersey has an Urban Enterprise Zone with a reduced 3.3125% rate for certain businesses. Groceries, prescription drugs, and most clothing are exempt.",
    description: "New Jersey charges a 6.625% state sales tax with a unique Urban Enterprise Zone where select businesses charge half the standard rate. Groceries, drugs, and most clothing are exempt."
  },
  {
    slug: "new-mexico",
    name: "New Mexico",
    abbreviation: "NM",
    stateTaxRate: 5.0,
    avgLocalRate: 2.72,
    combinedRate: 7.72,
    taxationType: "Origin-based",
    specialNotes: "New Mexico calls its tax the Gross Receipts Tax (GRT), which is levied on sellers but typically passed to consumers. It applies to services in addition to goods.",
    description: "New Mexico's Gross Receipts Tax (GRT) averages 7.72% when combining state and local rates. Unlike many sales taxes, the GRT applies to many services as well as retail goods."
  },
  {
    slug: "new-york",
    name: "New York",
    abbreviation: "NY",
    stateTaxRate: 4.0,
    avgLocalRate: 4.52,
    combinedRate: 8.52,
    taxationType: "Destination-based",
    specialNotes: "New York City charges 8.875% combined. New York State exempts groceries, prescription drugs, and most clothing under $110 per item. The state rate is 4% but locality taxes vary widely.",
    description: "New York's 4% state rate is dramatically augmented by local taxes, especially in New York City (8.875% combined). Groceries and prescription drugs are exempt statewide."
  },
  {
    slug: "north-carolina",
    name: "North Carolina",
    abbreviation: "NC",
    stateTaxRate: 4.75,
    avgLocalRate: 2.23,
    combinedRate: 6.98,
    taxationType: "Destination-based",
    specialNotes: "North Carolina reduced its state rate from 5% to 4.75% in recent years. Most counties add 2%, for a combined 6.75% in most areas. Groceries are taxed at a reduced 2% rate.",
    description: "North Carolina has a 4.75% state sales tax rate, with county additions bringing the average to 6.98%. Unprepared food is taxed at a reduced 2% rate statewide."
  },
  {
    slug: "north-dakota",
    name: "North Dakota",
    abbreviation: "ND",
    stateTaxRate: 5.0,
    avgLocalRate: 1.85,
    combinedRate: 6.85,
    taxationType: "Destination-based",
    specialNotes: "North Dakota exempts prescription drugs. Groceries are taxed at the standard state rate. Local cities can add additional sales taxes.",
    description: "North Dakota charges a 5% state sales tax with local additions averaging 1.85%. Prescription drugs are exempt, but groceries are taxed at the full combined rate."
  },
  {
    slug: "ohio",
    name: "Ohio",
    abbreviation: "OH",
    stateTaxRate: 5.75,
    avgLocalRate: 1.49,
    combinedRate: 7.24,
    taxationType: "Destination-based",
    specialNotes: "Ohio exempts groceries and prescription drugs. Counties add their own tax (typically 0.75%–2.25%). The Cuyahoga County (Cleveland) rate is 8%.",
    description: "Ohio's 5.75% state rate combined with county taxes averages 7.24%. Groceries and drugs are exempt. County rates vary, with some areas like Cleveland reaching 8%."
  },
  {
    slug: "oklahoma",
    name: "Oklahoma",
    abbreviation: "OK",
    stateTaxRate: 4.5,
    avgLocalRate: 4.47,
    combinedRate: 8.97,
    taxationType: "Destination-based",
    specialNotes: "Oklahoma has very high local tax rates, particularly in Tulsa and Oklahoma City. Groceries are taxed at a reduced 4.5% state rate (no local food exemptions).",
    description: "Oklahoma's modest 4.5% state rate is amplified by very high local taxes averaging 4.47%, resulting in a combined 8.97%. Some areas of Oklahoma City and Tulsa approach 10%."
  },
  {
    slug: "oregon",
    name: "Oregon",
    abbreviation: "OR",
    stateTaxRate: 0,
    avgLocalRate: 0,
    combinedRate: 0,
    taxationType: "No sales tax",
    specialNotes: "Oregon has no sales tax. It relies heavily on income tax instead. This makes Oregon popular for major purchases, especially for residents of neighboring Washington state.",
    description: "Oregon is one of five US states with no sales tax. Instead, Oregon relies on income tax as its primary revenue source. Shoppers from Washington state often cross the border to shop tax-free."
  },
  {
    slug: "pennsylvania",
    name: "Pennsylvania",
    abbreviation: "PA",
    stateTaxRate: 6.0,
    avgLocalRate: 0.34,
    combinedRate: 6.34,
    taxationType: "Destination-based",
    specialNotes: "Pennsylvania has minimal local sales taxes (only Philadelphia at 2% and Allegheny County at 1% add local taxes). Groceries, prescription drugs, and clothing are exempt statewide.",
    description: "Pennsylvania charges 6% statewide with only two localities adding taxes: Philadelphia (8%) and Allegheny County (7%). Groceries, drugs, and clothing are exempt across the state."
  },
  {
    slug: "rhode-island",
    name: "Rhode Island",
    abbreviation: "RI",
    stateTaxRate: 7.0,
    avgLocalRate: 0,
    combinedRate: 7.0,
    taxationType: "Destination-based",
    specialNotes: "Rhode Island has a flat 7% state sales tax with no local additions. Groceries and prescription drugs are exempt.",
    description: "Rhode Island applies a uniform 7% statewide sales tax with no local variations. Groceries and prescription drugs are exempt, making the tax structure straightforward."
  },
  {
    slug: "south-carolina",
    name: "South Carolina",
    abbreviation: "SC",
    stateTaxRate: 6.0,
    avgLocalRate: 1.46,
    combinedRate: 7.46,
    taxationType: "Destination-based",
    specialNotes: "South Carolina caps the sales tax on motor vehicles at $500. Groceries are taxed at a reduced 0% at the state level (counties may apply local taxes). Prescription drugs are exempt.",
    description: "South Carolina's 6% state rate with local additions averages 7.46%. Groceries are exempt at the state level, though local taxes may apply. Vehicle purchases are capped at $500 total tax."
  },
  {
    slug: "south-dakota",
    name: "South Dakota",
    abbreviation: "SD",
    stateTaxRate: 4.2,
    avgLocalRate: 1.9,
    combinedRate: 6.1,
    taxationType: "Destination-based",
    specialNotes: "South Dakota recently reduced its state rate from 4.5% to 4.2%. The state taxes groceries at the full rate. No income tax combined with this modest sales tax rate makes SD business-friendly.",
    description: "South Dakota reduced its state sales tax to 4.2% in 2023. Local additions average 1.9%. Groceries are taxed at the full rate, and there is no state income tax."
  },
  {
    slug: "tennessee",
    name: "Tennessee",
    abbreviation: "TN",
    stateTaxRate: 7.0,
    avgLocalRate: 2.55,
    combinedRate: 9.55,
    taxationType: "Origin-based",
    specialNotes: "Tennessee has one of the highest state sales tax rates in the US at 7%. Groceries are taxed at a reduced 4% state rate. Memphis area can reach nearly 10%.",
    description: "Tennessee's 7% state sales tax plus local additions push the average combined rate to 9.55%. Groceries receive a preferential 4% rate. Tennessee has no income tax, relying heavily on sales tax."
  },
  {
    slug: "texas",
    name: "Texas",
    abbreviation: "TX",
    stateTaxRate: 6.25,
    avgLocalRate: 1.95,
    combinedRate: 8.2,
    taxationType: "Destination-based",
    specialNotes: "Texas allows cities and counties to add up to 2% local tax, capping the combined rate at 8.25%. Groceries and prescription drugs are exempt. Texas has no income tax.",
    description: "Texas levies a 6.25% state sales tax, with local taxes capped at 2%, for a maximum combined rate of 8.25%. Groceries and prescription drugs are exempt. There is no state income tax."
  },
  {
    slug: "utah",
    name: "Utah",
    abbreviation: "UT",
    stateTaxRate: 6.1,
    avgLocalRate: 1.09,
    combinedRate: 7.19,
    taxationType: "Origin-based",
    specialNotes: "Utah taxes groceries at a reduced 3% combined rate (1.75% state + 1.25% local). Prescription drugs and medical equipment are exempt.",
    description: "Utah charges a 6.1% state rate with local additions averaging 1.09%. Groceries benefit from a reduced combined rate of approximately 3%. Prescription drugs are exempt."
  },
  {
    slug: "vermont",
    name: "Vermont",
    abbreviation: "VT",
    stateTaxRate: 6.0,
    avgLocalRate: 0.24,
    combinedRate: 6.24,
    taxationType: "Destination-based",
    specialNotes: "Vermont has minimal local taxes. Groceries and prescription drugs are exempt. Clothing under $110 per item is exempt. Meals and hotel rooms are taxed at 9%.",
    description: "Vermont charges a 6% state sales tax with minimal local additions (0.24%). Groceries, prescription drugs, and clothing under $110 are all exempt. Restaurant meals face a 9% meals tax."
  },
  {
    slug: "virginia",
    name: "Virginia",
    abbreviation: "VA",
    stateTaxRate: 5.3,
    avgLocalRate: 0.47,
    combinedRate: 5.77,
    taxationType: "Destination-based",
    specialNotes: "Virginia taxes groceries at a reduced 2.5% combined rate. Northern Virginia and Hampton Roads have an additional 0.7% regional sales tax.",
    description: "Virginia's combined rate averages 5.77% statewide. Groceries are taxed at a reduced 2.5%. Northern Virginia and Hampton Roads regions face higher combined rates due to regional transportation taxes."
  },
  {
    slug: "washington",
    name: "Washington",
    abbreviation: "WA",
    stateTaxRate: 6.5,
    avgLocalRate: 2.73,
    combinedRate: 9.23,
    taxationType: "Destination-based",
    specialNotes: "Washington has no income tax and relies heavily on its 6.5% sales tax. Seattle area rates reach 10.25%. Groceries are exempt; prescription drugs are exempt.",
    description: "Washington State charges a 6.5% base rate with local additions averaging 2.73% for a combined 9.23%. Seattle reaches 10.25%. No state income tax means sales tax is the primary revenue source."
  },
  {
    slug: "west-virginia",
    name: "West Virginia",
    abbreviation: "WV",
    stateTaxRate: 6.0,
    avgLocalRate: 0.39,
    combinedRate: 6.39,
    taxationType: "Destination-based",
    specialNotes: "West Virginia exempts groceries and prescription drugs. Local municipalities can add up to 1% additional tax. The state taxes most tangible goods.",
    description: "West Virginia charges a 6% state sales tax with minimal local additions averaging 0.39%. Groceries and prescription drugs are exempt from the tax."
  },
  {
    slug: "wisconsin",
    name: "Wisconsin",
    abbreviation: "WI",
    stateTaxRate: 5.0,
    avgLocalRate: 0.43,
    combinedRate: 5.43,
    taxationType: "Destination-based",
    specialNotes: "Wisconsin exempts groceries, prescription drugs, and most medical devices. Local county taxes of 0.5% apply in most counties. Milwaukee reaches 5.9% total.",
    description: "Wisconsin has a competitive 5% state rate with county additions averaging 0.43%, for a combined 5.43%. Groceries, drugs, and medical devices are exempt."
  },
  {
    slug: "wyoming",
    name: "Wyoming",
    abbreviation: "WY",
    stateTaxRate: 4.0,
    avgLocalRate: 1.36,
    combinedRate: 5.36,
    taxationType: "Destination-based",
    specialNotes: "Wyoming has one of the lowest combined sales tax rates in the US. No state income tax and low property taxes make Wyoming very tax-friendly. Groceries are taxed at the full rate.",
    description: "Wyoming charges a 4% state sales tax with local additions averaging 1.36%, for a low combined rate of 5.36%. With no income tax and low property taxes, Wyoming is one of the most tax-friendly states."
  }
];
