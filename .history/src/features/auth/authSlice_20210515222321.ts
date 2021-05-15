import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';
import { PROPS_AUTHEN, PROPS_PROFILE, PROPS_NICKNAME } from '../types';
//djangoのurlをenvから取得
const apiUrl = process.env.REACT_APP_DEV_API_URL;

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        //login用のモーダルのtrue false
        openSignIn: true,
        //register用のモーダルのtrue false
        openSignUp: false,
        //profiel変更用のモーダルのtrue false
        openProfile: false,
        //バックエンドの処理中のローディングのtrue false
        //処理中はtrue
        isLoadingAuth: false,
        myprofile: {
            id: 0,
            nickName: "",
            userProfile: 0,
            created_on: "",
            img: "",
        },
        //apiで取得してきたprofileのリストを保持しておくためのオブジェクト
        profiles: [
            {
                id: 0,
                nickName: "",
                userProfile: 0,
                created_on: "",
                img: "",
            },
        ],
    },
  // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        //fetchの開始時と終了時の処理
        fetchCredStart(state) {
            state.isLoadingAuth = true;
        },
        fetchCredEnd(state) {
            state.isLoadingAuth = false;
        },
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
