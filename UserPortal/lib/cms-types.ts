export interface SiteConfig {
  siteName: string;
  portalShortName: string;
  accreditationTag: string;
  helplinePhone: string;
  admissionHelpline: string;
  officialEmail: string;
  admissionEmail: string;
  address: string;
  workingHours: string;
  portalLiveUrl: string;
  copyrightText: string;
  emergencyContact: string;
}

export interface ErpNotificationItem {
  id: string;
  category: string;
  message: string;
  url: string;
  priority: string;
  date: string;
  isActive: boolean;
}

export interface ErpDispatch {
  isEnabled: boolean;
  dispatchTitle: string;
  items: ErpNotificationItem[];
}

export interface HeroStat {
  id: string;
  title: string;
  value: string;
  description: string;
  isActive: boolean;
}

export interface HeroFeatureCard {
  zoneName: string;
  category: string;
  title: string;
  description: string;
  policyName: string;
  policyCode: string;
  approvalStatus: string;
  imageUrl: string;
}

export interface HomeHeroSection {
  tagline: string;
  mainHeadName: string;
  subHeadName: string;
  admissionsPhone: string;
  admissionsHelpText: string;
  featureCard: HeroFeatureCard;
  stats: HeroStat[];
}

export interface NoticeItem {
  id: string;
  circularNumber: string;
  publishedDate: string;
  title: string;
  description: string;
  issuedBy: string;
  actionLabel: string;
  actionUrl: string;
  tab: string;
  isActive: boolean;
}

export interface HomeNoticeBoard {
  repositoryTag: string;
  title: string;
  categories: string[];
  notices: NoticeItem[];
}

export interface ProgrammeHighlight {
  id: string;
  programmeType: string;
  duration: string;
  courseName: string;
  description: string;
  tags: string[];
  seats: string;
  facilities: string[];
  actionText: string;
  actionUrl: string;
  isActive: boolean;
}

export interface HomeProgrammes {
  tag: string;
  heading: string;
  items: ProgrammeHighlight[];
}

export interface FrontDeskPerson {
  title: string;
  name: string;
  role: string;
  quote: string;
  message: string;
  photo: string;
}

export interface HomeFrontDesk {
  options: {
    programmes: { id: number; name: string }[];
    sports: { id: number; name: string }[];
    achievementLevels: { id: number; name: string }[];
    states: { id: number; name: string }[];
    accommodations: { id: number; name: string }[];
  };
  contacts: {
    hotlineTitle: string;
    hotlineNumber: string;
    tollFreeNumber: string;
    deskEmailTitle: string;
    email: string;
    deskWing: string;
  };
  content: {
    complianceBadgeText: string;
    sectionHeading: string;
    sectionDescription: string;
    visitCardTitle: string;
    visitCardSubtitle: string;
    visitComplianceCode: string;
    protocolTitle: string;
    qrDeliveryMessage: string;
    issuePassButtonLabel: string;
    securityCheckItems: string[];
    confirmationMessage: string;
    confirmationSlaText: string;
  };
}

export interface InfrastructureFacilityHighlight {
  id: string;
  name: string;
  location: string;
  specs: string;
  capacity: string;
  status: string;
  imageUrl: string;
}

export interface HomeInfrastructure {
  tag: string;
  heading: string;
  facilities: InfrastructureFacilityHighlight[];
}

export interface HomeData {
  erpDispatch: ErpDispatch;
  heroSection: HomeHeroSection;
  noticeBoard: HomeNoticeBoard;
  programmes: HomeProgrammes;
  frontDesk: HomeFrontDesk;
  infrastructure: HomeInfrastructure;
}

export interface FastFactItem {
  id: string;
  value: string;
  label: string;
  detail: string;
}

