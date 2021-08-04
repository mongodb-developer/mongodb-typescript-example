import * as GamesService from "../services/games.service";
import express, { Request, Response } from "express";
import Game from "../models/game.interface";

export const gamesRouter = express.Router();

gamesRouter.use(express.json());

gamesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const games: Game[] = await GamesService.readAll();

        res.status(200).send(games);
    } catch (ex) {
        res.status(500).send(ex.message);
    }
});

// Example route: http://localhost:8080/games/610aaf458025d42e7ca9fcd0
gamesRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const game = await GamesService.read(req.params.id);
        if(game) {
            res.status(200).send(game);
        }
    } catch (ex) {
        res.status(404).send("Unable to find matching document with id:" + req.params.id);
    }
});

gamesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newGame: Game = req.body as Game;

        const result = await GamesService.create(newGame);

        result ? res.status(201) : res.status(500)
    } catch (ex) {
        res.status(400).send(ex.message);
        console.log(ex.message);
    }
});

gamesRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const updatedGame: Game = req.body as Game;
        const result = await GamesService.update(req.params.id, updatedGame);
        result ? res.status(200) : res.status(304);
    } catch (ex) {
        res.status(400).send(ex.message);
        console.log(ex.message);
    }
});

gamesRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const result = await GamesService.deleteOne(req.params.id);
        result ? res.status(202) : res.status(304);
    } catch (ex) {
        res.status(400).send(ex.message);
        console.log(ex.message);
    }
});

