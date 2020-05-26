import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//Mui
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataAction";

const styles = (theme) => ({
  ...theme.spreadThis,
  textField: {
    margin: "0 0 20px 0",
  },
  progressSpinner: {
    position: "absolute",
  },
});

class CommentForm extends Component {
  state = {
    body: "",
    errors: {},
    isFocused: false,
    isLoading: false,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
        isLoading: false,
      });
    }
    //clear after close
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: "",
        errors: {},
        isLoading: false,
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      errors: {},
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    this.props.submitComment(this.props.woofId, { body: this.state.body });
  };

  handleFocus = () => {
    this.setState({
      isFocused: true,
    });
  };

  render() {
    const { classes, authenticated } = this.props;
    const { errors } = this.state;
    const commentFormMarkUp = authenticated ? (
      <Grid item sm={12} style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            autoComplete="off"
            className={classes.textField}
            error={errors.comment ? true : false}
            helperText={errors.comment}
            fullWidth
            label="Comment"
            margin="dense"
            name="body"
            onChange={this.handleChange}
            type="text"
            value={this.state.body}
            onFocus={this.handleFocus}
          />
          {this.state.isFocused && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={this.state.isLoading}
            >
              Submit
              {this.state.isLoading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          )}
        </form>
      </Grid>
    ) : null;

    return commentFormMarkUp;
  }
}

CommentForm.propTypes = {
  UI: PropTypes.object.isRequired,
  submitComment: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  woofId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
