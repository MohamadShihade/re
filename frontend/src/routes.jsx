const privateRoutes = [
  {
    path: "/",
    loader: () => import("./view/priceList/priceList"),
  },
].filter(Boolean);

const publicRoutes = [
  {
    path: "/",
  },
].filter(Boolean);
const SimpleRoutes = [
  {
    path: "/",
  },
].filter(Boolean);

export default { privateRoutes };
