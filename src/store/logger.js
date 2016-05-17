import createLogger from 'redux-logger';
import immutableToJS from '../utils/immutable-to-js';

export default createLogger({
  collapsed: true,
  logger: console,
  stateTransformer: (state) => {
    return immutableToJS(state);
  },
});
