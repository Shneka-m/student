import React,{useEffect,useState} from "react";
import API from "../api";
function StudentList({
    setEditStudent, refresh
}){
    const [students,setStudents]=useState([]);
    useEffect(()=>{
        loadStudents();
    },[refresh]);
    const loadStudents=async()=>{
        try{
            const response=await API.get("/");
            console.log(response.data);
            setStudents(response.data);
        }
        catch(error){
            console.log(error);
        }
    };
    const deleteStudent=async(id)=>{
        try{
            await API.delete(`/${id}`);
            alert("Student Deleted");
            loadStudents();
        }
        catch(error){
            console.log(error);
        }
    };
    return(
        <div>
            <h2> Students Details </h2>
            {
                students.map(student=>(
                    <div className="student-card" key={student.id}>
                        <p> <b>Name:</b> {student.name} </p>
                        <p> <b>Age:</b> {student.age} </p>
                        <p> <b>Department:</b> {student.department} </p>
                        <p> <b>Email:</b> {student.email} </p>
                        <p> <b>DOB:</b> {student.dob ? student.dob.substring(0,10) : ""} </p>
                        <p> <b>Phone:</b> {student.phone} </p>
                        <button onClick={()=>setEditStudent(student)}> Update </button> <br/>
                        <button onClick={()=>deleteStudent(student.id)}> Delete </button>
                    </div>
                ))
            }
        </div>
    );
}
export default StudentList;