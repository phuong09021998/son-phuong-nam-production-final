import { takeLatest, takeEvery, take, call, put, fork } from 'redux-saga/effects';
import * as actions from '../actions/admins';
import * as api from '../api/admins';

function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    yield put(actions.getUsersSuccess({ ...result.data.users }));
  } catch (e) {
    yield put(actions.getUsersError({ error: 'Lấy thông tin người dùng thất bại' }));
  }
}

function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS, getUsers);
}

function* createUser({ payload }: any) {
  try {
    yield call(api.createUserByAdmin, {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role,
    });

    yield call(getUsers);
  } catch (error) {
    const errordata = error.response.data;
    if (errordata.error.includes('E11000')) {
      yield put(actions.createUserError({ error: 'Email đã tồn tại' }));
    } else {
      yield put(actions.createUserError({ error: 'Đăng ký thất bại' }));
    }
  }
}

function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER, createUser);
}

interface DeleteUser {
  id: string;
}

function* deleteUser(payload: DeleteUser) {
  try {
    yield call(api.deleteUser, payload);
    yield call(getUsers);
  } catch (e) {
    yield put(actions.deleteUserError({ error: 'Xóa thất bại' }));
  }
}

function* watchDeleteUserRequest() {
  while (true) {
    const { payload } = yield take(actions.Types.DELETE_USER);
    yield call(deleteUser, payload);
  }
}

function* updateUser({ payload }: any) {
  try {
    yield call(api.editUser, {
      name: payload.fields.name,
      email: payload.fields.email,
      password: payload.fields.password,
      role: payload.fields.role,
      id: payload.id,
    });

    yield call(getUsers);
  } catch (error) {
    yield put(actions.editUserError({ error: 'Sửa người dùng thất bại' }));
  }
}

function* watchUpdateUserRequest() {
  yield takeLatest(actions.Types.EDIT_USER, updateUser);
}



function* getCarousels() {
  try {
    const result = yield call(api.getSiteCarousel);
    yield put(actions.getSiteCarouselSuccess({ ...result.data.site.carousel }));
  } catch (e) {
    yield put(actions.getUsersError({ error: 'Lấy thông tin băng chuyền thất bại' }));
  }
}

function* watchGetSiteCarouselsRequest() {
  yield takeEvery(actions.Types.GET_SITE_CAROUSEL, getCarousels);
}

function* getSiteInfos() {
  try {
    const result = yield call(api.getSiteInfo);
    yield put(actions.getSiteInfoSuccess({ ...result.data.site.siteInfo }));
  } catch (e) {
    yield put(actions.getSiteInfoError({ error: 'Lấy thông tin liên hệ thất bại' }));
  }
}

function* watchGetSiteInfosRequest() {
  yield takeEvery(actions.Types.GET_SITE_INFO, getSiteInfos);
}

function* updateSiteCarousel({ payload }: any) {
  try {
    yield call(api.updateSiteCarousel, {
      key: payload.key,
      data: payload.data
    });

    yield call(getCarousels);
  } catch (error) {
    yield put(actions.updateSiteCarouselError({ error: 'Sửa thất bại' }));
  }
}

function* watchUpdateSiteCarouselsRequest() {
  yield takeLatest(actions.Types.UPDATE_SITE_CAROUSEL, updateSiteCarousel);
}

function* updateSiteInfo({ payload }: any) {
  try {
    yield call(api.updateSiteInfo, payload);

    yield call(getSiteInfos);
  } catch (error) {
    yield put(actions.updateSiteInfoError({ error: 'Sửa thất bại' }));
  }
}

function* watchUpdateSiteInfosRequest() {
  yield takeLatest(actions.Types.UPDATE_SITE_INFO, updateSiteInfo);
}


const adminSagas = [
  fork(watchGetUsersRequest),
  fork(watchGetSiteCarouselsRequest),
  fork(watchGetSiteInfosRequest),
  fork(watchCreateUserRequest),
  fork(watchDeleteUserRequest),
  fork(watchUpdateUserRequest),
  fork(watchUpdateSiteCarouselsRequest),
  fork(watchUpdateSiteInfosRequest),
];

export default adminSagas;
