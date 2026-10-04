export type Opportunity = {

  id: string;

  category: string;

  skill: string;

  initials: string;

  title: string;

  subtitle: string;

  description: string;

  requirements: string;

  date: string;

  time: string;

  location: string;

  color: string;

  url?: string;

  points?: number;

};

export const opportunities: Opportunity[] = [

  {

    id: "agriculture-norse-community-garden",

    category: "STEM",

    skill: "Agriculture",

    initials: "NG",

    title: "Norse Community Garden Club",

    subtitle: "Grow with us!",

    description: "We are looking for students to help plant, tend, and harvest our campus garden beds and donate the produce to the campus food pantry.",

    requirements: "No experience needed, just willingness to get your hands dirty",

    date: "Oct 20",

    time: "4:00 PM",

    location: "SC110",

    color: "from-emerald-300 to-green-500",

  },

  {

    id: "cad-3d-design-printing",

    category: "STEM",

    skill: "CAD Modeling",

    initials: "3D",

    title: "3D Design & Printing Club",

    subtitle: "Turn your ideas into real objects!",

    description: "Help us model and print custom parts for student projects across campus, from robot chassis to theatre props.",

    requirements: "Basic experience with any CAD software",

    date: "Oct 22",

    time: "6:00 PM",

    location: "GH150",

    color: "from-cyan-300 to-blue-500",

  },

  {

    id: "chemistry-dr-beakerman",

    category: "STEM",

    skill: "Chemistry",

    initials: "DB",

    title: "Dr. Beakerman",

    subtitle: "Undergraduate Lab Assistant Opportunity",

    description: "I am looking for a student to help prepare solutions and run experiments for my research on water-safe cleaning compounds.",

    requirements: "Completion of General Chemistry I and lab safety training",

    date: "Oct 27",

    time: "2:00 PM",

    location: "SC340",

    color: "from-violet-300 to-purple-600",

  },

  {

    id: "engineering-norse-engineering-society",

    category: "STEM",

    skill: "Engineering",

    initials: "NE",

    title: "Norse Engineering Society",

    subtitle: "Build a bridge that can hold a car!",

    description: "Join our team as we design, build, and test a model bridge for the regional student engineering competition.",

    requirements: "Interest in engineering and basic math skills",

    date: "Nov 3",

    time: "5:30 PM",

    location: "GH230",

    color: "from-amber-300 to-orange-500",

  },

  {

    id: "programming-riverfront-web-studio",

    category: "STEM",

    skill: "Programming",

    initials: "RW",

    title: "Riverfront Web Studio",

    subtitle: "Paid Student Developer Internship",

    description: "We are a local business looking for students to help build and maintain websites for small companies in Northern Kentucky.",

    requirements: "Knowledge of HTML, CSS, and JavaScript",

    date: "Oct 29",

    time: "1:00 PM",

    location: "GH305",

    color: "from-blue-300 to-indigo-600",

  },

  {

    id: "medicine-pre-med-society",

    category: "STEM",

    skill: "Medicine",

    initials: "PM",

    title: "Pre-Med Society",

    subtitle: "Shadow real healthcare professionals!",

    description: "We connect students with local doctors and nurses for shadowing days and host monthly talks on getting into medical school.",

    requirements: "Interest in a healthcare career",

    date: "Oct 21",

    time: "7:00 PM",

    location: "FH180",

    color: "from-rose-300 to-red-500",

  },

  {

    id: "biology-dr-finch",

    category: "STEM",

    skill: "Biology",

    initials: "DF",

    title: "Dr. Finch",

    subtitle: "Field Research Assistant Opportunity",

    description: "I am looking for students to help collect and catalog insect samples from local creeks for a study on stream health.",

    requirements: "Completion of an introductory biology course",

    date: "Oct 24",

    time: "9:00 AM",

    location: "SC204",

    color: "from-lime-300 to-emerald-500",

  },

  {

    id: "environmental-green-norse",

    category: "STEM",

    skill: "Environmental Science",

    initials: "GN",

    title: "Green Norse Initiative",

    subtitle: "Help make campus more sustainable!",

    description: "We are running a campus-wide recycling audit and need volunteers to collect data and present recommendations to the university.",

    requirements: "None, all majors welcome",

    date: "Nov 5",

    time: "4:30 PM",

    location: "SC120",

    color: "from-teal-300 to-emerald-600",

  },

  {

    id: "acting-black-box-players",

    category: "Arts",

    skill: "Acting",

    initials: "BB",

    title: "Black Box Players",

    subtitle: "Auditions for our fall one-act festival!",

    description: "We are casting 12 roles across four student-written plays. Come read a short scene with us, no monologue required.",

    requirements: "None, first-time actors welcome",

    date: "Oct 19",

    time: "6:00 PM",

    location: "FA101",

    color: "from-pink-300 to-rose-500",

  },

  {

    id: "music-norse-pep-band",

    category: "Arts",

    skill: "Music",

    initials: "NP",

    title: "Norse Pep Band",

    subtitle: "Play at home basketball games!",

    description: "We are looking for brass, woodwind, and percussion players to bring the energy to this season's home games.",

    requirements: "Ability to read music and your own instrument (percussion provided)",

    date: "Oct 26",

    time: "5:00 PM",

    location: "FA220",

    color: "from-yellow-300 to-amber-500",

  },

  {

    id: "illustrative-art-northern-sketch",

    category: "Arts",

    skill: "Illustrative Art",

    initials: "NS",

    title: "The Northern Sketch Magazine",

    subtitle: "Get your artwork published!",

    description: "Our student magazine needs illustrators to create cover art and story illustrations for the winter issue.",

    requirements: "A few samples of your drawing or digital art",

    date: "Oct 30",

    time: "3:30 PM",

    location: "FA315",

    color: "from-fuchsia-300 to-purple-600",

  },

  {

    id: "teaching-norse-tutoring",

    category: "Social",

    skill: "Teaching",

    initials: "NT",

    title: "Norse Tutoring Corps",

    subtitle: "Become a peer tutor!",

    description: "We are looking for students to tutor local middle schoolers in math and reading after school.",

    requirements: "3.0 GPA or higher and patience with younger students",

    date: "Oct 23",

    time: "3:00 PM",

    location: "MP200",

    color: "from-sky-300 to-blue-600",

  },

  {

    id: "business-entrepreneurship-club",

    category: "Social",

    skill: "Business",

    initials: "EC",

    title: "Entrepreneurship Club",

    subtitle: "Pitch your startup idea!",

    description: "Join us for our fall pitch night, where teams build a business plan and present it to local business owners for feedback and prizes.",

    requirements: "None, bring an idea or join a team",

    date: "Nov 4",

    time: "6:00 PM",

    location: "BC110",

    color: "from-yellow-300 to-orange-500",

  },

  {

    id: "finance-student-investment-group",

    category: "Social",

    skill: "Finance",

    initials: "SI",

    title: "Student Investment Group",

    subtitle: "Manage a real portfolio with us!",

    description: "We research stocks, debate picks, and vote on trades for our student-run investment fund.",

    requirements: "Basic understanding of personal finance or accounting",

    date: "Oct 28",

    time: "5:00 PM",

    location: "BC245",

    color: "from-emerald-300 to-teal-600",

  },

  {

    id: "law-mock-trial-team",

    category: "Social",

    skill: "Law",

    initials: "MT",

    title: "Mock Trial Team",

    subtitle: "Argue a case in court!",

    description: "We are recruiting attorneys and witnesses to compete in this year's regional mock trial tournament.",

    requirements: "Strong speaking skills and interest in law",

    date: "Oct 20",

    time: "7:00 PM",

    location: "FH310",

    color: "from-slate-300 to-slate-600",

  },

  {

    id: "political-science-model-un",

    category: "Social",

    skill: "Political Science",

    initials: "MU",

    title: "Model United Nations",

    subtitle: "Represent a country on the world stage!",

    description: "Join our delegation as we prepare to debate global issues at the spring conference.",

    requirements: "Interest in current events and world politics",

    date: "Nov 2",

    time: "6:30 PM",

    location: "FH225",

    color: "from-indigo-300 to-blue-600",

  },

  {

    id: "psychology-dr-mindwell",

    category: "Social",

    skill: "Psychology",

    initials: "DM",

    title: "Dr. Mindwell",

    subtitle: "Research Assistantship Opportunity",

    description: "I am looking for students to help run participant sessions and enter data for my study on sleep habits and memory in college students.",

    requirements: "Completion of Introduction to Psychology",

    date: "Oct 27",

    time: "11:00 AM",

    location: "MP340",

    color: "from-violet-300 to-indigo-600",

  },

  {

    id: "team-management-campus-events",

    category: "Leadership & Community",

    skill: "Team Management",

    initials: "CE",

    title: "Campus Events Board",

    subtitle: "Lead a team and plan a campus event!",

    description: "We need committee leads to organize volunteers, set schedules, and run our annual winter festival.",

    requirements: "Experience working on a team or leading a group project",

    date: "Oct 22",

    time: "4:00 PM",

    location: "SU302",

    color: "from-orange-300 to-red-500",

  },

  {

    id: "volunteering-norse-serve",

    category: "Leadership & Community",

    skill: "Volunteering",

    initials: "NS",

    title: "Norse Serve",

    subtitle: "Give back to Northern Kentucky!",

    description: "Join us for a Saturday of service packing meals at a local food bank. Transportation is provided.",

    requirements: "None, all students welcome",

    date: "Nov 7",

    time: "9:00 AM",

    location: "SU105",

    color: "from-green-300 to-emerald-600",

  },

  {

    id: "human-resources-tri-state-staffing",

    category: "Leadership & Community",

    skill: "Human Resources",

    initials: "TS",

    title: "Tri-State Staffing Solutions",

    subtitle: "Paid HR Internship Opportunity",

    description: "We are a local business looking for a student to help screen resumes, schedule interviews, and welcome new hires.",

    requirements: "Strong communication skills and interest in human resources",

    date: "Nov 6",

    time: "2:00 PM",

    location: "BC330",

    color: "from-cyan-300 to-sky-600",

  },

  {
    id: "agriculture-campus-food-forest",
    category: "STEM",
    skill: "Agriculture",
    initials: "FF",
    title: "Campus Food Forest Project",
    subtitle: "Help grow a more sustainable campus!",
    description: "Work with students and campus partners to plant native edible crops, maintain garden plots, and document seasonal harvests.",
    requirements: "Interest in plants, gardening, or sustainable food systems",
    date: "Nov 10",
    time: "4:00 PM",
    location: "SC115",
    color: "from-green-300 to-lime-600",
  },
  {
    id: "cad-maker-lab-design-team",
    category: "STEM",
    skill: "CAD Modeling",
    initials: "ML",
    title: "Maker Lab Design Team",
    subtitle: "Design the next campus prototype!",
    description: "Create 3D models for student inventions and campus projects while learning how designs move from a computer model to a physical prototype.",
    requirements: "Basic CAD experience and willingness to learn 3D printing",
    date: "Nov 12",
    time: "5:30 PM",
    location: "GH155",
    color: "from-cyan-300 to-sky-600",
  },
  {
    id: "chemistry-forensic-lab",
    category: "STEM",
    skill: "Chemistry",
    initials: "FL",
    title: "Forensic Chemistry Lab",
    subtitle: "Solve a mystery with chemistry!",
    description: "Assist with a student research demonstration using chemical analysis techniques to identify unknown substances and document results.",
    requirements: "General Chemistry I or equivalent laboratory experience",
    date: "Nov 14",
    time: "3:00 PM",
    location: "SC345",
    color: "from-purple-300 to-violet-600",
  },
  {
    id: "engineering-solar-car-team",
    category: "STEM",
    skill: "Engineering",
    initials: "SC",
    title: "Norse Solar Car Team",
    subtitle: "Build something that moves on sunshine!",
    description: "Join students designing and testing a small solar-powered vehicle for an intercollegiate engineering challenge.",
    requirements: "Interest in engineering, design, or hands-on building",
    date: "Nov 17",
    time: "6:00 PM",
    location: "GH235",
    color: "from-amber-300 to-yellow-600",
  },
  {
    id: "programming-campus-app-lab",
    category: "STEM",
    skill: "Programming",
    initials: "CA",
    title: "Campus App Lab",
    subtitle: "Build a tool students will actually use!",
    description: "Work with a small student development team to prototype web and mobile tools that solve everyday campus problems.",
    requirements: "Comfort with at least one programming language",
    date: "Nov 19",
    time: "5:00 PM",
    location: "GH310",
    color: "from-blue-300 to-indigo-600",
  },
  {
    id: "medicine-health-outreach",
    category: "STEM",
    skill: "Medicine",
    initials: "HO",
    title: "Community Health Outreach",
    subtitle: "Connect neighbors with health resources!",
    description: "Help organize educational outreach events focused on connecting local families with healthcare resources and wellness information.",
    requirements: "Interest in healthcare and strong communication skills",
    date: "Nov 21",
    time: "4:30 PM",
    location: "FH185",
    color: "from-rose-300 to-pink-600",
  },
  {
    id: "biology-wildlife-monitoring",
    category: "STEM",
    skill: "Biology",
    initials: "WM",
    title: "Kentucky Wildlife Monitoring",
    subtitle: "Study wildlife close to campus!",
    description: "Help collect observations and organize field data for a student project tracking local bird and small-animal populations.",
    requirements: "Introductory biology coursework and comfort working outdoors",
    date: "Nov 24",
    time: "8:30 AM",
    location: "SC210",
    color: "from-lime-300 to-green-600",
  },
  {
    id: "environmental-water-watch",
    category: "STEM",
    skill: "Environmental Science",
    initials: "WW",
    title: "Norse Water Watch",
    subtitle: "Help monitor local waterways!",
    description: "Collect and organize water-quality observations from local streams and help prepare a report on environmental conditions.",
    requirements: "Interest in environmental issues; training provided",
    date: "Nov 26",
    time: "4:00 PM",
    location: "SC125",
    color: "from-teal-300 to-cyan-600",
  },
  {
    id: "acting-student-film-casting",
    category: "Arts",
    skill: "Acting",
    initials: "SF",
    title: "Norse Student Film",
    subtitle: "Take a role behind the camera or in front of it!",
    description: "Audition for a short student film being produced by a campus creative team for the spring student film showcase.",
    requirements: "No previous film experience required",
    date: "Nov 11",
    time: "6:30 PM",
    location: "FA105",
    color: "from-pink-300 to-fuchsia-600",
  },
  {
    id: "music-recording-studio-crew",
    category: "Arts",
    skill: "Music",
    initials: "RS",
    title: "Campus Recording Studio Crew",
    subtitle: "Help bring student music to life!",
    description: "Assist student musicians with recording sessions, basic setup, and live sound for campus performances and projects.",
    requirements: "Ability to read music and interest in live or recorded performance",
    date: "Nov 13",
    time: "5:00 PM",
    location: "FA225",
    color: "from-yellow-300 to-orange-600",
  },
  {
    id: "illustrative-art-game-design",
    category: "Arts",
    skill: "Illustrative Art",
    initials: "GD",
    title: "Student Game Art Studio",
    subtitle: "Draw the world of a student-made game!",
    description: "Create characters, environments, and visual assets for a collaborative student game project.",
    requirements: "Portfolio or a few samples of traditional or digital artwork",
    date: "Nov 18",
    time: "4:00 PM",
    location: "FA320",
    color: "from-fuchsia-300 to-pink-600",
  },
  {
    id: "teaching-community-literacy",
    category: "Social",
    skill: "Teaching",
    initials: "CL",
    title: "Community Literacy Partners",
    subtitle: "Help a young reader build confidence!",
    description: "Tutor elementary students in reading and homework skills through an after-school community literacy program.",
    requirements: "Patience, reliability, and interest in working with children",
    date: "Nov 15",
    time: "3:30 PM",
    location: "MP205",
    color: "from-sky-300 to-cyan-600",
  },
  {
    id: "business-small-business-consulting",
    category: "Social",
    skill: "Business",
    initials: "SB",
    title: "Small Business Consulting Challenge",
    subtitle: "Help a local business solve a real problem!",
    description: "Student teams analyze a local business challenge and present practical recommendations to the owners at the end of the semester.",
    requirements: "Interest in business strategy and teamwork",
    date: "Nov 20",
    time: "6:00 PM",
    location: "BC115",
    color: "from-yellow-300 to-amber-600",
  },
  {
    id: "finance-financial-literacy-workshop",
    category: "Social",
    skill: "Finance",
    initials: "FW",
    title: "Student Financial Literacy Team",
    subtitle: "Help students make smarter money decisions!",
    description: "Develop and present workshops covering budgeting, credit, saving, and everyday financial decision-making for fellow students.",
    requirements: "Basic finance or accounting knowledge",
    date: "Nov 22",
    time: "5:30 PM",
    location: "BC250",
    color: "from-emerald-300 to-green-600",
  },
  {
    id: "law-legal-research-clinic",
    category: "Social",
    skill: "Law",
    initials: "LC",
    title: "Student Legal Research Clinic",
    subtitle: "Learn how legal research supports real cases!",
    description: "Assist a supervised student team with organizing legal research and preparing background materials for community education projects.",
    requirements: "Interest in law and strong reading or writing skills",
    date: "Nov 25",
    time: "6:00 PM",
    location: "FH315",
    color: "from-slate-300 to-gray-600",
  },
  {
    id: "political-science-public-policy-forum",
    category: "Social",
    skill: "Political Science",
    initials: "PF",
    title: "Public Policy Forum",
    subtitle: "Discuss the issues shaping our communities!",
    description: "Join student researchers preparing a campus forum on public policy, civic institutions, and current community challenges.",
    requirements: "Interest in government, public policy, or current events",
    date: "Nov 27",
    time: "6:30 PM",
    location: "FH230",
    color: "from-indigo-300 to-violet-600",
  },
  {
    id: "psychology-human-behavior-study",
    category: "Social",
    skill: "Psychology",
    initials: "HB",
    title: "Human Behavior Research Lab",
    subtitle: "Help study how students learn and focus!",
    description: "Assist with participant scheduling, survey administration, and data entry for a faculty study on attention and learning habits.",
    requirements: "Completion of Introduction to Psychology",
    date: "Nov 28",
    time: "11:30 AM",
    location: "MP345",
    color: "from-violet-300 to-purple-600",
  },
  {
    id: "team-management-student-leadership",
    category: "Leadership & Community",
    skill: "Team Management",
    initials: "SL",
    title: "Student Leadership Council",
    subtitle: "Turn student ideas into campus action!",
    description: "Help coordinate student initiatives, assign project teams, and keep campus improvement projects moving from ideas to execution.",
    requirements: "Experience leading a team, club, or group project",
    date: "Dec 1",
    time: "5:00 PM",
    location: "SU305",
    color: "from-orange-300 to-amber-600",
  },
  {
    id: "volunteering-holiday-service-drive",
    category: "Leadership & Community",
    skill: "Volunteering",
    initials: "HS",
    title: "Holiday Service Drive",
    subtitle: "Make the season brighter for local families!",
    description: "Help sort donations, assemble care packages, and coordinate deliveries with a Northern Kentucky community partner.",
    requirements: "None, all students welcome",
    date: "Dec 3",
    time: "4:00 PM",
    location: "SU110",
    color: "from-green-300 to-emerald-600",
  },
  {
    id: "human-resources-student-recruiting",
    category: "Leadership & Community",
    skill: "Human Resources",
    initials: "SR",
    title: "Student Recruiting Assistant",
    subtitle: "Help build the next student team!",
    description: "Support a campus employer with candidate outreach, interview scheduling, event coordination, and onboarding preparation.",
    requirements: "Strong communication skills and interest in recruiting or HR",
    date: "Dec 4",
    time: "2:30 PM",
    location: "BC335",
    color: "from-cyan-300 to-blue-600",
  },

];

export default opportunities;
