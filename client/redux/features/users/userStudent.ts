import { apiSlice } from "../api/apiSlice";

export const userStudentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatarStudent: builder.mutation({
      query: (avatar) => ({
        url: "update-avatar-student",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    editProfileStudent: builder.mutation({
      query: ({ name }) => ({
        url: "update-user-student",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
    }),
    changePasswordStudent: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-password-student",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),
    getAllUsersStudent: builder.query({
      query: () => ({
        url: "get-all-users-student",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateUserRoleStudent: builder.mutation({
      query: ({ email, role }) => ({
        url: "update-user-role-student",
        method: "PUT",
        body: { email, role },
        credentials: "include" as const,
      }),
    }),
    deleteUserStudent: builder.mutation({
      query: (id) => ({
        url: `${`delete-user-student/${id}`}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useDeleteUserStudentMutation,
  useEditProfileStudentMutation,
  useChangePasswordStudentMutation,
  useGetAllUsersStudentQuery,
  useUpdateAvatarStudentMutation,
  useUpdateUserRoleStudentMutation,
} = userStudentApi;
