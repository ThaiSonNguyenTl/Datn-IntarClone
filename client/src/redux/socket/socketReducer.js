import socketTypes from './socketTypes';

const INTIAL_STATE = {
  socket: null,
};

const socketReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case socketTypes.CONNECT: {
      console.log("action.payload:", action.payload);
      return {
        ...state,
        socket: action.payload,
      };
    }
    case socketTypes.DISCONNECT: {
      state.socket && state.socket.disconnect();
      return INTIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default socketReducer;
