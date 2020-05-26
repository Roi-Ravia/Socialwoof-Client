import {
  SET_WOOFS,
  SET_WOOF,
  LIKE_WOOF,
  UNLIKE_WOOF,
  LOADING_DATA,
  DELETE_WOOF,
  POST_WOOF,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  woofs: [],
  woof: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_WOOFS:
      return {
        ...state,
        woofs: action.payload,
        loading: false,
      };
    case SET_WOOF:
      return {
        ...state,
        woof: action.payload,
      };
    case UNLIKE_WOOF:
    case LIKE_WOOF:
      let index = state.woofs.findIndex(
        (woof) => woof.woofId === action.payload.woofId
      );
      state.woofs[index] = action.payload;
      if (state.woof.woofId === action.payload.woofId) {
        state.woof = { ...state.woof, ...action.payload };
      }
      return {
        ...state,
      };

    case DELETE_WOOF:
      return {
        ...state,
        woofs: state.woofs.filter((woof) => woof.woofId !== action.payload),
      };
    case POST_WOOF:
      return {
        ...state,
        woofs: [
          action.payload, // the result of posting - the woof.
          ...state.woofs,
        ],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        woof: {
          ...state.woof,
          comments: [action.payload, ...state.woof.comments],
          commentCount: state.woof.commentCount + 1,
        },
      };

    default:
      return state;
  }
}
