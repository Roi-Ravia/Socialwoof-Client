import React, { Fragment } from "react";
import PropTypes from "prop-types";

//MUI
import Skeleton from "@material-ui/lab/Skeleton";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const styles = (theme) => ({
  card: {
    display: "flex",
    marginBottom: 20,
    position: "relative",
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25,
  },
  image: {
    position: "relative",
    top: 10,
    left: 10,
  },
});

const WoofSkeleton = (props) => {
  const { classes } = props;
  const content = Array.from({ length: 3 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <Skeleton
        className={classes.image}
        variant="circle"
        width="25%"
        height={120}
      />
      <CardContent className={classes.cardContent}>
        <Skeleton varian="text" width="20%" height={20} />
        <Skeleton varian="text" width="40%" height={20} />
        <Skeleton varian="text" width="90%" height={20} />
        <Skeleton varian="text" width="90%" height={20} />
        <Skeleton varian="text" width="45%" height={20} />
      </CardContent>
    </Card>
  ));

  return <Fragment> {content}</Fragment>;
};

WoofSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WoofSkeleton);
