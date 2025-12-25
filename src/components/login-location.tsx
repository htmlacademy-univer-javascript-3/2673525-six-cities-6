import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks';
import { selectUniqueCities } from '../store/offers/offers.selector';
import { setCity } from '../store/city/city.slice';
import { AppRoute, DEFAULT_CITY } from '../const';


function LoginLocation(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cities = useAppSelector(selectUniqueCities);

  const randomCity = useMemo(() => {
    if (cities.length === 0) {
      return null;
    }
    const index = Math.floor(Math.random() * cities.length);
    return cities[index];
  }, [cities]);

  const handleCityClick = () => {
    if (randomCity) {
      dispatch(setCity(randomCity));
      navigate(AppRoute.Root);
    }
  };

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <a
          className="locations__item-link"
          role="button"
          onClick={handleCityClick}
        >
          <span>{randomCity?.name ?? DEFAULT_CITY.name}</span>
        </a>
      </div>
    </section>
  );
}

const MemoizedLoginLocation = React.memo(LoginLocation);
MemoizedLoginLocation.displayName = 'LoginLocation';

export default MemoizedLoginLocation;
