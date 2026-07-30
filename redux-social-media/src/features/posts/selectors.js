import { createSelector } from "@reduxjs/toolkit";
import { postsSelectors } from "./postsSlice";

export const selectAllPosts = postsSelectors.selectAll;

export const selectFacebookPosts = createSelector(
    [selectAllPosts],
    (posts)=>
    posts.filter(post=>post.platform==="Facebook")
);

export const selectTotalPosts=createSelector(
    [selectAllPosts],
    (posts)=>posts.length
);

export const selectAnalytics=createSelector(
    [selectAllPosts],
    (posts)=>{

        const analytics={};

        posts.forEach(post=>{

            analytics[post.platform]=(analytics[post.platform]||0)+1;

        });

        return analytics;
    }
);