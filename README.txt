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
       pass : 123

FINAL STEP :  go to users TAB and Perform the CRUD of users




TEST via AWS LAMDA

 - Need for setup  

 - XAMMP      - local database
 - AWS LAMDA  - serverless Node app
 - VSCODE     - to run React app locally
 - NODE.JS    - to run React app locally
 - NGROK      - to expose your local xammp to internet so
                AWS LAMDA reach it 