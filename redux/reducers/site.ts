import { Types } from '../actions/site';

const INITIAL_STATE = {};

interface Action {
  type: string;
  payload?: any;
}

export default function site(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case Types.GET_CAROUSEL_SUCCESS: {
      return {
        ...state,
        carousel: action.payload.items,
      };
    }

    case Types.GET_SITE_INFO_SUCCESS: {
      return {
        ...state,
        siteInfo: action.payload.items,
      };
    }

    default: {
      return state;
    }
  }
}
