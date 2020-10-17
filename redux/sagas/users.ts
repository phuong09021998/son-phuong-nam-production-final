import { takeLatest, takeEvery, call, put, fork } from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as api from '../api/users';
import { v4 as uuidv4 } from 'uuid';

interface LoginUser {
  type: string;
  payload: {
    email: string;
    password: string;
  };
}

function* loginUser({ payload }: LoginUser) {
  try {
    const result = yield call(api.loginUser, payload);
    yield put(actions.getUserSuccess({ ...result.data.user }));
  } catch (error) {
    const errorData = error.response.data;
    if (errorData.error === 'Password is incorrect.') {
      yield put(actions.loginUserError({ error: 'Sai mật khẩu' + uuidv4() }));
    } else if (errorData.error === 'User not found.') {
      yield put(actions.loginUserError({ error: 'Không tìm thấy người dùng' + uuidv4() }));
    } else if (errorData.error === 'Cannot use normal login.') {
      yield put(actions.loginUserError({ error: 'Không thể đăng nhập bằng cách này' + uuidv4() }));
    } else {
      yield put(actions.loginUserError({ error: errorData.error }));
    }
  }
}

function* watchLoginUser() {
  yield takeLatest(actions.Types.LOGIN_USER, loginUser);
}

function* getUser() {
  try {
    const result = yield call(api.getUser);
    yield put(actions.getUserSuccess({ ...result.data.user }));
  } catch (e) {
    // yield put(actions.getUserSuccess({ ...result.data.user }));
    yield put(actions.getUserError());
  }
}

function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USER, getUser);
}

function* createUser({ payload }: any) {
  try {
    const result = yield call(api.createUser, payload);
    yield put(actions.getUserSuccess({ ...result.data.user }));
  } catch (error) {
    console.log(error.response);
  }
}

function* loginByGoogle({ payload }: any) {
  try {
    const result = yield call(api.loginByGoogle, payload);
    yield put(actions.getUserSuccess({ ...result.data.user }));
  } catch (error) {
    const errorData = error.response.data;
    if (errorData.error === 'Email is already in use.') {
      yield put(actions.loginByGoogleError({ error: 'Email đã tồn tại' }));
    } else {
      yield put(actions.loginByGoogleError({ error: 'Lỗi bất ngờ đã xảy ra' }));
    }
  }
}

function* watchCreateUser() {
  yield takeLatest(actions.Types.CREATE_USER, createUser);
}

function* watchLoginByGoogle() {
  yield takeLatest(actions.Types.LOGIN_BY_GOOGLE, loginByGoogle);
}

function* logOutUser() {
  yield call(api.logoutUser);
  yield call(getUser);
}

function* watchLogOutUser() {
  yield takeLatest(actions.Types.LOG_OUT_USER, logOutUser);
}

function* loginByFacebook({ payload }: any) {
  try {
    const result = yield call(api.loginByFacebook, payload);
    yield put(actions.getUserSuccess({ ...result.data.user }));
  } catch (error) {
    const errorData = error.response.data;
    if (errorData.error === 'Email is already in use.') {
      yield put(actions.loginByFacebookError({ error: 'Email đã tồn tại' }));
    } else {
      yield put(actions.loginByFacebookError({ error: 'Lỗi bất ngờ đã xảy ra' }));
    }
  }
}

function* watchLoginByFacebook() {
  yield takeLatest(actions.Types.LOGIN_BY_FACEBOOK, loginByFacebook);
}

const userSagas = [
  fork(watchLoginUser),
  fork(watchGetUsersRequest),
  fork(watchCreateUser),
  fork(watchLoginByGoogle),
  fork(watchLogOutUser),
  fork(watchLoginByFacebook),
];

export default userSagas;
