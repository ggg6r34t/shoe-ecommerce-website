import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import styled, { ThemeProvider } from "styled-components";

import { theme } from "../../theme/theme";
import { IsLoggedInActions } from "../../../redux/slices/isLoggedIn";
import { useDispatch } from "react-redux";

const StyledTextField = styled(TextField)`
  & .MuiFormLabel-root {
    color: #04460675;
  }
  & .MuiInputLabel-root {
    color: #04460675 !important;
  }

  & .MuiInputBase-root {
    color: #044606ad;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: 2px solid;
    border-radius: 20px;
    border-color: #04460675 !important;
  }

  &
    .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused
    .MuiOutlinedInput-notchedOutline {
    border-color: #04460675 !important;
  }
`;

function LoginPage() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // get user email from form
  function getEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setUserInput({ ...userInput, email: e.target.value });
  }

  // get user password from form
  function getPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setUserInput({ ...userInput, password: e.target.value });
  }

  function sendUserInformation() {
    // send an AJAX request to the backend API endpoint
    axios
      .post("http://localhost:8000/account/login", userInput)
      .then((res) => {
        // handle successful login
        const token = res.data.token;
        // display the success message to the user
        const message = res.data.message;
        console.log(message);

        if (message === "Login successful!") {
          dispatch(IsLoggedInActions.userLogin(true));
        }
        // store the toekn securely (e.g., in local storage or cookie)
        localStorage.setItem("token", token);

        // redirect to user account
        navigate("/account");
      })
      .catch((err) => {
        // handle login error
        console.error(err);
      });

    // clear form
    setUserInput({
      email: "",
      password: "",
    });
  }

  const handleSumbit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendUserInformation();
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            width: "100%",
            height: "875px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSumbit}
          >
            <Typography
              variant="h1"
              component="h1"
              color="#044606"
              fontFamily="Noto Serif"
              fontSize="4rem"
              align="center"
              textTransform="lowercase"
              sx={{ margin: "26px 0" }}
            >
              login
            </Typography>
            <StyledTextField
              fullWidth
              id="email"
              name="email"
              label="email"
              margin="normal"
              type="email"
              variant="outlined"
              required
              value={userInput.email}
              onChange={getEmail}
            />
            <StyledTextField
              fullWidth
              id="password"
              name="password"
              label="password"
              margin="normal"
              type="password"
              variant="outlined"
              required
              value={userInput.password}
              onChange={getPassword}
            />
            <Link to={"/"} style={{ textDecorationColor: "#04460675" }}>
              <Typography color="#04460675" sx={{ mt: "4px" }}>
                forgot your password
              </Typography>
            </Link>
            <FormControl
              margin="normal"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box component="div">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#044606",
                    minHeight: "60px",
                    minWidth: "125px",
                    borderRadius: "65px",
                    marginTop: "40px",
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: "lowercase",
                      fontFamily: theme.typography.h6,
                    }}
                  >
                    sign in
                  </Typography>
                </Button>
              </Box>
            </FormControl>

            <Link
              to={"/account/register"}
              style={{ textDecorationColor: "#04460675" }}
            >
              <Typography color="#04460675" align="center" sx={{ mt: "40px" }}>
                create account
              </Typography>
            </Link>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default LoginPage;
