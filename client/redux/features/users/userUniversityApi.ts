import { apiSlice } from "../api/apiSlice";

export const userUniversityApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatarUniversity: builder.mutation({
      query: (avatar) => ({
        url: "update-avatar-university",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    editProfileUniversity: builder.mutation({
      query: ({ name }) => ({
        url: "update-user-university",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
    }),
    changePasswordUniversity: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-password-university",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),
    getAllUsersUniversity: builder.query({
      query: () => ({
        url: "get-all-users-university",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateUserRoleUniversity: builder.mutation({
      query: ({ email, role }) => ({
        url: "update-user-role-university",
        method: "PUT",
        body: { email, role },
        credentials: "include" as const,
      }),
    }),
    deleteUserUniversity: builder.mutation({
      query: (id) => ({
        url: `${`delete-user-university/${id}`}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useDeleteUserUniversityMutation,
  useEditProfileUniversityMutation,
  useChangePasswordUniversityMutation,
  useGetAllUsersUniversityQuery,
  useUpdateAvatarUniversityMutation,
  useUpdateUserRoleUniversityMutation,
} = userUniversityApi;
