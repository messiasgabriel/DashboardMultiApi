import { Flex, Spinner, Text } from '@radix-ui/themes';

interface LoadingSpinnerProps {
  message?: string;
  size?: '1' | '2' | '3';
}

/**
 * Componente de loading reutilizável
 * @param message - Mensagem opcional a ser exibida
 * @param size - Tamanho do spinner (1-3)
 */
export function LoadingSpinner({ message = 'Carregando...', size = '3' }: LoadingSpinnerProps) {
  return (
    <Flex direction="column" align="center" justify="center" gap="3" py="8">
      <Spinner size={size} />
      {message && (
        <Text size="2" color="gray">
          {message}
        </Text>
      )}
    </Flex>
  );
}