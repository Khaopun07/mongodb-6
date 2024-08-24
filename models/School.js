const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    id: {type: String, required: true, maxlength: 5}, // รหัสผู้ใช้งาน
    date: {type: Date, required: true},// วันที่เข้าร่วมแนะแนว
    time_period: {type: String, required: true, maxlength: 5}, // ช่วงเวลา
    school_name: {type: String, required: true, maxlength: 30},// ชื่อโรงเรียน
    district: {type: String, required: true, maxlength: 100},// อำเภอที่ตั้งโรงเรียน
    province: {type: String, required: true, maxlength: 100},// ที่ตั้งโรงเรียน
    student_count: {type: Number, required: true, max: 200}, // จำนวนนักเรียนที่เข้า
    teacher_name: {type: String, required: true, maxlength: 100},// ชื่อครูผู้ติดต่อ
    contact_phone: {type: String, required: true, maxlength: 100}, // หมายเลขโทรศัพท์
    contact_faculty: {type: String, required: true, maxlength: 100},// คณะที่ติดต่อ
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }]
}, {timestamps: true, versionKey: false});

module.exports = mongoose.model('School', schoolSchema);
