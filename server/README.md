
# Quick Start

Spin up the containers:

```sh
docker-compose up -d --build -V
```

Spin down the containers:
```sh
docker-compose down -v
```

Spin up and down container for development build
```sh
docker-compose -f docker-compose.dev.yml up --build --scale worker=4
docker-compose -f docker-compose.dev.yml down -v
```

Spin up and down container for production build
```sh
docker-compose -f docker-compose.prod.yml up -d --build --scale worker=4
docker-compose -f docker-compose.prod.yml down -v
```

Show logs from worker containers:
```sh
docker-compose logs --tail=0 -f worker
```

How to create new worker container from in master environment
```
docker-compose up -d -V --build
docker-compose exec master python3 -u manage.py run_worker
```

How to create another copy or scale worker container in worker environment
```
docker-compose up -d -V --build
docker-compose exec master python3 -u manage.py run_worker
```

You can view a list of all the allocated volumes in your system with
```sh
docker volume ls
```

If you prefer a more automatic cleanup, the following command will remove any unused images or volumes, and any stopped containers that are still in the system.
```sh
docker system prune --volumes
```

## Some important docker commands:
Below command will remove the following:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - all dangling build cache
```sh
docker system prune
```
Below command will remove the following:
  - all stopped containers
  - all networks not used by at least one container
  - all images without at least one container associated to them
  - all build cache
```sh
docker system prune --all --force
```
Below command will remove all docker images:
```sh
docker rmi --force $(docker images --all --quiet)
```

# Contribution

## Pre-commit
Following command will help to remove trailing-whitespace, check case conflict, check added large files,
check merge conflict by using isort, black and flake8 automation tools.
```sh
python3 pre-commit-2.15.0.pyz run  -a
```

## Delete __pycache__ files
```sh
find . | grep -E "(__pycache__|\.pyc|\.pyo$)" | xargs rm -rf
```

