import { Flex, Text, Box } from '@radix-ui/themes';
import { Link, useRouterState } from '@tanstack/react-router';
import { Image } from '../ui/Image';

// Configuração das abas/páginas
const NAVIGATION_ITEMS = [
  {
    id: 'pokemon',
    label: 'Pokémon',
    path: '/pokemon',
    icon: '/assets/pokeball.svg',
    description: 'Explore a Pokédex'
  },
  {
    id: 'movies',
    label: 'Movies',
    path: '/movie',
    icon: '/assets/movie.svg',
    description: 'Descubra filmes'
  }
];

export function Sidebar() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <Box className="w-72 h-auto bg-gray-2 border-r border-gray-6 shadow-lg">
        {/* Header da Sidebar */}
        <Flex direction="column" gap="2" p="6" className="border-b border-gray-6">
            <Flex align="center" gap="3">
                <Image
                  src="/assets/dashboard.svg"
                  alt="Dashboard"
                  className="w-8 h-8"
                />
                <div>
                    <Text size="5" weight="bold" className="text-gray-12">
                    Dashboard
                    </Text>
                    <Text size="2" color="gray" className="block">
                    Multi-API Explorer
                    </Text>
                </div>
            </Flex>
        </Flex>

      {/* Navegação Home */}
      <Flex direction="column" gap="1" p="4">
        <Link
          to="/"
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg
            transition-all duration-200
            ${
              currentPath === '/'
                ? 'bg-blue-9 text-white shadow-md'
                : 'text-gray-11 hover:bg-gray-3 hover:text-gray-12'
            }
          `}
        >
          <span className="text-lg">🏠</span>
          <div>
            <Text size="3" weight={currentPath === '/' ? 'bold' : 'regular'}>
              Home
            </Text>
          </div>
        </Link>
      </Flex>

      {/* Separador */}
      <div className="px-6 py-2">
        <Text size="2" weight="bold" color="gray" className="uppercase tracking-wide">
          APIs
        </Text>
      </div>

      {/* Menu de APIs */}
        <Flex direction="column" gap="1" px="4">
            {NAVIGATION_ITEMS.map((item) => {
                const isActive = currentPath === item.path;
            
                return (
                    <Link
                    key={item.id}
                    to={item.path}
                    className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg
                        transition-all duration-200
                        ${
                        isActive
                            ? 'bg-blue-9 text-white shadow-md'
                            : 'text-gray-11 hover:bg-gray-3 hover:text-gray-12'
                        }
                    `}
                    >
                    <Image 
                        src={item.icon}
                        alt={item.label}
                        aspectRatio='1/1'
                        className='w-5 h-5'
                    />
                    <div>
                        <Text size="3" weight={isActive ? 'bold' : 'regular'}>
                        {item.label}
                        </Text>
                        <Text 
                        size="1" 
                        className={`block ${isActive ? 'text-blue-2' : 'text-gray-10'}`}
                        >
                        {item.description}
                        </Text>
                    </div>
                    </Link>
                );
            })}
        </Flex>
    </Box>
  );
}