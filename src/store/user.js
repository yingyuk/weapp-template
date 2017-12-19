import wepy from 'wepy';

import { SAVE_USERINFO } from '@/store/ActionTypes';

const initialState = {
  userInfo: null,
};

export const fetchUserInfo = () => async (dispatch, getState) => {
  const { user = {} } = getState();
  const { userInfo } = user;
  if (userInfo) {
    return;
  }
  const payload = await wepy.getUserInfo();

  dispatch({
    type: SAVE_USERINFO,
    payload,
  });
};

export const saveUserInfo = payload => ({ type: SAVE_USERINFO, payload });

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USERINFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};
