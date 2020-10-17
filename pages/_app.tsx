import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.scss';
import 'components/EmojiInput/styles.css';
import 'emoji-mart/css/emoji-mart.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import reducers from '../redux/reducers';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);
// const store = createStore(reducers, );

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
