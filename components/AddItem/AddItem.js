import React, { useState } from "react";
import styles from "./AddItem.module.css";
import { Card, IconButton, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { green } from "@mui/material/colors";
import { v4 as uuidv4 } from "uuid";

function AddItem({ handleAddItem, label, type }) {
  const [name, setName] = useState("");

  const handleClick = () => {
    let newItem = { id: uuidv4(), name: name };
    switch (type) {
      case "board":
        newItem.lists = [];
        break;
      case "list":
        newItem.items = [];
        break;
    }

    name && handleAddItem(newItem);
  };

  return (
    <Card>
      <div className={styles.AddItemWrapper}>
        <TextField
          variant="standard"
          label={label}
          onChange={(e) => setName(e.target.value)}
        />
        <IconButton onClick={handleClick} sx={{ color: green[500] }}>
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
    </Card>
  );
}

export default AddItem;
