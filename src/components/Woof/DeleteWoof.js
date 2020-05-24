import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

//Redux
import { connect } from "react-redux";
import { deleteWoof } from "../../redux/actions/dataAction";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

//icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const styles = {
  deleteButton: {
    position: "absolute",
    top: "10%",
    left: "90%",
  },
};

class DeleteWoof extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  deleteWoof = () => {
    this.props.deleteWoof(this.props.woofId);
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Delete post"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          margin="dense"
        >
          <DialogTitle>Are you sure you want to delete this woof?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteWoof} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteWoof.propTypes = {
  deleteWoof: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  woofId: PropTypes.string.isRequired,
};

export default connect(null, { deleteWoof })(withStyles(styles)(DeleteWoof));
