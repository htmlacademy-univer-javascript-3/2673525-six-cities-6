import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../hooks';
import { postReviewAction } from '../store/api-actions';

function Form() {
  const dispatch = useAppDispatch();
  const { id: offerId } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);

  const isCommentValid = rating > 0 && comment.length >= 50 && comment.length <= 300;

  const ratings = [
    { value: 5, title: 'perfect' },
    { value: 4, title: 'good' },
    { value: 3, title: 'not bad' },
    { value: 2, title: 'badly' },
    { value: 1, title: 'terribly' },
  ];

  const handleReviewFormSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!offerId) {
      return;
    }

    setSending(true);
    try {
      await dispatch(
        postReviewAction({
          offerId,
          data: { rating, comment },
        })
      ).unwrap();

      setRating(0);
      setComment('');
    } finally {
      setSending(false);
    }

  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt) => {
        void handleReviewFormSubmit(evt);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">

        {ratings.map(({ value, title }) => (
          <React.Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={rating === value}
              disabled={sending}
              onChange={() => setRating(value)}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        maxLength={300}
        disabled={sending}
        onChange={(evt) => {
          setComment(evt.target.value);
        }}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isCommentValid || sending}
        >
          {sending ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

const MemoizedForm = React.memo(Form);
MemoizedForm.displayName = 'Form';

export default MemoizedForm;
