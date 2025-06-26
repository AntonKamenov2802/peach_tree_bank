# Use Python Image as our base image for the back-end component of the system
FROM python:3.13.5 AS base  

# Install uv in the container for our package manager
RUN pip install uv 

#=== Production ===#
FROM base AS prod

COPY . app
WORKDIR /app/peach_tree_bank
# RUN uv sync --locked
CMD [ "uv", "run", "src/main.py" ]
    


#=== Development ===#
FROM base AS dev

RUN apt update && \
    apt install -y iputils-ping && \
    apt install -y git-core bash-completion && \
    apt install -y nano && \
    apt install -y sudo && \
    echo "source /usr/share/bash-completion/completions/git" >> ~/.bashrc
