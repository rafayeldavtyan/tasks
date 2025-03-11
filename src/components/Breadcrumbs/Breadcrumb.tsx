import useBreadcrumb from '@shared/hooks/useBreadcrumb';

const Breadcrumb = () => {
  const pageName = useBreadcrumb();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-lg font-semibold">
        {pageName}
      </h2>
    </div>
  );
};

export default Breadcrumb;
