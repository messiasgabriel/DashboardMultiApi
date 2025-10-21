import { Card, Flex, Text, Badge, Skeleton } from '@radix-ui/themes';
import { usePokemonDetails } from '../hooks/usePokemons';
import { TYPE_COLORS } from '../types/pokeapi.types';

interface PokemonCardProps {
  name: string;
  onClick: (name: string) => void;
}

export function PokemonCard({ name, onClick }: PokemonCardProps) {
  const { data: pokemon, isLoading } = usePokemonDetails(name);

  if (isLoading) {
    return (
      <Card>
        <Flex direction="column" gap="3" align="center">
          <Skeleton width="150px" height="150px" />
          <Skeleton width="100px" height="24px" />
          <Flex gap="2">
            <Skeleton width="60px" height="20px" />
            <Skeleton width="60px" height="20px" />
          </Flex>
        </Flex>
      </Card>
    );
  }

  if (!pokemon) return null;

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
      onClick={() => onClick(name)}
    >
      <Flex direction="column" gap="3" align="center">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="w-32 h-32 object-contain"
        />
        
        <Text size="4" weight="bold" className="capitalize">
          {pokemon.name}
        </Text>
        
        <Text size="2" color="gray">
          #{String(pokemon.id).padStart(3, '0')}
        </Text>
        
        <Flex gap="2" wrap="wrap" justify="center">
          {pokemon.types.map((type) => (
            <Badge 
              key={type.type.name} 
              color={TYPE_COLORS[type.type.name] as never}
              className="capitalize"
            >
              {type.type.name}
            </Badge>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
}