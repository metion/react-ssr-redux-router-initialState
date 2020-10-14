import Home from "./components/Home";
import News from "./components/News";

const routes = [
    {
        path: "/",
        exact: true,
        comp: Home,
        private: false
    },
    {
        path: "/news",
        comp: News,
        private: true
    }
];

export default routes;
