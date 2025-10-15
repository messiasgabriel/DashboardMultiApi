// src/components/layout/Sidebar.tsx
import { Flex, Text, Box } from '@radix-ui/themes';
import { Image } from '../ui/Image';
import { Icon } from '../ui/Icon';
import { API_TABS } from '../../config/apiTabs';


interface SidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <Box className="w-64 h-screen bg-gray-2 border-r border-gray-6 left-0 top-0 z-10">
      {/* Header da Sidebar */}
      <Flex direction="column" gap="2" p="6" className="border-b border-gray-6">
        <Flex align="center" gap="2">
          <Icon name="MagnifyingGlassIcon" size={24} />
          <Text size="5" weight="bold">
            Dashboard
          </Text>
        </Flex>
        <Text size="2" color="gray">
          Multi-API Explorer
        </Text>
      </Flex>

      {/* Menu de APIs */}
      <Flex direction="column" gap="1" p="3">
        {API_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg
              transition-all duration-200
              ${
                activeTab === tab.id
                  ? 'bg-blue-9 text-white shadow-md'
                  : 'text-gray-11 hover:bg-gray-3 hover:text-gray-12'
              }
            `}
          >
            <Image
              src={tab.icon}
              alt={`${tab.label} icon`}
              aspectRatio="1/1"
              className="w-5 h-5"
            />
            <Text size="3" weight={activeTab === tab.id ? 'bold' : 'regular'}>
              {tab.label}
            </Text>
          </button>
        ))}
      </Flex>
    </Box>
  );
}