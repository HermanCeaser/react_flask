# Azure Custom Vision Payslip Classification Training

There are 2 apps in this repository: the backend micro service and the frontend client. The backend is managed by python and flask + any SQL DB. The frontend is built with react-native. There is already implemented the auth service in both sides.
There are 2 main pages in a StackNavigator: Login and Register. The state of app is managed by Redux and after a successful login there is a TabNavigator template ready to be filled.

# Redis Dashboard

[rq-dashboard](https://github.com/Parallels/rq-dashboard) is a general purpose, lightweight, Flask-based web front-end to monitor your RQ queues, jobs, and workers in realtime.

---

## Delete __pycache__ files
```sh
find . | grep -E "(__pycache__|\.pyc|\.pyo$)" | xargs rm -rf
```

## Github Action

Most of the Azure services use user-level Azure credentials i.e., Azure Service Principal for deployments.

Follow the steps to create the Azure credentials (Service Principal) : * Run the below [az cli](https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest) command.

### [Set secret with Azure Credentials](https://github.com/Azure/actions-workflow-samples/blob/master/assets/create-secrets-for-GitHub-workflows.md#set-secret-with-azure-credentials)


```sh
az ad sp create-for-rbac --name "myApp" --role contributor \
                            --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group} \
                            --sdk-auth
```

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

# Quick Start for Production
```
$ docker-compose -f docker-compose.prod.yml down -v
$ docker-compose -f docker-compose.prod.yml up -d --build --scale worker=4
```

UI Application and APIs will be up at http://localhost:3000

APIs will be up at http://localhost:3000/
Example: http://localhost:3000/check, http://localhost:3000/api/v1/users/check, http://localhost:3000/api/v1/delay/check

# Tree of Production
Go to master container and type below command
```
cd /app
python
```
```
>>> import os
def list_files(startpath):
    for root, dirs, files in os.walk(startpath):
        level = root.replace(startpath, '').count(os.sep)
        indent = ' ' * 4 * (level)
        print('{}{}/'.format(indent, os.path.basename(root)))
        subindent = ' ' * 4 * (level + 1)
        for f in files:
            print('{}{}'.format(subindent, f))

>>> list_files(startpath='.')
```
Working Directory is /app
```
./
    server/
        config.py
        manage.py
        app/
            exceptions.py
            __init__.py
            database/
                DigiCertGlobalRootCA.crt.pem
                db.py
                commonfile.py
                __init__.py
            api/
                __init__.py
                v1/
                    __init__.py
                    datastructure/
                        ds.py
                        commonfile.py
                        __init__.py
                    quicktest/
                        env.py
                        __init__.py
                        routes.py
                    users/
                        models.py
                        commonfile.py
                        __init__.py
                        routes.py
                    iteration/
                        env.py
                        __init__.py
                        routes.py
                    delay/
                        jobs.py
                        commonfile.py
                        __init__.py
                        routes.py
                    security/
                        commonfile.py
                        authentication.py
                        __init__.py
                    upload/
                        env.py
                        __init__.py
                        routes.py
                    common/
                        utils.py
                        commonfile.py
                        job_callbacks.py
                        __init__.py
    requirements/
        production.txt
    build/
        robots.txt
        logo192.png
        logo512.png
        favicon.ico
        asset-manifest.json
        index.html
        manifest.json
        static/
            media/
                icon-bin.31736ba1912a8dd1a7ccd4a2ec883b27.svg
                rss_tag.eb0591134edcd259c17bdc1f1659861a.svg
                sample.68555efe97a1b7b4a144.webp
                ct_logo.ab57328da32d97d85c58.webp
                bell.cf0eff2ae5cd02b61b1b.webp
                icon-add.5a745aa9cd4ca7c8af406294f7117a2d.svg
                login_left.16b9fb8e21057b4969d710c1cc83f481.svg
                icoico.085c487019da97c5388aa144b3967ee7.svg
            css/
                main.8c09243a.css.map
                main.8c09243a.css
            js/
                main.d38db11c.js
                main.d38db11c.js.map
                787.635aedaa.chunk.js.map
                787.635aedaa.chunk.js
                main.d38db11c.js.LICENSE.txt
```


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

# Acknowledgements

This project is currently maintained by Vaibhav Hiwase.