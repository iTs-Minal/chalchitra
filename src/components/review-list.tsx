/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmationModal from "./confirmation-modal";
import { useReviewStore } from "@/store/reviewStore";

interface Review {
  id: string;
  userId: string;
  rating: number;
  content: string;
  username: string;
  imageUrl: string;
  isCurrentUser?: boolean;
}

export default function ReviewList({
  tmdbId,
  mediaType,
}: {
  tmdbId: number;
  mediaType: "movie" | "tv";
}) {
  const [reviews, setReviews] = useState<Review[]>([]);


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

  return (
    <div className="mt-10 w-full max-w-3xl space-y-6">
      {reviews.length === 0 ? (
        <p className="text-gray-400 text-center">No reviews yet.</p>
      ) : (
        reviews.map((r) => (
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
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">{r.username}</div>
                  <div className="text-yellow-400">Rating: {r.rating}★</div>
                </div>
              </div>
              <p className="mt-2 text-gray-300">{r.content}</p>
              <div className="flex gap-4 mt-3 text-gray-500">
                <button className="flex items-center gap-1 hover:text-green-400 transition">
                  <ThumbsUp size={16} /> <span className="text-sm">Like</span>
                </button>
                <button className="flex items-center gap-1 hover:text-red-400 transition">
                  <ThumbsDown size={16} />{" "}
                  <span className="text-sm">Dislike</span>
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
        ))
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
