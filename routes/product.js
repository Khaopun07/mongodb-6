const express = require('express'); 
const { getAllSchools, getSchool, createSchool, updateSchool, deleteSchool, addParticipants } = require('../controllers/schoolController');
const authenticateToken = require("../middlewares/auth");
const router = express.Router();



router.get('/guide/showAll', authenticateToken, getAllSchools);// ดึงข้อมูลโรงเรียนทั้งหมดมาแสดง
router.get('/guide/:id', authenticateToken, getSchool);// ดึงข้อมูลบางโพสต์ของโรงเรียนมาแสดง
router.post('/guide/postschoo', authenticateToken, createSchool);// เพิ่มข้อมูลโรงเรียน
router.post('/guide/postschoo/participants', authenticateToken, addParticipants);// เพิ่มรายชื่อการเข้าร่วม
router.put('/guide/:id', authenticateToken, updateSchool);// แก้ไขข้อมูลโพสต์โรงเรียน
router.delete('/guide/:id', authenticateToken, deleteSchool);// ลบข้อมูลโพสต์โรงเรียน

module.exports = router;
