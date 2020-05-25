import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Woof from "../components/Woof/Woof";
import Profile from "../components/Profile/Profile";
import PropTypes from "prop-types";
import WoofSkeleton from "../util/WoofSkeleton";

//Redux
import { connect } from "react-redux";
import { getWoofs } from "../redux/actions/dataAction";

class home extends Component {
  state = {
    woofs: null,
  };
  //Fetch data from db
  componentDidMount() {
    this.props.getWoofs();
  }

  render() {
    const { woofs, loading } = this.props.data;

    let recentWoofMarkUp =
      !loading && woofs ? (
        woofs.map((woof) => <Woof key={woof.woofId} woof={woof} />)
      ) : (
        <WoofSkeleton />
      );
    return (
      <div>
        <Grid container>
          <Grid item sm={4} xs={12}>
            <Profile />
          </Grid>
          <Grid item sm={8} xs={12}>
            {recentWoofMarkUp}
          </Grid>
        </Grid>
      </div>
    );
  }
}

home.propTypes = {
  getWoofs: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getWoofs })(home);
