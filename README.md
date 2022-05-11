# react_native-python_flask-sql-nignx-with-authentication-boilerplate

There are 2 apps in this repository: the backend micro service and the frontend client. The backend is managed by python and flask + any SQL DB. The frontend is built with react-native. There is already implemented the auth service in both sides.
There are 2 main pages in a StackNavigator: Login and Register. The state of app is managed by Redux and after a successful login there is a TabNavigator template ready to be filled.

# Environment Setup
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
(venv) $ pip install -r server/requirements/common.txt
```
To increase the security of your application, it is a good idea to configure a difficult-to-guess string as the application’s secret key, which is used to sign the user session and the authentication tokens. The Config base class in server includes the SECRET_KEY attribute for this purpose, and sets its value from an environment variable of the same name if it exists. When working on the application in your development system it is okay to leave this variable undefined and let the Config class configure a hardcoded value, but on a production platform it is extremely important to set a strong secret key that is not known to anyone, since a leaked key will enable an attacker to forge the contents of the user session or generate valid tokens. To make your key secure, just set the SECRET_KEY environment variable to a unique string that is not stored anywhere.

There are many ways to generate random strings that are appropriate to be used as secret keys. You can do so with Python as follows:
```sh
(venv) $ python3 -c "import uuid; print(uuid.uuid4().hex)"
d68653675379485599f7876a3b469a57
```
You can add this secret in environment variables as follows:
```sh
SECRET_KEY="d68653675379485599f7876a3b469a57"
```

# Quick Start End to End Pipeline
```
$ docker-compose down -v
$ docker-compose up -d --build --scale worker=4
```

UI Application will be up at http://localhost:3007

APIs will be up at http://localhost:5004/
Example: http://localhost:5004/check, http://localhost:5004/api/v1/users/check, http://localhost:5004/api/v1/delay/check

# Quick Start for Production
```
$ docker-compose -f docker-compose.prod.yml down -v
$ docker-compose -f docker-compose.prod.yml up -d --build --scale worker=4
```

UI Application will be up at http://localhost:3007

APIs will be up at http://localhost:1337/
Example: http://localhost:1337/check, http://localhost:1337/api/v1/users/check, http://localhost:1337/api/v1/delay/check

# Load balance in production

```
$ docker-compose -f docker-compose.prod.scale.yml down -v
$ docker-compose -f docker-compose.prod.scale.yml up -d --build --scale worker1=4 --scale worker2=2
```

UI Application will be up at http://localhost:3007

APIs will be up at http://localhost:1337/

Example: http://localhost:1337/check, http://localhost:1337/api/v1/users/check, http://localhost:1337/api/v1/delay/check


# Docker Installation steps

## In Windows Machine
---

### Step1: Download Docker Desktop
For windows download [Docker Desktop](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe).

### Step2: Turn on some optional features on Windows 10
Turn on the Hyper-V, Virtual Machine Platform and Windows Hypervisor Platform in windows machine.

Here's how to turn on or off optional features on Windows 10 using Control Panel:
1. Open Control Panel.
2. Click on Programs.
3. Click the Turn Windows features on or off link.

### Step3: Download linux distribution
Download linux distribution [Ubuntu 20.04 LTS](https://www.microsoft.com/store/apps/9n6svws3rx71)

For more information check out the [windows subsystem for linux installation guide for windows 10](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

### Step4: Give user-group permission access
In order to install docker in windows you need to give [user-group](https://www.mtgimage.org/add-user-to-docker-users-group-windows-10/) access.

### Step5: Install Windows Terminal
Windows Terminal enables multiple tabs (quickly switch between multiple Linux command lines, Windows Command Prompt, PowerShell, Azure CLI, etc), create custom key bindings (shortcut keys for opening or closing tabs, copy+paste, etc.), use the search feature, and custom themes (color schemes, font styles and sizes, background image/blur/transparency).

Install [Windows Terminal](https://docs.microsoft.com/en-us/windows/terminal/get-started)

## In Linux Machine
---

### Step1: First, update your existing list of packages:

```
sudo apt update
```
Next, install a few prerequisite packages which let apt use packages over HTTPS:
```
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```
Then add the GPG key for the official Docker repository to your system:
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
Add the Docker repository to APT sources:
```
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
```
Next, update the package database with the Docker packages from the newly added repo:
```
sudo apt update
```
Make sure you are about to install from the Docker repo instead of the default Ubuntu repo:
```
apt-cache policy docker-ce
```
You’ll see output like this, although the version number for Docker may be different:
```
Output of apt-cache policy docker-ce
docker-ce:
  Installed: (none)
  Candidate: 5:19.03.9~3-0~ubuntu-focal
  Version table:
     5:19.03.9~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
```
Notice that docker-ce is not installed, but the candidate for installation is from the Docker repository for Ubuntu 20.04 (focal).

Finally, install Docker:
```
sudo apt install docker-ce
```
Docker should now be installed, the daemon started, and the process enabled to start on boot. Check that it’s running:
```
sudo service docker start
sudo service docker status
```
The output should be similar to the following, showing that the service is active and running:

Output
```
* Docker is running
```
Installing Docker now gives you not just the Docker service (daemon) but also the docker command line utility, or the Docker client.

### Step 2: Executing the Docker Command Without Sudo (Optional)
By default, the docker command can only be run the root user or by a user in the docker group, which is automatically created during Docker’s installation process. If you attempt to run the docker command without prefixing it with sudo or without being in the docker group, you’ll get an output like this:

Output
docker: Cannot connect to the Docker daemon. Is the docker daemon running on this host?.
See ```'docker run --help'```.
If you want to avoid typing sudo whenever you run the docker command, add your username to the docker group:
```
sudo usermod -aG docker ${USER}
```
To apply the new group membership, log out of the server and back in, or type the following:
```
su - ${USER}
```
You will be prompted to enter your user’s password to continue.

Confirm that your user is now added to the docker group by typing:
```
id -nG
```
Output
```
vaibhav adm dialout cdrom floppy sudo audio dip video plugdev netdev docker
```
If you need to add a user to the docker group that you’re not logged in as, declare that username explicitly using:

```
sudo usermod -aG docker username
```
### Step3: Install docker-compose
Docker Compose relies on Docker Engine for any meaningful work, so make sure you have Docker Engine installed either locally or remote, depending on your setup.
```
sudo apt install docker-compose
```

# Acknowledgements and credits

This project is currently maintained by [Vaibhav Hiwase](https://github.com/vhiwase) and would not have been possible without the support of:

- [Michael Herman](https://github.com/mjhea0) to the community with his blog post on [Dockerizing Flask with Postgres, Gunicorn, and Nginx](https://testdriven.io/blog/dockerizing-flask-with-postgres-gunicorn-and-nginx/) and [Asynchronous Tasks with Flask and Redis Queue](https://testdriven.io/blog/asynchronous-tasks-with-flask-and-redis-queue/)
- [Miguel Grinberg](https://github.com/miguelgrinberg) by his awesome book on [Flask Web Development, 2nd Edition](https://www.oreilly.com/library/view/flask-web-development/9781491991725/) and [tutorial](https://www.flaskbook.com/).