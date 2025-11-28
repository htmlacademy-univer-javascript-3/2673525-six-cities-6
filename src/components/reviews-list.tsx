import Review from './review';
import { type ReviewType } from '../types/review';
// import { MouseEvent } from 'react';

type ReviewsListProps = {
  reviews: ReviewType[];

  //onListItemHover?: (offerId: string) => void;
};

function ReviewsList({ reviews, } : ReviewsListProps) : JSX.Element {
//   const handleListItemHover = (event: MouseEvent<HTMLElement>) => {
//     if (!onListItemHover) {
//       return;
//     }
//     event.preventDefault();
//     const offerId = event.currentTarget.id;
//     if (offerId) {
//       onListItemHover(offerId);
//     }
//   };
  const reviewsAmount = reviews.length;
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviewsAmount}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review
            key={review.id}
            id={review.id}
            user={review.user}
            rating={review.rating}
            date={review.date}
            comment={review.comment}
          />
        ))}
      </ul>
    </>
  );
}

export default ReviewsList;
