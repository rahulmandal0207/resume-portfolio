import {
  Certificate,
  Profile,
  Project,
  SkillGroup,
  TimelineEntry,
} from './portfolio.models';

/* ------------------------------------------------------------------ *
 *  All site content lives in this file.
 *  To add something, append an object to the right array — the page
 *  sorts, numbers and animates it automatically.
 * ------------------------------------------------------------------ */

export const profile: Profile = {
  name: 'Rahul Kumar Mandal',
  handle: 'rahul-mandal',
  role: 'Full Stack Developer',
  tagline:
    'I build web applications with .NET, Angular and SQL Server, and computer-vision systems in Python.',
  about: [
    'I am a software engineer at Eudemonic Technologies, where I work with .NET, Angular and SQL Server. I hold a Master of Computer Applications from GD Goenka University, and before this role I built web applications end to end across two internships and several university projects.',
    'Alongside web work I build computer-vision projects in Python: a driver fatigue detector and a number-plate recognition system, both using OpenCV.',
  ],
  email: 'rahulkumar397222@gmail.com',
  github: 'rahulmandal0207',
  linkedin: 'rahurahul-mandal-462a78360',
  headlineStack: ['.NET Core', 'Angular', 'SQL Server', 'Python', 'OpenCV'],
  // resumeUrl: 'resume.pdf',
};

/**
 * Work experience AND education, in any order.
 * The Journey section merges them into one timeline sorted by `start`.
 *
 * To add a school, job or degree, copy this template:
 *
 *   {
 *     id: 'school-12th',              // any unique text
 *     kind: 'education',              // 'work' or 'education'
 *     title: 'Senior Secondary (Class XII)',
 *     org: 'Your School Name',
 *     location: 'City, State',
 *     start: '2018',                  // 'YYYY' or 'YYYY-MM'
 *     end: '2020',                    // leave out if ongoing
 *     summary: 'Optional one-line summary.',
 *     highlights: ['Optional bullet', 'Another bullet'],
 *     tags: ['Optional', 'Tags'],
 *     links: [{ label: 'Code', url: 'https://…', icon: 'github' }],
 *   },
 */
export const timeline: TimelineEntry[] = [
  {
    id: 'eudemonic-software-engineer',
    kind: 'work',
    title: 'Software Engineer',
    org: 'Eudemonic Technologies Pvt. Ltd.',
    // location: 'City, State',
    start: '2025-09',
    // No `end`, so this shows as "Present".
    // highlights: ['What you built', 'What changed because of it'],
    tags: ['.NET', 'Angular', 'SQL Server'],
  },
  {
    id: 'gd-goenka-mca',
    kind: 'education',
    title: 'Master of Computer Applications (MCA)',
    org: 'GD Goenka University',
    location: 'Gurugram, Haryana',
    start: '2023',
    end: '2025',
    highlights: [
      'Major project: Driver Surveillance System, a real-time driver fatigue detector.',
      'Minor project: Vehicle Registration Plate Recognition with YOLO and EasyOCR.',
    ],
    tags: ['Python', 'OpenCV', 'Computer Vision'],
  },
  {
    id: 'webaikon-intern',
    kind: 'work',
    title: '.NET Developer Intern',
    org: 'Webaikon Infotech',
    location: 'Bokaro, Jharkhand',
    start: '2022-11',
    end: '2023-03',
    highlights: [
      'Built a web interface in Angular that drew 100+ unique users and 20+ positive usability ratings.',
      'Engineered a database management system in SQL Server, keeping data consistent across 1,000+ records.',
      'Set up data protocols that improved accuracy by 15% across multiple departments.',
    ],
    tags: ['.NET', 'Angular', 'SQL Server'],
    links: [
      {
        label: 'School ERP',
        url: 'https://github.com/rahulmandal0207/School_ERP',
        icon: 'github',
      },
    ],
  },
  {
    id: 'ardent-intern',
    kind: 'work',
    title: 'Junior Web Developer Intern',
    org: 'Ardent Computech Pvt. Ltd.',
    location: 'Kolkata, West Bengal',
    start: '2022-03',
    end: '2022-06',
    highlights: [
      'Streamlined key functions, cutting load time by 15%.',
      'Worked with the team to improve interface elements across multiple devices.',
    ],
    links: [
      {
        label: 'Insurance Management System',
        url: 'https://github.com/rahulmandal0207/ims',
        icon: 'github',
      },
    ],
  },
  {
    id: 'bbmku-bca',
    kind: 'education',
    title: 'Bachelor of Computer Applications (BCA)',
    org: 'BBMKU',
    location: 'Dhanbad, Jharkhand',
    start: '2020',
    end: '2023',
    highlights: [
      'Major project: BCA Management System built with Angular, ASP.NET and SQL Server.',
    ],
    tags: ['Angular', 'ASP.NET', 'SQL Server'],
  },
];

