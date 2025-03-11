const routeNames: { [key: string]: string } = {
  '/': 'Tasks',
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase().replace(/-/g, ' ');

export const getPageName = (path: string) => {
  return routeNames[path] || capitalize(path.split('/').filter(Boolean).pop() || 'Home');
};
