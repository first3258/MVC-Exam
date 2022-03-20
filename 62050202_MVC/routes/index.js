var express = require('express');
var router = express.Router();
const db = require('../db')
const flash = require('express-flash');
const e = require('express');
const { render } = require('express/lib/response');
const checkAssignment = require('../models/assignment') 

//สร้าง Assignment 
router.get('/', (req, res) => {
  res.render('index');
});

//รับ input จาก form
router.post('/', (req, res) => {
  let name = req.body.name;
  let description = req.body.description;
  let date = req.body.date;
  let id = req.body.id;
  console.log(name, description, date, id);

  //จัดการ error ไม่ได้ป้อนข้อมูล
  if(name == "" || id ==""){
    req.flash('error', 'Enter Assignment Name and Studnet ID')
  }else{
    req.flash('suscess', 'Assignment Added');
    const data = {
      assignment__name: name,
      description: description,
      date: date,
      student_id: id
  }
  db.query('INSERT INTO teacher SET ?', data);
  }
  res.render('index');
});

//หน้าส่งงาน
router.get('/student' ,(req, res) => {
  res.render('student')
})

//กดส่งงาน
router.post('/student' ,(req, res) => {
  let name = req.body.name;
  let description = req.body.description;
  let id = req.body.id;
  let assignment_id = req.body.assignment_id

  if(name == "" || id ==""){
    req.flash('error', 'Enter Assignment Name and Studnet ID')
  }else{
    req.flash('suscess', 'Assignment Added');
    const data = {
      assignment_name: name,
      description: description,
      student_id: id ,
      assignment_id : assignment_id
    }
    db.query('INSERT INTO student SET ?', data);
  }
  
  res.render('student')
})

//สรุปแต่ละงาน
router.get('/check',(req, res) => {
  db.query('SELECT * FROM teacher ', (err, rows) => {
    console.log(rows);
    res.render('check', { data : rows }) 
  })
})

//ดูว่านักศึกษาส่งงานหรือยัง
router.get('/check/view/(:assignment_id)', (req, res) => {
  let id = req.params.assignment_id

  // Query Assignment id ที่ Student ตรงกับ งาน
  db.query('SELECT student.student_id as id, student.date as student_date, teacher.date as teacher_date FROM student INNER JOIN teacher ON teacher.assignment_id = student.assignment_id Where student.assignment_id = ' + id , (err, rows) => {
    console.log(id)
    if(rows){
      for(let i = 0; i < rows.length; i++){
        if(checkAssignment(rows[i].teacher_date, rows[i].student_date)){
          rows[i].time = "ส่งทัน";
        }else{
          rows[i].time = "ส่งไม่ทัน";
        }
        console.log(rows)
      }
    }
    res.render('view', {data : rows})
  })
})

module.exports = router;