export const projects: Project[] = [
  {
    id: 'dss',
    title: 'Driver Surveillance System',
    kind: 'Major project',
    context: 'GD Goenka University',
    start: '2025-02',
    end: '2025-04',
    description:
      'Detects signs of driver fatigue from a live camera feed. The core detection logic is written in Python with OpenCV and MediaPipe. Built with a team of five using Git and GitHub.',
    stack: ['Python', 'OpenCV', 'MediaPipe'],
    repo: 'https://github.com/rahulmandal0207/DSS_backend',
    demo: 'https://rahulmandal0207.github.io/DSS_backend/',
    featured: true,
  },
  {
    id: 'vrpr',
    title: 'Vehicle Registration Plate Recognition',
    kind: 'Minor project',
    context: 'GD Goenka University',
    start: '2024-01',
    end: '2024-04',
    description:
      'Detects and reads vehicle number plates from live camera feeds, video files and images. YOLO locates the plate, EasyOCR extracts the text and OpenCV handles frame processing.',
    stack: ['Python', 'OpenCV', 'YOLO', 'EasyOCR'],
    repo: 'https://github.com/rahulmandal0207/vrpr',
    demo: 'https://vrprdemo.streamlit.app/',
    featured: true,
  },
  {
    id: 'bca-management',
    title: 'BCA Management System',
    kind: 'Major project',
    context: 'BBMKU',
    start: '2023-04',
    end: '2023-07',
    description:
      'Web application for managing student data, academic records and course registrations. Includes role-based access control, tested against 1,000+ mock records with up to 40% faster data retrieval.',
    stack: ['Angular', 'ASP.NET', 'SQL Server'],
    repo: 'https://github.com/rahulmandal0207/BCA_Department',
  },
  {
    id: 'school-erp',
    title: 'School ERP',
    kind: 'Internship project',
    context: 'Webaikon Infotech',
    start: '2022-12',
    end: '2023-03',
    description:
      'School management web application built in Angular. Responsive frontend work improved page load speed by 15% and made the interface easier to use.',
    stack: ['Angular', 'TypeScript'],
    repo: 'https://github.com/rahulmandal0207/School_ERP',
  },
  {
    id: 'todo',
    title: 'Todo',
    kind: 'Hobby project',
    start: '2025-01',
    description:
      'Angular 18 frontend on a .NET 8 Web API that handles create, read, update and delete. Built to get hands-on with the latest Angular.',
    stack: ['Angular 18', '.NET 8 Web API'],
    repo: 'https://github.com/rahulmandal0207/p_todo_app',
  },
];

export const skills: SkillGroup[] = [
  { label: 'Backend', items: ['C#', '.NET Core', 'ASP.NET Web API', 'SQL Server'] },
  { label: 'Frontend', items: ['Angular', 'TypeScript', 'HTML', 'CSS'] },
  { label: 'Computer vision', items: ['Python', 'OpenCV', 'YOLO', 'MediaPipe', 'EasyOCR'] },
  { label: 'Tools', items: ['Git', 'GitHub', 'Postman', 'SSMS'] },
];

export const certificates: Certificate[] = [
  {
    title: 'Certificate of Achievement',
    issuer: 'AlignMyCareer',
    date: '2025-06',
    description:
      'C#, .NET Core',
  },
  {
    title: 'Postman API Fundamentals Student Expert',
    issuer: 'Postman',
    date: '2024-07',
    description:
      'GET, POST, PATCH and DELETE requests, query parameters, bodies, headers and response codes.',
  },
  {
    title: 'Career Essentials in Software Development',
    issuer: 'Microsoft & LinkedIn',
    date: '2024-06',
    description:
      'Programming fundamentals, the software development lifecycle, version control and industry tools.',
  },
];
