const db = connect("mongodb://localhost:27017/GradPath");

db.createCollection('users');

db.users.insertMany([
    { user_name: 'john_doe', pass_hash: 'hashed_pass', email: 'john@example.com', role: 'student', created_at: new Date(), updated_at: new Date() },
    { user_name: 'jane_doe', pass_hash: 'hashed_pass', email: 'jane@example.com', role: 'faculty', created_at: new Date(), updated_at: new Date() },
    { user_name: 'admin', pass_hash: 'hashed_pass', email: 'admin@example.com', role: 'admin', created_at: new Date(), updated_at: new Date() }
]);


db.createCollection('profiles');

db.profiles.insertMany([
    { user_id: ObjectId('USER_ID1'), name: 'John Doe', dob: new Date('1999-01-01'), start_year: 2019, current_year: 2023, about: 'Student of IT', created_at: new Date(), updated_at: new Date() },
    { user_id: ObjectId('USER_ID2'), name: 'Jane Doe', dob: new Date('1985-02-15'), start_year: 2010, current_year: 2023, position: 'Professor of CS', created_at: new Date(), updated_at: new Date() }
]);


db.createCollection('categories');

db.categories.insertMany([
    { name: 'Academic Achievements', description: 'Records students\' accomplishments in academics, including workshops, courses, and research papers.', created_at: new Date() },
    { name: 'Competitions & Hackathons', description: 'Logs student participation in various contests, hackathons, or coding challenges.', created_at: new Date() },
    { name: 'Extracurricular Activities', description: 'Tracks involvement in non-academic activities like student clubs, cultural events, and seminars.', created_at: new Date() },
    { name: 'Volunteering & Social Work', description: 'Logs students\' involvement in community service, volunteering, or social initiatives.', created_at: new Date() },
    { name: 'Leadership & Management Roles', description: 'Logs leadership roles within student clubs, councils, or academic-related committees.', created_at: new Date() },
    { name: 'Internships & Industrial Training', description: 'Records internships, industrial training, or any work experience undertaken during the course.', created_at: new Date() },
    { name: 'Research & Publications', description: 'Logs research work and publications, including research papers, conference presentations, and journal submissions.', created_at: new Date() },
    { name: 'Sports & Fitness', description: 'Tracks participation in sports, fitness activities, and tournaments.', created_at: new Date() }
]);


db.createCollection('categoryFields');

