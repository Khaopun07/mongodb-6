const School = require('../models/School'); // Import School model

// Retrieve all schools
exports.getAllSchools = async (req, res) => {
    try {
        const schools = await School.find();
        res.status(200).json(schools);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Retrieve a single school by ID
exports.getSchool = async (req, res) => {
    try {
        const { id } = req.params;
        const school = await School.findById(id);
        if (!school) return res.status(404).json({ message: "School not found" });
        res.status(200).json(school);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new school
exports.createSchool = async (req, res) => {
    const { school_name, district, province, student_count, teacher_name, contact_phone, contact_faculty, time_period, date } = req.body;

    const school = new School({ 
        school_name, 
        district, 
        province, 
        student_count, 
        teacher_name, 
        contact_phone, 
        contact_faculty, 
        time_period, 
        date 
    });
    try {
        const newSchool = await school.save();
        res.status(201).json(newSchool);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an existing school
exports.updateSchool = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSchool = await School.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedSchool) return res.status(404).json({ message: 'School not found' });
        res.status(200).json(updatedSchool);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a school by ID
exports.deleteSchool = async (req, res) => {
    try {
        const { id } = req.params;
        const school = await School.findById(id);
        if (!school) return res.status(404).json({ message: 'School not found' });
        await School.findByIdAndDelete(id);
        res.status(200).json({ message: 'School deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add participants to a school
exports.addParticipants = async (req, res) => {
    try {
        const { id } = req.params;
        const { participants } = req.body; // Assuming participants is an array of participant IDs

        const school = await School.findById(id);
        if (!school) return res.status(404).json({ message: 'School not found' });

        school.participants.push(...participants); // Add new participants
        await school.save();

        res.status(200).json({ message: 'Participants added successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
