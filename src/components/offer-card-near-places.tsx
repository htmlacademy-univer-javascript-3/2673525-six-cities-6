import OfferCard from './offer-card-base.tsx';
import { type Offer } from '../types/offer';
import { MouseEvent } from 'react';

type OfferCardNearPlacesProps = {
  offer: Offer;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
};

export default function OfferCardNearPlaces({offer, onMouseEnter} : OfferCardNearPlacesProps) {
  return (
    <OfferCard
      className={'near-places'}
      onMouseEnter={onMouseEnter}
      offer={offer}
    />
  );
}