db.categoryFields.insertMany([
    // Academic Achievements
    { category_id: ObjectId('CATEGORY_ID1'), field_name: 'Title', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID1'), field_name: 'Type of Achievement', field_type: 'dropdown', options: JSON.stringify({ 'Course': 'Course', 'Research Paper': 'Research Paper', 'Workshop': 'Workshop', 'Certification': 'Certification' }), is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID1'), field_name: 'Institution/Organization', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID1'), field_name: 'Completion Date', field_type: 'date', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID1'), field_name: 'Grade/Score', field_type: 'text', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID1'), field_name: 'Certificate/Document', field_type: 'file', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID1'), field_name: 'Duration (in hours)', field_type: 'number', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID1'), field_name: 'Link/DOI', field_type: 'text', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID1'), field_name: 'Abstract', field_type: 'text', is_required: false, created_at: new Date() },

    // Competitions & Hackathons
    { category_id: ObjectId('CATEGORY_ID2'), field_name: 'Competition Name', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID2'), field_name: 'Date of Event', field_type: 'date', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID2'), field_name: 'Type of Competition', field_type: 'dropdown', options: JSON.stringify({ 'Coding': 'Coding', 'Sports': 'Sports', 'Quiz': 'Quiz', 'Debate': 'Debate', 'Case Study': 'Case Study' }), is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID2'), field_name: 'Rank/Position', field_type: 'number', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID2'), field_name: 'Organizer', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID2'), field_name: 'Team Members', field_type: 'text', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID2'), field_name: 'Duration (in days/hours)', field_type: 'number', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID2'), field_name: 'Proof/Certificate', field_type: 'file', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID2'), field_name: 'Category', field_type: 'dropdown', options: JSON.stringify({ 'National': 'National', 'Regional': 'Regional', 'International': 'International' }), is_required: true, created_at: new Date() },

    // Extracurricular Activities
    { category_id: ObjectId('CATEGORY_ID3'), field_name: 'Event Title', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID3'), field_name: 'Event Type', field_type: 'dropdown', options: JSON.stringify({ 'Seminar': 'Seminar', 'Workshop': 'Workshop', 'Cultural Fest': 'Cultural Fest', 'Talk': 'Talk' }), is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID3'), field_name: 'Date of Event', field_type: 'date', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID3'), field_name: 'Location', field_type: 'text', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID3'), field_name: 'Role', field_type: 'dropdown', options: JSON.stringify({ 'Organizer': 'Organizer', 'Participant': 'Participant', 'Speaker': 'Speaker', 'Volunteer': 'Volunteer' }), is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID3'), field_name: 'Participation Certificate', field_type: 'file', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID3'), field_name: 'Position/Title Earned', field_type: 'text', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID3'), field_name: 'Description', field_type: 'text', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID3'), field_name: 'Impact/Outcome', field_type: 'text', is_required: false, created_at: new Date() },

    // Volunteering & Social Work
    { category_id: ObjectId('CATEGORY_ID4'), field_name: 'Organization Name', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID4'), field_name: 'Event/Project Title', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID4'), field_name: 'Date of Participation', field_type: 'date', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID4'), field_name: 'Duration (in hours)', field_type: 'number', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID4'), field_name: 'Role', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID4'), field_name: 'Description', field_type: 'text', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID4'), field_name: 'Impact/Outcome', field_type: 'text', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID4'), field_name: 'Certificate/Document', field_type: 'file', is_required: false, created_at: new Date() },

    // Leadership & Management Roles
    { category_id: ObjectId('CATEGORY_ID5'), field_name: 'Role Title', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID5'), field_name: 'Organization/Committee', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID5'), field_name: 'Date Started', field_type: 'date', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID5'), field_name: 'Date Ended', field_type: 'date', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID5'), field_name: 'Responsibilities', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID5'), field_name: 'Achievements', field_type: 'text', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID5'), field_name: 'Impact/Outcome', field_type: 'text', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID5'), field_name: 'Certificate/Document', field_type: 'file', is_required: false, created_at: new Date() },

    // Internships & Industrial Training
    { category_id: ObjectId('CATEGORY_ID6'), field_name: 'Organization Name', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID6'), field_name: 'Position/Role', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID6'), field_name: 'Start Date', field_type: 'date', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID6'), field_name: 'End Date', field_type: 'date', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID6'), field_name: 'Responsibilities', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID6'), field_name: 'Achievements', field_type: 'text', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID6'), field_name: 'Duration (in hours)', field_type: 'number', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID6'), field_name: 'Supervisor', field_type: 'text', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID6'), field_name: 'Proof/Certificate', field_type: 'file', is_required: false, created_at: new Date() },

    // Research & Publications
    { category_id: ObjectId('CATEGORY_ID7'), field_name: 'Title', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID7'), field_name: 'Authors', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID7'), field_name: 'Publication/Conference Name', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID7'), field_name: 'Date of Publication', field_type: 'date', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID7'), field_name: 'DOI/Link', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID7'), field_name: 'Abstract', field_type: 'text', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID7'), field_name: 'Keywords', field_type: 'text', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID7'), field_name: 'Research Type', field_type: 'dropdown', options: JSON.stringify({ 'Journal Paper': 'Journal Paper', 'Conference Paper': 'Conference Paper', 'Book Chapter': 'Book Chapter', 'Technical Report': 'Technical Report' }), is_required: true, created_at: new Date() },

    // Sports & Fitness
    { category_id: ObjectId('CATEGORY_ID8'), field_name: 'Sport/Fitness Activity', field_type: 'text', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID8'), field_name: 'Date of Participation', field_type: 'date', is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID8'), field_name: 'Level', field_type: 'dropdown', options: JSON.stringify({ 'College': 'College', 'State': 'State', 'National': 'National', 'International': 'International' }), is_required: true, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID8'), field_name: 'Position/Rank', field_type: 'text', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID8'), field_name: 'Duration (in hours)', field_type: 'number', is_required: false, created_at: new Date() },
    { category_id: ObjectId('CATEGORY_ID8'), field_name: 'Certificate/Proof', field_type: 'file', is_required: false, created_at: new Date() }
]);


