import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post.js";
import useStyles from "./styles.js";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, loading } = useSelector((state) => state.posts);

  if (!posts.length && loading) return "No posts";

  return (loading == "pending") ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
