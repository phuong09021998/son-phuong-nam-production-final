import { takeEvery, call, put, fork } from 'redux-saga/effects';
import * as actions from '../actions/site';
import * as api from '../api/site';

function* getCarousel() {
  try {
    const result = yield call(api.getCarousel);
    yield put(actions.getCarouselSuccess({ items: result.data.site.carousel }));
  } catch (error) {}
}

function* watchGetCarouselRequest() {
  yield takeEvery(actions.Types.GET_CAROUSEL, getCarousel);
}

const siteSagas = [fork(watchGetCarouselRequest)];

export default siteSagas;