db.createCollection('activities');
db.activities.insertMany([
    {
        profile_id: ObjectId('PROFILE_ID1'),
        category_id: ObjectId('CATEGORY_ID1'),
        start_dateTime: new Date('2024-09-01T08:00:00Z'),
        end_dateTime: new Date('2024-09-01T17:00:00Z'),
        title: 'Math Contest',
        desc: 'Participated in a math contest',
        visibility: 'public',
        location: 'Campus',
        status: 'approved',
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        profile_id: ObjectId('PROFILE_ID2'),
        category_id: ObjectId('CATEGORY_ID2'),
        start_dateTime: new Date('2024-09-02T09:00:00Z'),
        end_dateTime: new Date('2024-09-02T16:00:00Z'),
        title: 'Coding Hackathon',
        desc: 'Participated in a coding hackathon',
        visibility: 'private',
        location: 'Online',
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date()
    }
]);


db.createCollection('documents');

db.documents.insertMany([
    {
        user_id: ObjectId('USER_ID1'),
        category_id: ObjectId('CATEGORY_ID1'),
        fields: {
            Title: 'Introduction to MongoDB',
            'Type of Achievement': 'Certification',
            'Institution/Organization': 'MongoDB University',
            'Completion Date': new Date('2023-06-15'),
            'Grade/Score': 'A',
            'Certificate/Document': 'path/to/certificate.pdf',
            'Duration (in hours)': 40,
            'Link/DOI': 'https://example.com/certificate',
            Abstract: 'A comprehensive course on MongoDB fundamentals.'
        },
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        user_id: ObjectId('USER_ID2'),
        category_id: ObjectId('CATEGORY_ID2'),
        fields: {
            'Competition Name': 'CodeJam 2024',
            'Date of Event': new Date('2024-03-22'),
            'Type of Competition': 'Coding',
            'Rank/Position': 2,
            'Organizer': 'Google',
            'Team Members': 'John Doe, Jane Doe',
            'Duration (in days/hours)': 48,
            'Proof/Certificate': 'path/to/certificate.pdf',
            'Category': 'International'
        },
        created_at: new Date(),
        updated_at: new Date()
    }
]);


db.createCollection('approvals');

db.approvals.insertMany([
    {
        document_id: ObjectId('DOCUMENT_ID1'),
        approver_id: ObjectId('USER_ID3'),
        status: 'Approved',
        comments: 'Document meets all requirements.',
        approved_at: new Date()
    },
    {
        document_id: ObjectId('DOCUMENT_ID2'),
        approver_id: ObjectId('USER_ID3'),
        status: 'Pending',
        comments: 'Awaiting additional proof.',
        approved_at: null
    }
]);



db.createCollection('facultyAssignments');

db.facultyAssignments.insertMany([
    {
        activity_id: ObjectId('ACTIVITY_ID1'),
        faculty_id: ObjectId('FACULTY_ID1'),
        assigned_by: ObjectId('ADMIN_ID'),
        assigned_at: new Date()
    },
    {
        activity_id: ObjectId('ACTIVITY_ID2'),
        faculty_id: ObjectId('FACULTY_ID2'),
        assigned_by: ObjectId('ADMIN_ID'),
        assigned_at: new Date()
    }
]);



db.createCollection('ratingCriteria');


db.ratingCriteria.insertMany([
    {
        category_id: ObjectId('CATEGORY_ID1'),
        criteria_name: 'Timeliness',
        max_score: 10,
        weight: 0.5,
        created_at: new Date()
    },
    {
        category_id: ObjectId('CATEGORY_ID2'),
        criteria_name: 'Creativity',
        max_score: 15,
        weight: 0.3,
        created_at: new Date()
    }
]);



db.createCollection('activityRatings');


db.activityRatings.insertMany([
    {
        activity_id: ObjectId('ACTIVITY_ID1'),
        criteria_id: ObjectId('RATING_CRITERIA_ID1'),
        faculty_id: ObjectId('FACULTY_ID1'),
        score: 8,
        rated_at: new Date()
    },
    {
        activity_id: ObjectId('ACTIVITY_ID2'),
        criteria_id: ObjectId('RATING_CRITERIA_ID2'),
        faculty_id: ObjectId('FACULTY_ID2'),
        score: 12,
        rated_at: new Date()
    }
]);


db.createCollection('overallRankings');


db.overallRankings.insertMany([
    {
        profile_id: ObjectId('PROFILE_ID1'),
        category_id: ObjectId('CATEGORY_ID1'),
        total_score: 85,
        rank_position: 1,
        calculated_at: new Date()
    },
    {
        profile_id: ObjectId('PROFILE_ID2'),
        category_id: ObjectId('CATEGORY_ID2'),
        total_score: 75,
        rank_position: 2,
        calculated_at: new Date()
    }
]);
