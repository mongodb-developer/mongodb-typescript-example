import * as mongoDB from "mongodb";
import Game from "../models/game";
import { collections } from "./database.service";

export const create = async (newGame: Game) => {
    const result = await collections.games.insertOne(newGame);

    if (result) {
        console.log(`New document added with name: ${newGame.name} and id: ${result.insertedId}`);
        return true;
    } else {
        console.log(`Error adding new document to the collection with name ${newGame.name}`);
        return false;
    }
};

export const readAll = async () => {
    // Call find with an empty filter object, meaning it returns all documents in the collection. Saves as Game array to take advantage of types
    const games = (await collections.games.find({}).toArray()) as Game[];
    return games;
};

export const read = async (id: string) => {
    // _id in MongoDB is an objectID type so we need to find our specific document by querying
    const query = { _id: new mongoDB.ObjectId(id) };
    const result = (await collections.games.findOne(query)) as Game;

    return result;
};

export const update = async (id: string, newGame: Game) => {
    const query = { _id: new mongoDB.ObjectId(id) };
    // $set adds or updates all fields
    const result = await collections.games.updateOne(query, { $set: newGame });

    if (result.modifiedCount > 0) {
        console.log(`Updated document ${id} - ${newGame.name}`);
        return true;
    } else {
        console.log(`Updated unsuccessful for document ${id}`);
        return false;
    }
};

export const deleteOne = async (id: string) => {
    const query = { _id: new mongoDB.ObjectId(id) };
    const result = await collections.games.deleteOne(query);

    if (result.deletedCount > 0) {
        console.log(`Deleted document ${id}`);
        return true;
    } else {
        console.log(`Delete unsuccessful for document ${id}`);
        return false;
    }
};
