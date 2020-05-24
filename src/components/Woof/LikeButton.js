import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
import { likeWoof, unlikeWoof } from "../../redux/actions/dataAction";
//Mui
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

export class LikeButton extends Component {
  likedWoof = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.woofId === this.props.woofId // Check to see if user has likes on specific woof
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  likeWoof = () => {
    this.props.likeWoof(this.props.woofId); //Like woof specified by woofId
  };

  unlikeWoof = () => {
    this.props.unlikeWoof(this.props.woofId); //Unlike woof specified by woofId
  };

  render() {
    const { authenticated } = this.props.user;

    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedWoof() ? (
      <MyButton tip="Unlike" onClick={this.unlikeWoof}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeWoof}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );

    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  woofId: PropTypes.string.isRequired,
  likeWoof: PropTypes.func.isRequired,
  unlikeWoof: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeWoof,
  unlikeWoof,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
