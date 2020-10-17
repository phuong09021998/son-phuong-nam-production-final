import { Types } from '../actions/posts';

const INITIAL_STATE = {};

interface Action {
  type: string;
  payload?: any;
}

export default function users(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case Types.GET_POSTS_BY_ADMIN_SUCCESS: {
      return {
        ...state,
        postsByAdmin: action.payload.items,
        getPostsByAdminError: undefined,
        createPostError: undefined,
        deletePostError: undefined,
        updatePostError: undefined,
        updatePublishError: undefined,
      };
    }
    case Types.GET_POSTS_BY_ADMIN_ERROR: {
      return {
        ...state,
        getPostsByAdminError: action.payload.error,
      };
    }
    case Types.CREATE_POST_ERROR: {
      return {
        ...state,
        createPostError: action.payload.error,
      };
    }
    case Types.DELETE_POST_ERROR: {
      return {
        ...state,
        deletePostError: action.payload.error,
      };
    }
    case Types.UPDATE_PUBLISH_ERROR: {
      return {
        ...state,
        updatePublishError: action.payload.error,
      };
    }
    case Types.UPDATE_ERROR: {
      return {
        ...state,
        updatePostError: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
}
