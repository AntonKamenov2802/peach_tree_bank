import uvicorn
from sqlmodel import Session
from sqlalchemy.exc import IntegrityError
from database.utils import engine
from database.models import User

def main():
    # Create a default admin user for testing
    try:    
        with Session(engine) as session:
            session.add(User(username="admin", password="admin"))
            session.commit()
    except IntegrityError:
        print("User admin already created.")

    print("Starting server...")
    uvicorn.run("api.app:app", host="0.0.0.0", port=8080)
    


if __name__ == "__main__":
    main()
