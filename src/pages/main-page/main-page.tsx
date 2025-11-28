import { Helmet } from 'react-helmet-async';
import { type Offer } from '../../types/offer';
import { useState } from 'react';
import Map from '../../components/map';
import OfferListCities from '../../components/offer-list-cities';
import CitiesList from '../../components/cities-list';
import { changeCity } from '../../store/action';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import Header from '../../components/header/header';
import { type City } from '../../types/city';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentCity = useAppSelector((state) => state.city);
  const allOffers = useAppSelector((state) => state.offers);

  const cityOffers = allOffers.filter((offer) => offer.city.name === currentCity.name);
  const offersCount = cityOffers.length;

  const uniqueCities: Record<string, City> = {};

  allOffers.forEach((offer) => {
    uniqueCities[offer.city.name] = offer.city;
  });

  const cities = Object.values(uniqueCities);

  const handleCityChange = (city: typeof cities[0]) => {
    dispatch(changeCity(city));
  };

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const handleListItemHover = (offerId: string) => {
    const currentOffer = cityOffers.find((offer) => offer.id.toString() === offerId);
    setSelectedOffer(currentOffer);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{'6 cities'}</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          cities={cities}
          currentCity={currentCity}
          onCityChange={handleCityChange}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in {currentCity.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                {' '}
                <span className="places__sorting-type" tabIndex={0}>
                                    Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OfferListCities
                offers={cityOffers}
                onListItemHover={handleListItemHover}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" style={{ background: 'none' }}>
                <Map city={currentCity} offers={cityOffers} selectedPoint={selectedOffer} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
