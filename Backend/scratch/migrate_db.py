from sqlalchemy import create_engine, text
import os
import urllib.parse
from dotenv import load_dotenv

load_dotenv()

# Securely encode password for URL
password = urllib.parse.quote_plus("Kka@#1610")
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", f"postgresql://postgres:{password}@localhost:5432/leafguard")

engine = create_engine(SQLALCHEMY_DATABASE_URL)

def migrate():
    with engine.connect() as conn:
        print("Checking for 'is_expert' column in 'users' table...")
        try:
            # Check if column exists
            result = conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name='users' AND column_name='is_expert'"))
            column_exists = result.fetchone()
            
            if not column_exists:
                print("Adding 'is_expert' column to 'users' table...")
                conn.execute(text("ALTER TABLE users ADD COLUMN is_expert BOOLEAN DEFAULT FALSE"))
                conn.commit()
                print("Column added successfully!")
            else:
                print("Column 'is_expert' already exists.")
                
        except Exception as e:
            print(f"Error during migration: {e}")

if __name__ == "__main__":
    migrate()
