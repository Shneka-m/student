import React, {useState,useEffect} from "react";
import API from "../api";
function StudentForm({editStudent,setEditStudent,setRefresh}){
    const emptyStudent={
        name: "",
        age: "",
        department: "",
        email: "",
        dob: "",
        phone: ""
    };
    const [student,setStudent]=useState(emptyStudent);
    useEffect(()=>{
        if(editStudent){
            setStudent({
                name: editStudent.name,
                age: editStudent.age,
                department: editStudent.department,
                email: editStudent.email,
                dob: editStudent.dob,
                phone: editStudent.phone
            });
        }
    },[editStudent]);
    const handleChange=(e)=>{
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };
    const submit = async(e)=>{
        e.preventDefault();
        try{
            if(editStudent){
                await API.put(`/${editStudent.id}`,student);
                alert("Student Updated Successfully");
                setEditStudent(null);
            }
            else{
                await API.post("/",student);
                alert("Student Added Successfully");
            }
            setStudent(emptyStudent);
            setRefresh(previous=>!previous);
        }
        catch(error){
            console.log("API Error:",error);
            alert("Operation Failed");
        }
    };
    return(
        <form className="form-box" onSubmit={submit}>
            <h2>{editStudent ? "Update Student" : "Add Student"}</h2>
            <input type="text" name="name" value={student.name} placeholder="Enter Name" onChange={handleChange} required/>
            <input type="number" name="age" value={student.age} placeholder="Enter Age" onChange={handleChange} required/>
            <input type="text" name="department" value={student.department} placeholder="Enter Department" onChange={handleChange} required/>
            <input type="email" name="email" value={student.email} placeholder="Enter Email" onChange={handleChange} required/>
            <input type="date" name="dob" value={student.dob ? student.dob.substring(0,10) : ""} onChange={handleChange} required/>
            <input type="text" name="phone" value={student.phone} placeholder="Enter Phone Number" onChange={handleChange} required/>
            <button type="submit">{editStudent ? "Update Student" : "Add Student"}</button>{editStudent &&
            <button type="button" onClick={()=>{setEditStudent(null);setStudent(emptyStudent);}}> Cancel </button>
            }
        </form>
    );
}
export default StudentForm;