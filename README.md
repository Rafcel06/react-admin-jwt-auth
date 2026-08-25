SET UP Project CRUD and Test Server via local and SERVERLESS AWS LAMDA


TEST VIA LOCAL

 - Need for setup  

 - XAMMP    - for local database 
 - VSCODE   - to run react app locally
 - NODE.JS  - to run react app and node server locally
  


STEP 1 : After cloning repository navigate to frontend Folder and run this 
       
       - npm install 
   
       this install all the dependency you need to run the frontend 

STEP 2 : Navigate to you backend then run the same command 
 
       - npm install

       this install all the dependency that your backend need 

STEP 3 : Open your XAMMP and Navigate to mysql folder and copy the query to create Database name 
         reactAdmin and Table name users


STEP 4 : Navigate to frontend folder and run 
 
       - npm start 

       this will open a port 3000 in you browser
         
         Navigate to backend folder and run 

       - node main

STEP 5 : go to login and use this credentials to login 

       user : admin
       pass : $$_Token_auth_2026

FINAL STEP :  go to users TAB and Perform the CRUD of users




DEPLOY backend SERVERLESS VIA AWS LAMDA 

 - Need for setup  

 - AWS LAMDA  - serverless Node app
 - VSCODE     - to run React app locally
 - NODE.JS    - to run React app locally
 - NGROK      - to expose your local xammp to internet so
                AWS LAMDA reach it as tunneling

 
 STEP 1  : Navigate to you backend and run this list of command to install dependency
           of backend go to you local xammp and get the query from mysql folder to create DATABASE 
           name reactAdmin adn table named users also to create function in AWS LAMDA   

         - npm install
   
 STEP 2  : go to AWS IAM navigate to user then create user and add permission pick attach policies directly give  the user you created an administrative permission get the 
           AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY shell the run this 

         - npm install -g serverless

         - $Env:AWS_ACCESS_KEY_ID="your_actual_access_key_id"
         - $Env:AWS_SECRET_ACCESS_KEY="your_actual_secret_access_key"

           Run this to bypass safemode of shell 

         - Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

STEP 3  : RUN this command then log in to serverless using github account or google account 

         - serverless deploy



STEP 4  : After authentication follow the instruction given by serverless to    
          add the specific field needed for .yml file serverless to create function and produce url 



STEP 5  : Go to AWS LAMDA and check your serverless node app visit the url given in shell 
          you will see the message server is running Note that this backend does not have 
          DATABASE and for testing of deployment only via AWS LAMDA to use XAMMP MYSQL 
          this require tunneling like NGROK to expose you local database to internet so 
          AWS LAMDA can reach you local

FINAL STEP  : Go to xammp Config click my.ini check for this 

              bind-address - change this if this not comment out from 127.0.0.1 to 0.0.0.0 

              run this in bash 

              - ngrok config add-authtoken YOUR_AUTHTOKEN_HERE_NGROK
              - ngrok tcp 3306

              In your backend go to public > db open database.js you will see this replce this as NGROK given 

              const dbConfig = {
               connectionLimit: 10, 
               host: 'localhost', replace to something like this - 0.tcp.ngrok.io
               port :    ,        replace in port given by ngrok something like this -  14829
               user: 'root', 
               password: '',
               database: 'reactAdmin', // name this base on your db
               charset: 'utf8mb4' 
           };

              Navigate to frontend and .env replace REACT_APP_URL = to AWS LAMDA given url 
              then run this command 

              - npm start 


          