export interface HistoricalLegacyItem {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface GovernanceBodyMember {
  id: string;
  name: string;
  body: string;
  role: string;
  designation: string;
}

export interface CoreStrategyItem {
  id: string;
  title: string;
  description: string;
}

export interface AboutData {
  heroBanner: {
    badge: string;
    title: string;
    subtitle: string;
    campusSize: string;
    statutoryRecognition: string;
    headquarters: string;
  };
  fastFacts: FastFactItem[];
  viceChancellorMessage: {
    heading: string;
    name: string;
    designation: string;
    quote: string;
    paragraphs: string[];
  };
  historicalLegacy: HistoricalLegacyItem[];
  governanceBodies: GovernanceBodyMember[];
  coreStrategies: CoreStrategyItem[];
}

export interface AcademicHeroFeaturePill {
  id: string;
  icon: string;
  text: string;
}

export interface AcademicIntakeMetric {
  id: string;
  value: string;
  label: string;
  color?: string;
}

export interface AcademicHeroData {
  tag1: string;
  tag2: string;
  heading: string;
  subheading: string;
  featurePills: AcademicHeroFeaturePill[];
  intakeMatrix: {
    badge: string;
    statusLabel: string;
    metrics: AcademicIntakeMetric[];
    regulation: string;
    policyText: string;
  };
}

export interface AcademicProgrammeStat {
  label: string;
  value: string;
}

export interface AcademicProgrammeFact {
  icon: string;
  title: string;
  description: string;
}

export interface AcademicProgrammeItem {
  id: string;
  code?: string;
  level: "ALL" | "UG" | "PG" | "PHD" | "PG_DIPLOMA" | string;
  durationLabel: string;
  name?: string;
  title: string;
  faculty: string;
  statusBadge?: {
    label: string;
    icon?: string;
  };
  stats: AcademicProgrammeStat[];
  facts: AcademicProgrammeFact[];
  footer?: {
    label: string;
    value: string;
  };
  pdfLabel: string;
  syllabusUrl?: string;
  isActive?: boolean;
  duration?: string;
  eligibility?: string;
  seats?: string;
  sportsQuota?: string;
  annualFee?: string;
  description?: string;
  subjects?: string[];
}

export interface AcademicDualSupportCard {
  _id: string;
  icon: string;
  alt: string;
  title: string;
  subtitle: string;
  description: string;
  highlightText: string;
}

export interface AcademicCouncilNote {
  _id: string;
  councilTitle: string;
  referenceNumber: string;
  note: string;
  signedBy: string;
  hashValue: string;
}

export interface AcademicDualCareerData {
  tag: string;
  heading: string;
  tagline: string;
  description: string;
  privileges: string[];
  supportCards: AcademicDualSupportCard[];
  councilNotes: AcademicCouncilNote[];
}

export interface AcademicChoicePillar {
  _id: string;
  cardNumber: string;
  creditRange: string;
  title: string;
  description: string;
  highlightText: string;
}

export interface AcademicChoiceData {
  tag: string;
  title: string;
  description: string;
  pillars: AcademicChoicePillar[];
}

export interface AcademicCalendarMilestone {
  id: string;
  milestone: string;
  programmes: string;
  window: string;
  regulation: string;
  actionText: string;
  actionHref: string;
  type?: string;
  semester?: string;
  event?: string;
  date?: string;
}

export interface AcademicDossierCard {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  icon: string;
}

export interface AcademicCalendarData {
  tag: string;
  title: string;
  description: string;
  events: AcademicCalendarMilestone[];
  dossierCards: AcademicDossierCard[];
}

export interface AcademicData {
  hero: AcademicHeroData;
  programmes: AcademicProgrammeItem[];
  dualCareer: AcademicDualCareerData;
  choice: AcademicChoiceData;
  calendar: AcademicCalendarData;
}

export interface FacilityItem {
  id: string;
  name: string;
  category: string;
  surface: string;
  capacity: string;
  certification: string;
  lighting: string;
  features: string[];
  bookingStatus: string;
  imageUrl: string;
}

export interface SportsInfrastructureData {
  hero: {
    badge: string;
    heading: string;
    subheading: string;
  };
  facilities: FacilityItem[];
  tariffRules: {
    universityStudents: string;
    affiliatedColleges: string;
    nationalFederations: string;
    bookingPortal: string;
  };
}

export interface AdmissionTrackItem {
  id: string;
  trackName: string;
  description: string;
  quota: string;
  benefits: string;
}

export interface ImportantDateItem {
  id: string;
  event: string;
  date: string;
  status: string;
}

export interface SeatMatrixItem {
  id: string;
  course: string;
  total: number;
  sportsQuota: number;
  general: number;
  reserved: number;
}

export interface AdmissionsBentoCard {
  id: string;
  badge: string;
  value: string;
  subtitle: string;
  highlightText?: string;
  icon: string;
  progressPercent: number;
  secondaryPercent?: number;
  barColor: string;
  secondaryColor?: string;
}

export interface AdmissionsBentoData {
  cards: AdmissionsBentoCard[];
}

export interface AdmissionsPathwayStep {
  id: string;
  stepNumber: string;
  badge: string;
  badgeBg: string;
  badgeTextColor: string;
  title: string;
  description: string;
  tags: string[];
  tagColor?: string;
  buttonText: string;
  buttonLink: string;
  buttonIcon: string;
  buttonTheme: "dark" | "light";
}

export interface AdmissionsPathwayData {
  tag: string;
  title: string;
  statusBadge: string;
  steps: AdmissionsPathwayStep[];
}

export interface AdmissionsEligibilitySelectOption {
  label: string;
}

export interface AdmissionsEligibilitySelectGroup {
  label: string;
  options: AdmissionsEligibilitySelectOption[];
}

export interface AdmissionsEligibilityData {
  tag: string;
  title: string;
  icon: string;
  selectOptions: {
    programme: AdmissionsEligibilitySelectGroup;
    domicile: AdmissionsEligibilitySelectGroup;
    accommodation: AdmissionsEligibilitySelectGroup;
  };
  commitment: {
    tag: string;
    amount: string;
    periodSuffix: string;
    waiverSchemeBadge: string;
    buttonText: string;
  };
}

export interface AdmissionsStatutoryRow {
  id: string;
  category: string;
  description: string;
  allocation: string;
  benchmark: string;
  fee: string;
  feeBadge?: string;
}

export interface AdmissionsStatutoryData {
  tag: string;
  title: string;
  actBadge: string;
  rows: AdmissionsStatutoryRow[];
}

export interface AdmissionsFeeRow {
  label: string;
  amount: string;
}

export interface AdmissionsFeeCard {
  id: string;
  category: string;
  title: string;
  rows: AdmissionsFeeRow[];
  totalLabel: string;
}

export interface AdmissionsApprovedFeeData {
  tag: string;
  title: string;
  icon: string;
  feeCards: AdmissionsFeeCard[];
}

export interface AdmissionsTrialGuideItem {
  id: string;
  title: string;
  detail: string;
  score: string;
}

export interface AdmissionsDownloadItem {
  id: string;
  icon: string;
  title: string;
  href: string;
  detail: string;
}

export interface AdmissionsHelpdeskData {
  tag: string;
  icon: string;
  title: string;
  phoneLabel: string;
  phone: string;
  whatsappLabel: string;
  whatsapp: string;
  emailLabel: string;
  email: string;
  ticketUrl: string;
  ticketButtonText: string;
  ticketSlaNotice: string;
}

export interface AdmissionsVenueMapData {
  tag: string;
  icon: string;
  venueName: string;
  mapUrl: string;
  coordinates: string;
  embedQuery: string;
}

export interface AdmissionsSidebarData {
  trialsGuide: {
    tag: string;
    icon: string;
    title: string;
    description: string;
    trials: AdmissionsTrialGuideItem[];
    notice: string;
    noticeIcon: string;
  };
  downloads: {
    tag: string;
    icon: string;
    title: string;
    items: AdmissionsDownloadItem[];
  };
  helpdesk: AdmissionsHelpdeskData;
  venueMap: AdmissionsVenueMapData;
}

export interface AdmissionsData {
  hero: {
    statusBadge: string;
    heading: string;
    subheading: string;
    brochureUrl: string;
    helpline: string;
    email: string;
  };
  tracks: AdmissionTrackItem[];
  importantDates: ImportantDateItem[];
  seatMatrix: SeatMatrixItem[];
  bento: AdmissionsBentoData;
  pathway: AdmissionsPathwayData;
  eligibility: AdmissionsEligibilityData;
  statutory: AdmissionsStatutoryData;
  feeStructure: AdmissionsApprovedFeeData;
  sidebar: AdmissionsSidebarData;
}

export interface LaboratoryItem {
  id: string;
  code: string;
  name: string;
  category: string;
  lead: string;
  equipment: string;
  description: string;
  status: string;
}

export interface GrantItem {
  id: string;
  title: string;
  agency: string;
  amount: string;
  pi: string;
  status: string;
}

export interface ResearchMetricItem {
  id: string;
  label: string;
  value: string;
}

export interface ResearchAndLabsData {
  hero: {
    tag: string;
    heading: string;
    subheading: string;
    grantSummary: string;
  };
  metrics: ResearchMetricItem[];
  laboratories: LaboratoryItem[];
  grants: GrantItem[];
}

export interface TenderItem {
  id: string;
  ref: string;
  category: string;
  title: string;
  wing: string;
  value: string;
  emd: string;
  fee: string;
  published: string;
  deadline: string;
  openingDate: string;
  status: string;
  rfpDocUrl: string;
  boqDocUrl: string;
  corrigendumDocUrl: string;
  note: string;
}

export interface TendersData {
  hero: {
    badge: string;
    heading: string;
    subheading: string;
    gemNotice: string;
  };
  tendersList: TenderItem[];
}

export interface RtiOfficerItem {
  id: string;
  designation: string;
  name: string;
  officialRole: string;
  office: string;
  phone: string;
  email: string;
}

export interface RtiManualItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  url: string;
}

