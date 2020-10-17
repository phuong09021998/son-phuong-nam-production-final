import { takeLatest, takeEvery, take, call, put, fork } from 'redux-saga/effects';
import * as actions from '../actions/products';
import * as api from '../api/products';

function* getProductsByAdmin() {
  try {
    const items = yield call(api.getProductsByAdmin);
    // console.log(items);
    yield put(actions.getProductsByAdminSuccess({ items: items.data.products }));
  } catch (error) {
    yield put(actions.getProductsByAdminError({ error: 'Lấy sản phẩm thất bại' }));
  }
}

function* watchGetProductsByAdminRequest() {
  yield takeEvery(actions.Types.GET_PRODUCTS_BY_ADMIN, getProductsByAdmin);
}

function* createProductByAdmin({ payload }: any) {
  try {
    yield call(api.createProduct, payload);
    yield call(getProductsByAdmin);
  } catch (error) {
    const errorData = error.response.data;
    if (errorData.error.includes('E11000')) {
      yield put(actions.createProductError({ error: 'Tên sản phẩm đã tồn tại' }));
    } else {
      yield put(actions.createProductError({ error: 'Tạo sản phẩm thất bại' }));
    }
  }
}

function* watchCreateProductByAdminRequest() {
  yield takeLatest(actions.Types.CREATE_PRODUCT, createProductByAdmin);
}

function* deleteProduct(payload: any) {
  try {
    yield call(api.deleteProduct, payload);
    yield call(getProductsByAdmin);
  } catch (e) {
    yield put(actions.deleteProductError({ error: 'Xóa thất bại' }));
  }
}

function* watchDeleteProductRequest() {
  while (true) {
    const { payload } = yield take(actions.Types.DELETE_PRODUCT);
    yield call(deleteProduct, payload);
  }
}

function* handleUpdatePublishProduct({ payload }: any) {
  try {
    yield call(api.updatePublishProduct, payload);
    yield call(getProductsByAdmin);
  } catch (error) {
    yield put(actions.updatePublishProductError({ error: 'Cập nhật thất bại' }));
  }
}

function* watchUpdatePublishProductRequest() {
  yield takeLatest(actions.Types.UPDATE_PUBLISH_PRODUCT, handleUpdatePublishProduct);
}

function* handleUpdateAvailableProduct({ payload }: any) {
  try {
    yield call(api.updateAvailableProduct, payload);
    yield call(getProductsByAdmin);
  } catch (error) {
    yield put(actions.updateAvailableProductError({ error: 'Cập nhật thất bại' }));
  }
}

function* watchUpdateAvailableProductRequest() {
  yield takeLatest(actions.Types.UPDATE_AVAILABLE, handleUpdateAvailableProduct);
}

function* handleUpdateProductRequest({ payload }: any) {
  try {
    yield call(api.updateProduct, payload);
    yield call(getProductsByAdmin);
  } catch (error) {
    yield put(actions.updateProductError({ error: 'Cập nhật thất bại' }));
  }
}

function* watchUpdateProductRequest() {
  yield takeLatest(actions.Types.UPDATE_PRODUCT, handleUpdateProductRequest);
}

const productSagas = [
  fork(watchGetProductsByAdminRequest),
  fork(watchCreateProductByAdminRequest),
  fork(watchDeleteProductRequest),
  fork(watchUpdatePublishProductRequest),
  fork(watchUpdateAvailableProductRequest),
  fork(watchUpdateProductRequest),
];

export default productSagas;
