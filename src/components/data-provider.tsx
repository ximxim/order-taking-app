import { Center, Spinner } from "@chakra-ui/react";
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IRestraunt } from "../models";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

interface IDataProviderContext {
  restaurantInfo?: IRestraunt;
}

const DataProviderContext = createContext<IDataProviderContext>({});

export const useDataProvider = () => useContext(DataProviderContext);

export const DataProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState<IRestraunt>();

  const fetchRestaurantInfo = async () => {
    const restaurantInfoSnapshot = await getDoc(doc(db, "restaurant", "info"));
    setRestaurantInfo(restaurantInfoSnapshot.data() as IRestraunt);
  };

  const fetchData = async () => {
    await fetchRestaurantInfo();
    setIsReady(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataProviderContext.Provider value={{ restaurantInfo }}>
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
