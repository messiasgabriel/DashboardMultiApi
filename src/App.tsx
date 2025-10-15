import { Tabs, Container, Flex, Text } from '@radix-ui/themes';
import { PokemonPage } from './features/pokemon/pages/PokemonPage';
import { Icon } from './components/ui/Icon';
import { Image } from './components/ui/Image';

function App() {
  return (
    <div className="min-h-screen bg-gray-1">
        <Container size="4" p="4">
            {/* Header da aplicação */}
            <Flex direction="column" gap="4" mb="6">
                <Text size="9" weight="bold" className="text-center">
                    <Icon name="MagnifyingGlassIcon" size={24} />
                    Dashboard Multi-API
                </Text>
                <Text size="3" color="gray" className="text-center">
                    Explore diferentes APIs em um único lugar
                </Text>
            </Flex>

            {/* Tabs para alternar entre APIs */}
            <Tabs.Root defaultValue="pokemon">
                <Tabs.List size="2">
                    <Tabs.Trigger value="pokemon">
                        <Image 
                            src='../public/assets/pokeball.svg' 
                            alt='pokeball' 
                            aspectRatio='1/1'
                            className='w-3 mr-1'
                        />
                        Pokémon
                    </Tabs.Trigger>
                    <Tabs.Trigger value="movies">
                        <Image 
                            src='../public/assets/movie.svg'
                            alt='Movie Icon'
                            aspectRatio='1/1'
                            className='w-3'
                        />
                        Filmes
                    </Tabs.Trigger>
                    <Tabs.Trigger value="movies">
                        <Image
                            src='../public/assets/weather.svg'
                            alt='Weather icon'
                            aspectRatio='1/1'
                            className='w-3'
                        />
                        Weather
                    </Tabs.Trigger>
                </Tabs.List>

                {/* Conteúdo da aba Pokémon */}
                <Tabs.Content value="pokemon">
                    <PokemonPage />
                </Tabs.Content>

                {/* Conteúdo da aba Filmes */}
                <Tabs.Content value="movies">
                    {/* <MoviesPage /> */}
                </Tabs.Content>

                {/* Conteúdo da aba Weather */}
                <Tabs.Content value="Weather">
                    {/* <WeatherPage /> */}
                </Tabs.Content>
            </Tabs.Root>
        </Container>
    </div>
  );
}

export default App;
