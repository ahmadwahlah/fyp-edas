import React from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f1f1f1",
  "&:hover": {
    backgroundColor: "#fff",
  },
  marginLeft: 0,
  width: "100%",
  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#333",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch", // increased width to 30 characters
    },
  },
}));

const SearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: theme.spacing(2),
  width: "100%", // increased width to 100%
}));

export default function SearchBar() {
  return (
    <SearchBox>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </SearchBox>
  );
}
