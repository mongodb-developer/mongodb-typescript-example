import { ObjectId } from "mongodb";

export default interface Game {
    name: string;
    price: number;
    category: string;
    id?: ObjectId;
}
