import { Center, Spinner } from "@chakra-ui/react";
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ICategory, IItem, ILine, ILineValue, IRestraunt } from "../models";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import { signInAnonymously } from "firebase/auth";

interface IDataProviderContext {
  lines: ILine[];
  restaurantInfo?: IRestraunt;
  categories: ICategory[];
  items: IItem[];
  getItemsByCategory: (category: string) => IItem[];
  getItemById: (itemId: string) => IItem | undefined;
  addToCart: (line: ILine) => void;
}

const DataProviderContext = createContext<IDataProviderContext>({
  lines: [],
  categories: [],
  items: [],
  getItemsByCategory: () => [],
  getItemById: () => undefined,
  addToCart: () => {},
});

export const useDataProvider = () => useContext(DataProviderContext);

export const DataProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState<IRestraunt>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [items, setItems] = useState<IItem[]>([]);
  const [lines, setLines] = useState<ILine[]>([]);

  const fetchCategories = async () => {
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    const dbCategories: ICategory[] = [];
    categoriesSnapshot.forEach((category) =>
      dbCategories.push(category.data() as ICategory)
    );
    setCategories(dbCategories);
  };

  const fetchItems = async () => {
    const itemsSnapshot = await getDocs(collection(db, "items"));
    const dbItems: IItem[] = [];
    itemsSnapshot.forEach((item) => dbItems.push(item.data() as IItem));
    setItems(dbItems);
  };

  const fetchRestaurantInfo = async () => {
    const restaurantInfoSnapshot = await getDoc(doc(db, "restraunt", "info"));
    setRestaurantInfo(restaurantInfoSnapshot.data() as IRestraunt);
  };

  const fetchData = async () => {
    await signInAnonymously(auth);
    await fetchItems();
    await fetchCategories();
    await fetchRestaurantInfo();
    setIsReady(true);
  };

  const getItemById = (itemId: string) => {
    return items.find((item) => item.id === itemId);
  };

  const getItemsByCategory = (category: string): IItem[] => {
    return items.filter((item) => item.category === category);
  };

  const addToCart = (line: ILine) => {
    setLines([...lines, line]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataProviderContext.Provider
      value={{
        lines,
        restaurantInfo,
        categories,
        items,
        getItemsByCategory,
        getItemById,
        addToCart,
      }}
    >
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
