from pymongo import MongoClient
MONGO_URI="mongodb+srv://shneka17_db_user:5G7KZPMev5QSbEQg@studentdatabasemanageme.5vk2erd.mongodb.net/"
DATABASE_NAME="studentDB"
client=MongoClient(MONGO_URI)
database=client[DATABASE_NAME]
student_collection=database["students"]
