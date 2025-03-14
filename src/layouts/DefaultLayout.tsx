import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/Header/index';

const DefaultLayout = () => {
  return (
    <div className="">
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <main>
            <div className="bg-[#F2F7FB] mx-auto p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
