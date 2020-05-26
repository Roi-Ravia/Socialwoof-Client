import React from "react";
import PropTypes from "prop-types";

//MUI
import Skeleton from "@material-ui/lab/Skeleton";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  ...theme.spreadThis,
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      left: 40,
    },
  },
  detail: {
    dispay: "inline-block",
  },
});

const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile} style={{ position: "relative" }}>
        <div className="image-wrapper">
          <Skeleton
            animation="wave"
            className="profile-image"
            variant="circle"
            width="60%"
            height={160}
          />
        </div>
      </div>
      <div className="profile-details" style={{ textAlign: "center" }}>
        <Skeleton
          animation="wave"
          className={{ root: classes.detail }}
          variant="text"
          width="50%"
          height={20}
        />
        <Skeleton
          animation="wave"
          className={{ root: classes.detail }}
          variant="text"
          width="80%"
          height={20}
        />
        <Skeleton
          animation="wave"
          className={{ root: classes.detail }}
          variant="text"
          width="50%"
          height={20}
        />
        <Skeleton
          animation="wave"
          className={{ root: classes.detail }}
          variant="text"
          width="60%"
          height={20}
        />
        <Skeleton
          animation="wave"
          className={{ root: classes.detail }}
          variant="text"
          width="70%"
          height={20}
        />
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
