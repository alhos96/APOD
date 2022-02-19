# Astronomy photo of the day
The software system being produced is called APOD. It is application that allows customers to see photo of the day published by NASA on their birthday.

## technologies
In this MERN stack application

### frontend 
  is developed in HTML5, CSS3 and React.js Material UI library. I have also used following packages among creat-react-app preloads:
  - axios
  - formik
  - moment
  - react-big-calendar
  - react-router-dom
  - yup


### backend 
  is developed in Node.js using following packages.
  - express
  - bcrypt
  - cors
  - dotenv
  - jsonwebtoken
  - mongoose
  - multer

### Data 
  is stored in MongoDB Atlas or localy.

## description and features
The APOD app will provide following functions by role:

- **user**
- Create entries by submiting their data in a form
- Upload photo of themselves
- Navigate through calendar and checkout photos published on ther birthday
- Navigate through calendar and checkout photos published on other users birthdays

- **admin**
- Login
- Create entries
- Edit any users entry
- Delete any users entry
- Logout

#### features:
- All fields are validated and required
- User cannot enter future dates
- Users cannot acces edit form

## starting and using the application

#### backend

After cloning repository and opening it, in terminal type command `cd server` and add your own .env file with following variables: 
- **PORT** use 5000,  
- **MONGO_URI** if not provided local database will be used 
- **JWT_SECRET** 
- After that run `npm install` to install all the dependencies. This application requires data to be seeded before initial run. For that you should type `npm run seed` command while still inside server folder. After completing all these steps run `npm start` script. 

That runs the server part of application in the development mode on http://localhost:5000.

#### frontend

After you are done with backend part of application please add .env file in client folder with following variables: 
- **REACT_APP_API_KEY** and use API key you can generate on https://api.nasa.gov/index.html#browseAPI

After that in terminal type command `cd client` and run `npm install` script to install all the dependencies. After successfull instalataion run `npm start`. 

That runs the frontend part of application in the development mode.

Open http://localhost:3000 to view it in the browser. Homepage will be open with the form in which you can type your data. To login as admin please navigate to **/admin** route manualy and use following credentials: 

- **name**: admin
- **password**: 123admin123




