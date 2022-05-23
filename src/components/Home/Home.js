/* eslint-disable no-unused-vars */
import {
  AppBar, Button, Container,
  Grid,
  Grow,
  Paper,
  TextField
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { fetchPostsBySearch } from "../../reducers/posts.js";
import Form from "../Form/Form.js";
import Pagination from "../Pagination.jsx";
import Posts from "../Posts/Posts.js";
import useStyles from "./styles.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery") || "";

  const searchPost = () => {
    if (search.trim() || tags.length > 0) {
      dispatch(fetchPostsBySearch({search, tags: tags.join(",")})); 
      history.push(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
    }	
    else history.push("/");
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) searchPost();
  }

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search article"
                fullWidth
                onKeyDown={handleKeyDown}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput 
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(chip) => setTags([...tags, chip])}
                onDelete={(chip, index) => setTags(tags.filter((c, i) => i !== index))}
                label="Search by tags"
                fullWidth
                variant="outlined"
              />
              <Button onClick={searchPost} variant="contained" className={classes.searchButton} color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
