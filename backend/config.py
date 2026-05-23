from dotenv import load_dotenv
import os

load_dotenv()


class Config:
    MONGO_URI = os.getenv("MONGO_URI")
    JWT_SECRET = os.getenv("JWT_SECRET")
    PORT = int(os.getenv("PORT", 5000))
