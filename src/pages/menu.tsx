import { Box } from "@chakra-ui/react";
import { useDataProvider } from "../components/data-provider";

export const Menu = () => {
  const { categories } = useDataProvider();
  return (
    <Box>
      <p>Menu page</p>
      {categories.map((category) => (
        <p>{category.title}</p>
      ))}
    </Box>
  );
};
