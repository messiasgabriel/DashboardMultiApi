import { Flex, Text } from '@radix-ui/themes';

interface EmptyStateProps {
  message: string;
  icon?: string;
  description?: string;
}

export function EmptyState({ message, icon = '🔍', description }: EmptyStateProps) {
  return (
    <Flex 
      direction="column" 
      align="center" 
      justify="center" 
      gap="2" 
      py="8"
    >
      <Text size="9">{icon}</Text>
      <Text size="5" weight="medium" color="gray">
        {message}
      </Text>
      {description && (
        <Text size="2" color="gray" align="center" style={{ maxWidth: '400px' }}>
          {description}
        </Text>
      )}
    </Flex>
  );
}