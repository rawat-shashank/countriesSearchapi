## Requirements :-

1. docker

## Instructions (As per linux):-

1. To start, after downloading and unzipping the folder. run below command inside root directory.

   ```
   docker-compose up --build
   ```

2. If you want to set response output limit to be more than 10, change the LIMIT in **docker-compose.yml** and restart using below -

   ```
   docker-compose up
   ```

3. Once the docker is up and running, it will output below output

   ```
   api_1    | [nodemon] starting `node server.js`
   api_1    | Node server started
   ```

4. api request can be done to default port 3000, which again can be configured to change in **docker-compose.yml**.

   ```
   // request
   curl --location --request GET 'localhost:3000/api/searchCountries/ind'

   // response
   [{"name":"India","code":"IN"},{"name":"Indonesia","code":"ID"},{"name":"British Indian Ocean Territory","code":"IO"}]
   ```
