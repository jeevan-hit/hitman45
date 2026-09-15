from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI(
    title="CareNova Healthcare API"
)


# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# Appointment data structure
class Appointment(BaseModel):

    name: str

    email: str

    date: str

    department: str


# Home API
@app.get("/")
def home():

    return {
        "status": "success",
        "message": "CareNova Healthcare API is running"
    }


# Appointment API
@app.post("/appointments")
def create_appointment(
    appointment: Appointment
):

    print("New appointment:")
    print(appointment)

    return {
        "status": "success",

        "message":
        f"Appointment request received for {appointment.name}."
    }
