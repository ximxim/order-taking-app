import { Center, Spinner } from "@chakra-ui/react";
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useState,
} from "react";

interface IDataProviderContext {}

const DataProviderContext = createContext<IDataProviderContext>({});

export const DataProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [isReady, setIsReady] = useState(false);
  return (
    <DataProviderContext.Provider value={{}}>
      {isReady ? (
        children
      ) : (
        <Center height="100vh">
          <Spinner />
        </Center>
      )}
    </DataProviderContext.Provider>
  );
};
