import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { getContractInstance } from "../../hooks/ethers-helpers";
import { contractAddress } from "../../assets/address";
import abi from "../../assets/abi.json";
import { WalletUserContext } from "../../context";
import { CountDownTimer } from "../countdown/countdownTimer";

export default function RGPTCampo() { 
  const [rgbtTimer, setrgbtTimer] = useState(null); 

  const { account, ethersProvider } = WalletUserContext();
      const [poolBalance, setPoolBalance] = useState(0); 
    const getCurrentPoolBalance = async () => {
      const contractInstance =  getContractInstance(contractAddress, abi, ethersProvider);
      try {
        const getBalance = await contractInstance.poolBalance();
        console.log(getBalance.toString(), 'balance')
        setPoolBalance(getBalance.toString());  
      } catch (err) {
        console.log(err, "error getting current pool balance");
      }
    };
    
  
  const getNextLotteryTimer = async()=>{  
    
      const contractInstance =  getContractInstance(contractAddress, abi, ethersProvider);
      try{
      console.log(contractInstance, 'instance')
      const timer = await contractInstance.lotteryEndTime();
      console.log(timer.toString());
      setrgbtTimer(timer.toString());
    }catch(err){
      console.error(err);
    }
  }

  useEffect(() => {
    if (account) {
      getNextLotteryTimer();
      getCurrentPoolBalance();
    }
  }, [account]);

 

  const classes = useStyles();
  return (
    <div className={classes.mainContainer}> 
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: 30,
            fontFamily: "Montserrat",
            color: "#FFE921",
          }}
        >
          Pool Balance {poolBalance}
        </Typography>
      </Box>{" "}
     
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: 12,
            fontFamily: "Montserrat",
            color: "#FFF",
          }}
        >
          NEXT $RGPT Distribution
        </Typography>
      </Box>{" "}
      <Box> 
        {rgbtTimer && <CountDownTimer time={parseInt(rgbtTimer) * 1000}/> }
        
      </Box>{" "}
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: 500,
    margin: "0 auto",
    padding: "20px 20px 20px 20px",
    border: "1px solid #FFFFFF",
    borderRadius: 63,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    rowGap: 20,
    [theme.breakpoints.down("sm")]: {
      width: "75%",
    },
  },
}));
