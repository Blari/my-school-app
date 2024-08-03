import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import assignmentsSlice from './assignments/assignmentsSlice';
import classesSlice from './classes/classesSlice';
import gradesSlice from './grades/gradesSlice';
import parentsSlice from './parents/parentsSlice';
import studentsSlice from './students/studentsSlice';
import teachersSlice from './teachers/teachersSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    assignments: assignmentsSlice,
    classes: classesSlice,
    grades: gradesSlice,
    parents: parentsSlice,
    students: studentsSlice,
    teachers: teachersSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