export interface RtiMetricItem {
  id: string;
  label: string;
  value: string;
}

export interface RtiData {
  hero: {
    heading: string;
    subheading: string;
    actReference: string;
  };
  metrics: RtiMetricItem[];
  officers: RtiOfficerItem[];
  manuals: RtiManualItem[];
}

export interface SportsEventItem {
  id: string;
  name: string;
  sport: string;
  date: string;
  endDate: string;
  location: string;
  status: string;
  category: string;
  registrationDeadline: string;
  rulesUrl: string;
}

export interface EventsData {
  hero: {
    badge: string;
    heading: string;
    subheading: string;
  };
  eventsList: SportsEventItem[];
}

export interface HeaderNavLink {
  id: string;
  label: string;
  href: string;
  order: number;
  isActive: boolean;
  badge?: string;
}

export interface HeaderLanguage {
  code: string;
  label: string;
  href: string;
  isActive: boolean;
}

export interface HeaderData {
  topBar: {
    govtTag: string;
    tollFreeLabel: string;
    tollFreePhone: string;
    portalBadgeLabel: string;
    portalBadgeUrl: string;
    showFontResizers: boolean;
    showThemeToggle: boolean;
    languages: HeaderLanguage[];
  };
  branding: {
    logoUrl: string;
    logoAlt: string;
    universityTitle: string;
    universitySubtitle: string;
    dignitaryRole: string;
    dignitaryName: string;
    dignitaryIcon: string;
    showDignitary: boolean;
  };
  navigation: {
    links: HeaderNavLink[];
    showSsoButton: boolean;
    ssoButtonLabel: string;
    ssoButtonUrl: string;
  };
}

