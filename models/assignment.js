//ตรวจสอบว่าส่่งทันเวลาไหม
function checkAssignment(assignment_time, student_time){
    if(Date.parse(student_time) < Date.parse(assignment_time)){
        return true
     }else{
        return false
     }
}

module.exports = checkAssignment