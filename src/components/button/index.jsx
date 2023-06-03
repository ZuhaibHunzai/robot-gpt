import Button from "@mui/material/Button";

import { withStyles } from "@mui/styles";
/**
 * @dev custom button designed upon Material UI's Button component. It accepts all props the MuI button accepts. moreover, the following props have been overridden. the default styles is contained primary
 * @props variant can be either contained or outlined
 * @props color can be primary or secondary
 */
export default withStyles((theme) => ({
  root: {
    textAlign: "center",

    "& .MuiButton-root": {},
  },

  outlined: {
    color: "#FFFFFF !important",
    background: "linear-gradient(39.97deg, #F3AF00 49.86%, #FFE921 79.29%)",
    textTransform: "capitalize !important",
    border: " none !important",
    borderRadius: "10px !important",
    padding: " 5px 40px !important",
    fontSize: "18px !important",
    fontWeight: "700 + !important",

    "&:hover": {
      outlineColor: "rgba(255, 255, 255, 0)",
      outlineOffset: 15,
      textShadow: " 1px 1px 2px #FFE921",
      cursor: "pointer",
    },
  },
}))(Button);
