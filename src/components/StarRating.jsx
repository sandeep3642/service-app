import { Star } from "lucide-react";

export const renderStars = (rating) => {
  return [...Array(5)].map((_, index) => (
    <Star
      key={index}
      size={17}
      className={`${
        index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
      }`}
    />
  ));
};
