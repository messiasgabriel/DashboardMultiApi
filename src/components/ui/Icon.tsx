import * as Icons from '@radix-ui/react-icons';
import type { ComponentPropsWithoutRef } from 'react';

type RadixIconProps = ComponentPropsWithoutRef<typeof Icons.MagnifyingGlassIcon>;

interface IconComponentProps extends RadixIconProps {
  name: keyof typeof Icons;
  size?: number;
}

export function Icon({ name, size = 16, ...props }: IconComponentProps) {
  const IconElement = Icons[name];
  
  if (!IconElement) {
    console.warn(`Ícone "${name}" não encontrado`);
    return null;
  }

  return <IconElement width={size} height={size} {...props} />;
}