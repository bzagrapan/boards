import { boardsDb } from "../../db";

const getBoards = async () => {
  try {
    return { data: boardsDb.list() };
  } catch (error) {
    console.log(error);
    return { data: [] };
  }
};

const updateBoards = async (req) => {
  try {
    const { body } = req;
    boardsDb.create(body);
    return { data: boardsDb.list() };
  } catch (error) {
    console.log(error);
    return { data: [] };
  }
};

//This API function is available at /api/boards
export default async function handler(req, res) {
  // For time reasons, I expect only either GET or POST.
  const boards =
    req.method === "GET" ? await getBoards() : await updateBoards(req);
  res.status(200).json(boards);
}
