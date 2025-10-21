import React from 'react';
import { Dialog, Flex, Text, Badge, Button } from '@radix-ui/themes';
import { useMovie } from '../hooks/useMovies';
import type { Movie } from '../types/moives.types';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MovieModal({ movie, isOpen, onClose }: MovieModalProps): React.ReactElement | null {
  const { data: movieDetails, isLoading } = useMovie(movie?.id || 0);

  if (!movie) return null;


  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="800px" className="max-h-[90vh] overflow-y-auto">
        <Dialog.Title className="sr-only">{movie.title}</Dialog.Title>
        <Dialog.Description className="sr-only">
          Detalhes do filme {movie.title}
        </Dialog.Description>

        {isLoading ? (
          <LoadingSpinner message="Carregando detalhes do filme..." />
        ) : (
          <Flex direction="column" gap="4">
            {/* Backdrop */}
            {backdropUrl && (
              <div className="relative -m-6 mb-0">
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
            )}

            {/* Conteúdo principal */}
            <Flex gap="4" className={backdropUrl ? '-mt-20 relative z-10' : ''}>
              {/* Poster */}
              <div className="flex-shrink-0">
                
              </div>

              {/* Informações */}
              <Flex direction="column" gap="3" className="flex-1">
                <div>
                  <Text 
                    size="8" 
                    weight="bold" 
                    className={`block ${backdropUrl ? 'text-white' : 'text-gray-12'}`}
                  >
                    {movie.title}
                  </Text>
                  
                  {movie.original_title !== movie.title && (
                    <Text 
                      size="4" 
                      className={backdropUrl ? 'text-gray-300' : 'text-gray-11'}
                    >
                      {movie.original_title}
                    </Text>
                  )}
                </div>

                {/* Badges */}
                <Flex gap="2" wrap="wrap">
                  <Badge size="2" color="blue">
                    {releaseYear}
                  </Badge>
                  
                  {movie.vote_average > 0 && (
                    <Badge size="2" color="orange">
                      ⭐ {rating} ({movie.vote_count} votos)
                    </Badge>
                  )}

                  {movie.adult && (
                    <Badge size="2" color="red">
                      +18
                    </Badge>
                  )}
                </Flex>

                {/* Sinopse */}
                {movie.overview && (
                  <div>
                    <Text 
                      size="3" 
                      weight="bold" 
                      className={`block mb-2 ${backdropUrl ? 'text-white' : 'text-gray-12'}`}
                    >
                      Sinopse
                    </Text>
                    <Text 
                      size="3" 
                      className={`leading-relaxed ${backdropUrl ? 'text-gray-200' : 'text-gray-11'}`}
                    >
                      {movie.overview}
                    </Text>
                  </div>
                )}

                {/* Detalhes adicionais do filme (se carregado) */}
                {movieDetails && (
                  <Flex direction="column" gap="3">
                    {movieDetails.genres && movieDetails.genres.length > 0 && (
                      <div>
                        <Text 
                          size="3" 
                          weight="bold" 
                          className={`block mb-2 ${backdropUrl ? 'text-white' : 'text-gray-12'}`}
                        >
                          Gêneros
                        </Text>
                        <Flex gap="2" wrap="wrap">
                          {movieDetails.genres.map((genre) => (
                            <Badge key={genre.id} size="1" variant="soft">
                              {genre.name}
                            </Badge>
                          ))}
                        </Flex>
                      </div>
                    )}

                    {movieDetails.runtime && (
                      <Flex gap="4">
                        <div>
                          <Text 
                            size="2" 
                            className={backdropUrl ? 'text-gray-300' : 'text-gray-10'}
                          >
                            Duração
                          </Text>
                          <Text 
                            size="3" 
                            weight="bold"
                            className={backdropUrl ? 'text-white' : 'text-gray-12'}
                          >
                            {Math.floor(movieDetails.runtime / 60)}h {movieDetails.runtime % 60}min
                          </Text>
                        </div>

                        {movieDetails.budget > 0 && (
                          <div>
                            <Text 
                              size="2" 
                              className={backdropUrl ? 'text-gray-300' : 'text-gray-10'}
                            >
                              Orçamento
                            </Text>
                            <Text 
                              size="3" 
                              weight="bold"
                              className={backdropUrl ? 'text-white' : 'text-gray-12'}
                            >
                              ${movieDetails.budget.toLocaleString()}
                            </Text>
                          </div>
                        )}
                      </Flex>
                    )}
                  </Flex>
                )}

                {/* Botões de ação */}
                <Flex gap="2" mt="4">
                  <Button 
                    onClick={onClose} 
                    variant="soft"
                    className={backdropUrl ? 'bg-white/20 text-white hover:bg-white/30' : ''}
                  >
                    Fechar
                  </Button>
                  
                  {movieDetails?.homepage && (
                    <Button asChild>
                      <a 
                        href={movieDetails.homepage} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Site Oficial
                      </a>
                    </Button>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}