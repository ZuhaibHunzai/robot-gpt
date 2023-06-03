import React from "react";
import RGPTCampo from "../../components/tokenRGPTCampo";
import HowToPlay from "../../components/sectionHowtoplay";
import { makeStyles } from "@mui/styles";
import Banner from "../../components/banner";
import { Box, Typography } from "@mui/material";
import Background from "../../assets/main.jpg";
export default function LandingPage() {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <a href="https://www.robot-gpt.com/" target="_blank" className="annn" rel="noreferrer">
        <div className={classes.banner}>
          <Typography sx={{ color: "#fff" }}>www.robot-gpt.com</Typography>
        </div>
      </a>
      <Box className={classes.bnn}>
        {" "}
        <Banner />
      </Box>
      <RGPTCampo />
      <HowToPlay />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100vh",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    rowGap: " 20px  ",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 50,
      overflow: "scroll",
    },

    " & .annn": {
      textDecoration: "none",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  banner: {
    marginRight: -5,
    marginTop: "40px",
    right: -35,
    padding: "10px 30px 10px 30px",
    textAlign: "center",
    position: "absolute",
    transform: "rotate(46.5deg)",
    borderRadius: "10px",
    background: "linear-gradient(39.97deg, #F3AF00 49.86%, #FFE921 79.29%)",
  },

  bnn: {
    paddingTop: "30px",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "70px",
    },
  },
}));
