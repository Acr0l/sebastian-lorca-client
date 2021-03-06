// Styles
import {
  Button, ButtonBase, Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
// Dependencies
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Reducer
import { deletePost, likePost } from "../../../reducers/posts.js";
import useStyles from "./styles.js";

export default function Post({ post, setCurrentId }) {
  const user = JSON.parse(localStorage.getItem("profile"));
  
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);

  const hasLikedPost = post.likes.find((like) => like === user?.result?._id);
  const openPost = () => 
    navigate("/posts/" + post._id);
  
  const handleLike = async (e) => {
    e.preventDefault();
    dispatch(likePost(post._id))
    if (hasLikedPost) setLikes(post.likes.filter((id) => id !== user?.result?._id));
    else setLikes([...post.likes, user?.result?._id]);
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === user?.result?._id) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" /> &nbsp;Like
      </>
    );
  };
  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FbvpI11RJbE6lHSWCrhvNC1S1MtO.jpg&f=1&nofb=1"
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {user?.result?._id === post?.creator && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.content}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {user?.result?._id === post?.creator && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