export interface FooterQualityBadge {
  id: string;
  title: string;
  subtitle: string;
}

export interface FooterLegalLink {
  label: string;
  href: string;
}

export interface FooterCertificationItem {
  icon: string;
  title: string;
  detail: string;
}

export interface FooterData {
  primary: {
    crestUrl: string;
    crestTitle: string;
    crestTag: string;
    description: string;
    address: string;
    registrarPhone: string;
    antiRaggingTollFree: string;
    statutoryBodies: string[];
    governance: string[];
    qualityBadges: FooterQualityBadge[];
    copyrightText: string;
    tagline: string;
    lastUpdated: string;
  };
  variant2: {
    complianceBadges: string[];
    hostingText: string;
    statutoryBodies: string[];
    governanceBodies: string[];
    campusTitle: string;
    campusAddress1: string;
    campusAddress2: string;
    campusEmail: string;
    campusPhone: string;
    mandateDescription: string;
    eOfficeButtonLabel: string;
    eOfficeButtonUrl: string;
    copyrightText: string;
    bottomLinks: FooterLegalLink[];
  };
  variant3: {
    monogramLetter: string;
    title: string;
    description: string;
    address: string;
    registrarEmail: string;
    governanceLinks: string[];
    complianceLinks: string[];
    certifications: FooterCertificationItem[];
    footerLinks: string[];
  };
}

export interface CmsStore {
  lastUpdated: string;
  version: string;
  siteConfig: SiteConfig;
  home: HomeData;
  about: AboutData;
  academic: AcademicData;
  sportsInfrastructure: SportsInfrastructureData;
  admissions: AdmissionsData;
  researchAndLabs: ResearchAndLabsData;
  tenders: TendersData;
  rti: RtiData;
  events: EventsData;
  header?: HeaderData;
  footer?: FooterData;
}

