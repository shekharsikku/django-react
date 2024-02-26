# Music Controller Web App

**Full Stack Web App using Django & React**

## Setup Instructions

### Create Virtual Environment

```bash
python -m venv (virtual environment name)
```

### Activate Virtual Environment

```bash
source (virtual environment name)/Scripts/activate
```

### Install Required Modules

```bash
python -m pip install -r requirements.txt
```

### Start Web Server

To start the web server you need to run the following sequence of commands.
```bash 
cd music
```

Next run the django web server.
```bash
python manage.py runserver
```

### Install Node Modules

First cd into the ```frontend``` folder.
```bash
cd frontend
```
Next install all dependencies.
```bash
npm i
```

### Compile the Front-End

Run the production compile script
```bash
npm run build
```
or for development:
```bash
npm run dev
```

***
