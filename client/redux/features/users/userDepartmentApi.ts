import { apiSlice } from "../api/apiSlice";

export const userDepartmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatarDepartment: builder.mutation({
      query: (avatar) => ({
        url: "update-avatar-department",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    editProfileDepartment: builder.mutation({
      query: ({ name }) => ({
        url: "update-user-department",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
    }),
    changePasswordDepartment: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-password-department",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),
    getAllUsersDepartment: builder.query({
      query: () => ({
        url: "get-all-users-department",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateUserRoleDepartment: builder.mutation({
      query: ({ email, role }) => ({
        url: "update-user-role-department",
        method: "PUT",
        body: { email, role },
        credentials: "include" as const,
      }),
    }),
    updateDepartmentSemester: builder.mutation({
      query: ({ email, semester }) => ({
        url: "update-department-semester",
        method: "PUT",
        body: { email, semester },
        credentials: "include" as const,
      }),
    }),
    updateStudentYearByPromote: builder.mutation({
      query: ({ email, studentYearOfStudy }) => ({
        url: "update-student-year-promote",
        method: "PUT",
        body: { email, studentYearOfStudy },
        credentials: "include" as const,
      }),
    }),
    updateStudentYearAndName: builder.mutation({
      query: ({ email, name, studentYearOfStudy }) => ({
        url: "update-student-year-name",
        method: "PUT",
        body: { email, name, studentYearOfStudy },
        credentials: "include" as const,
      }),
    }),
    deleteUserDepartment: builder.mutation({
      query: (id) => ({
        url: `${`delete-user-department/${id}`}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useDeleteUserDepartmentMutation,
  useEditProfileDepartmentMutation,
  useChangePasswordDepartmentMutation,
  useGetAllUsersDepartmentQuery,
  useUpdateAvatarDepartmentMutation,
  useUpdateUserRoleDepartmentMutation,
  useUpdateDepartmentSemesterMutation,
  useUpdateStudentYearByPromoteMutation,
  useUpdateStudentYearAndNameMutation,
} = userDepartmentApi;
