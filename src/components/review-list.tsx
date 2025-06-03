
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmationModal from "./confirmation-modal";
import { useReviewStore } from "@/store/reviewStore";
import { useUser } from "@clerk/nextjs";

interface Review {
  id: string;
  userId: string;
  rating: number;
  content: string;
  username: string;
  imageUrl: string;
  isCurrentUser?: boolean;
}

interface ReactionData {
  likeCount: number;
  dislikeCount: number;
  userReaction: {
    isLike: boolean;
    createdAt: string;
  } | null;
}

export default function ReviewList({
  tmdbId,
  mediaType,
}: {
  tmdbId: number;
  mediaType: "movie" | "tv";
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
   const [reactionData, setReactionData] = useState<{[reviewId: string]: ReactionData}>({});
    const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());
    const { user } = useUser();


  //from zustand store
  const triggerReset = useReviewStore((state)=>state.triggerReset);
  const refreshReviewSignal = useReviewStore((state) => state.refreshReviewSignal);


  useEffect(() => {
    const url =
      mediaType === "movie"
        ? `/api/movies/review/${tmdbId}`
        : `/api/tvshows/review/${tmdbId}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [tmdbId, mediaType, refreshReviewSignal]);


  //its the modal that popup after clicking on delet button
  const [showModal, setShowModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const openDeleteModal = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedReviewId) return;
    const url =
      mediaType === "movie"
        ? `/api/movies/review/${tmdbId}?reviewId=${selectedReviewId}`
        : `/api/tvshows/review/${tmdbId}?reviewId=${selectedReviewId}`;

    const res = await fetch(url, { method: "DELETE" });

    if (res.ok) {
      toast.success("Review deleted");
      setReviews((prev) => prev.filter((r) => r.id !== selectedReviewId));
 // Triggers reset in form
 triggerReset();
    } else {
      const err = await res.json();
      toast.error(err.error || "Failed to delete review");
    }

    setShowModal(false);
    setSelectedReviewId(null);
  };

  // it is for fetching the reactions

   const fetchReactionData = async (reviewId: string) => {
    try {
      const baseUrl = mediaType === "movie" ? "/api/movies" : "/api/tvshows";
      const res = await fetch(`${baseUrl}/review/reaction?reviewId=${reviewId}`);
      if (res.ok) {
        const data = await res.json();
        setReactionData(prev => ({
          ...prev,
          [reviewId]: data
        }));
      }
    } catch (error) {
      console.error("Error fetching reaction data:", error);
    }
  };

  const handleReaction = async (reviewId: string, isLike: boolean) => {
    if (!user) {
      toast.error("Please sign in to react to reviews");
      return;
    }

    try {
      const baseUrl = mediaType === "movie" ? "/api/movies" : "/api/tvshows";
      const res = await fetch(`${baseUrl}/review/reaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewId,
          isLike,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
        
        // Refresh reaction data for this review
        await fetchReactionData(reviewId);
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to react");
      }
    } catch (error) {
      console.error("Error handling reaction:", error);
      toast.error("Something went wrong");
    }
  };

  const toggleExpandReview = (reviewId: string) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength);
  };

  return (
   <div className="mt-10 w-full max-w-3xl space-y-6">
      {reviews.length === 0 ? (
        <p className="text-gray-400 text-center">No reviews yet.</p>
      ) : (
        reviews.map((r) => {
          const reactions = reactionData[r.id] || { 
            likeCount: 0, 
            dislikeCount: 0, 
            userReaction: null 
          };
          
          const isExpanded = expandedReviews.has(r.id);
          const shouldTruncate = r.content.length > 200;
          const displayContent = shouldTruncate && !isExpanded 
            ? truncateText(r.content) 
            : r.content;
          
          return (
            <div
              key={r.id}
              className="bg-zinc-800 p-5 rounded-xl shadow-md text-white flex gap-4 items-start"
            >
              <Image
                src={r.imageUrl || "/default-user.png"}
                alt="user"
                width={48}
                height={48}
                className="rounded-full object-cover border border-zinc-700"
              />
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{r.username}</div>
                    <div className="text-yellow-400">Rating: {r.rating}★</div>
                  </div>
                </div>
                <p className="mt-2 text-gray-300 whitespace-pre-wrap overflow-wrap-anywhere break-words max-w-full">
                  {displayContent}
                  {shouldTruncate && !isExpanded && (
                    <span className="text-gray-400">...</span>
                  )}
                </p>
                {shouldTruncate && (
                  <button
                    onClick={() => toggleExpandReview(r.id)}
                    className="text-blue-400 hover:text-blue-300 text-sm mt-1 transition-colors"
                  >
                    {isExpanded ? 'See less' : 'See more'}
                  </button>
                )}
                <div className="flex gap-4 mt-3 text-gray-500">
                  <button 
                    className={`flex items-center gap-1 transition disabled:opacity-50 ${
                      reactions.userReaction?.isLike === true
                        ? 'text-green-400' 
                        : 'hover:text-green-400'
                    }`}
                    onClick={() => handleReaction(r.id, true)}
                    disabled={r.isCurrentUser}
                    title={r.isCurrentUser ? "Cannot react to your own review" : "Like this review"}
                  >
                    <ThumbsUp 
                      size={16} 
                      fill={reactions.userReaction?.isLike === true ? 'currentColor' : 'none'} 
                    />
                    <span className="text-sm">{reactions.likeCount}</span>
                  </button>
                  <button 
                    className={`flex items-center gap-1 transition disabled:opacity-50 ${
                      reactions.userReaction?.isLike === false
                        ? 'text-red-400' 
                        : 'hover:text-red-400'
                    }`}
                    onClick={() => handleReaction(r.id, false)}
                    disabled={r.isCurrentUser}
                    title={r.isCurrentUser ? "Cannot react to your own review" : "Dislike this review"}
                  >
                    <ThumbsDown 
                      size={16} 
                      fill={reactions.userReaction?.isLike === false ? 'currentColor' : 'none'} 
                    />
                    <span className="text-sm">{reactions.dislikeCount}</span>
                  </button>
                  {r.isCurrentUser && (
                    <button
                      className="ml-auto text-sm text-red-500 hover:underline"
                      onClick={() => openDeleteModal(r.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to delete your review?"
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowModal(false);
            setSelectedReviewId(null);
          }}
        />
      )}
    </div>
  );
}
