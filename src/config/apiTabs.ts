export interface ApiTab {
  id: string;
  label: string;
  icon: string;
}

export const API_TABS: ApiTab[] = [
    {
    id: 'pokemon',
    label: 'Pokémon',
    icon: '/assets/pokeball.svg',
  },
  {
    id: 'movies',
    label: 'Filmes',
    icon: '/assets/movie.svg',
  },
  {
    id: 'clima',
    label: 'Clima',
    icon: '/assets/weather.svg',
  }
];