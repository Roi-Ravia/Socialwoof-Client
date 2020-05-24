import {
  SET_USER,
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LIKE_WOOF,
  UNLIKE_WOOF,
  MARK_NOTIFICATIONS_READ,
} from "../types";

const initialState = {
  authorized: false,
  credentials: {},
  loading: false,
  likes: [],
  notifications: [],
  authenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return initialState;
    case SET_UNAUTHENTICATED:
      return {
        ...initialState,
        authenticated: false,
      };
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_WOOF:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            woofId: action.payload.woofId,
          },
        ],
      };
    case UNLIKE_WOOF:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.woofId !== action.payload.woofId
        ),
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((notification) => {
        notification.read = true;
      });
      return {
        ...state,
      };
    default:
      return state;
  }
}
