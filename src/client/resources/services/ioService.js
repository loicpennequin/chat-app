import io from 'socket.io-client';
import constants from './constants.js';

const socket = __IS_BROWSER__
    ? io(constants.API_URL, { transports: ['websocket'] })
    : { on: () => {}, emit: () => {} };

export default socket;
