export const Types = {
  GET_USERS: 'admin/get-users',
  GET_USERS_SUCCESS: 'admin/get-users-success',
  CREATE_USER: 'admin/create-user',
  SET_WAITING: 'admin/set-waiting',
  CREATE_USER_ERROR: 'admin/create-user-error',
  DELETE_USER: 'admin/delete-user',
  DELETE_USER_ERROR: 'admin/delete-user-error',
  EDIT_USER: 'admin/edit-user',
  GET_USER_BY_ID: 'admin/get-user-by-id',
  GET_USERS_ERROR: 'admin/get-users-error',
  EDIT_USER_ERROR: 'admin/edit-user-error',
  GET_POSTS: 'admin/get-posts',
  GET_POSTS_SUCCESS: 'admin/get-posts-success',
  GET_SITE_CAROUSEL: 'admin/get-site-carousel',
  GET_SITE_CAROUSEL_SUCCESS: 'admin/get-site-carousel-success',
  GET_SITE_INFO: 'admin/get-site-info',
  GET_SITE_INFO_SUCCESS: 'admin/get-site-info-success',
  UPDATE_SITE_CAROUSEL: 'admin/update-site-carousel',
  UPDATE_SITE_CAROUSEL_ERROR: 'admin/update-site-carousel-error',
  UPDATE_SITE_INFO: 'admin/update-site-info',
  UPDATE_SITE_INFO_ERROR: 'admin/update-site-info-error',
  GET_SITE_CAROUSEL_ERROR: 'admin/get-site-carousel-error',
  GET_SITE_INFO_ERROR: 'admin/get-site-info-error',
};

interface User {
  email: string;
  name: string;
  role: number;
  password: string;
}

export const getUsers = () => ({
  type: Types.GET_USERS,
});

export const getUsersSuccess = (users: any) => ({
  type: Types.GET_USERS_SUCCESS,
  payload: {
    ...users,
  },
});

export const getUsersError = ({ error }: any) => ({
  type: Types.GET_USERS_ERROR,
  payload: {
    error,
  },
});

export const createUserByAdmin = ({ email, name, password, role }: User) => ({
  type: Types.CREATE_USER,
  payload: {
    email,
    name,
    password,
    role,
  },
});

export const createUserError = ({ error }: any) => ({
  type: Types.CREATE_USER_ERROR,
  payload: {
    error,
  },
});

interface SelectUser {
  id: string;
  fields?: any;
}

export const deleteUser = ({ id }: SelectUser) => ({
  type: Types.DELETE_USER,
  payload: {
    id,
  },
});

export const deleteUserError = ({ error }: any) => ({
  type: Types.DELETE_USER_ERROR,
  payload: {
    error,
  },
});

export const editUserError = ({ error }: any) => ({
  type: Types.EDIT_USER_ERROR,
  payload: {
    error,
  },
});

export const editUser = ({ id, fields }: SelectUser) => ({
  type: Types.EDIT_USER,
  payload: {
    id,
    fields,
  },
});

export const getSiteCarousel = () => ({
  type: Types.GET_SITE_CAROUSEL,
});

export const getSiteCarouselSuccess = (carousels: any) => ({
  type: Types.GET_SITE_CAROUSEL_SUCCESS,
  payload: {
    ...carousels,
  },
});

export const getSiteInfo = () => ({
  type: Types.GET_SITE_INFO,
});

export const getSiteInfoSuccess = (infos: any) => ({
  type: Types.GET_SITE_INFO_SUCCESS,
  payload: {
    ...infos,
  },
});

export const updateSiteCarousel = ({ key, data }: any) => ({
  type: Types.UPDATE_SITE_CAROUSEL,
  payload: {
    key,
    data
  },
});

export const updateSiteCarouselError = ({ error }: any) => ({
  type: Types.UPDATE_SITE_CAROUSEL_ERROR,
  payload: { error }
})

export const updateSiteInfo = ({ infos }: any) => ({
  type: Types.UPDATE_SITE_INFO,
  payload: {
    infos
  }
})

export const updateSiteInfoError = ({ error }: any) => ({
  type: Types.UPDATE_SITE_INFO_ERROR,
  payload: { error }
})

export const getSiteInfoError = ({ error }: any) => ({
  type: Types.GET_SITE_INFO_ERROR,
  payload: { error }
})