# Information :-

1. backend as well as frontend are open to port(4200) of docker from outside, although backend is running at 3000 and frontend on 4200 inside docker. The internal configurations are handled by nginx.

2. backend configurations can be changed from docker-compose.yml, as of now only api response size limit is available with default value of 10.

3. frontend configurations are available in environments file.

   ```
   // httpUrl -> url to call http request to api
   // searchLength -> minimum search keyword length
   // defaultDebounceTime -> default debounce time for change in input field.
   ```

## Requirements :-

1. docker

## Instructions to start (As per linux):-

1. To start, after downloading and unzipping the folder. run below command inside root directory.

   ```
   docker-compose up --build
   ```

2. If you want to set response output limit to be more than 10, change the LIMIT in **docker-compose.yml** and restart using below -

   ```
   docker-compose up
   ```

## Backend :-

1. api request can be done to default port 4200(docker), which again can be configured to change in **docker-compose.yml**.

   ```
   // request
   curl --location --request GET 'localhost:4200/api/searchCountries/ind'

   // response
   [{"name":"India","code":"IN"},{"name":"Indonesia","code":"ID"},{"name":"British Indian Ocean Territory","code":"IO"}]
   ```

## Frontend :-

1. Once docker is up and running connect to "http://localhost:4200/" in new tab.
