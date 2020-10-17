import { takeLatest, takeEvery, take, call, put, fork } from 'redux-saga/effects';
import * as actions from '../actions/posts';
import * as api from '../api/posts';

function* getPostsByAdmin() {
  try {
    const items = yield call(api.getPostsByAdmin);
    yield put(actions.getPostsByAdminSuccess({ items: items.data.posts }));
  } catch (error) {
    yield put(actions.getPostsByAdminError({ error: 'Lấy bài viết thất bại' }));
  }
}

function* watchGetPostsByAdminRequest() {
  yield takeEvery(actions.Types.GET_POSTS_BY_ADMIN, getPostsByAdmin);
}

function* createPostByAdmin({ payload }: any) {
  try {
    yield call(api.createPost, payload);
    yield call(getPostsByAdmin);
  } catch (error) {
    const errorData = error.response.data;
    if (errorData.error.includes('E11000')) {
      yield put(actions.createPostError({ error: 'Tên bài viết đã tồn tại' }));
    } else {
      yield put(actions.createPostError({ error: 'Tạo bài viết thất bại' }));
    }
  }
}

function* watchCreatePostsByAdminRequest() {
  yield takeLatest(actions.Types.CREATE_POST, createPostByAdmin);
}

function* deletePost(payload: any) {
  try {
    yield call(api.deletePost, payload);
    yield call(getPostsByAdmin);
  } catch (e) {
    yield put(actions.deletePostError({ error: 'Xóa thất bại' }));
  }
}

function* watchDeletePostRequest() {
  while (true) {
    const { payload } = yield take(actions.Types.DELETE_POST);
    yield call(deletePost, payload);
  }
}

function* handleUpdatePublish({ payload }: any) {
  try {
    yield call(api.updatePublish, payload);
    yield call(getPostsByAdmin);
  } catch (error) {
    yield put(actions.updatePublishError({ error: 'Cập nhật thất bại' }));
  }
}

function* watchUpdatePublishRequest() {
  yield takeLatest(actions.Types.UPDATE_PUBLISH, handleUpdatePublish);
}

function* handleUpdatePostRequest({ payload }: any) {
  try {
    yield call(api.updatePost, payload);
    yield call(getPostsByAdmin);
  } catch (error) {
    yield put(actions.updateError({ error: 'Cập nhật thất bại' }));
  }
}

function* watchUpdatePostRequest() {
  yield takeLatest(actions.Types.UPDATE_POST, handleUpdatePostRequest);
}

const postSagas = [
  fork(watchGetPostsByAdminRequest),
  fork(watchCreatePostsByAdminRequest),
  fork(watchDeletePostRequest),
  fork(watchUpdatePublishRequest),
  fork(watchUpdatePostRequest),
];

export default postSagas;
