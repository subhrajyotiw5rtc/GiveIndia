# GiveIndia

## **1- How to Configure/Run the application.**


**  MongoDB configuration in local system.**

 -   Make sure you have mongodb present inside your local system.

-    DB name should be "giveindia".

-    username = "admin"

-    password = "admin"

-   To authenticate DB server follow the below command

		   use giveindia

		   db.createUser({ user:"admin", pwd: "admin", roles: [{role: "readWrite", db: "giveindia"}] })



**How to install node modules**

    - npm install or npm install --save


**How to run the application**

    - After all module installation run "npm start" to run the node server.




## **REST API informations**


 1- **Create Customer:**

   - API url: http://localhost:3000/customer/add
   
  -    Method: POST
  
-    Payload format: {"Name":"Jyoti", "Age":30, "city":"Bangalore","Mobile":"7008025838"}

-    Set Header in postman: "Content-type:application/json"


 2- **Get all customer:**

   -  - API url: http://localhost:3000/customer/
- -    Method: GET

- -    Payload format: not required

- -    Set Header in postman: "Content-type:application/json"


3- **Create Account for customer:**

   -  API url: http://localhost:3000/account/create
-    
-     Method: POST

-     Payload format: {"CustomerID":"5f117a9e4a60263ceca49a6d", "type": "Savings", "balance":"70000"}

-    Set Header in postman: "Content-type:application/json"

  ** N:B-**

      -  you can take "**_id**" value from "**Get all customer API**" response to set the value for       "**CustomerID**".check point no-2
-      "type" value must be "Savings/Current/BasicSavings".


4- **Get account info as per customer:**

   a) API url: http://localhost:3000/account/5f117a9e4a60263ceca49a6d
   
   b) Method: GET

   c) Payload format: not required

   d) Set Header in postman: "Content-type:application/json"
  
   N:B-

    -> Last param of the above URL should be customer's ID i.e- **_id** value from "Get all customer API" response. check point no-2


5- Transfer money from one account to another account:

   
   -  API url: http://localhost:3000/account/transfer
-    
-    Method: POST

-    Payload format: {"fromAccountId":"5f1199876185f34d4244c2f5", "toAccountId":"5f119a216185f34d4244c2fa", "amount":2000}

-    Set Header in postman: "Content-type:application/json"

   **N:B-**

    -> "**fromAccountId**" and "**toAccountId**" are the two customer's account id, i.e= "**_id**" value of "**Get account info as per customer**" API response.check point no-4



**Directory structure explaination.**


 1- 3 layer architecture implementation.

 2- Logs file will give you all the logs related to error.

 3- Common files are present inside utill folder. 
