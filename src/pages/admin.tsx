import { Admin as RAdmin, Resource, ListGuesser } from "react-admin";
import {
  RAFirebaseOptions,
  FirebaseDataProvider,
  FirebaseAuthProvider,
} from "react-admin-firebase";

import { CategoryProps } from "../components/category-resource";
import { firebaseConfig } from "../utils/firebase";
import { ItemProps } from "../components/item-resource";

const options: RAFirebaseOptions = {
  logging: true,
  persistence: "session",
  lazyLoading: {
    enabled: true,
  },
  watch: ["orders"],
};

const dataProvider = FirebaseDataProvider(firebaseConfig, options);
const authProvider = FirebaseAuthProvider(firebaseConfig, {});

export const Admin = () => {
  return (
    <RAdmin
      authProvider={authProvider}
      basename="/admin"
      dataProvider={dataProvider}
    >
      <Resource {...CategoryProps} />
      <Resource {...ItemProps} />
    </RAdmin>
  );
};
