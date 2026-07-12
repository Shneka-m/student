from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Student
from database import student_collection
from bson import ObjectId
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
def student_detail(student):
    return {
        "id":str(student["_id"]),
        "name":student["name"],
        "age":student["age"],
        "department":student["department"],
        "email":student["email"],
        "dob":student["dob"],
        "phone":student["phone"]
    }
@app.post("/api/students")
def create_student(student:Student):
    result=student_collection.insert_one(
        student.dict()
    )
    return {
        "message":"Student created",
        "id":str(result.inserted_id)
    }
@app.get("/api/students")
def get_students():
    students=[]
    for student in student_collection.find():
        students.append(student_detail(student))
    return students
@app.get("/api/students/{id}")
def get_student(id:str):
    student=student_collection.find_one(
        {
            "_id":ObjectId(id)
        }
    )
    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )
    return student_detail(student)
@app.put("/api/students/{id}")
def update_student(id:str,student:Student):
    result=student_collection.update_one(
        {
            "_id":ObjectId(id)
        },
        {
            "$set":student.dict()
        }
    )
    if result.modified_count==0:
        raise HTTPException(
            status_code=404,
            detail="Student not updated"
        )
    return {
        "message":"Student updated"
    }
@app.delete("/api/students/{id}")
def delete_student(id:str):
    result=student_collection.delete_one(
        {
            "_id":ObjectId(id)
        }
    )
    if result.deleted_count==0:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )
    return {
        "message":"Student deleted"
    }
