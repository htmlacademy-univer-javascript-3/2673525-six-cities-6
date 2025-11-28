import { Helmet } from 'react-helmet-async';
import { type Offer } from '../../types/offer';
import OfferList from '../../components/offer-list-cities';
import {AppRoute} from '../../const';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';

type FavoritesPageProps = {
  offers: Offer[];
}

function FavoritesPage({offers}: FavoritesPageProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const amsterdamOffers = favoriteOffers.filter((offer) => offer.city.name === 'Amsterdam');
  const cologneOffers = favoriteOffers.filter((offer) => offer.city.name === 'Cologne');
  const parisOffers = favoriteOffers.filter((offer) => offer.city.name === 'Paris');
  const brusselsOffers = favoriteOffers.filter((offer) => offer.city.name === 'Brussels');
  const hamburgOffers = favoriteOffers.filter((offer) => offer.city.name === 'Hamburg');
  const dusseldorfOffers = favoriteOffers.filter((offer) => offer.city.name === 'Dusseldorf');

  return (
    <div className="page">
      <Helmet>
        <title>{'6 cities — favorites'}</title>
      </Helmet>

      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {amsterdamOffers.length > 0 && (
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Amsterdam</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <OfferList offers={amsterdamOffers} />
                  </div>
                </li>
              )}

              {cologneOffers.length > 0 && (
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Cologne</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <OfferList offers={cologneOffers} />
                  </div>
                </li>
              )}

              {parisOffers.length > 0 && (
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Paris</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <OfferList offers={parisOffers} />
                  </div>
                </li>
              )}

              {brusselsOffers.length > 0 && (
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Brussels</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <OfferList offers={brusselsOffers} />
                  </div>
                </li>
              )}

              {hamburgOffers.length > 0 && (
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Hamburg</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <OfferList offers={hamburgOffers} />
                  </div>
                </li>
              )}

              {dusseldorfOffers.length > 0 && (
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Dusseldorf</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <OfferList offers={dusseldorfOffers} />
                  </div>
                </li>
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
