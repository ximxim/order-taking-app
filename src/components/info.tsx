import { Card } from "@mui/material";
import {
  CheckboxGroupInput,
  SimpleForm,
  TextInput,
  TimeInput,
} from "react-admin";
import { PAYMENT_METHODS } from "../utils/constants";

export const Info = () => {
  return (
    <Card>
      <SimpleForm sanitizeEmptyValues>
        <TextInput source="name" fullWidth />
        <TextInput source="address" fullWidth />
        <TextInput source="phone" fullWidth />
        <TimeInput source="openingTime" fullWidth />
        <TimeInput source="closingTime" fullWidth />
        <CheckboxGroupInput source="paymentMethods" choices={PAYMENT_METHODS} />
      </SimpleForm>
    </Card>
  );
};
