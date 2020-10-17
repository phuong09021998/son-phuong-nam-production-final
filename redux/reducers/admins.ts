import { Types } from '../actions/admins';

const INITIAL_STATE = {};

interface Action {
  type: string;
  payload?: any;
}

export default function admins(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case Types.GET_USERS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        createUserError: undefined,
        deleteUserError: undefined,
        getUsersError: undefined,
        editUserError: undefined,
      };
    }
    case Types.GET_USERS_ERROR: {
      return {
        ...state,
        getUsersError: action.payload.error,
      };
    }
    case Types.CREATE_USER_ERROR: {
      return {
        ...state,
        createUserError: action.payload.error,
      };
    }
    case Types.DELETE_USER_ERROR: {
      return {
        ...state,
        deleteUserError: action.payload.error,
      };
    }
    case Types.EDIT_USER_ERROR: {
      return {
        ...state,
        editUserError: action.payload.error,
      };
    }
    case Types.GET_SITE_CAROUSEL_SUCCESS: {
      return {
        ...state,
        carousels: action.payload,
        getSiteCarouselError: undefined,
        updateSiteCarouselError: undefined,
        
      }
    }

    case Types.GET_SITE_INFO_SUCCESS: {
      return {
        ...state,
        siteInfos: action.payload,
        updateSiteInfoError: undefined,
        getSiteInfoError: undefined,
      }
    }

    case Types.GET_SITE_CAROUSEL_ERROR: {
      return {
        ...state,
        getSiteCarouselError: action.payload.error
      }
    }

    case Types.GET_SITE_INFO_ERROR: {
      return {
        ...state,
        getSiteInfoError: action.payload.error
      }
    }
    case Types.UPDATE_SITE_INFO_ERROR: {
      return {
        ...state,
        updateSiteInfoError: action.payload.error
      }
    }
    case Types.UPDATE_SITE_CAROUSEL_ERROR: {
      return {
        ...state,
        updateSiteCarouselError: action.payload.error
      }
    }

    default: {
      return state;
    }
  }
}
