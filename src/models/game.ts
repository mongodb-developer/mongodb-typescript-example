// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
export default class Game 
{
    constructor(public name: string, public price: number, public category: string, public id?: ObjectId) {}
}