import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  FormControl,
  FormLabel,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IOrder } from "../models";
import { BottomButton } from "../components/bottom-button";
import { useDataProvider } from "../components/data-provider";
import { calculateOrderTotal } from "../utils/calculations";

export const Checkout = () => {
  const { lines } = useDataProvider();
  const { register, handleSubmit } = useForm<IOrder>();

  const onSubmit = (data: IOrder) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
        <AccordionItem>
          <AccordionButton bg="gray.200">CONTACT</AccordionButton>
          <AccordionPanel>Something</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton bg="gray.200">PAYMENT METHOD</AccordionButton>
          <AccordionPanel>Something</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton bg="gray.200">COMMENTS</AccordionButton>
          <AccordionPanel>
            <VStack mt={4}>
              <FormControl>
                <FormLabel>Comments</FormLabel>
                <Textarea placeholder="Comments..." {...register("comments")} />
              </FormControl>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <BottomButton
        label="Place pick up order"
        total={calculateOrderTotal(lines, 13).toFixed(2)}
      />
    </form>
  );
};
