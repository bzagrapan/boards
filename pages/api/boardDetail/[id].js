import { boardsDb } from "../../../db";

const getBoard = async (req) => {
  try {
    return { data: boardsDb.get(req.query.id) };
  } catch (error) {
    console.log(error);
    return { data: [] };
  }
};

const updateBoard = async (req) => {
  try {
    const { body } = req;
    boardsDb.create(body);
    return { data: boardsDb.list() };
  } catch (error) {
    console.log(error);
    return { data: [] };
  }
};

//This API function is available at /api/boardDetail/{ID}
export default async function handler(req, res) {
  // For time reasons, I expect only either GET or POST.
  const board =
    req.method === "GET" ? await getBoard(req) : await updateBoard(req);
  res.status(200).json(board);
}
