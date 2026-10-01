// app/constants.ts
// ─────────────────────────────────────────────────────────────
// Edit this file to update school details, public copy, media and demo records.
// UI state, calculations and event handling stay in the app components.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  motto: "God The Beginning And The End",
  name: "All Saints Christian School",
  shortName: "All Saints",
  logoAlt: "All Saints Christian School logo",
  description: "Kyebando, Northern Bypass, Kampala",
  logos: {
    header: "/assets/images/logo/logo2.png",
    footer: "/assets/images/logo/logo1.png",
    icon: "/assets/images/logo/logo2.png",
  },
  estYear: 1998,

  unebCenterNo: "00/0000/L",
  location: "Kyebando, Northern Bypass, Kampala",

  phones: ["+256 700 000 000", "+256 770 000 000"],
  email: "info@allsaints.ac.ug",
  whatsappNumber: "256700000000",

  admissionLetterLabel: "Admission Letter",
  applyButtonLabel: "Apply Now",

  heroTitle: "Nurturing Faith, Knowledge & Character",
  heroSubtitle:
    "All Saints Christian School is a Christian-based nursery and primary school committed to academic excellence, moral integrity, and service to community.",

  stats: [
    { value: 1200, suffix: "+", label: "Students" },
    { value: 80, suffix: "+", label: "Staff" },
    { value: 98, suffix: "%", label: "UNEB Pass Rate" },
    { value: 25, suffix: "+", label: "Years Serving" },
  ],

  heroSlides: [
    "/assets/images/carousel/image_01.jpg",
    "/assets/images/carousel/image_02.jpg",
    "/assets/images/carousel/image_03.jpg",
  ],
};

