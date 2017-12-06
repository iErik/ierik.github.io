export function filterRoutes(routes) {
  var pageRoutes = [];

  var mapRoutes = (routes) => {
    routes.forEach((route) => {
      if (route.type === 'layout') {
        mapRoutes(route.children);
      } else if (route.type === 'page') {
        pageRoutes.push(route);
      }
    });
  }

  mapRoutes(routes);
  return pageRoutes;
}
