import React, { useState } from 'react';
import { TextField, Button, Flex, Text, Tabs } from '@radix-ui/themes';
import { usePopularMovies, useSearchMovies } from '../hooks/useMovies';
import { MovieCard } from '../components/MovieCard';
import { MovieModal } from '../components/MovieModal';
import type { Movie } from '../types/moives.types';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';
import { EmptyState } from '../../../../components/ui/EmptyState';


export function MoviesPage(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('popular');

  // Queries
  const { 
    data: popularMovies, 
    isLoading: loadingPopular 
  } = usePopularMovies(currentPage);

  const { 
    data: searchResults, 
    isLoading: loadingSearch 
  } = useSearchMovies(searchQuery, currentPage);

  // Estados derivados
  const isSearching = searchQuery.length > 2;
  const movies = isSearching ? searchResults?.results : popularMovies?.results;
  const isLoading = isSearching ? loadingSearch : loadingPopular;
  const totalPages = isSearching ? searchResults?.total_pages : popularMovies?.total_pages;

  // Handlers
  const handleCardClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset para primeira página ao buscar
    if (value.length > 2) {
      setActiveTab('search');
    } else if (activeTab === 'search') {
      setActiveTab('popular');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
    if (value === 'popular') {
      setSearchQuery('');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col w-full mx-auto">
        {/* Header */}
        <Flex direction="column" gap="4" mb="6" px="6">
          <Flex my="4">
            <Text size="8" weight="bold" className="text-gray-12">
              🎬 Filmes
            </Text>
          </Flex>

          {/* Busca */}
          <TextField.Root
            placeholder="Buscar filmes... (ex: Avengers, Matrix, etc.)"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            size="3"
          />

          {/* Tabs */}
          <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
            <Tabs.List>
              <Tabs.Trigger value="popular">Populares</Tabs.Trigger>
              {isSearching && (
                <Tabs.Trigger value="search">
                  Busca: "{searchQuery}"
                </Tabs.Trigger>
              )}
            </Tabs.List>
          </Tabs.Root>

          {/* Info */}
          {movies && (
            <Text size="2" color="gray">
              {isSearching 
                ? `${searchResults?.total_results || 0} resultado(s) encontrado(s)`
                : `Página ${currentPage} de ${totalPages || 0} - Filmes populares`
              }
            </Text>
          )}
        </Flex>

        {/* Loading */}
        {isLoading && (
          <LoadingSpinner 
            message={isSearching ? "Buscando filmes..." : "Carregando filmes populares..."} 
          />
        )}

        {/* Movies Grid */}
        {!isLoading && movies && movies.length > 0 && (
          <Flex width="100%" px="6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          </Flex>
        )}

        {/* Empty State */}
        {!isLoading && (!movies || movies.length === 0) && (
          <EmptyState
            icon="🎬"
            message={
              isSearching 
                ? `Nenhum filme encontrado para "${searchQuery}"`
                : "Nenhum filme encontrado"
            }
            description={
              isSearching 
                ? "Tente buscar por outro termo ou verifique a ortografia"
                : "Não foi possível carregar os filmes. Tente novamente."
            }
          />
        )}

        {/* Pagination */}
        {!isLoading && movies && movies.length > 0 && totalPages && totalPages > 1 && (
          <Flex justify="center" gap="4" mt="8" py="6">
            <Button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="soft"
            >
              ← Anterior
            </Button>
            
            <Flex align="center" gap="2">
              {/* Botões de página */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const startPage = Math.max(1, currentPage - 2);
                const pageNum = startPage + i;
                
                if (pageNum > totalPages) return null;
                
                return (
                  <Button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    variant={pageNum === currentPage ? "solid" : "soft"}
                    size="2"
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <React.Fragment>
                  <Text size="2" color="gray">...</Text>
                  <Button
                    onClick={() => handlePageChange(totalPages)}
                    variant="soft"
                    size="2"
                  >
                    {totalPages}
                  </Button>
                </React.Fragment>
              )}
            </Flex>

            <Button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="soft"
            >
              Próxima →
            </Button>
          </Flex>
        )}

        {/* Modal */}
        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}