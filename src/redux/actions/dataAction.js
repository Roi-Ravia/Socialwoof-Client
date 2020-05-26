import {
  SET_WOOFS,
  LIKE_WOOF,
  UNLIKE_WOOF,
  LOADING_DATA,
  DELETE_WOOF,
  LOADING_UI,
  POST_WOOF,
  SET_ERRORS,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  SET_WOOF,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

//Get all woofs
export const getWoofs = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/woofs")
    .then((res) => {
      dispatch({
        type: SET_WOOFS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_WOOFS,
        payload: [],
      });
      console.log(err);
    });
};

//Woof Dialog
export const getWoof = (woofId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/woof/${woofId}`)
    .then((res) => {
      dispatch({
        type: SET_WOOF,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Like a woof
export const likeWoof = (woofId) => (dispatch) => {
  axios
    .get(`/woof/${woofId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_WOOF,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//Unlike a woof
export const unlikeWoof = (woofId) => (dispatch) => {
  axios
    .get(`/woof/${woofId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_WOOF,
        payload: res.data.woofData, // to access same format as when liking
      });
    })
    .catch((err) => console.log(err));
};

//Delete a woof
export const deleteWoof = (woofId) => (dispatch) => {
  axios
    .delete(`/woof/${woofId}`)
    .then(() => {
      dispatch({
        type: DELETE_WOOF,
        payload: woofId,
      });
    })
    .catch((err) => console.log(err));
};

//Post a woof
export const postWoof = (newWoof) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/woof", newWoof)
    .then((res) => {
      dispatch({
        type: POST_WOOF,
        payload: res.data.resWoof, // this is the post
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const submitComment = (woofId, commentData) => (dispatch) => {
  axios
    .post(`/woof/${woofId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_WOOFS,
        payload: res.data.woofs,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_WOOFS,
        payload: null,
      });
    });
};

//Clear errors from post

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
