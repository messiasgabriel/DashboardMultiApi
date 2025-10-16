import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import { Layout } from '../components/layout/Layout';
import { HomePage } from '../pages/HomePage';
import { PokemonPage } from '../features/pokemon/pages/PokemonPage';
import { MoviesPage } from '../features/movies/pages/MoviesPage';

const rootRoute = createRootRoute({
    component: () => (
        <Layout>
            <Outlet />
        </Layout>
    ),
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
});

const pokemonRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/pokemon',
    component: PokemonPage,
});

const movieRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/movie',
    component: MoviesPage,
});

const routeTree = rootRoute.addChildren([indexRoute, movieRoute, pokemonRoute]);

export const router = createRouter({ routeTree, defaultPreload: 'intent', });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}