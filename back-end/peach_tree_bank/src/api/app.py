from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def hellow_peach_tree():
    return "Hello Peach Tree!"
