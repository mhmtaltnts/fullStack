import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: {...credentials} ,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sendEmail: builder.mutation({
      query: ({email}) => ({
        url: "/auth/forgot_password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({email, password}) => ({
        url: "/auth/reset_password/:id/:token",
        method: "POST",
        body: { email, password },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useSendEmailMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} = authApiSlice;
