/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";
export const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
  },
  reducers: {
    fetchAll: (state, action) => {
      const data = action.payload;
      console.log(data);
      state.projects = data;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    addTask: (state, action) => {
      const projectId = action.payload._id;
      console.log(action.payload._id);
      console.log(state.projects.filter((proj) => proj._id === projectId));
      state.projects.filter((proj) => proj._id === projectId);
      state.projects.map((project) => {
        if (project._id === projectId) {
          project.tasks = [...action.payload.tasks];
        }
      });
      console.log(state.projects);
    },
  },
});

export const { fetchAll, addProject, addTask } = projectSlice.actions;

export default projectSlice.reducer;
