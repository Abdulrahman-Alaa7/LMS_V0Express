import { apiSlice } from "../api/apiSlice";

export const chatAi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    geminiChat: builder.mutation({
      query: ({ history, message }) => ({
        url: "gemini",
        method: "POST",
        body: { history, message },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGeminiChatMutation } = chatAi;
