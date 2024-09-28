const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'GradPath';
const client = new MongoClient(url, { useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    console.log("Connected to database");
    const db = client.db(dbName);

    // Create collections
    const collections = [
      'users', 'profiles', 'categories', 'categoryFields', 'activities', 'activityFields', 
      'documents', 'approvals', 'facultyAssignments', 'ratingCriteria', 'activityRatings', 'overallRankings'
    ];

    for (const collection of collections) {
      await db.createCollection(collection);
      console.log(`Collection ${collection} created.`);
    }

    // Insert users
    const userResult = await db.collection('users').insertMany([
      { user_name: 'student1', pass_hash: 'hashed_pass1', email: 'student1@example.com', role: 'student', created_at: new Date(), updated_at: new Date() },
      { user_name: 'student2', pass_hash: 'hashed_pass2', email: 'student2@example.com', role: 'student', created_at: new Date(), updated_at: new Date() },
      { user_name: 'student3', pass_hash: 'hashed_pass3', email: 'student3@example.com', role: 'student', created_at: new Date(), updated_at: new Date() },
      { user_name: 'student4', pass_hash: 'hashed_pass4', email: 'student4@example.com', role: 'student', created_at: new Date(), updated_at: new Date() },
      { user_name: 'teacher1', pass_hash: 'hashed_pass5', email: 'teacher1@example.com', role: 'faculty', created_at: new Date(), updated_at: new Date() },
      { user_name: 'teacher2', pass_hash: 'hashed_pass6', email: 'teacher2@example.com', role: 'faculty', created_at: new Date(), updated_at: new Date() },
      { user_name: 'teacher3', pass_hash: 'hashed_pass7', email: 'teacher3@example.com', role: 'faculty', created_at: new Date(), updated_at: new Date() },
      { user_name: 'admin', pass_hash: 'hashed_pass8', email: 'admin@example.com', role: 'admin', created_at: new Date(), updated_at: new Date() }
    ]);
    const userIds = userResult.insertedIds;

    // Insert profiles
    const profileResult = await db.collection('profiles').insertMany([
      { 
        user_id: userIds[0], 
        name: 'Student One', 
        dob: new Date('2000-01-01'), 
        start_year: 2018, 
        current_year: 2024, 
        class: 'Final Year', 
        branch: 'Information Technology', 
        current_position: 'Class Representative', 
        since_when: new Date('2023-01-15'), 
        about: 'An enthusiastic learner.', 
        skills: ['JavaScript', 'Python'], 
        email: 'student1@example.com', 
        profile_picture: 'path/to/profile1.jpg', 
        contact_number: '123-456-7890', 
        github: 'https://github.com/student1', 
        linkedin: 'https://linkedin.com/in/student1', 
        website: 'https://student1portfolio.com', 
        created_at: new Date(), 
        updated_at: new Date() 
      },
      { 
        user_id: userIds[1], 
        name: 'Student Two', 
        dob: new Date('1999-02-01'), 
        start_year: 2019, 
        current_year: 2024, 
        class: 'Third Year', 
        branch: 'Computer Science', 
        current_position: 'Team Lead', 
        since_when: new Date('2022-06-10'), 
        about: 'A budding developer.', 
        skills: ['React', 'Node.js'], 
        email: 'student2@example.com', 
        profile_picture: 'path/to/profile2.jpg', 
        contact_number: '234-567-8901', 
        github: 'https://github.com/student2', 
        linkedin: 'https://linkedin.com/in/student2', 
        website: 'https://student2portfolio.com', 
        created_at: new Date(), 
        updated_at: new Date() 
      },
      { 
        user_id: userIds[2], 
        name: 'Student Three', 
        dob: new Date('1998-03-01'), 
        start_year: 2020, 
        current_year: 2024, 
        class: 'Second Year', 
        branch: 'Electronics & Telecommunication', 
        current_position: 'Project Manager', 
        since_when: new Date('2021-09-05'), 
        about: 'Passionate about AI.', 
        skills: ['Machine Learning', 'Python'], 
        email: 'student3@example.com', 
        profile_picture: 'path/to/profile3.jpg', 
        contact_number: '345-678-9012', 
        github: 'https://github.com/student3', 
        linkedin: 'https://linkedin.com/in/student3', 
        website: 'https://student3portfolio.com', 
        created_at: new Date(), 
        updated_at: new Date() 
      },
      { 
        user_id: userIds[3], 
        name: 'Student Four', 
        dob: new Date('1997-04-01'), 
        start_year: 2021, 
        current_year: 2024, 
        class: 'First Year', 
        branch: 'Mechanical Engineering', 
        current_position: 'Cultural Committee Head', 
        since_when: new Date('2022-08-01'), 
        about: 'Loves exploring technology.', 
        skills: ['SolidWorks', 'AutoCAD'], 
        email: 'student4@example.com', 
        profile_picture: 'path/to/profile4.jpg', 
        contact_number: '456-789-0123', 
        github: 'https://github.com/student4', 
        linkedin: 'https://linkedin.com/in/student4', 
        website: 'https://student4portfolio.com', 
        created_at: new Date(), 
        updated_at: new Date() 
      },
      { 
        user_id: userIds[4], 
        name: 'Teacher One', 
        dob: new Date('1985-01-01'), 
        start_year: 2010, 
        current_year: 2024, 
        position: 'Professor of Mathematics', 
        about: 'Expert in calculus and algebra.', 
        skills: ['Mathematics', 'Teaching'], 
        email: 'teacher1@example.com', 
        profile_picture: 'path/to/profile5.jpg', 
        contact_number: '567-890-1234', 
        github: '', 
        linkedin: 'https://linkedin.com/in/teacher1', 
        website: '', 
        created_at: new Date(), 
        updated_at: new Date() 
      },
      { 
        user_id: userIds[5], 
        name: 'Teacher Two', 
        dob: new Date('1982-02-01'), 
        start_year: 2011, 
        current_year: 2024, 
        position: 'Associate Professor of Computer Science', 
        about: 'Focused on software engineering and AI.', 
        skills: ['Python', 'Software Architecture'], 
        email: 'teacher2@example.com', 
        profile_picture: 'path/to/profile6.jpg', 
        contact_number: '678-901-2345', 
        github: '', 
        linkedin: 'https://linkedin.com/in/teacher2', 
        website: '', 
        created_at: new Date(), 
        updated_at: new Date() 
      },
      { 
        user_id: userIds[6], 
        name: 'Teacher Three', 
        dob: new Date('1980-03-01'), 
        start_year: 2012, 
        current_year: 2024, 
        position: 'Lecturer in Physics', 
        about: 'Specializes in quantum mechanics.', 
        skills: ['Quantum Physics', 'Research'], 
        email: 'teacher3@example.com', 
        profile_picture: 'path/to/profile7.jpg', 
        contact_number: '789-012-3456', 
        github: '', 
        linkedin: 'https://linkedin.com/in/teacher3', 
        website: '', 
        created_at: new Date(), 
        updated_at: new Date() 
      },
      { 
        user_id: userIds[7], 
        name: 'Admin User', 
        dob: new Date('1990-01-01'), 
        start_year: 2008, 
        current_year: 2024, 
        about: 'Responsible for administration and support.', 
        skills: ['Management', 'Communication'], 
        email: 'admin@example.com', 
        profile_picture: 'path/to/profile8.jpg', 
        contact_number: '890-123-4567', 
        github: '', 
        linkedin: 'https://linkedin.com/in/admin', 
        website: '', 
        created_at: new Date(), 
        updated_at: new Date() 
      }
    ]);
    
    const profileIds = profileResult.insertedIds;
    

    // Insert categories
    const categoryResult = await db.collection('categories').insertMany([
      { name: 'Academic Achievements', description: 'Records students\' accomplishments in academics.', created_at: new Date() },
      { name: 'Competitions & Hackathons', description: 'Logs student participation in contests and hackathons.', created_at: new Date() },
      { name: 'Extracurricular Activities', description: 'Tracks involvement in non-academic activities.', created_at: new Date() },
      { name: 'Volunteering & Social Work', description: 'Logs community service and volunteering activities.', created_at: new Date() },
      { name: 'Leadership Roles', description: 'Documents leadership roles in various organizations.', created_at: new Date() },
      { name: 'Internships', description: 'Records internships and work experiences.', created_at: new Date() },
      { name: 'Research & Publications', description: 'Logs research work and publications.', created_at: new Date() },
      { name: 'Sports & Fitness', description: 'Tracks participation in sports and fitness activities.', created_at: new Date() }
    ]);
    const categoryIds = categoryResult.insertedIds;

    // Insert category fields
    const categoryFieldResult = await db.collection('categoryFields').insertMany([
      { category_id: categoryIds[0], field_name: 'Title', field_type: 'text', is_required: true, created_at: new Date() },
      { category_id: categoryIds[0], field_name: 'Type of Achievement', field_type: 'dropdown', options: JSON.stringify({ 'Course': 'Course', 'Research Paper': 'Research Paper', 'Workshop': 'Workshop', 'Certification': 'Certification' }), is_required: true, created_at: new Date() },
      { category_id: categoryIds[0], field_name: 'Institution', field_type: 'text', is_required: true, created_at: new Date() },
      { category_id: categoryIds[0], field_name: 'Completion Date', field_type: 'date', is_required: true, created_at: new Date() },
      { category_id: categoryIds[0], field_name: 'Grade/Score', field_type: 'text', is_required: false, created_at: new Date() }
      // Add more category fields as needed
    ]);
    const categoryFieldIds = categoryFieldResult.insertedIds;

    // Insert activities
    const activityResult = await db.collection('activities').insertMany([
      { user_id: userIds[0], category_id: categoryIds[0], title: 'Completed Advanced Calculus', details: 'Finished course with A grade', created_at: new Date(), updated_at: new Date() },
      { user_id: userIds[0], category_id: categoryIds[1], title: 'Won Hackathon 2022', details: 'Team won the first prize at a local hackathon', created_at: new Date(), updated_at: new Date() },
      { user_id: userIds[1], category_id: categoryIds[0], title: 'Completed Data Structures', details: 'Achieved a high score', created_at: new Date(), updated_at: new Date() },
      { user_id: userIds[1], category_id: categoryIds[2], title: 'Participated in Cultural Fest', details: 'Danced in the annual cultural fest', created_at: new Date(), updated_at: new Date() },
      { user_id: userIds[2], category_id: categoryIds[3], title: 'Volunteered at Local NGO', details: 'Helped organize events for underprivileged children', created_at: new Date(), updated_at: new Date() },
      { user_id: userIds[2], category_id: categoryIds[4], title: 'Leader of Science Club', details: 'Organized various science events', created_at: new Date(), updated_at: new Date() },
      { user_id: userIds[3], category_id: categoryIds[5], title: 'Intern at Tech Corp', details: 'Worked on machine learning projects', created_at: new Date(), updated_at: new Date() },
      { user_id: userIds[3], category_id: categoryIds[6], title: 'Published Research Paper', details: 'Published a paper on AI in a reputed journal', created_at: new Date(), updated_at: new Date() }
    ]);
    const activityIds = activityResult.insertedIds;


    const activityFieldResult = await db.collection('activityFields').insertMany([
      // Activity 1: Completed Advanced Calculus
      { activity_id: activityIds[0], field_id: categoryFieldIds[0], field_value: 'Advanced Calculus', uploaded_at: new Date() }, // Title
      { activity_id: activityIds[0], field_id: categoryFieldIds[1], field_value: 'Course', uploaded_at: new Date() }, // Type of Achievement
      { activity_id: activityIds[0], field_id: categoryFieldIds[2], field_value: 'XYZ University', uploaded_at: new Date() }, // Institution
      { activity_id: activityIds[0], field_id: categoryFieldIds[3], field_value: '2024-05-20', uploaded_at: new Date() }, // Completion Date
      { activity_id: activityIds[0], field_id: categoryFieldIds[4], field_value: 'A', uploaded_at: new Date() }, // Grade/Score
  
      // Activity 2: Won Hackathon 2022
      { activity_id: activityIds[1], field_id: categoryFieldIds[5], field_value: 'Hackathon 2022', uploaded_at: new Date() }, // Competition Name
      { activity_id: activityIds[1], field_id: categoryFieldIds[6], field_value: '2022-09-15', uploaded_at: new Date() }, // Date of Event
      { activity_id: activityIds[1], field_id: categoryFieldIds[7], field_value: '1', uploaded_at: new Date() }, // Rank/Position
      { activity_id: activityIds[1], field_id: categoryFieldIds[8], field_value: 'Tech Community', uploaded_at: new Date() }, // Organizer
      { activity_id: activityIds[1], field_id: categoryFieldIds[9], field_value: 'http://example.com/hackathon-proof.pdf', uploaded_at: new Date() }, // Proof
  
      // Activity 3: Completed Data Structures
      { activity_id: activityIds[2], field_id: categoryFieldIds[0], field_value: 'Data Structures', uploaded_at: new Date() }, // Title
      { activity_id: activityIds[2], field_id: categoryFieldIds[1], field_value: 'Course', uploaded_at: new Date() }, // Type of Achievement
      { activity_id: activityIds[2], field_id: categoryFieldIds[2], field_value: 'ABC Institute', uploaded_at: new Date() }, // Institution
      { activity_id: activityIds[2], field_id: categoryFieldIds[3], field_value: '2024-06-01', uploaded_at: new Date() }, // Completion Date
      { activity_id: activityIds[2], field_id: categoryFieldIds[4], field_value: 'A+', uploaded_at: new Date() }, // Grade/Score
  
      // Activity 4: Participated in Cultural Fest
      { activity_id: activityIds[3], field_id: categoryFieldIds[10], field_value: 'Cultural Fest', uploaded_at: new Date() }, // Event Title
      { activity_id: activityIds[3], field_id: categoryFieldIds[11], field_value: 'Cultural Fest', uploaded_at: new Date() }, // Event Type
      { activity_id: activityIds[3], field_id: categoryFieldIds[12], field_value: '2023-08-10', uploaded_at: new Date() }, // Date of Event
      { activity_id: activityIds[3], field_id: categoryFieldIds[13], field_value: 'Participant', uploaded_at: new Date() }, // Role
  
      // Activity 5: Volunteered at Local NGO
      { activity_id: activityIds[4], field_id: categoryFieldIds[14], field_value: 'Helping Hands', uploaded_at: new Date() }, // Organization Name
      { activity_id: activityIds[4], field_id: categoryFieldIds[15], field_value: 'Community Event', uploaded_at: new Date() }, // Event Title
      { activity_id: activityIds[4], field_id: categoryFieldIds[16], field_value: '2024-04-15', uploaded_at: new Date() }, // Date of Participation
      { activity_id: activityIds[4], field_id: categoryFieldIds[17], field_value: '3', uploaded_at: new Date() }, // Duration
  
      // Activity 6: Leader of Science Club
      { activity_id: activityIds[5], field_id: categoryFieldIds[18], field_value: 'Club President', uploaded_at: new Date() }, // Role Title
      { activity_id: activityIds[5], field_id: categoryFieldIds[19], field_value: 'Science Club', uploaded_at: new Date() }, // Organization Name
      { activity_id: activityIds[5], field_id: categoryFieldIds[20], field_value: '2023-09-01 to 2024-05-30', uploaded_at: new Date() }, // Duration
  
      // Activity 7: Intern at Tech Corp
      { activity_id: activityIds[6], field_id: categoryFieldIds[21], field_value: 'Tech Corp', uploaded_at: new Date() }, // Company Name
      { activity_id: activityIds[6], field_id: categoryFieldIds[22], field_value: 'Software Developer Intern', uploaded_at: new Date() }, // Role
      { activity_id: activityIds[6], field_id: categoryFieldIds[23], field_value: 'June 2024 - August 2024', uploaded_at: new Date() }, // Duration
  
      // Activity 8: Published Research Paper
      { activity_id: activityIds[7], field_id: categoryFieldIds[24], field_value: 'A Study on AI', uploaded_at: new Date() }, // Title
      { activity_id: activityIds[7], field_id: categoryFieldIds[25], field_value: 'International Journal of AI', uploaded_at: new Date() }, // Journal/Conference
      { activity_id: activityIds[7], field_id: categoryFieldIds[26], field_value: '2024-01-15', uploaded_at: new Date() } // Publication Date
  
  ]);
  
  const activityFieldIds = activityFieldResult.insertedIds;
  
    // Insert documents
    const documentResult = await db.collection('documents').insertMany([
      { activity_id: activityIds[0], file_path: '/documents/calculus.pdf', created_at: new Date(), updated_at: new Date() },
      { activity_id: activityIds[1], file_path: '/documents/hackathon_certificate.pdf', created_at: new Date(), updated_at: new Date() },
      { activity_id: activityIds[2], file_path: '/documents/data_structures.pdf', created_at: new Date(), updated_at: new Date() },
      { activity_id: activityIds[3], file_path: '/documents/cultural_fest.pdf', created_at: new Date(), updated_at: new Date() }
      // Add more documents as needed
    ]);

    // Insert approvals
    await db.collection('approvals').insertMany([
      { activity_id: activityIds[0], approver_id: userIds[4], status: 'approved', created_at: new Date(), updated_at: new Date() },
      { activity_id: activityIds[1], approver_id: userIds[5], status: 'approved', created_at: new Date(), updated_at: new Date() },
      { activity_id: activityIds[2], approver_id: userIds[6], status: 'rejected', created_at: new Date(), updated_at: new Date() },
      { activity_id: activityIds[3], approver_id: userIds[4], status: 'pending', created_at: new Date(), updated_at: new Date() }
    ]);

    // Insert faculty assignments
    await db.collection('facultyAssignments').insertMany([
      { faculty_id: userIds[4], student_id: userIds[0], assigned_at: new Date() },
      { faculty_id: userIds[4], student_id: userIds[1], assigned_at: new Date() },
      { faculty_id: userIds[5], student_id: userIds[2], assigned_at: new Date() },
      { faculty_id: userIds[6], student_id: userIds[3], assigned_at: new Date() }
    ]);

    // Insert rating criteria
    const ratingCriteriaResult = await db.collection('ratingCriteria').insertMany([
      { category_id: categoryIds[0], criteria: 'Relevance to Academic Goals', created_at: new Date(), updated_at: new Date() },
      { category_id: categoryIds[1], criteria: 'Creativity and Innovation', created_at: new Date(), updated_at: new Date() },
      { category_id: categoryIds[2], criteria: 'Impact and Contribution', created_at: new Date(), updated_at: new Date() }
      // Add more rating criteria as needed
    ]);

    // Insert activity ratings
    await db.collection('activityRatings').insertMany([
      { activity_id: activityIds[0], faculty_id: userIds[4], criteria_id: ratingCriteriaResult.insertedIds[0], rating: 5, created_at: new Date(), updated_at: new Date() },
      { activity_id: activityIds[1], faculty_id: userIds[5], criteria_id: ratingCriteriaResult.insertedIds[1], rating: 4, created_at: new Date(), updated_at: new Date() },
      { activity_id: activityIds[2], faculty_id: userIds[6], criteria_id: ratingCriteriaResult.insertedIds[2], rating: 3, created_at: new Date(), updated_at: new Date() }
    ]);

    // Insert overall rankings
    await db.collection('overallRankings').insertMany([
      { student_id: userIds[0], ranking: 1, created_at: new Date(), updated_at: new Date() },
      { student_id: userIds[1], ranking: 2, created_at: new Date(), updated_at: new Date() },
      { student_id: userIds[2], ranking: 3, created_at: new Date(), updated_at: new Date() },
      { student_id: userIds[3], ranking: 4, created_at: new Date(), updated_at: new Date() }
    ]);

    console.log("Database seeded successfully!");

  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
