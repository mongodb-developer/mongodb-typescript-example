import express from "express";
import { connectToDatabase } from "./services/database.service"
import { gamesRouter } from "./routes/games.router";

const app = express();
const port = 8080; // default port to listen

// ** TODO ** Replace this code with a call to your games router class to handle all calls to /games endpoint
connectToDatabase()
    .then(() => {
        app.use("/games", gamesRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });