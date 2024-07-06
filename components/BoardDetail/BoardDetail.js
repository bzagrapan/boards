import React, { useState } from "react";
import { Card } from "@mui/material";
import styles from "./BoardDetail.module.css";
import AddItem from "../AddItem/AddItem";
import _ from "lodash";
import { axiosInstance } from "../../services/Axios";

// TODO (nice to have): In the future, list items could be draggable, so you can move them between columns.
function BoardDetail({ data }) {
  const [board, setBoard] = useState(data);

  const updateBoard = (newBoard) => {
    axiosInstance
      .post(`/api/boardDetail/${data.id}`, newBoard)
      .then((response) => {
        const boardData = response?.data?.data;
        setBoard(boardData);
      })
      .catch((e) => console.log(e));
  };

  const addItemIntoList = (listId, item) => {
    let newBoard = _.cloneDeep(board);
    let list = newBoard.lists.find((list) => {
      return list.id === listId;
    });

    list.items.push(item);

    updateBoard(newBoard);
  };

  const addNewList = (list) => {
    let newBoard = _.cloneDeep(board);
    newBoard.lists.push(list);

    updateBoard(newBoard);
  };

  return (
    <div className={styles.boardDetailListWrapper}>
      {board.lists.map((list) => {
        return (
          <Card key={list.id}>
            <div
              className={styles.boardDetailListWrapper}
              style={{ flexDirection: "column" }}
            >
              <h3>{list.name}</h3>
              {list.items.map((item) => {
                return (
                  <Card key={item.id} sx={{ width: "100%" }}>
                    <div className={styles.itemWrapper}>{item.name}</div>
                  </Card>
                );
              })}
              <AddItem
                handleAddItem={(item) => addItemIntoList(list.id, item)}
                label="Add new item"
                type="item"
              />
            </div>
          </Card>
        );
      })}
      <div>
        <AddItem
          label="Add new list"
          type="list"
          handleAddItem={(item) => addNewList(item)}
        />
      </div>
    </div>
  );
}

export default BoardDetail;
