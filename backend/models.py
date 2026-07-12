from pydantic import BaseModel
class Student(BaseModel):
    name:str
    age:int
    department:str
    email:str
    dob:str
    phone:str