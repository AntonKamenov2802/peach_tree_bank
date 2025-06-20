import uvicorn


def main():
    print("Starting server...")
    uvicorn.run("api.app:app", host="0.0.0.0", port=8080)


if __name__ == "__main__":
    main()
