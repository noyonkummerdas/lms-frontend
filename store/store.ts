import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { courseApi } from "./api/courseApi";
import { lessonApi } from "./api/lessonApi";
import { quizApi } from "./api/quizApi";
import { assignmentApi } from "./api/assignmentApi";
import { enrollmentApi } from "./api/enrollmentApi";
import { paymentApi } from "./api/paymentApi";
import { certificateApi } from "./api/certificateApi";
import { discussionApi } from "./api/discussionApi";
import { notificationApi } from "./api/notificationApi";
import { reportApi } from "./api/reportApi";

import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import courseReducer from "./slices/courseSlice";
import lessonReducer from "./slices/lessonSlice";
import quizReducer from "./slices/quizSlice";
import assignmentReducer from "./slices/assignmentSlice";
import enrollmentReducer from "./slices/enrollmentSlice";
import paymentReducer from "./slices/paymentSlice";
import certificateReducer from "./slices/certificateSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    course: courseReducer,
    lesson: lessonReducer,
    quiz: quizReducer,
    assignment: assignmentReducer,
    enrollment: enrollmentReducer,
    payment: paymentReducer,
    certificate: certificateReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [lessonApi.reducerPath]: lessonApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [assignmentApi.reducerPath]: assignmentApi.reducer,
    [enrollmentApi.reducerPath]: enrollmentApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [certificateApi.reducerPath]: certificateApi.reducer,
    [discussionApi.reducerPath]: discussionApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      courseApi.middleware,
      lessonApi.middleware,
      quizApi.middleware,
      assignmentApi.middleware,
      enrollmentApi.middleware,
      paymentApi.middleware,
      certificateApi.middleware,
      discussionApi.middleware,
      notificationApi.middleware,
      reportApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
