import OfferCard from './offer-card-base';
import { type Offer } from '../types/offer';
import { MouseEvent } from 'react';
import OfferCardCities from './offer-card-cities';
import OfferCardNearPlaces from './offer-card-near-places';
import cn from 'classnames';

type OfferListProps = {
  offers: Offer[];
  onListItemHover?: (offerId: string) => void;
  className: string;
  tabsContent: boolean;
};

const getComponentByType = (className: string, offer: Offer, onMouseEnter: (event: MouseEvent<HTMLElement>) => void) => {
  switch (className) {
    case 'cities':
      return (
        <OfferCardCities
          offer={offer}
          onMouseEnter={onMouseEnter}
        />
      );
    case 'near-places':
      return (
        <OfferCardNearPlaces
          offer={offer}
          onMouseEnter={onMouseEnter}
        />
      );
  }

  return <OfferCard offer={offer} />;
};

function OfferList({ offers, onListItemHover, className, tabsContent, }: OfferListProps): JSX.Element {
  const handleListItemHover = (event: MouseEvent<HTMLElement>) => {
    if (!onListItemHover) {
      return;
    }
    event.preventDefault();
    const offerId = event.currentTarget.id;
    if (offerId) {
      onListItemHover(offerId);
    }
  };

  return (
    <div
      className={cn(
        'places__list',
        {
          'near-places__list': className === 'near-places',
          [`${className}__places-list`]: className !== 'near-places',
          'tabs__content': tabsContent && className !== 'near-places'
        }
      )}
    >
      {offers.map((offer) => (
        <div key={offer.id}>
          {getComponentByType(className, offer, handleListItemHover)}
        </div>
      ))}
    </div>
  );
}

export default OfferList;
