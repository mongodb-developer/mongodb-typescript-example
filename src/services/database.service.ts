// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
const mongoose = require('mongoose')

// Global Variables
export const collections: { games?: mongoDB.Collection } = {}
// Initialize Connection
export async function connectToDatabase () {
    dotenv.config();

    mongoose.connect('mongodb://localhost/test')

    mongoose.connection.once('open', function(){
    console.log('connection has been made')
}).on('error', function(error: any){
    console.log('connection error', error)
})
 
    /*
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const gamesCollection: mongoDB.Collection = db.collection(process.env.GAMES_COLLECTION_NAME);
 
  collections.games = gamesCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);*/
 }