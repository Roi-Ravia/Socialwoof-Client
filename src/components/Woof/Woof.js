import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import DeleteWoof from "./DeleteWoof";
import WoofDialog from "./WoofDialog";
import LikeButton from "./LikeButton";
//Redux
import { connect } from "react-redux";
import { deleteWoof } from "../../redux/actions/dataAction";

//MUI
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
    top: 20,
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
      <div>
        <Card className={classes.card} variant="outlined">
          <CardMedia
            image={userImage}
            title="Profile Image"
            className={classes.image}
          />
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
            <br />
            <div className={classes.userActions}>
              <LikeButton woofId={woofId} />
              <span>{likeCount} Likes</span>
              <MyButton tip="Comments">
                <ChatIcon color="primary" />
              </MyButton>
              <span> {commentCount} Comments</span>

              <WoofDialog
                woofId={woofId}
                userHandle={userHandle}
                openDialog={this.props.openDialog}
              />
            </div>
          </CardContent>
        </Card>
      </div>
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