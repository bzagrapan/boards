import React, { useState } from "react";
import { axiosInstance } from "../services/Axios";
import Board from "../components/Board/Board";
import Link from "next/link";
import AddItem from "../components/AddItem/AddItem";

//Get boards data on the server side.
export const getServerSideProps = async () => {
  //return this object in case of error
  const errorProps = { props: { boards: [] } };

  try {
    //This localhost uri would change dynamically depending on it's environment. For the testing purposes, I left it hardcoded.
    const apiUrl = "http://localhost:3000/api/boards";
    const res = await axiosInstance.get(apiUrl);

    if (res.status !== 200) {
      // If error occurs, log it
      console.error("Error fetching boards data:", res.statusText);
      return errorProps;
    }

    const boards = res.data.data;
    return {
      props: { boards },
    };
  } catch (error) {
    console.log(error);
    return errorProps;
  }
};

function BoardsPage({ boards }) {
  const [currentBoards, setCurrentBoards] = useState(boards);

  const addBoard = async (newBoard) => {
    axiosInstance
      .post("/api/boards", newBoard)
      .then((newBoards) => {
        const boardsArr = newBoards?.data?.data;
        console.log(boardsArr);
        boardsArr && setCurrentBoards(boardsArr);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <h1 className="header">Boards page</h1>
      <div className="boards-wrapper">
        {currentBoards.map((item) => {
          return (
            <Link key={item.id} href={`/board/${item.id}`}>
              <Board name={item.name} />
            </Link>
          );
        })}
        <AddItem
          label={"Add new board"}
          handleAddItem={(newBoard) => addBoard(newBoard)}
          type="board"
        />
      </div>
    </div>
  );
}

export default BoardsPage;
