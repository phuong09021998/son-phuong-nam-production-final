export const Types = {
  GET_POSTS_BY_ADMIN: 'admin/get-posts-by-admin',
  GET_POSTS_BY_ADMIN_SUCCESS: 'admin/get-posts-by-admin-success',
  CREATE_POST: 'admin/create-post',
  UPDATE_PUBLISH: 'admin/update-publish-post',
  UPDATE_POST: 'admin/update-post',
  DELETE_POST: 'admin/delete-post',
  GET_POSTS_BY_ADMIN_ERROR: 'admin/get-posts-by-admin-error',
  CREATE_POST_ERROR: 'admin/create-post-error',
  DELETE_POST_ERROR: 'admin/delete-post-error',
  UPDATE_PUBLISH_ERROR: 'admin/update-publish-post-error',
  UPDATE_ERROR: 'admin/update-post-error',
};

export const getPostsByAdmin = () => ({
  type: Types.GET_POSTS_BY_ADMIN,
});

export const getPostsByAdminSuccess = ({ items }: any) => ({
  type: Types.GET_POSTS_BY_ADMIN_SUCCESS,
  payload: {
    items,
  },
});

export const createPost = ({ title, type, image, content }: any) => ({
  type: Types.CREATE_POST,
  payload: {
    title,
    type,
    image,
    content,
  },
});

export const updatePublish = ({ publish, id }: any) => ({
  type: Types.UPDATE_PUBLISH,
  payload: {
    publish,
    id,
  },
});

export const deletePost = ({ id }: any) => ({
  type: Types.DELETE_POST,
  payload: {
    id,
  },
});

export const getPostsByAdminError = ({ error }: any) => ({
  type: Types.GET_POSTS_BY_ADMIN_ERROR,
  payload: { error },
});

export const createPostError = ({ error }: any) => ({
  type: Types.CREATE_POST_ERROR,
  payload: { error },
});

export const deletePostError = ({ error }: any) => ({
  type: Types.DELETE_POST_ERROR,
  payload: { error },
});

export const updatePost = (payload: any) => ({
  type: Types.UPDATE_POST,
  payload,
});

export const updatePublishError = ({ error }: any) => ({
  type: Types.UPDATE_PUBLISH_ERROR,
  payload: { error },
});

export const updateError = ({ error }: any) => ({
  type: Types.UPDATE_ERROR,
  payload: { error },
});
