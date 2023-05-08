import { Box, Container } from "@chakra-ui/react";

import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <Box>
      <p>navigation bar</p>
      <Container minH="100vh">
        <Outlet />
      </Container>
    </Box>
  );
};
