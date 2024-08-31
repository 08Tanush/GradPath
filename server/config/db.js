// Connect to MongoDB and use the sem5Project database
const db = connect("mongodb://localhost:27017/sem5Project");

// Insert into Users collection
const userResult = db.Users.insertOne({
    user_name: "admin",
    pass_hash: "hashed_password",
    updated_id: null,
    created_at: new Date(),
    email: "admin@example.com",
    role: "faculty"
});

// Print the inserted User's ObjectId
print("Inserted User ObjectId:", userResult.insertedId);

// Insert into Profile collection
const profileResult = db.Profile.insertOne({
    user_id: userResult.insertedId, // Use the inserted User's ObjectId
    name: "John Doe",
    dob: new Date("1990-01-01"),
    created_at: new Date(),
    updated_at: new Date()
});

// Print the inserted Profile's ObjectId
print("Inserted Profile ObjectId:", profileResult.insertedId);

// Insert into Activity collection
const activityResult = db.Activity.insertOne({
    profile_id: profileResult.insertedId, // Use the inserted Profile's ObjectId
    start_dateTime: new Date("2024-01-01T09:00:00Z"),
    end_dateTime: new Date("2024-01-01T11:00:00Z"),
    created_at: new Date(),
    updated_at: new Date(),
    category: "Workshop",
    title: "Web Development Workshop",
    desc: "A workshop on modern web development practices.",
    visibility: "Public"
});

// Print the inserted Activity's ObjectId
print("Inserted Activity ObjectId:", activityResult.insertedId);

// Insert into Approval collection
const approvalResult = db.Approval.insertOne({
    approval_dateTime: new Date(),
    activity_id: activityResult.insertedId, // Use the inserted Activity's ObjectId
    faculty_id: userResult.insertedId, // Use the inserted User's ObjectId
    status: "Approved",
    remark: "Good work"
});

// Print the inserted Approval's ObjectId
print("Inserted Approval ObjectId:", approvalResult.insertedId);

// Insert into Document collection
const documentResult = db.Document.insertOne({
    doc_path: "/path/to/document.pdf",
    activity_id: activityResult.insertedId, // Use the inserted Activity's ObjectId
    uploaded_at: new Date()
});

// Print the inserted Document's ObjectId
print("Inserted Document ObjectId:", documentResult.insertedId);

// Output the collections to verify
print("Collections created:");
print(db.getCollectionNames());
