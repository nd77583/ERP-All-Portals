# Page section API sheet

Dashboard sections use named endpoints under `/api/dashboard/` and return `{ success: boolean, data: T }`. Other page sections use `GET /api/page-sections?page={page}&section={section}`. A failed request, a non-2xx response, or missing data leaves that component's in-file mock content in place.

## Dashboard

| Section | `section` | Response fields and types |
|---|---|---|
| ERP dispatch | `/api/dashboard/erpDispatchApi` | `isEnabled: boolean`, `dispatchTitle: string`, `items: ErpNotificationItem[]` (`id, category, message, url, priority, date: string`; `isActive: boolean`) |
| Hero | `/api/dashboard/heroSectionApi` | `tagline, mainHeadName, subHeadName, admissionsPhone, admissionsHelpText: string`; `featureCard: HeroFeatureCard`; `stats: HeroStat[]` |
| Notice board | `/api/dashboard/noticeBoardApi` | `repositoryTag, title: string`; `categories: string[]`; `notices: NoticeItem[]` |
| Programmes | `/api/dashboard/programmesApi` | `tag, heading: string`; `items: ProgrammeHighlight[]` |
| Front desk | `/api/dashboard/frontDeskApi` | `options: { programmes, sports, achievementLevels, states, accommodations: Option[] }`; each `Option` is `{ id: number, name: string }`. `contacts: { hotlineTitle, hotlineNumber, tollFreeNumber, deskEmailTitle, email, deskWing: string }`. `content: { complianceBadgeText, sectionHeading, sectionDescription, visitCardTitle, visitCardSubtitle, visitComplianceCode, protocolTitle, qrDeliveryMessage, issuePassButtonLabel, confirmationMessage, confirmationSlaText: string; securityCheckItems: string[] }`. AY is calculated from the current date in the frontend. Form labels and placeholders remain in the frontend. |
| Infrastructure | `/api/dashboard/infrastructureApi` | `tag, heading: string`; `facilities: InfrastructureFacilityHighlight[]` (`id, name, location, specs, capacity, status, imageUrl: string`) |
| Accessibility banner | `/api/dashboard/bannerApi` | `title, description, highContrastLabel, screenReaderLabel, certificateLabel: string` |

## About

| Section | `section` | Response fields and types |
|---|---|---|
| Hero banner | `heroBanner` | `badge, title, subtitle, campusSize, statutoryRecognition, headquarters: string` |
| Fast facts | `fastFacts` | `FastFactItem[]` (`id, value, label, detail: string`) |
| Vice chancellor message | `viceChancellorMessage` | `heading, name, designation, quote: string`; `paragraphs: string[]` |
| Historical legacy | `historicalLegacy` | `HistoricalLegacyItem[]` (`id, year, title, description: string`) |
| Governance bodies | `governanceBodies` | `GovernanceBodyMember[]` (`id, name, body, role, designation: string`) |
| Core strategies | `coreStrategies` | `CoreStrategyItem[]` (`id, title, description: string`) |
| Campus masterplan | `campusMasterplan` | Not present in the current CMS store; API responds 404 and the section keeps its local mock content. |
| Statutory affiliations | `statutoryAffiliations` | Not present in the current CMS store; API responds 404 and the section keeps its local mock content. |
| Call to action | `callToAction` | Not present in the current CMS store; API responds 404 and the section keeps its local mock content. |

## Sports infrastructure

| Section | `section` | Response fields and types |
|---|---|---|
| Hero header | `heroHeader` | `badge, heading, subheading: string` |
| Facility selector | `facilitySelector` | `FacilityItem[]` (`id, name, category, surface, capacity, certification, lighting, bookingStatus, imageUrl: string`; `features: string[]`) |
| Track and field | `trackAndField` | `FacilityItem[]` (same schema as above; filter by category on render) |
| Aquatics complex | `aquaticsComplex` | `FacilityItem[]` (same schema as above; filter by category on render) |
| Sports facilities | `sportsFacilities` | `FacilityItem[]` (same schema as above) |
| Arena allocation | `arenaAllocation` | `universityStudents, affiliatedColleges, nationalFederations, bookingPortal: string` |
| Campus inspection | `campusInspection` | Not present in the current CMS store; API responds 404 and the section keeps its local mock content. |

## Research and labs

| Section | `section` | Response fields and types |
|---|---|---|
| Hero | `heroSection` | `tag, heading, subheading, grantSummary: string` |
| Sports stats | `sportsStats` | `ResearchMetricItem[]` (`id, label, value: string`) |
| Science laboratories | `scienceLaboratories` | `LaboratoryItem[]` (`id, code, name, category, lead, equipment, description, status: string`) |
| National research grants | `nationalResearchGrants` | `GrantItem[]` (`id, title, agency, amount, pi, status: string`) |
| Academic publications | `academicPublications` | Not present in the current CMS store; API responds 404 and the section keeps its local mock content. |
| Slot booking | `slotBooking` | Not present in the current CMS store; API responds 404 and the section keeps its local mock content. |
| Statutory compliance | `statutoryCompliance` | Not present in the current CMS store; API responds 404 and the section keeps its local mock content. |

For the available backend schemas, see `lib/cms-types.ts`. Unavailable keys need CMS records before those sections can render backend-managed content.
