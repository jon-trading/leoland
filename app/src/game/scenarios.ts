import { InstitutionKey, IssueTrackKey, ScenarioTemplate } from './types';

type ScenarioDraft = Omit<ScenarioTemplate, 'activationSummary' | 'affectedRegionIds' | 'affectedInstitutionIds' | 'issueTrackIds'> & {
  activationSummary?: string;
};

function regionBias(issues: IssueTrackKey[], regions: string[], institutions: InstitutionKey[], template: ScenarioDraft): ScenarioTemplate {
  return {
    ...template,
    issueTrackIds: issues,
    affectedRegionIds: regions,
    affectedInstitutionIds: institutions,
    activationSummary: template.activationSummary ?? 'This situation is active because pressure is accumulating faster than ordinary life can comfortably absorb.',
  };
}

export const scenarioCatalog: ScenarioTemplate[] = [
  regionBias(['child_wellbeing', 'trust_in_public_life'], ['southwatch', 'riverglass', 'north-crown'], ['schools', 'local_services', 'community_life'], {
    id: 'school-meals-child-stress',
    title: 'School Meals and Calm Afternoons',
    theme: 'Child wellbeing',
    urgency: 'urgent',
    whatIsAtStake: 'Children are absorbing adult strain, and the country can either cushion that pressure or deepen it.',
    intro: 'Southwatch schools and Riverglass family centres are warning that hungry afternoons are turning into missed learning, shame, and sharper behaviour problems.',
    options: [
      {
        id: 'universal-meals',
        label: 'Fund universal meals and calm after-school spaces',
        summary: 'A generous response that costs public capacity but lowers daily strain where it matters most.',
        humaneLogic: 'Treat food, calm, and dignity as civic infrastructure rather than charity.',
        likelyTradeoff: 'Treasury falls today, but trust and belonging strengthen across stressed regions.',
        treasuryDelta: -6,
        metricEffects: { happiness: 4, health: 4, fairness: 5, trust: 4, prosperity: -2, stress: -5, fragility: -2 },
        regionEffects: [
          { regionId: 'southwatch', wellbeing: 7, pressure: -8, belonging: 5, trust: 5, headline: 'Families feel noticed before strain hardens.' },
          { regionId: 'riverglass', wellbeing: 4, pressure: -4, trust: 3 },
          { regionId: 'north-crown', belonging: 2 },
        ],
        institutionEffects: [
          { institutionId: 'schools', strength: 4, strain: -6, publicTrust: 4, fairnessImpact: 4, note: 'Schools feel like shelter, not triage.' },
          { institutionId: 'local_services', strength: 2, strain: -3 },
          { institutionId: 'community_life', publicTrust: 2 },
        ],
        issueEffects: [
          { issueId: 'child_wellbeing', pressure: -9, trend: 'improving', headline: 'Child stress falls when dignity becomes normal policy.' },
          { issueId: 'trust_in_public_life', pressure: -3, trend: 'improving' },
        ],
        reflection: 'Children feel the state as care, not lecture. Some budget hawks complain, but the country feels kinder and steadier.',
      },
      {
        id: 'targeted-pilot',
        label: 'Pilot support only in the highest-stress districts',
        summary: 'Cheaper and still helpful, but some communities feel fairness turning into postcode luck.',
        humaneLogic: 'Direct help where pressure is sharpest, while risking a story that decency must be rationed.',
        likelyTradeoff: 'Stress eases in the hardest-hit areas, but fairness improves only a little.',
        treasuryDelta: -3,
        metricEffects: { health: 2, fairness: 1, trust: 1, prosperity: 1, stress: -2 },
        regionEffects: [
          { regionId: 'southwatch', wellbeing: 5, pressure: -5, belonging: 3 },
          { regionId: 'riverglass', pressure: -2 },
          { regionId: 'eastbridge', trust: -2, pressure: 2, headline: 'Some parents wonder why care depends on district maps.' },
        ],
        institutionEffects: [
          { institutionId: 'schools', strength: 2, strain: -2, publicTrust: 1 },
          { institutionId: 'local_services', strength: 1 },
        ],
        issueEffects: [
          { issueId: 'child_wellbeing', pressure: -4, trend: 'steady' },
          { issueId: 'trust_in_public_life', pressure: 1, trend: 'steady' },
        ],
        reflection: 'The help works where it lands, but some families ask why ordinary care must be carefully rationed.',
      },
      {
        id: 'council-charity-gap',
        label: 'Leave it to councils and charities',
        summary: 'The budget stays calmer, but insecurity deepens in the places already carrying too much.',
        humaneLogic: 'This protects central neatness while letting social strain spread quietly.',
        likelyTradeoff: 'Treasury holds up, but trust and belonging take a delayed hit.',
        treasuryDelta: 2,
        metricEffects: { trust: -4, fairness: -5, prosperity: 2, stress: 4, fragility: 3 },
        regionEffects: [
          { regionId: 'southwatch', wellbeing: -6, pressure: 7, trust: -5, belonging: -4, headline: 'People feel the country stepping back from them.' },
          { regionId: 'riverglass', wellbeing: -3, pressure: 4 },
          { regionId: 'north-crown', trust: -2 },
        ],
        institutionEffects: [
          { institutionId: 'schools', strain: 4, publicTrust: -3, fairnessImpact: -4 },
          { institutionId: 'community_life', strain: 2 },
        ],
        issueEffects: [
          { issueId: 'child_wellbeing', pressure: 6, trend: 'worsening', headline: 'Need grows where care is least guaranteed.' },
          { issueId: 'trust_in_public_life', pressure: 4, trend: 'worsening' },
        ],
        reflection: 'You saved money today, but the country learns that care depends on luck, postcode, and who is already tired enough to help.',
      },
    ],
  }),
  regionBias(['flooding_risk', 'energy_affordability'], ['north-crown', 'greenfold', 'frostmere'], ['emergency_resilience', 'local_services', 'community_life'], {
    id: 'stormbelt-readiness',
    title: 'Stormbelt Readiness',
    theme: 'Climate resilience',
    urgency: 'rising',
    whatIsAtStake: 'Preparedness is boring right up until it is the difference between continuity and fear.',
    intro: 'North Crown and Greenfold both want stronger flood defences, evacuation plans, and resilient local power, but the works are expensive and unglamorous.',
    options: [
      {
        id: 'resilience-first',
        label: 'Fund local resilience and protect vulnerable streets now',
        summary: 'A patient, grounded investment in safety and resilience.',
        humaneLogic: 'Prevent harm before disaster headlines force your hand.',
        likelyTradeoff: 'Prosperity ticks down now, but resilience and calm improve across exposed regions.',
        treasuryDelta: -5,
        metricEffects: { safety: 6, resilience: 7, trust: 3, prosperity: -2, stress: -3 },
        regionEffects: [
          { regionId: 'north-crown', wellbeing: 5, pressure: -6, trust: 4, resilience: 5 },
          { regionId: 'greenfold', wellbeing: 3, pressure: -4, resilience: 4 },
          { regionId: 'frostmere', resilience: 2, trust: 1 },
        ],
        institutionEffects: [
          { institutionId: 'emergency_resilience', strength: 6, strain: -4, publicTrust: 3 },
          { institutionId: 'local_services', strength: 1 },
          { institutionId: 'community_life', publicTrust: 1 },
        ],
        issueEffects: [
          { issueId: 'flooding_risk', pressure: -8, trend: 'improving', headline: 'Preparedness becomes visible before the storm arrives.' },
          { issueId: 'energy_affordability', pressure: -1, trend: 'steady' },
        ],
        reflection: 'Nothing flashy happens today. That is the point. Homes and routes feel more secure, and people notice the seriousness.',
      },
      {
        id: 'insurance-relief',
        label: 'Offer partial relief and postpone the bigger works',
        summary: 'This softens short-term pain but leaves exposure in place.',
        humaneLogic: 'It helps after harm while letting the country avoid its harder duty.',
        likelyTradeoff: 'Treasury is preserved, but fragility rises because the underlying risk remains.',
        treasuryDelta: -1,
        metricEffects: { safety: 1, trust: -1, resilience: -2, prosperity: 1, stress: 1, fragility: 2 },
        regionEffects: [
          { regionId: 'north-crown', pressure: 2, resilience: -2 },
          { regionId: 'greenfold', trust: -2, pressure: 3, resilience: -1 },
        ],
        institutionEffects: [
          { institutionId: 'emergency_resilience', strain: 3, publicTrust: -2, fairnessImpact: -1 },
        ],
        issueEffects: [
          { issueId: 'flooding_risk', pressure: 4, trend: 'worsening', headline: 'People can tell the state still prefers cleanup to prevention.' },
        ],
        reflection: 'People are grateful for the relief, but they can tell you dodged the harder duty.',
      },
    ],
  }),
  regionBias(['housing_strain', 'transport_reliability', 'cost_of_living_pressure'], ['eastbridge', 'southwatch', 'riverglass'], ['housing', 'transport', 'local_services'], {
    id: 'homes-belonging-last-bus',
    title: 'Homes, Belonging, and the Last Bus Home',
    theme: 'Housing and transport',
    urgency: 'urgent',
    whatIsAtStake: 'A country that cannot house people without exhausting them turns growth into resentment.',
    intro: 'Eastbridge is growing fast while Southwatch families are getting squeezed. New homes, better buses, and calmer planning rules could ease the strain, but wealthy blocs are loud.',
    options: [
      {
        id: 'build-and-bus',
        label: 'Build mixed housing near transit and protect bus routes',
        summary: 'A balanced answer that helps affordability and daily dignity, even if it causes local arguments.',
        humaneLogic: 'Growth should feel liveable, not extractive.',
        likelyTradeoff: 'Treasury takes a hit, but fairness, belonging, and prosperity all strengthen together.',
        treasuryDelta: -5,
        metricEffects: { fairness: 4, prosperity: 3, trust: 3, resilience: 2, stress: -4 },
        regionEffects: [
          { regionId: 'eastbridge', pressure: -6, trust: 3, belonging: 3 },
          { regionId: 'southwatch', wellbeing: 4, pressure: -3, belonging: 2 },
          { regionId: 'riverglass', trust: 1 },
        ],
        institutionEffects: [
          { institutionId: 'housing', strength: 4, strain: -5, fairnessImpact: 4, publicTrust: 3 },
          { institutionId: 'transport', strength: 3, strain: -4, publicTrust: 2 },
        ],
        issueEffects: [
          { issueId: 'housing_strain', pressure: -8, trend: 'improving', headline: 'Homes begin to feel reachable again.' },
          { issueId: 'transport_reliability', pressure: -5, trend: 'improving' },
          { issueId: 'cost_of_living_pressure', pressure: -2, trend: 'steady' },
        ],
        reflection: 'The debate is noisy, but commuting gets easier and the housing story starts to feel less hopeless.',
      },
      {
        id: 'market-only',
        label: 'Leave housing and transport mostly to the market',
        summary: 'This flatters short-term investors, but everyday life gets sharper and meaner.',
        humaneLogic: 'It treats a social system like a price chart.',
        likelyTradeoff: 'Prosperity nudges up briefly, but pressure, trust loss, and fragility spread.',
        treasuryDelta: 2,
        metricEffects: { prosperity: 2, trust: -4, fairness: -4, stress: 5, fragility: 3 },
        regionEffects: [
          { regionId: 'eastbridge', pressure: 6, trust: -4, belonging: -2 },
          { regionId: 'southwatch', wellbeing: -4, pressure: 5, belonging: -3 },
          { regionId: 'riverglass', trust: -2 },
        ],
        institutionEffects: [
          { institutionId: 'housing', strain: 5, publicTrust: -4, fairnessImpact: -5 },
          { institutionId: 'transport', strain: 3, publicTrust: -2 },
        ],
        issueEffects: [
          { issueId: 'housing_strain', pressure: 6, trend: 'worsening', headline: 'The housing story starts to feel like a closed door.' },
          { issueId: 'transport_reliability', pressure: 3, trend: 'worsening' },
          { issueId: 'trust_in_public_life', pressure: 3, trend: 'worsening' },
        ],
        reflection: 'The numbers look tidy for a moment, but people feel the country drifting toward a winner-takes-more bargain.',
      },
    ],
  }),
  regionBias(['hospital_queues', 'transport_reliability'], ['frostmere', 'riverglass', 'north-crown'], ['healthcare', 'transport', 'civic_information'], {
    id: 'rural-health-access',
    title: 'Rural Health Access',
    theme: 'Healthcare and dignity',
    urgency: 'rising',
    whatIsAtStake: 'Distance becomes political when care depends too much on where you happen to live.',
    intro: 'Frostmere clinics are warning that long travel times, staff shortages, and winter delays are turning treatable problems into crises.',
    options: [
      {
        id: 'mobile-care-and-routes',
        label: 'Fund mobile care teams and protected transport links',
        summary: 'A calm, practical intervention that treats access as a public promise.',
        humaneLogic: 'Bring care closer instead of asking fragile places to endure distance politely.',
        likelyTradeoff: 'Treasury tightens, but safety, trust, and fairness improve where neglect was starting to spread.',
        treasuryDelta: -4,
        metricEffects: { health: 5, fairness: 3, trust: 3, safety: 3, prosperity: -1, stress: -2 },
        regionEffects: [
          { regionId: 'frostmere', pressure: -7, wellbeing: 5, trust: 5, resilience: 2 },
          { regionId: 'north-crown', trust: 2, pressure: -2 },
        ],
        institutionEffects: [
          { institutionId: 'healthcare', strength: 3, strain: -5, publicTrust: 4, fairnessImpact: 3 },
          { institutionId: 'transport', strength: 2, strain: -2 },
        ],
        issueEffects: [
          { issueId: 'hospital_queues', pressure: -4, trend: 'improving' },
          { issueId: 'transport_reliability', pressure: -3, trend: 'improving' },
        ],
        reflection: 'The state feels closer, not just louder. People remember when practical care arrives before crisis television.',
      },
      {
        id: 'centralise-care',
        label: 'Consolidate care into the biggest hospitals',
        summary: 'Efficiency looks neat on paper, but access gets colder at the edges.',
        humaneLogic: 'A spreadsheet can be orderly while a country becomes less humane.',
        likelyTradeoff: 'Treasury steadies, but pressure and distrust rise in remote regions.',
        treasuryDelta: 1,
        metricEffects: { health: -2, fairness: -4, trust: -3, prosperity: 1, fragility: 2 },
        regionEffects: [
          { regionId: 'frostmere', pressure: 7, wellbeing: -4, trust: -6, belonging: -2 },
          { regionId: 'riverglass', pressure: 2 },
        ],
        institutionEffects: [
          { institutionId: 'healthcare', strength: 1, strain: 3, publicTrust: -4, fairnessImpact: -4 },
          { institutionId: 'civic_information', publicTrust: -1 },
        ],
        issueEffects: [
          { issueId: 'hospital_queues', pressure: 2, trend: 'steady' },
          { issueId: 'trust_in_public_life', pressure: 3, trend: 'worsening' },
        ],
        reflection: 'Efficiency improves for some, but people at the edges learn that order can still feel like abandonment.',
      },
    ],
  }),
  regionBias(['youth_belonging', 'trust_in_public_life'], ['southwatch', 'eastbridge', 'greenfold'], ['community_life', 'schools', 'local_services'], {
    id: 'youth-belonging-boredom',
    title: 'Youth Belonging and Boredom',
    theme: 'Belonging',
    urgency: 'rising',
    whatIsAtStake: 'A society that leaves young people bored, unseen, and under-invited eventually pays in distrust and restless anger.',
    intro: 'Youth workers across Southwatch and Eastbridge say boredom, isolation, and low-cost hopelessness are thickening into trouble.',
    options: [
      {
        id: 'youth-spaces-and-mentors',
        label: 'Back youth spaces, sport, arts, and trusted local mentors',
        summary: 'A broad belonging answer that strengthens everyday civic life.',
        humaneLogic: 'Treat belonging as preventative infrastructure, not a soft extra.',
        likelyTradeoff: 'Money goes out now, but stress and fragility ease while community life strengthens.',
        treasuryDelta: -4,
        metricEffects: { happiness: 3, safety: 2, trust: 3, resilience: 2, stress: -3, fragility: -2 },
        regionEffects: [
          { regionId: 'southwatch', pressure: -6, belonging: 7, trust: 4, wellbeing: 4 },
          { regionId: 'eastbridge', belonging: 3, pressure: -2 },
          { regionId: 'greenfold', mood: 2 },
        ],
        institutionEffects: [
          { institutionId: 'community_life', strength: 5, strain: -3, publicTrust: 3, fairnessImpact: 2 },
          { institutionId: 'schools', strength: 1, strain: -1 },
          { institutionId: 'local_services', strength: 2, strain: -2 },
        ],
        issueEffects: [
          { issueId: 'youth_belonging', pressure: -7, trend: 'improving', headline: 'Young people start to feel invited into the country, not merely managed by it.' },
        ],
        reflection: 'The change is not loud, but the atmosphere softens. Trouble does not vanish; it just stops feeling inevitable.',
      },
      {
        id: 'visibility-crackdown',
        label: 'Increase patrols and call it deterrence',
        summary: 'This may calm a headline, but it confuses being seen with being welcomed.',
        humaneLogic: 'Control without belonging can harden the very mood it wants to calm.',
        likelyTradeoff: 'Short-term order improves a little, but trust, belonging, and long-run safety weaken.',
        treasuryDelta: -1,
        metricEffects: { safety: 1, trust: -3, fairness: -2, stress: 3, fragility: 2 },
        regionEffects: [
          { regionId: 'southwatch', pressure: 3, belonging: -5, trust: -4 },
          { regionId: 'eastbridge', belonging: -2, pressure: 1 },
        ],
        institutionEffects: [
          { institutionId: 'community_life', strain: 2, publicTrust: -3 },
          { institutionId: 'civic_information', publicTrust: -2 },
        ],
        issueEffects: [
          { issueId: 'youth_belonging', pressure: 4, trend: 'worsening' },
          { issueId: 'trust_in_public_life', pressure: 2, trend: 'worsening' },
        ],
        reflection: 'The streets may look calmer for a week, but the country feels less welcoming and more brittle.',
      },
    ],
  }),
  regionBias(['energy_affordability', 'cost_of_living_pressure'], ['greenfold', 'riverglass', 'southwatch'], ['local_services', 'housing', 'emergency_resilience'], {
    id: 'local-energy-cost-shock',
    title: 'Energy Cost Shock',
    theme: 'Energy affordability',
    urgency: 'urgent',
    whatIsAtStake: 'Heat, light, and transport costs can quietly turn a decent society into an anxious one.',
    intro: 'A sudden energy price spike is rippling through homes, community buildings, and small firms just as colder weather approaches.',
    options: [
      {
        id: 'targeted-energy-relief',
        label: 'Fund targeted relief and local resilience upgrades',
        summary: 'Protect the households and services most exposed while investing in practical efficiency.',
        humaneLogic: 'Treat affordability and resilience as linked, not competing, obligations.',
        likelyTradeoff: 'Treasury drops now, but stress, fragility, and unfair pressure ease.',
        treasuryDelta: -5,
        metricEffects: { fairness: 3, trust: 2, resilience: 3, prosperity: -1, stress: -4, fragility: -3 },
        regionEffects: [
          { regionId: 'southwatch', pressure: -5, wellbeing: 3, trust: 3 },
          { regionId: 'greenfold', resilience: 3, wellbeing: 2 },
          { regionId: 'riverglass', trust: 1 },
        ],
        institutionEffects: [
          { institutionId: 'local_services', strength: 2, strain: -2 },
          { institutionId: 'housing', fairnessImpact: 2 },
          { institutionId: 'emergency_resilience', strength: 2 },
        ],
        issueEffects: [
          { issueId: 'energy_affordability', pressure: -7, trend: 'improving', headline: 'The country acts before cold and debt become a quiet social wound.' },
          { issueId: 'cost_of_living_pressure', pressure: -3, trend: 'steady' },
        ],
        reflection: 'The country spends real money, but it buys time, warmth, and steadier nerves where they matter most.',
      },
      {
        id: 'wait-for-market-correction',
        label: 'Wait and hope the market settles quickly',
        summary: 'This avoids immediate spending, but ordinary families absorb the uncertainty.',
        humaneLogic: 'The burden of patience falls hardest on people with the least room to absorb shock.',
        likelyTradeoff: 'Treasury is preserved, but stress, trust loss, and fragility rise quickly.',
        treasuryDelta: 2,
        metricEffects: { trust: -3, fairness: -3, prosperity: 1, stress: 4, fragility: 3 },
        regionEffects: [
          { regionId: 'southwatch', pressure: 5, wellbeing: -3, trust: -3 },
          { regionId: 'riverglass', pressure: 2 },
          { regionId: 'greenfold', trust: -1 },
        ],
        institutionEffects: [
          { institutionId: 'local_services', strain: 3 },
          { institutionId: 'housing', strain: 2 },
        ],
        issueEffects: [
          { issueId: 'energy_affordability', pressure: 5, trend: 'worsening' },
          { issueId: 'cost_of_living_pressure', pressure: 4, trend: 'worsening' },
        ],
        reflection: 'The ledger looks calmer, but people feel the state asking them to absorb a shock alone.',
      },
    ],
  }),
  regionBias(['trust_in_public_life', 'child_wellbeing'], ['greenfold', 'southwatch', 'riverglass'], ['community_life', 'schools', 'civic_information'], {
    id: 'community-festival-belonging',
    title: 'Festival, Belonging, and Public Mood',
    theme: 'Community life',
    urgency: 'steady',
    whatIsAtStake: 'When people feel invited into public life, stress softens and trust becomes easier to keep.',
    intro: 'A shared festival proposal could link schools, clubs, music groups, and local services across regions, but some critics call it soft spending in a hard year.',
    options: [
      {
        id: 'fund-festival-weave',
        label: 'Back the festival and tie it to schools, clubs, and local services',
        summary: 'A cultural move that strengthens belonging and the feeling of shared countryhood.',
        humaneLogic: 'Joy, ritual, and shared public space are part of resilience, not a distraction from it.',
        likelyTradeoff: 'Treasury dips a little, but trust, happiness, and belonging rise broadly.',
        treasuryDelta: -2,
        metricEffects: { happiness: 4, trust: 3, resilience: 1, prosperity: -1, stress: -2 },
        regionEffects: [
          { regionId: 'greenfold', belonging: 4, mood: 3 },
          { regionId: 'southwatch', belonging: 5, trust: 2 },
          { regionId: 'riverglass', trust: 2, wellbeing: 1 },
        ],
        institutionEffects: [
          { institutionId: 'community_life', strength: 4, publicTrust: 3 },
          { institutionId: 'schools', strength: 1 },
          { institutionId: 'civic_information', publicTrust: 2 },
        ],
        issueEffects: [
          { issueId: 'trust_in_public_life', pressure: -4, trend: 'improving' },
          { issueId: 'youth_belonging', pressure: -2, trend: 'improving' },
        ],
        reflection: 'The country feels more like a shared home than a set of competing headlines.',
      },
      {
        id: 'cancel-for-optics',
        label: 'Cancel it and say the year is too serious for celebration',
        summary: 'This looks stern, but it strips away one of the softer ways a society holds itself together.',
        humaneLogic: 'Austerity of spirit can make real pressure feel lonelier and harsher.',
        likelyTradeoff: 'Treasury holds steady, but stress and distance between regions rise a little.',
        treasuryDelta: 1,
        metricEffects: { happiness: -2, trust: -2, stress: 2 },
        regionEffects: [
          { regionId: 'southwatch', belonging: -3, mood: -2 },
          { regionId: 'greenfold', trust: -1 },
        ],
        institutionEffects: [
          { institutionId: 'community_life', strain: 2, publicTrust: -2 },
          { institutionId: 'civic_information', publicTrust: -1 },
        ],
        issueEffects: [
          { issueId: 'trust_in_public_life', pressure: 2, trend: 'worsening' },
          { issueId: 'youth_belonging', pressure: 1, trend: 'steady' },
        ],
        reflection: 'Nothing dramatic goes wrong, but the country feels a little greyer and more separate from itself.',
      },
    ],
  }),
];
