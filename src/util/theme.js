//Global styling
export default {
  typography: {
    fontFamily: "Open Sans",
    fontWeight: "400",
    h2: {
      fontSize: "28px",
      fontWeight: "600",
    },
    h3: {
      fontSize: "24px",
    },
  },
  palette: {
    primary: {
      main: "#222831",
      contrastText: "#fff",
    },
    secondary: {
      main: "#d9455f",
      contrastText: "#fff",
    },
  },
  spreadThis: {
    typography: {
      useNextVariant: true,
    },
    form: {
      minWidth: 200,
      textAlign: "center",
    },
    formText: {
      minWidth: 200,
    },
    pageTitle: {
      margin: "20px auto 20px auto",
    },
    textField: {
      margin: "20px auto 0 auto",
    },
    button: {
      margin: "40px auto 20px auto",
      position: "relative",
    },
    submitButton: {
      transition: "width 1s",
      position: "relative",
      marginTop: "3%",
      float: "right",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: "20px",
    },
    loader: {
      position: "absolute",
    },
    invisibleSeparator: {
      border: "none",
      margin: 4,
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20,
    },
    paper: {
      padding: 20,
      margin: "0 16px 16px 0",
      minHeight: 390,
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 160,
        height: 160,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: "#222831",
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
    noUserProfile: {
      margin: "50% 0",
    },
    likeButton: {
      paddingLeft: 0,
    },
  },
};
