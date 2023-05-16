import {
  Text,
  Image,
  VStack,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  FormErrorMessage,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDataProvider } from "../components/data-provider";
import { ILine } from "../models";

const Variant = ({ allowMultiple, ...props }: any) =>
  allowMultiple ? <CheckboxGroup {...props} /> : <RadioGroup {...props} />;

const Choice = ({ allowMultiple, ...props }: any) =>
  allowMultiple ? <Checkbox {...props} /> : <Radio {...props} />;

export const Item = () => {
  const { id } = useParams();
  const { getItemById } = useDataProvider();
  const item = getItemById(id!);
  const { register, handleSubmit, formState } = useForm<ILine>({
    defaultValues: {
      quantity: 1,
      value: [],
      price: item!.price,
      label: item!.label,
    },
  });

  const onSubmit = (values: ILine) => console.log(values);

  if (!item) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4} pb={100} alignItems="flex-start">
        <Image src={item.image.src} w="100%" maxH="280px" objectFit="cover" />
        <VStack gap={4} p={4} w="100%" alignItems="flex-start">
          <Text>{item.description}</Text>
          {item.variants.map((variant) => (
            <FormControl>
              <FormLabel>{variant.type}</FormLabel>
              <Variant allowMultiple={variant.allowMultiple}>
                {variant.choices.map((choice, index) => (
                  <Choice
                    value={`${variant.type}:${index}`}
                    allowMultiple={variant.allowMultiple}
                  >
                    {choice.label}
                  </Choice>
                ))}
              </Variant>
            </FormControl>
          ))}
          <FormControl>
            <FormLabel>Special Instructions</FormLabel>
            <Textarea
              placeholder="pepper / salt / cutluty..."
              {...register("instructions")}
            />
          </FormControl>
          <FormControl isInvalid={!!formState.errors.quantity?.type}>
            <FormLabel>Quantity</FormLabel>
            <Input
              type="number"
              defaultValue={1}
              {...register("quantity", { min: 1, valueAsNumber: true })}
            />
            {!!formState.errors.quantity?.type && (
              <FormErrorMessage>Invalid</FormErrorMessage>
            )}
          </FormControl>
        </VStack>
      </VStack>
    </form>
  );
};
