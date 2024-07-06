import { DataStore } from "notarealdb";

const store = new DataStore("./data");

export const boardsDb = store.collection("boards");
