import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

export default function Banner() {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div className={classes.inner}>
        <Typography className="textt" variant="h4">
          PLAYGROUND
        </Typography>
        <Typography className="textt1" variant="h4">
          {" "}
          ROBOTGPT
        </Typography>
      </div>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  main: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    rowGap: " 20px  ",
  },

  inner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    rowGap: 10,
    alignItems: "center",

    "& .textt": {
      fontFamily: "Montserrat",
      fontSize: 28,
      fontWeight: 700,
      color: "#F9A220",
      textTransform: "uppercase",
      letterSpacing: 30,
      [theme.breakpoints.down("sm")]: {
        letterSpacing: 14,
        fontSize: 15,
      },
    },
    "& .textt1": {
      fontFamily: "Montserrat",
      fontSize: 28,
      fontWeight: 700,
      color: "#F9A220",
      textTransform: "uppercase",
      letterSpacing: 30,
      [theme.breakpoints.down("sm")]: {
        letterSpacing: 14,
        fontSize: 15,
      },
    },
  },
}));
