import express from "express";
import * as GamesService from "./services/games.service";
import { gamesRouter } from "./routes/games.router";

const app = express();
const port = 8080; // default port to listen

app.use("/games", gamesRouter); // send all calls to /games to our gamesRouter

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
    // initService initiates the connection to our Atlas cluster
    GamesService.initService();
});
