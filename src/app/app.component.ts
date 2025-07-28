import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SectionComponent } from './section/section.component';
import { Values } from './core/models/model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'resume-portfolio';

  Email = 'rahulkumar397222@gmail.com';
  Github = 'rahulmandal0207';
  Linkedin = 'rahurahul-mandal-462a78360';

  Webaikon = {
    Title: '.NET Developer Intern',
    Location: 'Bokaro, Jharkhand',
    Description:
      'Acquired foundational knowledge of Angular and integrated it in a personal  project. Created a web interface that attracted over 100 unique users and received 20+ positive feedback ratings for usability. Engineered a comprehensive database management system using SQL Server Management Studio, ensuring data integrity for over 1,000 records and establishing protocols that improved data accuracy  rates by 15% across multiple departments.',
    Duration: 'Nov 2022 - Mar 2023',
    SubTitle: 'Webaikon Infotech',
    Designation: 'Intern',
    Github: 'https://github.com/rahulmandal0207/schoolerp',
    Mail: '',
    Linkedin: '',
  };

  Ardent = {
    Title: 'Junior Web Developer Intern',
    Location: 'Kolkata, West Bengal',
    Description:
      'Improved project performance by streamlining key functions, leading to a 15% reduction in load time. Collaborated with team members to enhance user interface elements, positively impacting user experience across multiple devices.',
    Duration: 'Mar 2022 - Jun 2022',
    SubTitle: 'Ardent computech pvt',
    Designation: 'Intern',
    Github: 'https://github.com/rahulmandal0207/ims',
    Mail: '',
    Linkedin: '',
  };

  Masters = {
    Title: 'GD Goenka University',
    Location: 'Gurugram, Haryana',
    Description: '',
    Duration: '2023 - 2025',
    SubTitle: 'Master of Computer Application (MCA)',
    Designation: '',
    Github: '',
    Mail: '',
    Linkedin: '',
  };

  Bachelor = {
    Title: 'BBMKU',
    Location: 'Dhanbad, Jharkhand',
    Description: '',
    Duration: '2020 - 2023',
    SubTitle: 'Bachelor of Computer Application (BCA)',
    Designation: '',
    Github: '',
    Mail: '',
    Linkedin: '',
  };
  About = {
    Title: '',
    Location: '',
    Description:
      'Full Stack Web Developer with over 2 years of experience in developing and optimizing web applications. Proficient in .NET Core, Angular, and SQL Server, with a strong focus on user experience and performance. Adept at collaborating with cross-functional teams and delivering high-quality projects on time.',
    Duration: '',
    SubTitle: '',
    Designation: '',
    Github: '',
    Mail: '',
    Linkedin: '',
  };

  Dss: Values = {
    Title: 'Driver Surveillance System',
    Duration: 'Feb 2025 - April 2025',
    SubTitle: 'Major Project',
    Designation: 'GD Goenka University',
    Description:
      'The System aims to detect any signs of fatigue of the driver driving a Vehicle. Implemented the core logic in python, harnessing the power of computer vision using opencv and mediapipe. Collaborated with team of 5 using git and github.',

    Github: 'https://github.com/rahulmandal0207/DSS_backend',
  };
  Vrpr: Values = {
    Title: 'Vehicle Registration Plate Recognition',
    Duration: 'Jan 2024 - April 2024',
    SubTitle: 'Minor Project',
    Designation: 'GD Goenka University',
    Description:
      'Vehicle Registration Plate Recognition (VRPR) | Python, OpenCV, YOLO, EasyOCR Developed a computer vision system to detect and extract vehicle number plates from real-time video streams and images. Utilized YOLO for object detection and EasyOCR for accurate text extraction from license plates. Integrated OpenCV for frame processing and image manipulation. The system supports live camera feeds and video files, demonstrating proficiency in machine learning, deep learning models, and optical character recognition.',

    Github: 'https://github.com/rahulmandal0207/vrpr',
  };

  TodoApp: Values = {
    Title: 'Todo',
    SubTitle: 'Hobby projects',
    Duration: 'Jan 2025',
    Description:
      'Designed the frontend in Angular to get hands on experience on the latest version of Angular 18. Implemented the backend basic create, read, update and delete operations using .net core 8 web API. ',

    Github: 'https://github.com/rahulmandal0207/p_todo_app',
  };

  BCAManagement: Values = {
    Title: 'BCA Management System',
    SubTitle: 'Major Project',
    Designation: 'BBMKU',
    Duration: 'Apr 2023 - Jul 2023',
    Description:
      'Built a fully functional web application to manage student data, academic records, and course registrations using Angular, ASP.NET, and SQL Server.  Designed and tested role-based access control and database operations for 1,000+ mock records, ensuring smooth performance with up to 40% faster data retrieval during testing.  ',

    Github: 'https://github.com/rahulmandal0207/BCA_Department',
  };

  SchoolERP: Values = {
    Title: 'School ERP',
    SubTitle: 'Project',
    Designation: 'Webaikon infotech',
    Duration: 'Dec 2022 - Mar 2023',
    Description:
      'Developed web applications using Angular, improving page load speeds by 15% through responsive frontend design. Strengthened UI/UX design abilities, improving user satisfaction by enhancing interface aesthetics and usability.  ',

    Github: 'https://github.com/rahulmandal0207/School_ERP',
  };

  PostmanCertificate: Values = {
    Title: 'Postman API Fundamentals Student Expert',
    Location: 'Postman',
    Duration: 'July 2024',
    Description:
      'Making GET, POST, PATCH, and DELETE requests and making query parameters, bodies, headers, response codes ',
  };

  SoftwareDevelopmentCertificate: Values = {
    Title: 'Career Essentials in Software Development',
    Location: 'Microsoft & Linkedin',
    Duration: 'June 2024',
    Description:
      'Acquired foundational knowledge on programming fundamentals, software development lifecycle, version control, and industry tools',
  };
}
