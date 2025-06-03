import {create} from 'zustand';

interface ReviewStore{
    resetSignal: number;
    triggerReset:()=>void;
    refreshReviewSignal:number;
    triggerRefreshReview:()=>void;
}

export const useReviewStore = create<ReviewStore>((set)=>({
    resetSignal:0,
    triggerReset:()=>set({resetSignal:Date.now()}),
    refreshReviewSignal:0,
    triggerRefreshReview:()=>set({refreshReviewSignal:Date.now()}),
}));