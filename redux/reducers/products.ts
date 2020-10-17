import { Types } from '../actions/products';

const INITIAL_STATE = {};

interface Action {
  type: string;
  payload?: any;
}

export default function users(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case Types.GET_PRODUCTS_BY_ADMIN_SUCCESS: {
      return {
        ...state,
        productsByAdmin: action.payload.items,
        getProductsByAdminError: undefined,
        createProductError: undefined,
        deleteProductError: undefined,
        updateProductError: undefined,
        updatePublishProductError: undefined,
        updateAvailableProductError: undefined,
      };
    }
    case Types.GET_PRODUCTS_BY_ADMIN_ERROR: {
      return {
        ...state,
        getProductsByAdminError: action.payload.error,
      };
    }
    case Types.CREATE_PRODUCT_ERROR: {
      return {
        ...state,
        createProductError: action.payload.error,
      };
    }
    case Types.DELETE_PRODUCT_ERROR: {
      return {
        ...state,
        deleteProductError: action.payload.error,
      };
    }
    case Types.UPDATE_PUBLISH_PRODUCT_ERROR: {
      return {
        ...state,
        updatePublishProductError: action.payload.error,
      };
    }
    case Types.UPDATE_AVAILABLE_ERROR: {
      return {
        ...state,
        updateAvailableProductError: action.payload.error,
      };
    }
    case Types.UPDATE_PRODUCT_ERROR: {
      return {
        ...state,
        updateProductError: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
}
