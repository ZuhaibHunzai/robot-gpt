import { makeStyles } from "@mui/styles";
import Countdown from "react-countdown";

export const CountDownTimer = ({ time }) => {
  const classes = useStyles();
  return <Countdown className={classes.counterMain} date={time} />;
};

const useStyles = makeStyles((theme) => ({
  counterMain: {
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "Montserrat",
    color: "#FFE921",
  },
}));
