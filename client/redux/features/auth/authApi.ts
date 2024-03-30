import { apiSlice } from "../api/apiSlice";
import {
  userLoggedIn,
  userLoggedOut,
  userRegistration,
  userActivation,
} from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoints here
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activation",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userActivation({
              accessToken: result.data.accessToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    logout: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),

    registerUniversity: builder.mutation<
      RegistrationResponse,
      RegistrationData
    >({
      query: (data) => ({
        url: "registration-university",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    activationUniversity: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activation-university",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userActivation({
              accessToken: result.data.accessToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    registerFaculty: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration-faculty",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    activationFaculty: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activation-faculty",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userActivation({
              accessToken: result.data.accessToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    registerDepartment: builder.mutation<
      RegistrationResponse,
      RegistrationData
    >({
      query: (data) => ({
        url: "registration-department",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    activationDepartment: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activation-department",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userActivation({
              accessToken: result.data.accessToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    registerProfessor: builder.mutation<RegistrationResponse, RegistrationData>(
      {
        query: (data) => ({
          url: "registration-professor",
          method: "POST",
          body: data,
          credentials: "include" as const,
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;

            dispatch(
              userRegistration({
                token: result.data.activationToken,
              })
            );
          } catch (error) {
            console.log(error);
          }
        },
      }
    ),

    activationProfessor: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activation-professor",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userActivation({
              accessToken: result.data.accessToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    registerStudent: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration-student",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    activationStudent: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activation-student",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userActivation({
              accessToken: result.data.accessToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useLogoutQuery,
  useRegisterUniversityMutation,
  useActivationUniversityMutation,
  useRegisterFacultyMutation,
  useActivationFacultyMutation,
  useRegisterDepartmentMutation,
  useActivationDepartmentMutation,
  useRegisterProfessorMutation,
  useActivationProfessorMutation,
  useRegisterStudentMutation,
  useActivationStudentMutation,
} = authApi;
