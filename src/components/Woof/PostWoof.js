import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

//Redux
import { connect } from "react-redux";
import { postWoof, clearErrors } from "../../redux/actions/dataAction";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

//Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  ...theme.spreadThis,
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    top: "3%",
    left: "90%",
  },
});

class PostWoof extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({
      open: false,
      errors: {},
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      errors: {},
    }); //Controlled
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postWoof({ body: this.state.body });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: "",
        open: false,
        errors: {},
      });
    }
  }

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton tip="Post a woof" onClick={this.handleOpen}>
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new Woof</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                autoFocus
                color="primary"
                variant="outlined"
                name="body"
                type="text"
                label="What do you want to post?"
                multiline
                rows="3"
                placeholder="Woof!"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.TextField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostWoof.propType = {
  postWoof: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postWoof, clearErrors })(
  withStyles(styles)(PostWoof)
);