/* eslint-disable no-unused-vars */
import { Button, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { commentPost } from "../../reducers/posts.js";
import useStyles from "./styles.js";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const classes = useStyles();
  const dispatch = useDispatch();
  const commentsRef = useRef(null);

  const isCancelled = useRef(false);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");

  useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!isCancelled.current) {
      dispatch(
        commentPost({
          comment: `${user?.result?.name}: ${comment}`,
          postId: post._id,
        })
      ).then((newComments) => {
        if (!isCancelled.current) {
          setComments(newComments);
          setComment("");
        }
      });
      console.log("After");

      commentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(":")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment.
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              color="primary"
              disabled={!comment.length}
              variant="contained"
              onClick={handleComment}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
