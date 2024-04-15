import React from 'react';
import { Text, Progress, Card } from '@mantine/core';
interface IStatProps {
  length: number;
  listName: string;
}
const StatCard: React.FC<IStatProps> = ({ length, listName }) => {
  return (
    <Card
      withBorder
      radius="md"
      p="xl"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      })}
    >
      <Text size="xs" transform="uppercase" weight={700} color="dimmed">
        Số lượng {listName}
      </Text>
      <Text size="lg" weight={500}>
        {length}
      </Text>
      <Progress value={length} mt="md" size="lg" radius="xl" />
    </Card>
  );
};

export default StatCard;
