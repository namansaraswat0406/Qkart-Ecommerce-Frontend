import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Search} from "@mui/icons-material"
import { Avatar, Button, Stack, TextField, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons, isLoggedIn, performSearch}) => {
  let history = useHistory();
  // const [timer, setTimer] = useState(null);
  // history.push("/login")
  // history.push("/")
  // console.log('Milan history : ' + JSON.stringify(history))
  // console.log(hasHiddenAuthButtons);

  // useEffect(() => {
  //   return() => {
  //     clearTimeout(timer)
  //   }
  // }, [timer])
  
  // const handleChange = (e) => {
  //   let timerId = setTimeout(() => performSearch(e.target.value), 500);
  //   setTimer(timerId);
  // }
  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {children ? 
      <Box sx={{width:1/3}}>
          <TextField
          className="search-desktop"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
          onChange={performSearch}
        />
      </Box>
      :
      <Box></Box>
      }
      {!hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => {
            history.push("/");
          }}
        >
          Back to explore
        </Button>
      ) : isLoggedIn ? (
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar alt={localStorage.getItem("username")} src="/public/avatar.png" />
          <h4>{localStorage.getItem("username")}</h4>
          <Button className="button" onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}>
            Logout
          </Button>
        </Stack>
      ) : (
        <Stack direction="row" spacing={2} alignItems="center">
          <Button onClick={() => {
            history.push('/login')
          }}>Login</Button>
          <Button className="button" variant="contained" onClick={() => {
            history.push('/register')
          }}>
            Register
          </Button>
        </Stack>
      )}
      {/* <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => {
            history.push('/')
          }}
        >
          Back to explore
        </Button> */}
      {/* <Stack direction="row" spacing={2} alignItems="center"
      >
        <Button>Milan</Button>
        <Button className="button" variant="contained">Chilan</Button>
      </Stack> */}

      {/* <Stack direction="row" spacing={2} alignItems="center">
        <Avatar alt="" src="/public/avatar.png" />
        <h4>Milan</h4>
        <Button className="button" variant="contained">
          Logout
        </Button>
      </Stack> */}
    </Box>
  );
};

export default Header;
