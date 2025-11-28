import { Helmet } from 'react-helmet-async';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../../components/header/header';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--not-found">
      <Helmet>
        <title>{'6 cities — 404'}</title>
      </Helmet>

      <Header/>

      <main className="page__main page__main--not-found">
        <div className="page__not-found-container container">
          <section className="not-found">
            <h1 className="not-found__title">404 Not Found</h1>
            <Link className="main__link" to={AppRoute.Root}>➡️На главную</Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
