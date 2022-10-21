import { GET_TRENDS } from "../actions/post.action";

const initialstate = {};

export default function trendingReducer(state = initialstate, action) {
  switch (action.type) {
    case GET_TRENDS:
      return action.payload;
    default:
      return state;
  }
}
