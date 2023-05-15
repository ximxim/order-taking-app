import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import { useDataProvider } from "../components/data-provider";

export const Menu = () => {
  const { categories, getItemsByCategory } = useDataProvider();

  return (
    <Accordion defaultIndex={categories.map((_, index) => index)} allowMultiple>
      {categories.map((category) => (
        <AccordionItem>
          <AccordionButton bg="gray.200">
            <Box as="span" flex="1" textAlign="left">
              <Heading as="h2" fontSize={20}>
                {category.title}
              </Heading>
              {category.description && (
                <Text fontSize={14} color="gray.600">
                  {category.description}
                </Text>
              )}
            </Box>
          </AccordionButton>
          <AccordionPanel pb={4}>
            {getItemsByCategory(category.id).map((item) => (
              <p>{item.label}</p>
            ))}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
