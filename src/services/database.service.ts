import { Express as ExpressApp } from "express";
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { games?: mongoDB.Collection } = {};

export async function connectToDatabase(app: ExpressApp) {
    // Pulls in the .env file so it can be accessed from process.env. No path as .env is in root, the default location
    dotenv.config();

    // Create a new MongoDB client with the connection string from .env
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    // Connect to the cluster
    await client.connect();

    // Connect to the database with the name specified in .env
    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    // Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Game model, even if added elsewhere.
    // For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
    await db.command({
        collMod: process.env.GAMES_COLLECTION_NAME,
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "price", "category"],
                additionalProperties: false,
                properties: {
                    _id: {},
                    name: {
                        bsonType: "string",
                        description: "'name' is required and is a string",
                    },
                    price: {
                        bsonType: "number",
                        description: "'price' is required and is a number",
                    },
                    category: {
                        bsonType: "string",
                        description: "'category' is required and is a string",
                    },
                },
            },
        },
    });

    // Connect to the collection with the specific name from .env, found in the database previously specified
    const gamesCollection: mongoDB.Collection = db.collection(process.env.GAMES_COLLECTION_NAME);

    // Persist the connection to the Games collection
    collections.games = gamesCollection;

    console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`
    );
}
