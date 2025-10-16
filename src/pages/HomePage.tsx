import { Link } from '@tanstack/react-router';
import { Button, Flex, Text, Card, Grid, Box } from '@radix-ui/themes';

export function HomePage() {
  const apiCards = [
    {
      title: 'Pokémon API',
      description: 'Explore dados de Pokémons, suas habilidades, tipos e estatísticas.',
      icon: '🔵',
      path: '/pokemon',
      stats: '1000+ Pokémons'
    },
    {
      title: 'Movies API',
      description: 'Descubra filmes, avaliações, trailers e informações detalhadas.',
      icon: '🎬',
      path: '/movie',
      stats: 'Milhares de filmes'
    }
  ];

  return (
    <Box className="max-w-full mx-auto">
      {/* Header */}
      <Flex direction="column" gap="4" mb="8">
        <Text size="8" weight="bold" className="text-gray-12">
          Bem-vindo ao Dashboard
        </Text>
        <Text size="4" color="gray" className="max-w-2xl">
          Explore diferentes APIs e descubra informações sobre Pokémons, filmes e muito mais. 
          Selecione uma das opções abaixo para começar.
        </Text>
      </Flex>

      {/* Cards das APIs */}
      <Grid columns="2" gap="6" mb="8">
        {apiCards.map((card) => (
          <Card key={card.path} className="p-6 hover:shadow-lg transition-shadow">
            <Flex direction="column" gap="4">
              <Flex align="center" gap="3">
                <span className="text-3xl">{card.icon}</span>
                <div>
                  <Text size="5" weight="bold" className="text-gray-12">
                    {card.title}
                  </Text>
                  <Text size="2" color="blue" className="block">
                    {card.stats}
                  </Text>
                </div>
              </Flex>
              
              <Text size="3" color="gray" className="leading-relaxed">
                {card.description}
              </Text>
              
              <Link to={card.path}>
                <Button size="3" className="w-full">
                  Explorar {card.title.split(' ')[0]}
                </Button>
              </Link>
            </Flex>
          </Card>
        ))}
      </Grid>

      {/* Status Section */}
      <Card className="p-6 bg-gray-2">
        <Flex direction="column" gap="3">
          <Text size="4" weight="bold" className="text-gray-12">
            📊 Status do Sistema
          </Text>
          <Grid columns="3" gap="4">
            <Flex direction="column" align="center" gap="1">
              <Text size="6" weight="bold" color="green">
                99.9%
              </Text>
              <Text size="2" color="gray">
                Uptime
              </Text>
            </Flex>
            <Flex direction="column" align="center" gap="1">
              <Text size="6" weight="bold" color="blue">
                2
              </Text>
              <Text size="2" color="gray">
                APIs Ativas
              </Text>
            </Flex>
            <Flex direction="column" align="center" gap="1">
              <Text size="6" weight="bold" color="orange">
                Fast
              </Text>
              <Text size="2" color="gray">
                Response Time
              </Text>
            </Flex>
          </Grid>
        </Flex>
      </Card>
    </Box>
  );
}