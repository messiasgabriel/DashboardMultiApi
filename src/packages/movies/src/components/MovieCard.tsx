import { Card, Flex, Text, Badge } from '@radix-ui/themes';
import { Image } from '../../../../components/ui/Image';
import type { Movie } from '../types/moives.types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : '/assets/movie.svg';

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 overflow-hidden"
      onClick={() => onClick(movie)}
    >
      <Flex direction="column" gap="3">
        {/* Poster do filme */}
        <div className="relative">
          <Image
            src={imageUrl}
            alt={movie.title}
            className="w-full"
            rounded={false}
          />
          
          {/* Badge de avaliação */}
          {movie.vote_average > 0 && (
            <Badge 
              className="absolute top-2 right-2 bg-black/80 text-white"
              size="1"
            >
              ⭐ {rating}
            </Badge>
          )}
        </div>

        {/* Informações do filme */}
        <Flex direction="column" gap="2" p="3">
          <Text size="3" weight="bold" className="line-clamp-2">
            {movie.title}
          </Text>
          
          <Text size="2" color="gray">
            {releaseYear}
          </Text>

          {movie.overview && (
            <Text size="2" color="gray" className="line-clamp-3">
              {movie.overview}
            </Text>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}