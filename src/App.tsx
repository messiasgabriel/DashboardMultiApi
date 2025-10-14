import { useState } from 'react';
import { Button, TextField, Card, Flex, Text, Spinner } from '@radix-ui/themes';
import { usePopularMovies, useSearchMovies } from './hooks/useMovies';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  // ✅ Busca filmes populares
  const { data: popularMovies, isLoading: loadingPopular } = usePopularMovies(page);

  // ✅ Busca filmes por query (só ativa se tiver texto)
  const { data: searchResults, isLoading: loadingSearch } = useSearchMovies(searchQuery);

  const movies = searchQuery.length > 2 ? searchResults : popularMovies;
  const isLoading = loadingPopular || loadingSearch;

  return (
    <div className="min-h-screen bg-gray-1 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-12">
          🎬 Movie Database
        </h1>

        {/* Busca */}
        <Flex direction="column" gap="4" mb="6">
          <TextField.Root
            placeholder="Buscar filmes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="3"
          />
        </Flex>

        {/* Loading */}
        {isLoading && (
          <Flex justify="center" py="8">
            <Spinner size="3" />
          </Flex>
        )}

        {/* Lista de filmes */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies?.results.map((movie) => (
            <Card key={movie.id}>
              <Flex direction="column" gap="2">
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg w-full"
                  />
                )}
                <Text weight="bold" size="3">
                  {movie.title}
                </Text>
                <Text size="2" color="gray">
                  ⭐ {movie.vote_average.toFixed(1)}
                </Text>
              </Flex>
            </Card>
          ))}
        </div>

        {/* Paginação */}
        {!searchQuery && (
          <Flex justify="center" gap="4" mt="8">
            <Button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              Anterior
            </Button>
            <Text>Página {page}</Text>
            <Button onClick={() => setPage((p) => p + 1)}>Próxima</Button>
          </Flex>
        )}
      </div>
    </div>
  );
}

export default App;