export const CONTACT = {
  lat: 0.3536469423912334,
  lng: 32.58618489444915,
  zoom: 15,
  addressLine: "Plot 12, Kyebando Ring Road, Northern Bypass, Kampala, Uganda",
  officeHours: [
    { day: "Mon – Fri", hours: "8:00 AM – 5:00 PM" },
    { day: "Saturday", hours: "9:00 AM – 1:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],
};

export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin",
};

export const ADMIN = [
  { name: "Mr. Samuel Okello", role: "Head Teacher", initials: "SO", image: "/assets/images/leadership/image_01.svg" },
  { name: "Mrs. Grace Nabirye", role: "Deputy Head Teacher", initials: "GN", image: "/assets/images/leadership/image_02.svg" },
  { name: "Mr. Daniel Ssekandi", role: "Director of Studies", initials: "DS", image: "/assets/images/leadership/image_03.svg" },
  { name: "Ms. Ruth Achieng", role: "Dean of Students", initials: "RA", image: "/assets/images/leadership/image_04.svg" },
];

export const SCHOOL_PREFECTS = [
  { name: "Michael Kato", role: "Head Prefect", grade: "Grade 7", image: "/assets/images/gallery/debate/image_01.jpg" },
  { name: "Esther Namuli", role: "Deputy Head Prefect", grade: "Grade 7", image: "/assets/images/gallery/clubs/image_01.jpg" },
  { name: "Brian Mugisha", role: "Academic Prefect", grade: "Grade 6", image: "/assets/images/gallery/classrooms/image_02.jpg" },
  { name: "Cynthia Auma", role: "Welfare Prefect", grade: "Grade 6", image: "/assets/images/gallery/sports-day/image_01.jpg" },
];

export const STUDENT_AWARDS = [
  { name: "Faith Namutebi", award: "Smartest Student", image: "/assets/images/gallery/classrooms/image_01.jpg" },
  { name: "Brian Ochieng", award: "Fluent in English", image: "/assets/images/gallery/clubs/image_02.jpg" },
  { name: "Mary Katushabe", award: "Best Prefect", image: "/assets/images/gallery/debate/image_01.jpg" },
  { name: "Joseph Kibirige", award: "Most Active", image: "/assets/images/gallery/sports-day/image_02.jpg" },
];

export const PERFORMANCE_SPOTLIGHT = [
  { name: "Faith Namutebi", className: "Primary 7", grade: "Grade 7", image: "/assets/images/gallery/classrooms/image_01.jpg" },
  { name: "Brian Ochieng", className: "Primary 7", grade: "Grade 7", image: "/assets/images/gallery/classrooms/image_02.jpg" },
  { name: "Mary Katushabe", className: "Primary 7", grade: "Grade 7", image: "/assets/images/gallery/classrooms/image_03.jpg" },
  { name: "Joseph Kibirige", className: "Primary 6", grade: "Grade 6", image: "/assets/images/gallery/clubs/image_01.jpg" },
  { name: "Sharon Mutesa", className: "Primary 6", grade: "Grade 6", image: "/assets/images/gallery/clubs/image_02.jpg" },
  { name: "Daniel Ssemujju", className: "Primary 6", grade: "Grade 6", image: "/assets/images/gallery/clubs/image_03.jpg" },
  { name: "Patricia Nakalema", className: "Primary 5", grade: "Grade 5", image: "/assets/images/gallery/debate/image_01.jpg" },
  { name: "Isaac Kayiwa", className: "Primary 5", grade: "Grade 5", image: "/assets/images/gallery/sports-day/image_01.jpg" },
];

export const NOTICES = [
  {
    date: "12 Sep 2026",
    tag: "Admissions",
    title: "Applications for 2027-28 are now open",
    body: "Submit your application online or collect a form from the administration office.",
  },
  {
    date: "05 Sep 2026",
    tag: "Event",
    title: "Annual Parents' Day",
    body: "Join us on 30th September for a showcase of student projects and performances.",
  },
  {
    date: "28 Aug 2026",
    tag: "Academic",
    title: "End of Term Examinations",
    body: "Exams begin 15th October. Revision timetables are available at the NoticeBoard.",
  },
];

export const DASHBOARD_STUDENTS = [
  { id: "STU-001", name: "Alice Nakato", class: "P.7", stream: "Blue", guardian: "Mr. Nakato", status: "Active" },
  { id: "STU-002", name: "Brian Mugisha", class: "P.7", stream: "Gold", guardian: "Mrs. Mugisha", status: "Active" },
  { id: "STU-003", name: "Cynthia Auma", class: "P.7", stream: "Red", guardian: "Mr. Auma", status: "Active" },
  { id: "STU-004", name: "David Kato", class: "P.7", stream: "Blue", guardian: "Dr. Kato", status: "Active" },
  { id: "STU-005", name: "Esther Namuli", class: "P.7", stream: "Green", guardian: "Mrs. Namuli", status: "Pending" },
  { id: "STU-006", name: "Frank Ochieng", class: "P.7", stream: "Blue", guardian: "Mr. Ochieng", status: "Active" },
];

export const DASHBOARD_STAFF = [
  { id: "STF-001", name: "Mr. Samuel Okello", role: "Head Teacher", dept: "Administration", phone: "+256 700 000 001" },
  { id: "STF-002", name: "Mrs. Grace Nabirye", role: "Deputy Head", dept: "Administration", phone: "+256 700 000 002" },
  { id: "STF-003", name: "Mr. Daniel Ssekandi", role: "DoS", dept: "Academics", phone: "+256 700 000 003" },
  { id: "STF-004", name: "Ms. Ruth Achieng", role: "Dean of Students", dept: "Welfare", phone: "+256 700 000 004" },
];

export const DASHBOARD_FINANCE = [
  { id: "INV-1042", student: "Alice Nakato", amount: 850000, status: "Paid", date: "02 Sep 2026" },
  { id: "INV-1043", student: "Brian Mugisha", amount: 850000, status: "Partial", date: "05 Sep 2026" },
  { id: "INV-1044", student: "Cynthia Auma", amount: 750000, status: "Pending", date: "09 Sep 2026" },
  { id: "INV-1045", student: "David Kato", amount: 950000, status: "Paid", date: "11 Sep 2026" },
];

export const DASHBOARD_EVENTS = [
  { date: "28 Sep 2026", title: "Staff Meeting", time: "09:00" },
  { date: "30 Sep 2026", title: "Parents' Day", time: "10:00" },
  { date: "05 Oct 2026", title: "Mid-Term Exams Begin", time: "08:00" },
  { date: "15 Oct 2026", title: "End of Term Exams", time: "08:00" },
];

export const GALLERY = [
  {
    id: "class-room",
    category: "Curricular",
    title: "Class Rooms",
    description: "Class organization and pupil focus.",
    images: [1, 2, 3].map((number) => `/assets/images/gallery/classrooms/image_${String(number).padStart(2, "0")}.jpg`),
  },
  {
    id: "library",
    category: "Curricular",
    title: "Library",
    description: "Quiet space for study, research and reading.",
    images: [1, 2, 3].map((number) => `/assets/images/gallery/library/image_${String(number).padStart(2, "0")}.jpg`),
  },
  {
    id: "sports-day",
    category: "Co-curricular",
    title: "Sports Day",
    description: "Annual inter-house athletics and team sports.",
    images: [1, 2, 3].map((number) => `/assets/images/gallery/sports-day/image_${String(number).padStart(2, "0")}.jpg`),
  },
  {
    id: "chapel",
    category: "Co-curricular",
    title: "Chapel",
    description: "Daily devotion and Sunday service.",
    images: [1, 2, 3].map((number) => `/assets/images/gallery/chapel/image_${String(number).padStart(2, "0")}.jpg`),
  },
  {
    id: "computer-lab",
    category: "Curricular",
    title: "Computer Lab",
    description: "ICT training and coding club.",
    images: [1, 2, 3].map((number) => `/assets/images/gallery/computer-lab/image_${String(number).padStart(2, "0")}.jpg`),
  },
  {
    id: "graduation",
    category: "Curricular",
    title: "Graduation",
    description: "Celebrating our graduates and their journey.",
    images: [1, 2, 3].map((number) => `/assets/images/gallery/graduation/image_${String(number).padStart(2, "0")}.jpg`),
  },
  {
    id: "music-and-drama",
    category: "Co-curricular",
    title: "Music & Drama",
    description: "Student performances, choir, dance and theatre activities.",
    images: [1, 2, 3].map((number) => `/assets/images/gallery/music-and-drama/image_${String(number).padStart(2, "0")}.jpg`),
  },
  {
    id: "debate",
    category: "Co-curricular",
    title: "Debate & Public Speaking",
    description: "Learners build confidence through debate and public speaking.",
    images: [1, 2, 3].map((number) => `/assets/images/gallery/debate/image_${String(number).padStart(2, "0")}.jpg`),
  },
  {
    id: "clubs",
    category: "Co-curricular",
    title: "Student Clubs",
    description: "Clubs provide space to explore interests and learn together.",
    images: [1, 2, 3].map((number) => `/assets/images/gallery/clubs/image_${String(number).padStart(2, "0")}.jpg`),
  },
];

export const PUBLIC_NAV_GROUPS = [
  {
    label: "Administration",
    links: [
      { label: "Leaderboard", href: "/administration/leaderboard" },
      { label: "Noticeboard", href: "/administration/noticeboard" },
      { label: "Board of Governance", href: "/administration/board-of-governance" },
    ],
  },
  {
    label: "Academics",
    links: [
      { label: "Performance", href: "/academics/performance" },
      { label: "Academic Calendar", href: "/academics/academic-calendar" },
      { label: "Rules & Regulations", href: "/academics/rules-and-regulations" },
    ],
  },
  {
    label: "Admissions",
    links: [
      { label: "Apply Now", href: "/admissions/apply-now" },
      { label: "Download Form", href: "/admissions/download-form" },
      { label: "Fees Structure", href: "/admissions/fees-structure" },
    ],
  },
] as const;

export const PUBLIC_COPY = {
  loading: "Loading…",
  lightbox: {
    close: "Close",
    previous: "Previous",
    next: "Next",
  },
  navigation: {
    mainLabel: "Main navigation",
    mobileLabel: "Mobile navigation",
    home: "Home",
    gallery: "Gallery",
    contact: "Contact Us",
    portal: "Portal",
    portalLogin: "Portal Login",
    downloadForm: "Download Form",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
  },
  hero: {
    location: "Kampala, Uganda",
    teamButton: "Meet Our Team",
    scrollToStudents: "Scroll to student highlights",
    scrollDown: "Scroll down",
  },
  home: {
    studentAwards: {
      eyebrow: "Celebrating character",
      title: "Students of the Week",
      description: "Recognising curiosity, confidence, leadership, and the everyday effort that makes our school shine.",
    },
    performance: {
      eyebrow: "Academics",
      title: "Best Performing Students",
      description: "Celebrating learners who show focus, consistency, and excellence in the classroom.",
    },
    leadership: {
      eyebrow: "Administration",
      title: "Leadership Team",
    },
    gallery: {
      eyebrow: "Gallery",
      titlePrefix: "Life at",
      description: "Click any card to open the full gallery; use arrow keys or the close button to navigate.",
      viewAll: "View full gallery",
    },
    noticeboard: {
      eyebrow: "Noticeboard",
      title: "Latest Announcements",
    },
    contact: {
      eyebrow: "Contact Us",
      title: "Get in Touch",
      description: "Visit the school, give us a call, or send an email. We’re happy to help.",
      address: "Address",
      phone: "Phone",
      email: "Email",
      officeHours: "Office Hours",
      mapTitle: "School location",
    },
    admissionLetter: {
      eyebrow: "Admissions",
      title: "Download the Admission Letter",
      description: "Get the official admission letter containing requirements, fees structure, and reporting dates for the upcoming term.",
      requirements: "Requirements",
      requiredDocuments: [
        "PLE Results Slip",
        "Birth Certificate",
        "Passport Photos (4)",
        "Recommendation Letter",
        "Application Fee Receipt",
      ],
    },
    apply: {
      titlePrefix: "Ready to Join",
      description: "Applications are now open. Secure your place today and start your journey with All Saints Christian School.",
      startButton: "Start Application",
      contactButton: "Contact Admissions",
    },
  },
  contactPage: {
    eyebrow: "Get in touch",
    title: "Contact Us",
    description: "Our school office can help with admissions, school visits, and general enquiries.",
    visit: "Visit",
    call: "Call",
    email: "Email",
    officeHours: "Office Hours",
    mapTitle: "All Saints Christian School location",
  },
  galleryPage: {
    eyebrow: "Gallery",
    title: "Life at All Saints Christian School",
    description: "Explore learning, productive environment, and co-curricular activities across our school community.",
  },
  gallery: {
    allFilter: "All",
    filterGroup: "Filter gallery",
    imageCount: "Image",
    dialogSuffix: "gallery",
    imageAltPrefix: "image",
    close: "Close gallery",
    previous: "Previous image",
    next: "Next image",
    showImage: "Show image",
  },
  recommendationsPage: {
    eyebrow: "Student & family support",
    title: "Recommendations",
    description: "A few practical ways learners and families can make the most of the school year.",
  },
  recommendations: {
    eyebrow: "Recommendations",
    title: "Guidance for a strong school year",
    items: [
      {
        number: "01",
        title: "Build steady study habits",
        body: "Set aside regular time for revision, ask teachers for help early, and keep a simple record of topics that need more practice.",
      },
      {
        number: "02",
        title: "Explore co-curricular life",
        body: "Choose an activity that sparks curiosity. Participation in clubs, sport, music, and service helps learners develop confidence and teamwork.",
      },
      {
        number: "03",
        title: "Stay connected with school",
        body: "Families are encouraged to keep in touch with teachers and attend school meetings to support progress throughout the year.",
      },
    ],
  },
  applicationForm: {
    eyebrow: "Admissions · 2027–28",
    title: "Application request",
    description: "Share a few details and we’ll prepare your request to the admissions office.",
    fields: {
      studentName: "Student full name",
      dateOfBirth: "Date of birth",
      grade: "Grade applying for",
      selectGrade: "Select a grade",
      guardianName: "Parent/guardian name",
      email: "Email address",
      phone: "Phone number",
      message: "Anything else we should know?",
    },
    grades: ["Nursery", "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6", "Primary 7"],
    emailBodyLabels: {
      studentName: "Student name",
      dateOfBirth: "Date of birth",
      grade: "Grade applying for",
      guardianName: "Parent/guardian",
      email: "Email",
      phone: "Phone",
      message: "Additional information",
      noMessage: "None",
    },
    emailSubject: "Application request for",
    submit: "Prepare request",
    submitted: "Your email app should open with the request filled in. Review it and send the message to complete your request.",
  },
  footer: {
    description: "A Christian-based secondary school in Kampala committed to nurturing faith, knowledge, and character in every student.",
    exploreTitle: "Explore",
    admissionsTitle: "Admissions",
    exploreLinks: [
      { label: "Home", href: "/" },
      { label: "Gallery", href: "/gallery" },
      { label: "Recommendations", href: "/recommendations" },
      { label: "Contact Us", href: "/contact-us" },
    ],
    admissionsLinks: [
      { label: "Apply Now", href: "/admissions/apply-now" },
      { label: "Download Form", href: "/admissions/download-form" },
      { label: "Fees Structure", href: "/admissions/fees-structure" },
      { label: "Academic Calendar", href: "/academics/academic-calendar" },
    ],
    socialLinks: [
      { label: "Facebook", href: "https://facebook.com/allsaintsacademy", icon: "Globe" },
      { label: "Instagram", href: "https://instagram.com/allsaintsacademy", icon: "Camera" },
      { label: "TikTok", href: "https://www.tiktok.com/@allsaintsacademy", icon: "Music2" },
      { label: "YouTube", href: "https://youtube.com/@allsaintsacademy", icon: "Play" },
    ],
    whatsappLabel: "Chat on WhatsApp",
    whatsappMessage: "Hello All Saints Christian Academy, I would like to chat with your customer care team.",
    rightsReserved: "All rights reserved.",
  },
  page: {
    topPerformer: "Top performer",
    subject: "Subject",
    grade: "Grade",
    learningTitle: "Learning through the years",
    learningDescription: "Learners are supported through structured teaching, regular assessment, and guidance from subject teachers. Families can contact the school office for current examination results and subject-specific information.",
    gettingStarted: "Getting started",
    downloadFormDescription: "The application form is available as a local download. Complete all sections and attach the requested supporting documents.",
    downloadApplicationForm: "Download Application Form",
    feeItem: "Fee item",
    feeDetails: "Details",
    feeRates: "Contact the office for current rates",
    askAdmissions: "Ask Admissions",
    callAdmissions: "Call admissions for the approved schedule",
    leadershipEyebrow: "Our leadership",
    leadershipTitle: "Administration",
    prefectsEyebrow: "Student leadership",
    prefectsTitle: "School Prefects",
    awardsEyebrow: "This week at All Saints",
    awardsTitle: "Awarded Students",
    contactSchool: "Contact the school",
    boardDescription: "The Board of Governance works with school leadership on strategic direction, accountability, and a supportive learning environment.",
    boardDetailsSuffix: "details to be confirmed",
  },
  recognition: {
    studentPhotoAlt: "at school",
    weeklyAward: "Weekly award",
    studentOfTheWeek: "Student of the week",
  },
};

export const PUBLIC_PAGE_METADATA: Record<string, Record<string, { title: string; eyebrow: string; description: string }>> = {
  academics: {
    performance: {
      title: "Academic Performance",
      eyebrow: "Academics",
      description: "A commitment to strong learning outcomes, steady progress, and preparation for each learner’s next step.",
    },
    "academic-calendar": {
      title: "Academic Calendar",
      eyebrow: "Academics",
      description: "Key dates and school events for the current academic term.",
    },
    "rules-and-regulations": {
      title: "Rules & Regulations",
      eyebrow: "Academics",
      description: "Shared expectations that support a safe, respectful, and focused school community.",
    },
  },
  admissions: {
    "apply-now": {
      title: "Apply to All Saints Christian School",
      eyebrow: "Admissions",
      description: "Begin an application for the 2027–28 academic year or speak with the admissions office for guidance.",
    },
    "download-form": {
      title: "Admission Application Form",
      eyebrow: "Admissions",
      description: "Download the application form and submit the completed copy to the school administration office.",
    },
    "fees-structure": {
      title: "Fees Structure",
      eyebrow: "Admissions",
      description: "Contact the school for the current approved fee schedule and payment guidance.",
    },
  },
  administration: {
    leaderboard: {
      title: "School Leadership",
      eyebrow: "Administration",
      description: "Meet the school leaders guiding academic, pastoral, and day-to-day school life.",
    },
    noticeboard: {
      title: "School Noticeboard",
      eyebrow: "Administration",
      description: "Updates and important dates for learners, families, and the wider school community.",
    },
    "board-of-governance": {
      title: "Board of Governance",
      eyebrow: "Administration",
      description: "The board provides strategic oversight and supports the long-term stewardship of the school.",
    },
  },
};

export const PERFORMANCE_HIGHLIGHTS = [
  { student: "Faith Namutebi", subject: "Science, English, SST & Maths", grade: "1st", remark: "Disciplined Student" },
  { student: "Joseph Kibirige", subject: "Science, English, SST & Maths", grade: "1st", remark: "Strong focus in class" },
  { student: "Lilian Atim", subject: "Science, English, SST & Maths", grade: "1st", remark: "Outstanding problem-solving skills" },
  { student: "Ruth Nansubuga", subject: "Science, English, SST & Maths", grade: "1st", remark: "Consistent top marks in science subject" },
];

export const ACADEMIC_RULES = [
  { title: "Respect", body: "Treat learners, staff, and visitors with courtesy. Bullying, harassment, and discrimination are not accepted." },
  { title: "Learning", body: "Attend lessons punctually, come prepared, and complete assigned work to the best of your ability." },
  { title: "Care", body: "Keep classrooms and shared spaces clean, and handle school property responsibly." },
  { title: "Community", body: "Follow staff guidance, observe school procedures, and represent the school positively." },
];

export const APPLICATION_STEPS = [
  "Tell us about the student",
  "Share parent or guardian contact details",
  "Send your request to admissions",
];

export const FEE_ITEMS = ["Tuition", "Boarding", "Meals", "Learning materials", "Activities"];

export const GOVERNANCE_ROLES = [
  { title: "Board Chairperson", description: "Chairperson" },
  { title: "Deputy Chairperson", description: "Deputy Chairperson" },
  { title: "Secretary", description: "Secretary" },
  { title: "Board Member", description: "Member" },
];

export const PORTAL_COPY = {
  backToSite: "Back to site",
  title: "Admin Portal",
  username: "Username",
  password: "Password",
  passwordPlaceholder: "••••••••",
  showPassword: "Show",
  hidePassword: "Hide",
  invalidCredentials: "Invalid username or password.",
  signingIn: "Signing in…",
  signIn: "Sign In",
  defaultCredentials: "Default credentials:",
};

export const DASHBOARD_NAV_ITEMS = [
  { key: "overview", label: "Overview" },
  { key: "students", label: "Students" },
  { key: "staff", label: "Staff" },
  { key: "finance", label: "Finance" },
  { key: "events", label: "Events" },
  { key: "notices", label: "NoticeBoard" },
  { key: "settings", label: "Settings" },
] as const;

export const DASHBOARD_COPY = {
  adminLabel: "Admin",
  signOut: "Sign Out",
  searchPlaceholder: "Search…",
  breadcrumbPrefix: "Dashboard",
  themeOptions: [
    { key: "light", label: "Light" },
    { key: "dark", label: "Dark" },
    { key: "system", label: "System" },
  ] as const,
  overview: {
    students: "Students",
    staff: "Staff",
    paidRevenue: "Revenue (Paid)",
    upcomingEvents: "Upcoming Events",
    recentFinance: "Recent Finance Activity",
    viewAll: "View all →",
    all: "All →",
    invoice: "Invoice",
    student: "Student",
    amount: "Amount",
    status: "Status",
  },
  students: {
    description: "Manage enrolled students",
    addAction: "+ Add Student",
    headers: ["ID", "Name", "Class", "Stream", "Guardian", "Status"],
  },
  staff: {
    description: "Teaching and non-teaching staff",
    addAction: "+ Add Staff",
    headers: ["ID", "Name", "Role", "Department", "Phone"],
  },
  finance: {
    description: "Invoices, payments and balances",
    addAction: "+ New Invoice",
    totalBilled: "Total Billed",
    collected: "Collected",
    outstanding: "Outstanding",
    headers: ["Invoice", "Student", "Amount", "Date", "Status"],
  },
  events: {
    description: "School calendar",
    addAction: "+ Add Event",
  },
  notices: {
    description: "Publish announcements",
    addAction: "+ New Notice",
  },
  settings: {
    description: "Preferences and configuration",
    appearance: "Appearance",
    appearanceDescription: "Choose light, dark, or match your system.",
    schoolInfo: "School Info",
    constantsDescription: "Values are read from",
    fields: {
      name: "Name",
      unebCenter: "UNEB Center",
      email: "Email",
      phone: "Phone",
    },
  },
};

export const SCHOOL_STORY = [
  {
    chapter: "The beginning",
    year: "1998",
    title: "A beginning rooted in purpose",
    description:
      "All Saints Christian School began with a clear conviction: a child’s education should shape both the mind and the heart. From the start, Christian faith, strong learning, and care for the wider community have belonged together.",
    image: "/assets/images/gallery/classrooms/image_01.jpg",
    imageAlt: "Pupils learning together in a classroom",
  },
  {
    chapter: "Growing together",
    year: "Over the years",
    title: "Growing alongside Kampala families",
    description:
      "As families brought more children to All Saints, the school grew into a nursery and primary community. Each new learner brought fresh questions, energy, and responsibility: to make room for curiosity, build confidence, and help every child find a path to thrive.",
    image: "/assets/images/gallery/library/image_02.jpg",
    imageAlt: "A quiet school library for reading and discovery",
  },
  {
    chapter: "The work behind growth",
    year: "Every generation",
    title: "Meeting change with steady care",
    description:
      "A growing school must keep high expectations while recognizing that children learn in different ways and at different paces. That work is never finished. Teachers, families, and staff meet the challenge through daily encouragement, consistent guidance, and attention to each learner’s character as well as progress.",
    image: "/assets/images/gallery/sports-day/image_03.jpg",
    imageAlt: "Pupils building confidence and teamwork at school",
  },
  {
    chapter: "Today and ahead",
    year: "Today",
    title: "A community still becoming",
    description:
      "Today, All Saints continues to bring faith, learning, and service into everyday school life. Its published school profile reflects a community of more than 1,200 learners and over 80 staff, with a stated 98% UNEB pass rate. The next chapter is to keep helping young people grow into capable, compassionate leaders.",
    image: "/assets/images/gallery/graduation/image_01.jpg",
    imageAlt: "A school graduation celebration",
  },
] as const;