## Fizz Buzz

To run the fizz buzz program: `yarn fizzbuzz`


## Vehicle Fleet Parking Management
 
I have used Prettier to make the code more consistent throughout the codebase.

To persist the data, I use a JSON file because it seems to be a lightweight solution and faster to implement than using any ORM framework. For a larger project and to improve maintainability, I would have used Prisma.js with a PostgreSQL database. With that solution, it would be easier to create relationships between database datas.

### CLI Fleet Management
```shell
./fleet create <fleetId> 
./fleet register-vehicle <fleetId> <vehiclePlateNumber>
./fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]
```

### Test
Use yarn test to run the Cucumber tests.

## Setting Up a Better Project
To set up a better project, I would have at least three branches in my GitHub repository:

    --main (Codebase deployed)
    --staging (Tests the new functionalitys developed, manage errors with merged content)
    --dev (used only for development and new functionality)

We could also implement GitHub Actions that run tests before merging into the main branch. When the main branch has been updated, there could be an automatic deployment to the server. This solution allows for safe continuous development and deployment.