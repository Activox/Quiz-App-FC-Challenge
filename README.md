
# Quiz App

This app is a Simple Quiz app build with React & Django

# How to run it
 
### Backend Django
To deploy this project run first 

```bash
  cd server
```
then run
```bash
pip install -r requirements.txt
```
in order to install the requirements, then you can ensure that there is not migrations pending to create to confirm use

```bash
py migrate.py makemigration
```
then
```bash
py migrate.py migrate
```
after this run the server with
```bash
py migrate.py runserver
```
NOTE: Make sure the server is in 127.0.0.1:8000/
### Frontend

to run the react app, first open a second terminal with the backend running and do

```bash
cd client
```
then
```bash
npm install
```
now run the app with
```bash
npm run dev
```




## Authors

- [@Pottenwealder](https://github.com/Activox)
-paulguillermo19@gmail.com

