export const Types = {
  GET_PRODUCTS_BY_ADMIN: 'admin/get-products-by-admin',
  GET_PRODUCTS_BY_ADMIN_SUCCESS: 'admin/get-products-success',
  CREATE_PRODUCT: 'admin/create-product',
  UPDATE_PUBLISH_PRODUCT: 'admin/update-publish-product',
  UPDATE_PRODUCT: 'admin/update-product',
  DELETE_PRODUCT: 'admin/delete-product',
  UPDATE_AVAILABLE: 'admin/update-available-product',
  UPDATE_AVAILABLE_ERROR: 'admin/update-available-product-error',
  GET_PRODUCTS_BY_ADMIN_ERROR: 'admin/get-products-by-admin-error',
  CREATE_PRODUCT_ERROR: 'admin/create-product-error',
  DELETE_PRODUCT_ERROR: 'admin/delete-product-error',
  UPDATE_PUBLISH_PRODUCT_ERROR: 'admin/update-publish-product-error',
  UPDATE_PRODUCT_ERROR: 'admin/update-product-error',
};

export const getProductsByAdmin = () => ({
  type: Types.GET_PRODUCTS_BY_ADMIN,
});

export const getProductsByAdminSuccess = ({ items }: any) => ({
  type: Types.GET_PRODUCTS_BY_ADMIN_SUCCESS,
  payload: {
    items,
  },
});

export const createProduct = (payload: any) => ({
  type: Types.CREATE_PRODUCT,
  payload,
});

export const updatePublish = ({ publish, id }: any) => ({
  type: Types.UPDATE_PUBLISH_PRODUCT,
  payload: {
    publish,
    id,
  },
});

export const updateAvailable = ({ available, id }: any) => ({
  type: Types.UPDATE_AVAILABLE,
  payload: {
    available,
    id,
  },
});

export const deleteProduct = ({ id }: any) => ({
  type: Types.DELETE_PRODUCT,
  payload: {
    id,
  },
});

export const getProductsByAdminError = ({ error }: any) => ({
  type: Types.GET_PRODUCTS_BY_ADMIN_ERROR,
  payload: { error },
});

export const createProductError = ({ error }: any) => ({
  type: Types.CREATE_PRODUCT_ERROR,
  payload: { error },
});

export const deleteProductError = ({ error }: any) => ({
  type: Types.DELETE_PRODUCT_ERROR,
  payload: { error },
});

export const updateProduct = (payload: any) => ({
  type: Types.UPDATE_PRODUCT,
  payload,
});

export const updatePublishProductError = ({ error }: any) => ({
  type: Types.UPDATE_PUBLISH_PRODUCT_ERROR,
  payload: { error },
});

export const updateAvailableProductError = ({ error }: any) => ({
  type: Types.UPDATE_AVAILABLE_ERROR,
  payload: { error },
});

export const updateProductError = ({ error }: any) => ({
  type: Types.UPDATE_PRODUCT_ERROR,
  payload: { error },
});
