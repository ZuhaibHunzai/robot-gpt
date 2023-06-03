import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import Button from "../button";
import { WalletUserContext } from "../../context";
import { useWalletContext } from "../../hooks";
import { getContractInstance } from "../../hooks/ethers-helpers";
import { contractAddress, tokenAddress } from "../../assets/address";
import abi from "../../assets/abi.json";
import erc20Abi from "../../assets/erc20.json";
import { ethers } from "ethers";

export default function HowToPlay() {
  const { account, signer } = WalletUserContext();

  const { walletConnect, disconnectWallet } = useWalletContext();
  const [contractInstance, setContractInstance] = useState(null);
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [erc20contractInstance, seterc20ContractInstance] = useState(null);

  const classes = useStyles();

  //function to buy tickets
  const buyTickets = async () => {
    try {
      const tx = await contractInstance.buyTickets(numberOfTickets);
      await tx.wait();
    } catch (err) {
      console.log(err, "error buying tickets");
    }
  };

  const createContractInstance = async () => {
    const contractInstance = getContractInstance(contractAddress, abi, signer);
    setContractInstance(contractInstance);
  };
  // const createERC20Instance = async () => {
  //   const erc20Instance = getContractInstance(tokenAddress, erc20Abi, signer);
  //   seterc20ContractInstance(erc20Instance);
  // };

  useEffect(() => {
    if (account) {
      createContractInstance();
    }
  }, [account]);

  return (
    <div className={classes.main}>
      <a
        href="https://www.robot-gpt.com/"
        target="_blank"
        className="annn"
        rel="noreferrer"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <Typography
            sx={{
              paddingTop: 1.5,
              color: "#fff",
              textAlign: "center",
              fontSize: 20,
              fontWeight: 700,
              textTransform: "uppercase",
              fontFamily: "'Montserrat'",
              fontStyle: "normal",
            }}
          >
            How To Play
          </Typography>
        </Box>
      </a>
      <Box className={classes.secMiddle}>
        <div className="inner">
          <Typography className={classes.typooo}>Connect wallet</Typography>
          {account ? (
            <>
              <Button variant="outlined" onClick={disconnectWallet}>
                {account.substr(0, 4)}...{account.substr(-4)}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outlined" onClick={walletConnect}>
                {" "}
                Connect{" "}
              </Button>
            </>
          )}
        </div>
        <div className="inner">
          <Typography className={classes.typooo}>
            Buy Ticket (100 $RGPT each)
          </Typography>
          <input
            className={classes.inputTicket}
            type="number"
            placeholder="Number of Tickets"
            required
            value={numberOfTickets}
            onChange={(e) => {
              setNumberOfTickets(e.target.value);
            }}
          ></input>
          <Button variant="outlined" onClick={buyTickets}>
            {" "}
            BUY Ticket{" "}
          </Button>
        </div>
        <div className="inner">
          <Typography className={classes.typooo}>Check the winners</Typography>
          <a
            href="https://bscscan.com/address/0x6858b79E70Db50b1722f59D531A8437461C96332"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="outlined"
              // onClick={getWinners}
              style={{ width: "100%" }}
            >
              {" "}
              List of winners{" "}
            </Button>
          </a>
        </div>
      </Box>
      <Box className={classes.boxData}>
        <div>
          <Typography className={classes.text}>
            Every game starts daily at 14.00 UTC - you can enter the pool one
            hours until next distribution.
          </Typography>
        </div>
        <div>
          {" "}
          <Typography className={classes.text}>
            The winners will be determined by random number generator. There are
            three winners per game, who receive a share of the pool
            automatically.
          </Typography>
        </div>
        <div>
          <Typography className={classes.text}>
            A percentage will be distributed to the current $RGPT holders,
            liquidity and autoburn.
          </Typography>
        </div>
      </Box>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    margin: "10px 30px",
    display: "flex",
    flexDirection: "column",
    rowGap: 30,
    border: "1px solid rgba(255, 255, 255, 0.25)",
    borderRadius: 63,
    " & .annn": {
      textDecoration: "none",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },

  secMiddle: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 30px",
      flexDirection: "column",
      rowGap: 30,
    },

    "& .inner": {
      display: "flex",
      flexDirection: "column",
      rowGap: 10,
    },
  },

  typooo: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: 500,
    textTransform: "capitalize",
    fontFamily: "'Montserrat'",
    fontStyle: "normal",
  },

  text: {
    fontFamily: "'Montserrat'",
    fontStyle: "normal",
    padding: "2px 20px",
    color: "#fff",
    fontSize: 16,
    fontWeight: 200,
    textAlign: "center",
  },

  boxData: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "20px",
  },
  inputTicket: {
    borderRadius: "10px",
    padding: "8px",
    outline: "none",
    background: "transparent",
    color: "white",
    border: "  1px solid #FFFFFF",
  },
}));
