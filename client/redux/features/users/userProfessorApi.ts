import { apiSlice } from "../api/apiSlice";

export const userProfessorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatarProfessor: builder.mutation({
      query: (avatar) => ({
        url: "update-avatar-professor",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    editProfileProfessor: builder.mutation({
      query: ({ name }) => ({
        url: "update-user-professor",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
    }),
    changePasswordProfessor: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-password-professor",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),
    getAllUsersProfessor: builder.query({
      query: () => ({
        url: "get-all-users-professor",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateUserRoleProfessor: builder.mutation({
      query: ({ email, role }) => ({
        url: "update-user-role-professor",
        method: "PUT",
        body: { email, role },
        credentials: "include" as const,
      }),
    }),
    deleteUserProfessor: builder.mutation({
      query: (id) => ({
        url: `${`delete-user-professor/${id}`}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    getAllUsersDepartmentProf: builder.query({
      query: () => ({
        url: "get-all-users-department-prof",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useDeleteUserProfessorMutation,
  useEditProfileProfessorMutation,
  useChangePasswordProfessorMutation,
  useGetAllUsersProfessorQuery,
  useUpdateAvatarProfessorMutation,
  useUpdateUserRoleProfessorMutation,
  useGetAllUsersDepartmentProfQuery,
} = userProfessorApi;
