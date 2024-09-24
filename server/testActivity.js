// Example activities
const mongoose = require('mongoose');
const activities = [
    // 2024
    { id:2, profile_id: 1, category_id: 1, start_dateTime: new Date('2024-01-15T09:00:00Z'), end_dateTime: new Date('2024-01-15T17:00:00Z'), title: 'Started a new project on AI-driven analytics', desc: 'Engaged in a project focusing on AI-driven analytics, exploring various machine learning techniques.', visibility: 'public', location: 'Remote', status: 'approved' },
    { id:3,profile_id: 1, category_id: 1, start_dateTime: new Date('2024-03-10T10:00:00Z'), end_dateTime: new Date('2024-03-10T18:00:00Z'), title: 'Attended International Tech Conference', desc: 'Participated in an international tech conference focusing on emerging technologies.', visibility: 'public', location: 'New York', status: 'approved' },
    { id:5, profile_id: 1, category_id: 2, start_dateTime: new Date('2024-06-20T09:00:00Z'), end_dateTime: new Date('2024-06-20T17:00:00Z'), title: 'Published Research Paper on Machine Learning', desc: 'Published a research paper on advancements in machine learning techniques.', visibility: 'public', location: 'Online', status: 'approved' },
    { id:53,profile_id: 1, category_id: 3, start_dateTime: new Date('2024-09-10T09:00:00Z'), end_dateTime: new Date('2024-09-10T17:00:00Z'), title: 'Completed Advanced Data Science Course', desc: 'Completed an advanced course on data science, gaining expertise in statistical analysis.', visibility: 'public', location: 'Online', status: 'approved' },
    { id:52,profile_id: 1, category_id: 4, start_dateTime: new Date('2024-11-01T09:00:00Z'), end_dateTime: new Date('2024-11-01T17:00:00Z'), title: 'Worked on AI-based Startup', desc: 'Collaborated on an AI-based startup focusing on predictive analytics solutions.', visibility: 'public', location: 'San Francisco', status: 'approved' },
  
    //id: 2023
    { id:39,profile_id: 1, category_id: 1, start_dateTime: new Date('2023-02-15T09:00:00Z'), end_dateTime: new Date('2023-02-15T17:00:00Z'), title: 'Graduated from Engineering. Completed multiple internships in Software Development', desc: 'Completed internships with a focus on software development, gaining practical experience in various technologies.', visibility: 'public', location: 'Campus', status: 'approved' },
    { id:29,profile_id: 1, category_id: 2, start_dateTime: new Date('2023-05-20T09:00:00Z'), end_dateTime: new Date('2023-05-20T17:00:00Z'), title: 'Developed an E-commerce Platform', desc: 'Developed an e-commerce platform using the MERN stack, focusing on user experience and functionality.', visibility: 'public', location: 'Remote', status: 'approved' },
    { id:27,profile_id: 1, category_id: 3, start_dateTime: new Date('2023-08-10T09:00:00Z'), end_dateTime: new Date('2023-08-10T17:00:00Z'), title: 'Contributed to Open Source Projects', desc: 'Contributed to several open-source projects, enhancing skills in collaborative software development.', visibility: 'public', location: 'Online', status: 'approved' },
    { id:9,profile_id: 1, category_id: 4, start_dateTime: new Date('2023-11-05T09:00:00Z'), end_dateTime: new Date('2023-11-05T17:00:00Z'), title: 'Launched Personal Blog', desc: 'Launched a personal blog to share insights and experiences related to software development.', visibility: 'public', location: 'Online', status: 'approved' },
  
    // 2022
    { id:25,profile_id: 1, category_id: 1, start_dateTime: new Date('2022-01-10T09:00:00Z'), end_dateTime: new Date('2022-01-10T17:00:00Z'), title: 'Interned at Tech Giants', desc: 'Interned at leading tech companies, gaining valuable industry experience and networking opportunities.', visibility: 'public', location: 'Silicon Valley', status: 'approved' },
    { id:37,profile_id: 1, category_id: 2, start_dateTime: new Date('2022-04-25T09:00:00Z'), end_dateTime: new Date('2022-04-25T17:00:00Z'), title: 'Developed Mobile Application', desc: 'Developed a mobile application using Flutter, focusing on performance optimization and user interface design.', visibility: 'public', location: 'Remote', status: 'approved' },
    { id:38,profile_id: 1, category_id: 3, start_dateTime: new Date('2022-07-15T09:00:00Z'), end_dateTime: new Date('2022-07-15T17:00:00Z'), title: 'Completed Online Certification in AI', desc: 'Completed an online certification in artificial intelligence, focusing on machine learning algorithms and applications.', visibility: 'public', location: 'Online', status: 'approved' },
    { id:36,profile_id: 1, category_id: 4, start_dateTime: new Date('2022-09-20T09:00:00Z'), end_dateTime: new Date('2022-09-20T17:00:00Z'), title: 'Presented at Tech Meetups', desc: 'Presented research and projects at various tech meetups, showcasing innovations and networking with industry experts.', visibility: 'public', location: 'Various Locations', status: 'approved' },
    { id:33, profile_id: 1, category_id: 5, start_dateTime: new Date('2022-12-01T09:00:00Z'), end_dateTime: new Date('2022-12-01T17:00:00Z'), title: 'Participated in Data Science Bootcamp', desc: 'Participated in an intensive data science bootcamp to enhance skills in data analysis and visualization.', visibility: 'public', location: 'Online', status: 'approved' },
  
    // 2021
    { id:32,profile_id: 1, category_id: 1, start_dateTime: new Date('2021-01-15T09:00:00Z'), end_dateTime: new Date('2021-01-15T17:00:00Z'), title: 'Started Engineering Degree', desc: 'Began the engineering degree program with a focus on computer science and software engineering.', visibility: 'public', location: 'Campus', status: 'approved' },
    { id:30,profile_id: 1, category_id: 2, start_dateTime: new Date('2021-04-05T09:00:00Z'), end_dateTime: new Date('2021-04-05T17:00:00Z'), title: 'Completed Introduction to Programming Course', desc: 'Completed a foundational course in programming, learning core concepts and languages such as Python and Java.', visibility: 'public', location: 'Campus', status: 'approved' },
    { id:20,profile_id: 1, category_id: 3, start_dateTime: new Date('2021-07-20T09:00:00Z'), end_dateTime: new Date('2021-07-20T17:00:00Z'), title: 'Joined Robotics Club', desc: 'Joined the robotics club and participated in various projects and competitions related to robotics and automation.', visibility: 'public', location: 'Campus', status: 'approved' },
    { id:22,profile_id: 1, category_id: 4, start_dateTime: new Date('2021-10-15T09:00:00Z'), end_dateTime: new Date('2021-10-15T17:00:00Z'), title: 'Developed Simple Web Application', desc: 'Developed a simple web application using HTML, CSS, and JavaScript as a part of a class project.', visibility: 'public', location: 'Campus', status: 'approved' },
    { id:23,profile_id: 1, category_id: 5, start_dateTime: new Date('2021-12-10T09:00:00Z'), end_dateTime: new Date('2021-12-10T17:00:00Z'), title: 'Participated in Campus Coding Contest', desc: 'Participated in a campus-wide coding contest, showcasing problem-solving skills and programming knowledge.', visibility: 'public', location: 'Campus', status: 'approved' }
  ];

console.log("Activity")
const {Activity} = require('./models/Activities'); 
console.log("Activity")
  // Insert activities into MongoDB
  Activity.insertMany(activities)
    .then(() => {
      console.log('Activities inserted successfully');
      mongoose.connection.close();
    })
    .catch(err => {
      console.error('Error inserting activities:', err);
      mongoose.connection.close();
    });
    console.log("Activity completed")