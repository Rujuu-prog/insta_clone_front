import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';
import { PROPS_AUTHEN, PROPS_PROFILE, PROPS_NICKNAME } from '../types';
//djangoのurlをenvから取得
const apiUrl = process.env.REACT_APP_DEV_API_URL;

export const fetchAsyncLogin = createAsyncThunk(
    //アクションの名前(任意の名前で良い)
    "auth/post",
    //引数authenの型はtypesのPROPS_AUTHENで定義済み
    async (authen: PROPS_AUTHEN) => {
        // postメソッドでapi
        const res = await axios.post(`${apiUrl}authen/jwt/create`, authen, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        //jwtのアクセストークンが返るのでreturnで返す
        return res.data;
    }
);

export const fetchAsyncRegister = createAsyncThunk(
    "auth/register",
    async (auth: PROPS_AUTHEN) => {
        const res = await axios.post(`${apiUrl}api/register/`, auth, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    }
);

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
    //stateのsetのようなやつ？
  // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        //fetchの開始時と終了時の処理
        fetchCredStart(state) {
            state.isLoadingAuth = true;
        },
        fetchCredEnd(state) {
            state.isLoadingAuth = false;
        },
        setOpenSignIn(state) {
            state.openSignIn = true;
        },
        resetOpenSignIn(state) {
        state.openSignIn = false;
        },
        setOpenSignUp(state) {
        state.openSignUp = true;
        },
        resetOpenSignUp(state) {
        state.openSignUp = false;
        },
        setOpenProfile(state) {
        state.openProfile = true;
        },
        resetOpenProfile(state) {
        state.openProfile = false;
        },
        //ニックネームを編集するためのアクション
        //stateのmyprofileのnocknameを上書きできるアクション
        editNickname(state, action) {
        state.myprofile.nickName = action.payload;
        },
    },
});
//reducersで定義したアクションを外で使えるようにする
export const {
    fetchCredStart,
    fetchCredEnd,
    setOpenSignIn,
    resetOpenSignIn,
    setOpenSignUp,
    resetOpenSignUp,
    setOpenProfile,
    resetOpenProfile,
    editNickname,
} = authSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default authSlice.reducer;
