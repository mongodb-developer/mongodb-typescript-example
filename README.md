![MongoDB and Typescript logo banner](./images/banner.png)

## Introduction
Welcome to this MongoDB and Typescript sample project. 
The aim of this project is to give you a working example of how you can use the power of MongoDB Atlas with Typescript and Express to create modern web applications.

## Running the project
In order to run this project:

1. Create a .env file in the root of the project with the same properties as env.example
2. Update the values with your connection string, database name and collection name
    * **Note** - you will need an existing collection so make sure to create one, even if it is empty, before continuing
3. run `npm run start`

## Branches
This app has two branches `main` and `finish`.

`main` contains the boilerplate code to get you started, following the instructions in the companion blog post (TBA).

`finish` contains a working example complete with CRUD operations and schema validation. This is how `main` will look after following the tutorial. This also gives a working example for anyone looking for a final copy and not intending to follow the post.

## Getting to know the code

The below diagram shows the overall architecture of the diagram and the following sections will explain the code.

![Architecture diagram of the application](./images/diagram.png)

### Games Router

The games.router.ts class uses Express's Router functionality. It defines the endpoints available to clients and then makes calls to the games.service.ts class.

### Games Service

The games.service.ts class implements the Create, Read, Update, Delete (CRUD) operations, handling communicating with the database via the MongoDB npm package. 

This is also where schema validation is applied to the collection at database level.

### Models

TypeScript is an optionally statically typed language that allows for taking advantage of object-orientated programming. The games.interface.ts class creates an interface and class implementation that define the properties and data types expected in our document. We use this model throughout the code to enjoy the benefits of typed objects.

## More information

If you want more information about MongoDB and Atlas, the powerful cloud-based database solution, you can view [the documentation](https://docs.atlas.mongodb.com/).

## Disclaimer 

Use at your own risk; not a supported MongoDB product.

