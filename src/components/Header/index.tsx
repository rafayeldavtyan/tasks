import Breadcrumb from '../Breadcrumbs/Breadcrumb';

const Header = () => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white border-b border-stroke">
      <div className='px-6 py-4 flex flex-col space-between items-stretch	gap-5 2xl:px-11 2xl:py-5 flex flex-grow items-center justify-between'>
        <div className="block">
          <Breadcrumb />
        </div>
      </div>
    </header>
  );
};

export default Header;
