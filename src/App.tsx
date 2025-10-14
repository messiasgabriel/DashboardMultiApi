import { Tabs, Container, Flex, Text } from '@radix-ui/themes';
import { PokemonPage } from './features/pokemon/pages/PokemonPage';

// ✅ App principal com navegação por abas
// Por quê tabs? Facilita alternar entre diferentes APIs sem recarregar a página
function App() {
  return (
    <div className="min-h-screen bg-gray-1">
      <Container size="4" p="4">
        {/* Header da aplicação */}
        <Flex direction="column" gap="4" mb="6">
          <Text size="9" weight="bold" className="text-center">
            🚀 Dashboard Multi-API
          </Text>
          <Text size="3" color="gray" className="text-center">
            Explore diferentes APIs em um único lugar
          </Text>
        </Flex>

        {/* Tabs para alternar entre APIs */}
        <Tabs.Root defaultValue="pokemon">
          <Tabs.List size="2">
            <Tabs.Trigger value="pokemon">⚡ Pokémon</Tabs.Trigger>
            <Tabs.Trigger value="movies">🎬 Filmes</Tabs.Trigger>
          </Tabs.List>

          {/* Conteúdo da aba Pokémon */}
          <Tabs.Content value="pokemon">
            <PokemonPage />
          </Tabs.Content>

          {/* Conteúdo da aba Filmes */}
          <Tabs.Content value="movies">
            {/* <MoviesPage /> */}
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </div>
  );
}

export default App;
