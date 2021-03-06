import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  ...theme.spreadThis,
  commentProfile: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    objectFit: "cover",
  },
  commentData: {
    marginLeft: 20,
  },
});

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    console.log(this.props);
    return (
      <Grid container>
        {comments &&
          comments.map((comment, index) => {
            const { body, createdAt, userImage, userHandle } = comment;
            return (
              <Fragment key={createdAt}>
                <Grid item sm={12}>
                  <Grid container>
                    <Grid item sm={2}>
                      <img
                        src={userImage}
                        alt="Profile"
                        className={classes.commentProfile}
                      />
                    </Grid>
                    <Grid item sm={10}>
                      <div className={classes.commentData}>
                        <Typography
                          variant="h6"
                          component={Link}
                          to={`/user/${userHandle}`}
                          color="primary"
                        >
                          {userHandle}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {dayjs(createdAt).format("h:mm a, DD MMMM YYYY")}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body1">{body}</Typography>
                      </div>
                    </Grid>
                  </Grid>
                  <hr className={classes.invisibleSeparator} />
                  {index !== comments.length - 1 && (
                    <hr className={classes.visibleSeparator} />
                  )}
                </Grid>
              </Fragment>
            );
          })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comments);
