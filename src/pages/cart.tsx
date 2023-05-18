import { Box, Flex, Heading, IconButton, VStack, Text } from "@chakra-ui/react";
import { GrClose } from "react-icons/gr";
import { useDataProvider } from "../components/data-provider";

export const Cart = () => {
  const { lines } = useDataProvider();
  return (
    <VStack px={4} py={2} mt={4}>
      {lines.map((line) => (
        <Flex justify="space-between" w="100%">
          <Heading flex={1} fontSize={16} maxW={50}>
            {line.quantity}x
          </Heading>
          <Box flex={5}>
            <Heading fontSize={16}>{line.label}</Heading>
            {line.value.map((value) => (
              <Text color="gray.600">{value.value}</Text>
            ))}
          </Box>
          <Box flex={1}>
            <Heading fontSize={16} textAlign="right">
              ${line.price.toFixed(2)}
            </Heading>
            {line.value.map((value) => (
              <Text textAlign="right" color="gray.600">
                +${value.price.toFixed(2)}
              </Text>
            ))}
          </Box>
          <Flex justify="flex-end" flex={1} maxW={10}>
            <IconButton
              size="xs"
              variant="ghost"
              icon={<GrClose />}
              aria-label="Remove from cart"
            />
          </Flex>
        </Flex>
      ))}
    </VStack>
  );
};
