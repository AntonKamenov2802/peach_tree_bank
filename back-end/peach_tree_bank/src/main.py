import uvicorn
from sqlmodel import Session
from database.utils import engine
from database.models import User

def main():
    # Create a default admin user for testing
    with Session(engine) as session:
        session.add(User(username="admin", password="admin"))
        session.commit()

    print("Starting server...")
    uvicorn.run("api.app:app", host="0.0.0.0", port=8080)
    


if __name__ == "__main__":
    main()
