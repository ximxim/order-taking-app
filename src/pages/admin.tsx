import { Admin as RAdmin, Resource, ListGuesser } from "react-admin";
import {
  RAFirebaseOptions,
  FirebaseDataProvider,
  FirebaseAuthProvider,
} from "react-admin-firebase";

import { firebaseConfig } from "../utils/firebase";

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
      <Resource name="items" list={ListGuesser} />
    </RAdmin>
  );
};
