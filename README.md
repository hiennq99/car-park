explaining the approach: 
  - With this exercise i think i will implement with this flow: 
    - Crawl all of dataset of carpark and save them to database
    - Using cronjob to update carpark information such as: available slots
    - using postges to caculate distance with latitude and long titude 
about instructions: 
  - base on nestJs so i have 2 modules there are: 
    - park: for api of carpark
    - conjob: for taks cron
how to run: 
  - run docker-compose 
  - import data csv to database postgres 
  - run yarm start
  - run yarn migration:run