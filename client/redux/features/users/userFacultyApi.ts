import { apiSlice } from "../api/apiSlice";

export const userFacultyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatarFaculty: builder.mutation({
      query: (avatar) => ({
        url: "update-avatar-faculty",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    editProfileFaculty: builder.mutation({
      query: ({ name }) => ({
        url: "update-user-faculty",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
    }),
    changePasswordFaculty: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-password-faculty",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),
    getAllUsersFaculty: builder.query({
      query: () => ({
        url: "get-all-users-faculty",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateUserRoleFaculty: builder.mutation({
      query: ({ email, role }) => ({
        url: "update-user-role-faculty",
        method: "PUT",
        body: { email, role },
        credentials: "include" as const,
      }),
    }),
    deleteUserFaculty: builder.mutation({
      query: (id) => ({
        url: `${`delete-user-faculty/${id}`}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useDeleteUserFacultyMutation,
  useEditProfileFacultyMutation,
  useChangePasswordFacultyMutation,
  useGetAllUsersFacultyQuery,
  useUpdateAvatarFacultyMutation,
  useUpdateUserRoleFacultyMutation,
} = userFacultyApi;
