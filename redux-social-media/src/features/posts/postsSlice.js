import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const postsAdapter = createEntityAdapter();

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    return [
      {
        id: 1,
        title: "React Basics",
        platform: "Facebook",
      },
      {
        id: 2,
        title: "Redux Toolkit",
        platform: "LinkedIn",
      },
      {
        id: 3,
        title: "Selectors",
        platform: "Facebook",
      },
    ];
  }
);

const initialState = postsAdapter.getInitialState({
  loading: false,
  error: null,
});

const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {

    addPost: postsAdapter.addOne,

    updatePost: postsAdapter.updateOne,

    removePost: postsAdapter.removeOne,
  },

  extraReducers: (builder) => {

    builder

      .addCase(fetchPosts.pending, (state) => {

        state.loading = true;

      })

      .addCase(fetchPosts.fulfilled, (state, action) => {

        state.loading = false;

        postsAdapter.setAll(state, action.payload);

      })

      .addCase(fetchPosts.rejected, (state) => {

        state.loading = false;

        state.error = "Unable to Load";

      });

  },
});

export const {

addPost,

updatePost,

removePost,

} = postsSlice.actions;

export default postsSlice.reducer;

export const postsSelectors = postsAdapter.getSelectors(
(state)=>state.posts
);