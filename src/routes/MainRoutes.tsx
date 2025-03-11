
import DefaultLayout from '../layouts/DefaultLayout';
import { HomePage } from '../pages/home';
import PageTitle from '@components/PageTitle';

const MainRoutes = {
  path: '/',
  element: <DefaultLayout />,
  children: [
    {
      path: '',
      element: <>
        <PageTitle title="home" />
        <HomePage />
      </>
    },
  ]
}

export default MainRoutes
