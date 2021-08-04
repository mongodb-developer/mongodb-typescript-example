import { ObjectId }from "mongodb";

interface IGame {
    id?: ObjectId;
    name: string;
    price: number;
    category: string;
}


export default class Game implements IGame {
    id?: ObjectId;
    name: string;
    price: number;
    category: string;

    constructor(name: string, price: number, category: string, id?: ObjectId) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.id = id;
    }
}