## Logging
[Logging in Python](https://realpython.com/python-logging/) is a very useful tool in a programmer’s toolbox. It can help you develop a better understanding of the flow of a program and discover scenarios that you might not even have thought of while developing.


## Pre-commit
Following command will help to remove trailing-whitespace, check case conflict, check added large files, check merge conflict by using isort, black and flake8 automation tools.
```sh
python3 pre-commit-2.15.0.pyz run  -a
```

## Environment Setup
The command that creates a virtual environment has the following structure:
```sh
$ sudo apt-get install python3-venv
$ python3 -m venv venv
```
If you are using Microsoft Windows, make sure you open a command prompt window using the “Run as Administrator” option, and then run this command:
```sh
$ pip install virtualenv
$ virtualenv venv
```
When you want to start using a virtual environment, you have to “activate” it. If you are using a Linux or macOS computer, you can activate the virtual environment with this command:
```sh
$ source venv/bin/activate
```
If you are using Microsoft Windows, the activation command is:
```sh
$ venv\Scripts\activate
```
When you need to build a perfect replica of the virtual environment, you can create a new virtual environment and run the following command on it:
```sh
(venv) $ pip install -r requirements/common.txt
```
For Linux and macOS, do as follows:
```sh
(venv) $ export FLASK_APP=manage.py
(venv) $ export FLASK_DEBUG=1
(venv) $ export FLASK_CONFIG=development
```
And for Microsoft Windows:
```sh
(venv) $ set FLASK_APP=manage.py
(venv) $ set FLASK_DEBUG=1
(venv) $ set FLASK_CONFIG=development
```
When you are done working with the virtual environment, type ```deactivate``` at the command prompt to restore the PATH environment variable for your terminal session and the command prompt to their original states.

---

# Running a production web server
The Gunicorn web server does not work on Microsoft Windows. We can use [Waitress](https://docs.pylonsproject.org/projects/waitress/en/stable/), which is another pure Python web server that is in many ways similar to Gunicorn but has the advantage that it fully supports Window

To start the Waitress web server, use the waitress-serve command:
```sh
(venv) $ pip install -r requirements/local.txt
(venv) $ waitress-serve --port 8000 manage:app
```
This command will run the complete application on [http://localhost:8000/](http://localhost:8000/)


There are many ways to generate random strings that are appropriate to be used as secret keys. You can do so with Python as follows:
```sh
(venv) $ python3 -c "import uuid; print(uuid.uuid4().hex)"
d68653675379485599f7876a3b469a57
```

# Running the Application using flask
The application as usual:
```sh
(venv) $ python3 manage.py run
```
The ```--host``` argument is particularly useful because it tells the web server what network interface to listen to for connections from clients. By default, Flask’s development web server listens for connections on localhost, so only connections originating from the computer running the server are accepted. The following command makes the web server listen for connections on the public network interface, enabling other computers in the same network to connect as well:
```sh
(venv) $ python3 manage.py run --host 0.0.0.0
```
The ```--reload```, ```--no-reload```, ```--debugger```, and ```--no-debugger``` options provide a greater degree of control on top of the debug mode setting.


# Unit Tests
The unit tests can be executed as follows:
```sh
(venv) $ python3 manage.py test
```
Code coverage tools measure how much of the application is exercised by unit tests and can provide a detailed report that indicates which parts of the application code are not being tested.
```sh
(venv) $ python3 manage.py test --coverage
```
# Database Migrations
To expose the database migration commands, Flask-Migrate adds a python3 manage.py db command with several subcommands. When you work on a new project, you can add support for database migrations with the init subcommand:
```sh
(venv) $ python3 manage.py db init
```

Regardless of the source of the database URL, the database tables must be created for the new database. When working with Flask-Migrate to keep track of migrations, database tables can be created or upgraded to the latest revision with a single command:

For Windows:
```sh
(venv) $ set FLASK_CONFIG=development
(venv) $ python3 manage.py db upgrade
INFO  [alembic.runtime.migration] Context impl SQLiteImpl.
INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
```

For Linux:
```sh
(venv) $ set FLASK_CONFIG=development
(venv) $ python3 manage.py db upgrade
INFO  [alembic.runtime.migration] Context impl SQLiteImpl.
INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
```

The brute-force solution to update existing database tables to a different schema is to remove the old tables first:
```sh
(venv) $ python3 manage.py shell
>>> db.drop_all()
>>> db.create_all()
```
Unfortunately, this method has the undesired side effect of destroying all the data in the old database

## Creating a Migration Script
To make changes to your database schema with Flask-Migrate, the following procedure needs to be followed:

- Make the necessary changes to the model classes.
- Create an automatic migration script with the flask db migrate command.
- Review the generated script and adjust it so that it accurately represents the changes that were made to the models.
- Add the migration script to source control.
- Apply the migration to the database with the flask db upgrade command.

The ```python3 manage.py db migrate``` subcommand creates an automatic migration script:
```sh
(venv) $ python3 manage.py db migrate -m "initial migration"

INFO  [alembic.runtime.migration] Context impl SQLiteImpl.
INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
INFO  [alembic.autogenerate.compare] Detected added table 'users'
INFO  [alembic.autogenerate.compare] Detected added index 'ix_users_username' on '['username']'
Generating react_native-python_flask-sql-nignx-with-authentication-boilerplate\server\migrations\versions\5b4cb344846f_initial_migration.py ...  done

```
## Upgrading the Database
Once a migration script has been reviewed and accepted, it can be applied to the database using the flask db upgrade command:
```sh
(venv) $ python3 manage.py db upgrade

INFO  [alembic.runtime.migration] Context impl SQLiteImpl.
INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade  -> 5b4cb344846f, initial migration
```

# Testing Web Services with HTTPie
To test a web service, an HTTP client must be used. The two most used clients for testing Python web services from the command line are cURL and HTTPie. While both are useful tools, the latter has a much more concise and readable command line syntax that is tailored specifically to API requests.

Assuming the development server is running on the default http://127.0.0.1:5000 address, a GET request can be issued from another terminal window as follows:

```sh
http --json GET http://localhost:5000/check
```

```sh
http --json GET http://localhost:5000/api/v1/users/check
```

```sh
http --json GET http://localhost:5000/api/v1/delay/check
```

# Source Code Profiling

Another possible source of performance problems is high CPU consumption, caused by functions that perform heavy computing. Source code profilers are useful in finding the slowest parts of an application. A profiler watches a running application and records the functions that are called and how long each takes to run. It then produces a detailed report showing the slowest functions.

Profiling is typically done only in a development environment. A source code profiler makes the application run much slower than normal, because it has to observe and take notes on all that is happening in real time. Profiling on a production system is not recommended, unless a lightweight profiler specifically designed to run in a production environment is used.

When the application is started with ```python3 manage.py profile```, the console will show the profiler statistics for each request, which will include the slowest 25 functions. The ```--length``` option can be used to change the number of functions shown in the report. If the ```--profile-dir``` option is given, the profile data for each request is saved to a file in the given directory. The profiler data files can be used to generate more detailed reports that include a call graph.

Below command is working in older version of [flask](https://github.com/pallets/flask/pull/2781). Some other solutions are [here](https://github.com/pallets/flask/issues/2776)


```sh
(venv) $ python3 manage.py profile
```

Or with some optional parameters as given below:

```sh
(venv) $ python3 manage.py profile --length=25 --profile-dir=profile_dir
```
Here profile_dir will get created for source code profiling

# Get help
We can get help with the following command.

```sh
(venv) $ python3 manage.py --help

Usage: manage.py [OPTIONS] COMMAND [ARGS]...

Options:
  --version  Show the flask version
  --help     Show this message and exit.

Commands:
  db          Perform database migrations.
  routes      Show the routes for the app.
  run         Run a development server.
  run_worker  Run application with redis workers
  shell       Run a shell in the app context.
  test        Runs the unit tests without test coverage.
```

We can also test and debug the functionality of packages created in this repo by defining them in print_commonfile.py.
For the sake of understanding we have created a commonfile.py module in each package comes under app folder.
In print_commonfile.py we are calling commonfile_function of every package mentioned above and showcasing how commonfile_function namespaces are getting defined.

you can run the following command:
```sh
python3 print_commonfile.py
```