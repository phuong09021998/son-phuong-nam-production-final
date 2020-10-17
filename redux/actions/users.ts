export const Types = {
  LOGIN_USER: 'user/login-user',
  LOGIN_USER_ERROR: 'user/login-user-error',
  GET_USER_SUCCESS: 'user/get-user-success',
  GET_USER: 'user/get-user',
  GET_USER_ERROR: 'user/get-user-error',
  CREATE_USER: 'user/create-user',
  CREATE_USER_ERROR: 'user/create-user-error',
  LOG_OUT_USER: 'user/logout-user',
  LOG_OUT_USER_ERROR: 'user/logout-user-error',
  UPDATE_USER: 'user/update-user',
  UPDATE_USER_ERROR: 'user/update-user-error',
  LOGIN_BY_GOOGLE: 'user/login-by-google',
  LOGIN_BY_GOOGLE_ERROR: 'user/login-by-google-error',
  LOGIN_BY_FACEBOOK: 'user/login-by-facebook',
  LOGIN_BY_FACEBOOK_ERROR: 'user/login-by-facebook-error',
};

interface LoginUser {
  email: string;
  password: string;
}

export const loginUser = ({ email, password }: LoginUser) => ({
  type: Types.LOGIN_USER,
  payload: {
    email,
    password,
  },
});

export const getUser = () => ({
  type: Types.GET_USER,
});

export const getUserSuccess = (user: any) => ({
  type: Types.GET_USER_SUCCESS,
  payload: {
    ...user,
  },
});

export const createUser = (user: any) => ({
  type: Types.CREATE_USER,
  payload: {
    ...user,
  },
});

export const updateUser = (fields: any) => ({
  type: Types.UPDATE_USER,
  payload: {
    ...fields,
  },
});

export const loginByGoogle = (fields: any) => ({
  type: Types.LOGIN_BY_GOOGLE,
  payload: {
    ...fields,
  },
});

export const loginByGoogleError = ({ error }: any) => ({
  type: Types.LOGIN_BY_GOOGLE_ERROR,
  payload: {
    error,
  },
});

export const createUsersError = ({ error }: any) => ({
  type: Types.CREATE_USER_ERROR,
  payload: {
    error,
  },
});

export const updateUserError = ({ error }: any) => ({
  type: Types.UPDATE_USER_ERROR,
  payload: {
    error,
  },
});

export const logOutUser = () => ({
  type: Types.LOG_OUT_USER,
});

export const getUserError = () => ({
  type: Types.GET_USER_ERROR,
});

export const loginUserError = ({ error }: any) => ({
  type: Types.LOGIN_USER_ERROR,
  payload: {
    error,
  },
});

export const loginByFacebook = (fields: any) => ({
  type: Types.LOGIN_BY_FACEBOOK,
  payload: {
    ...fields,
  },
});

export const loginByFacebookError = ({ error }: any) => ({
  type: Types.LOGIN_BY_FACEBOOK_ERROR,
  payload: {
    error,
  },
});
