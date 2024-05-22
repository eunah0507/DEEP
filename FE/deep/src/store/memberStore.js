import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
    isAuthorized: false,
    memberID: "",
    memberNickName: "",
    memberRandom: "",
    memberFile: "",
    memberIntroduce: "",
};

export const memberSlice = createSlice({
    name: "member",
    initialState: { value: initialStateValue },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = initialStateValue;
        },
        saveMemberInfo: (state, action) => {
            state.value.memberNickName = action.payload.memberNickName;
            state.value.memberFile = action.payload.memberFile;
            state.value.memberIntroduce = action.payload.memberIntroduce;
        },
    },
});

export default memberSlice.reducer;

export const { login, logout, saveMemberInfo } = memberSlice.actions;
