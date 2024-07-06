import React from "react";
import { Card, CardActionArea } from "@mui/material";
import styles from "./Board.module.css";

// TODO: With more time, I could fiddle more with visuals.
function Board({ name }) {
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardActionArea>
        <div className={styles.boardBasicWrapper}>{name}</div>
      </CardActionArea>
    </Card>
  );
}

export default Board;
