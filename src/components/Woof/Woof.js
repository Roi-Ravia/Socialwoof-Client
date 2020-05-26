import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import MyButton from "../../util/MyButton";
import DeleteWoof from "./DeleteWoof";
import WoofDialog from "./WoofDialog";
import LikeButton from "./LikeButton";

//Redux
import { connect } from "react-redux";
import { deleteWoof } from "../../redux/actions/dataAction";

//MUI
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

//Icons
import ChatIcon from "@material-ui/icons/Chat";

const styles = () => ({
  card: {
    position: "relative",
    display: "flex",
    margin: "0px 16px 20px 0px",
  },
  image: {
    position: "relative",
    top: 15,
    left: 10,
    minWidth: 120,
    height: 120,
    borderRadius: "50%",
  },
  content: {
    padding: "20px 20px 3px 20px",
    objectFit: "cover",
  },
  textContent: {
    paddingLeft: 15,
  },
  userAction: {
    marginLeft: 15,
  },
  desktopComments: {
    position: "relative",
    right: "36px",
  },
  mobileComments: {
    position: "relative",
    right: 1,
  },
});

export class Woof extends Component {
  render() {
    dayjs.extend(relativeTime);
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
      },
      user: { authenticated, credentials },
    } = this.props;

    const deleteWoof =
      authenticated && userHandle === credentials.handle ? (
        <DeleteWoof woofId={woofId} />
      ) : null;

    const truncatedBody = body.substr(0, 110) + "...";
    return (
      <Card className={classes.card} variant="outlined">
        <CardMedia
          image={userImage}
          title="Profile Image"
          className={classes.image}
        />
        <Grid container>
          <Grid item md={12}>
            <CardContent style={{ padding: "16px 16px 6px 16px" }}>
              <Typography
                variant="h3"
                component={Link}
                to={`/user/${userHandle}`}
                color="primary"
                className={classes.textContent}
              >
                {userHandle}
              </Typography>
              {deleteWoof}
              <Typography
                variant="body2"
                color="textSecondary"
                className={classes.textContent}
              >
                {dayjs(createdAt).fromNow()}
              </Typography>
              <Typography
                id="postBody"
                variant="body1"
                className={classes.textContent}
              >
                {body.length > 110 ? truncatedBody : body}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item md={3} xs={12} className={classes.userAction}>
            <LikeButton woofId={woofId} />
            <span>{likeCount} Likes</span>
          </Grid>
          <Grid item md={6} xs={8} className={classes.userAction}>
            <MediaQuery minDeviceWidth={960}>
              <div className={classes.desktopComments}>
                <MyButton tip="Comments">
                  <ChatIcon color="primary" />
                </MyButton>
                <span> {commentCount} Comments</span>
              </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={959}>
              <div className={classes.mobileComments}>
                <MyButton tip="Comments">
                  <ChatIcon color="primary" />
                </MyButton>
                <span> {commentCount} Comments</span>
              </div>
            </MediaQuery>
          </Grid>
          <Grid item md={2} xs={3}>
            <WoofDialog
              woofId={woofId}
              userHandle={userHandle}
              openDialog={this.props.openDialog}
            />
          </Grid>
        </Grid>
      </Card>
    );
  }
}

Woof.propTypes = {
  user: PropTypes.object.isRequired,
  woof: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  deleteWoof,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Woof));
