import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Woof from "../components/Woof/Woof";
import StaticProfile from "../components/Profile/StaticProfile";
import WoofSkeleton from "../util/WoofSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";
//Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataAction";

//MUI
import Grid from "@material-ui/core/Grid";

class user extends Component {
  state = {
    profile: null,
    woofIdParam: null,
  };

  //when we load the component, find the handle using the url params and GET the data
  componentDidMount() {
    const handle = this.props.match.params.handle; // matches the handle from the url
    const woofId = this.props.match.params.woofId;

    if (woofId) {
      this.setState({
        woofIdParam: woofId,
      });
    }

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { woofs, loading } = this.props.data;
    const { woofIdParam } = this.state;

    let woofMarkUp = loading ? (
      <WoofSkeleton />
    ) : woofs === null ? (
      <p>No woofs found for this user</p>
    ) : !woofIdParam ? (
      woofs.map((woof) => <Woof key={woof.woofId} woof={woof} />)
    ) : (
      woofs.map((woof) => {
        if (woof.woofId !== woofIdParam) {
          return <Woof key={woof.woofId} woof={woof} />;
        } else {
          return <Woof key={woof.woofId} woof={woof} openDialog />;
        }
      })
    );

    return (
      <Grid container>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
        <Grid item sm={8} xs={12}>
          {woofMarkUp}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
