import React,{useState}from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";
function App(){
    const [editStudent,setEditStudent]=useState(null);
    const [refresh,setRefresh]=useState(false);
    return(
        <div className="container">
            <h1> Student Database Management </h1>
            <StudentForm editStudent={editStudent} setEditStudent={setEditStudent} setRefresh={setRefresh}/>
            <StudentList setEditStudent={setEditStudent} refresh={refresh}/>
        </div>
    );
}
export default App;