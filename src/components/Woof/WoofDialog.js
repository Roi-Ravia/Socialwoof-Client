import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import Comments from "./Comments";
import MyButton from "../../util/MyButton";
import LikeButton from "./LikeButton";
import CommentForm from "./CommentForm";
import MediaQuery from "react-responsive";
//Redux
import { connect } from "react-redux";
import { getWoof, clearErrors } from "../../redux/actions/dataAction";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

//Icons
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

const styles = (theme) => ({
  ...theme.spreadThis,
  profileImage: {
    minWidth: 120,
    height: 120,
    borderRadius: "50%",
    objectFit: "cover",
  },
  desktopClose: {
    position: "absolute",
    top: "3%",
    left: "90%",
  },
  mobileClose: {
    position: "absolute",
    top: "3%",
    left: "84%",
  },
  expandButton: {
    position: "absolute",
    right: "0",
  },
  userActionButtons: {
    position: "relative",
    right: 12,
  },
  spinnerDiv: {
    textAlign: "center",
    margin: "50 0 50 0",
  },
});

export class WoofDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };
  //when component is being loaded
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, woofId } = this.props;

    const newPath = `/user/${userHandle}/woof/${woofId}`;
    window.history.pushState(null, null, newPath);

    if (oldPath === newPath) {
      oldPath = `/user/${userHandle}`;
    }

    this.setState({
      open: true,
      oldPath: oldPath,
      newPath: newPath,
    });
    this.props.getWoof(this.props.woofId);
  };

  handleClose = () => {
    window.history.pushState(null, null, window.history.go(-1));
    this.setState({
      open: false,
    });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      woof: {
        body,
        createdAt,
        userImage,
        userHandle,
        woofId,
        likeCount,
        commentCount,
        comments,
      },
      UI: { loading },
    } = this.props;

    const dialogMarkUp = loading ? (
      <div style={{ overflow: "hidden" }} className={classes.spinnerDiv}>
        <CircularProgress size={150} thickness={2} color="primary" />
      </div>
    ) : (
      <Grid container spacing={1}>
        <Grid item sm={3}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={9}>
          <Typography
            variant="h3"
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
          <div className={classes.userActionButtons}>
            <LikeButton woofId={woofId} />
            <span>{likeCount} Likes</span>
            <MyButton tip="Comments">
              <ChatIcon color="primary" />
            </MyButton>
            <span> {commentCount} Comments</span>
          </div>
        </Grid>
        <CommentForm woofId={woofId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MediaQuery minDeviceWidth={510}>
            <MyButton
              tip="close"
              onClick={this.handleClose}
              tipClassName={classes.desktopClose}
            >
              <CloseIcon />
            </MyButton>
          </MediaQuery>

          <MediaQuery maxDeviceWidth={510}>
            <MyButton
              tip="close"
              onClick={this.handleClose}
              tipClassName={classes.mobileClose}
            >
              <CloseIcon />
            </MyButton>
          </MediaQuery>
          <DialogContent className={classes.DialogContent}>
            {dialogMarkUp}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

WoofDialog.propTypes = {
  getWoof: PropTypes.func.isRequired,
  woofId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  woof: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  woof: state.data.woof,
  UI: state.UI,
});

const mapActionsToProps = {
  getWoof,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(WoofDialog));
