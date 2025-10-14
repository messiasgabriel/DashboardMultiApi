import { Dialog, Flex, Text, Badge, Progress, Tabs } from '@radix-ui/themes';
import { usePokemonDetails } from '../hooks/usePokemons';
import { TYPE_COLORS } from '../types/pokeapi.types';

interface PokemonModalProps {
  pokemonName: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PokemonModal({ pokemonName, isOpen, onClose }: PokemonModalProps) {
  const { data: pokemon, isLoading } = usePokemonDetails(pokemonName || '');

  if (!pokemonName) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="600px">
        {isLoading ? (
          <Text>Carregando...</Text>
        ) : pokemon ? (
          <Flex direction="column" gap="4">
            <Flex gap="4" align="center">
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-48 h-48 object-contain"
              />
              
              <Flex direction="column" gap="2">
                <Text size="8" weight="bold" className="capitalize">
                  {pokemon.name}
                </Text>
                <Text size="5" color="gray">
                  #{String(pokemon.id).padStart(3, '0')}
                </Text>
                
                <Flex gap="2" wrap="wrap">
                  {pokemon.types.map((type) => (
                    <Badge 
                      key={type.type.name}
                      color={TYPE_COLORS[type.type.name] as never}
                      size="2"
                      className="capitalize"
                    >
                      {type.type.name}
                    </Badge>
                  ))}
                </Flex>
                
                <Flex gap="4" mt="2">
                  <Flex direction="column">
                    <Text size="2" color="gray">Altura</Text>
                    <Text size="3" weight="bold">
                      {(pokemon.height / 10).toFixed(1)}m
                    </Text>
                  </Flex>
                  <Flex direction="column">
                    <Text size="2" color="gray">Peso</Text>
                    <Text size="3" weight="bold">
                      {(pokemon.weight / 10).toFixed(1)}kg
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <Tabs.Root defaultValue="stats">
              <Tabs.List>
                <Tabs.Trigger value="stats">Estatísticas</Tabs.Trigger>
                <Tabs.Trigger value="abilities">Habilidades</Tabs.Trigger>
                <Tabs.Trigger value="moves">Movimentos</Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="stats">
                <Flex direction="column" gap="3" mt="3">
                  {pokemon.stats.map((stat) => (
                    <Flex key={stat.stat.name} direction="column" gap="1">
                      <Flex justify="between">
                        <Text size="2" className="capitalize">
                          {stat.stat.name.replace('-', ' ')}
                        </Text>
                        <Text size="2" weight="bold">
                          {stat.base_stat}
                        </Text>
                      </Flex>
                      <Progress 
                        value={stat.base_stat} 
                        max={255}
                        color="blue"
                      />
                    </Flex>
                  ))}
                </Flex>
              </Tabs.Content>

              <Tabs.Content value="abilities">
                <Flex direction="column" gap="2" mt="3">
                  {pokemon.abilities.map((ability) => (
                    <Badge 
                      key={ability.ability.name}
                      size="2"
                      variant={ability.is_hidden ? 'soft' : 'solid'}
                      className="capitalize"
                    >
                      {ability.ability.name.replace('-', ' ')}
                      {ability.is_hidden && ' (Oculta)'}
                    </Badge>
                  ))}
                </Flex>
              </Tabs.Content>

              <Tabs.Content value="moves">
                <Flex gap="2" wrap="wrap" mt="3">
                  {pokemon.moves.slice(0, 20).map((move) => (
                    <Badge 
                      key={move.move.name}
                      size="1"
                      variant="soft"
                      className="capitalize"
                    >
                      {move.move.name.replace('-', ' ')}
                    </Badge>
                  ))}
                  {pokemon.moves.length > 20 && (
                    <Text size="2" color="gray">
                      +{pokemon.moves.length - 20} movimentos
                    </Text>
                  )}
                </Flex>
              </Tabs.Content>
            </Tabs.Root>
          </Flex>
        ) : (
          <Text>Pokémon não encontrado</Text>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}