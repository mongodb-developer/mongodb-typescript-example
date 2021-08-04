import Game from "../models/game.interface";
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

let client: mongoDB.MongoClient;
let db: mongoDB.Db;
let gamesCollection: mongoDB.Collection;

export const initService = async () => {
    // Pulls in the .env file so it can be accessed from process.env. No path as .env is in root, the default location
    dotenv.config();

    // Create a new MongoDB client with the connection string from .env
    client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    try {

        await client.connect();
        // Connect to the database with the name specified in .env
        db = client.db(process.env.DB_NAME);
        // Connect to the collection with the specific name from .env, found in the database previously specified
        gamesCollection = db.collection(process.env.GAMES_COLLECTION_NAME);

        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
    } catch(ex)
    {
        console.log(ex.message);
    }
}

export const create = async (newGame: Game) => {
   const result = await gamesCollection.insertOne(newGame);

   if(result) {
    console.log(`New document added with name: ${newGame.name} and id: ${result.insertedId}`);
    return true;
   }
   else {
       console.log(`Error adding new document to the collection with name ${newGame.name}`);
       return false;
   }
}

export const readAll = async () => {

    // Call find with an empty filter object, meaning it returns all documents in the collection. Saves as Game array to take advantage of types
    const games = await gamesCollection.find({}).toArray() as Game[];
    games.forEach(game => console.log(`Name: ${game.name}`));

    return games;
}

export const read = async (id: string) => {
    // _id in MongoDB is an objectID type so we need to find our specific document by querying
    const query = {_id: new mongoDB.ObjectId(id)};
    const result = await gamesCollection.findOne(query) as Game;

    console.log(result)

    return result;
}

export const update = async (id: string, newGame: Game) => {
    const query = {_id: new mongoDB.ObjectId(id)};
    const result = await gamesCollection.updateOne(query, {$set: newGame});


    if(result.modifiedCount > 0)
    {
        console.log(`Updated document ${id} - ${newGame.name}`);
        return true;
    }
    else {
        console.log(`Updated unsuccessful for document ${id}`);
        return false;
    }
}

export const deleteOne = async (id: string) => {
    const query = {_id: new mongoDB.ObjectId(id)};
    const result = await gamesCollection.deleteOne(query);

    if(result.deletedCount > 0)
    {
        console.log(`Deleted document ${id}`);
        return true;
    }
    else {
        console.log(`Delete unsuccessful for document ${id}`);
        return false;
    }
}