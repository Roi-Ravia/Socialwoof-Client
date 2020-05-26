import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userAction";

//MUI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

//icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

class Notifications extends Component {
  state = {
    anchorEl: null,
  };

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.target,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  onMenuOpened = () => {
    let unreadNotificationsId = this.props.notifications
      .filter((notification) => !notification.read)
      .map((notification) => notification.notificationId);
    this.props.markNotificationsRead(unreadNotificationsId);
  };

  render() {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    let notificationIcon;
    let unreadNotificationNum = notifications.filter(
      (notification) => notification.read === false
    ).length;

    if (notifications && notifications.length > 0) {
      unreadNotificationNum > 0
        ? (notificationIcon = (
            <Badge badgeContent={unreadNotificationNum} color="secondary">
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationIcon = <NotificationsIcon />);
    } else {
      notificationIcon = <NotificationsIcon />;
    }

    let notificationsMarkUp =
      notifications && notifications.length > 0 ? (
        notifications.map((notification) => {
          const verb = notification.type === "like" ? "Liked" : "Commented on";
          const time = dayjs(notification.createdAt).fromNow();
          const iconColor = notification.read ? "primary" : "secondary";
          const icon =
            notification.type === "like" ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );
          return (
            <MenuItem key={notification.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="default"
                variant="body1"
                to={`/user/${notification.recipient}/woof/${notification.woofId}`}
              >
                {notification.sender} {verb} your Woof{" "}
                <Typography color="textSecondary">{time}</Typography>
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You dont have any notifications yet.
        </MenuItem>
      );
    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aira-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkUp}
        </Menu>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  markNotificationsRead: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
