import { Center, Spinner } from "@chakra-ui/react";
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ICategory, IItem, IRestraunt } from "../models";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import { signInAnonymously } from "firebase/auth";

interface IDataProviderContext {
  restaurantInfo?: IRestraunt;
  categories: ICategory[];
  items: IItem[];
}

const DataProviderContext = createContext<IDataProviderContext>({
  categories: [],
  items: [],
});

export const useDataProvider = () => useContext(DataProviderContext);

export const DataProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState<IRestraunt>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [items, setItems] = useState<IItem[]>([]);

  const fetchCategories = async () => {
    const categoriesSnapshot = await getDocs(collection(db, "category"));
    const dbCategories: ICategory[] = [];
    categoriesSnapshot.forEach((category) =>
      dbCategories.push(category.data() as ICategory)
    );
    setCategories(dbCategories);
  };

  const fetchItems = async () => {
    const itemsSnapshot = await getDocs(collection(db, "item"));
    const dbItems: IItem[] = [];
    itemsSnapshot.forEach((item) => dbItems.push(item.data() as IItem));
    setItems(dbItems);
  };

  const fetchRestaurantInfo = async () => {
    const restaurantInfoSnapshot = await getDoc(doc(db, "restaurant", "info"));
    setRestaurantInfo(restaurantInfoSnapshot.data() as IRestraunt);
  };

  const fetchData = async () => {
    await signInAnonymously(auth);
    await fetchItems();
    await fetchCategories();
    await fetchRestaurantInfo();
    setIsReady(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataProviderContext.Provider value={{ restaurantInfo, categories, items }}>
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
