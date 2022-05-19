# pull official base image
FROM python:3.10-slim-buster

# set working directory
WORKDIR /usr/src/app

# set environment variables
ENV FLASK_APP manage.py
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install system dependencies
RUN apt-get update && apt-get install -y netcat
RUN apt-get install curl -y

# copy dependencies
COPY requirements/common.txt requirements/common.txt
COPY requirements/production.txt requirements/production.txt

# install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements/production.txt

# copy source code
COPY app app
# COPY migrations migrations
COPY manage.py config.py public_ip.py ./

# runtime configuration
EXPOSE 5000

CMD ["python3", "-u", "manage.py", "run", "-h", "0.0.0.0"]
