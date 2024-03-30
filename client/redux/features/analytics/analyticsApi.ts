import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getManagersAnalytics: builder.query({
      query: () => ({
        url: `get-managers-analytics`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getUniversitiesAnalytics: builder.query({
      query: () => ({
        url: `get-universities-analytics`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getFacultiesAnalytics: builder.query({
      query: () => ({
        url: `get-faculties-analytics`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getDepartmentsAnalytics: builder.query({
      query: () => ({
        url: `get-departments-analytics`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getProfessorsAnalytics: builder.query({
      query: () => ({
        url: `get-professors-analytics`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getStudnetsAnalytics: builder.query({
      query: () => ({
        url: `get-students-analytics`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCoursesAnalytics: builder.query({
      query: () => ({
        url: `get-courses-analytics`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getOrdersAnalytics: builder.query({
      query: () => ({
        url: `get-orders-analytics`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetManagersAnalyticsQuery,
  useGetUniversitiesAnalyticsQuery,
  useGetFacultiesAnalyticsQuery,
  useGetDepartmentsAnalyticsQuery,
  useGetProfessorsAnalyticsQuery,
  useGetStudnetsAnalyticsQuery,
  useGetCoursesAnalyticsQuery,
  useGetOrdersAnalyticsQuery,
} = analyticsApi;
