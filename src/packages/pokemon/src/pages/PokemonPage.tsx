import { useState } from 'react';
import { TextField, Button, Flex, Text, Spinner } from '@radix-ui/themes';
import { usePokemonList, useSearchPokemon } from '../hooks/usePokemons';
import { PokemonCard } from '../components/PokemonCard';
import { PokemonModal } from '../components/PokemonModal';

export function PokemonPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const ITEMS_PER_PAGE = 20;

    const { data: pokemonList, isLoading: loadingList } = usePokemonList(
        ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const { data: searchResults, isLoading: loadingSearch } = useSearchPokemon(searchQuery);

    const isSearching = searchQuery.length >= 2;
    const pokemonsToShow = isSearching ? searchResults : pokemonList?.results;
    const isLoading = loadingList || loadingSearch;

    const handleCardClick = (name: string) => {
        setSelectedPokemon(name);
        setIsModalOpen(true);
    };

    const handleNextPage = () => setPage((next) => next + 1);
    const handlePrevPage = () => setPage((prev) => Math.max(0, prev - 1));

    return (
        <div className="w-full flex justify-between">
            <div className="flex flex-col w-full mx-auto">
                <Flex direction="column" gap="4" mb="4" px="4">
                    <Flex my="4">
                        <Text size="8" weight="bold" className="text-gray-12">
                            Pokédex
                        </Text>
                    </Flex>
                
                    <TextField.Root
                        placeholder="Buscar Pokémon... (ex: pikachu)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        size="3"
                    />

                    {pokemonList && !isSearching && (
                        <Text size="2" color="gray">
                        Mostrando {page * ITEMS_PER_PAGE + 1} - {page * ITEMS_PER_PAGE + ITEMS_PER_PAGE} de {pokemonList.count} Pokémons
                        </Text>
                    )}

                    {isSearching && searchResults && (
                        <Text size="2" color="gray">
                            {searchResults.length} resultado(s) para "{searchQuery}"
                        </Text>
                    )}
                </Flex>

                {isLoading && (
                    <Flex justify="center" py="8">
                        <Spinner size="3" />
                    </Flex>
                )}

                <Flex width="100%" px="4">
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {pokemonsToShow?.map((pokemon) => (
                            <PokemonCard
                            key={pokemon.name}
                            name={pokemon.name}
                            onClick={handleCardClick}
                            />
                        ))}
                    </div>
                </Flex>

                {!isLoading && pokemonsToShow?.length === 0 && (
                <Flex justify="center" py="8">
                    <Text size="4" color="gray">
                    Nenhum Pokémon encontrado
                    </Text>
                </Flex>
                )}

                {!isSearching && pokemonList && (
                <Flex justify="center" gap="4" mt="8" py="4">
                    <Button 
                    onClick={handlePrevPage} 
                    disabled={page === 0}
                    variant="soft"
                    >
                    ← Anterior
                    </Button>
                    
                    <Text size="3" className="flex items-center">
                    Página {page + 1}
                    </Text>
                    
                    <Button 
                    onClick={handleNextPage}
                    disabled={!pokemonList.next}
                    variant="soft"
                    >
                    Próxima →
                    </Button>
                </Flex>
                )}

                <PokemonModal
                pokemonName={selectedPokemon}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                />
            </div>
        </div>
    );
}