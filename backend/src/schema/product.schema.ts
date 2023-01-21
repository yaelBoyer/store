import { number, object, string } from "yup";

const payload = {
  body: object({
    name: string().required("Name is required"),
    price:number().required("Price is required"),
    category:string().required("Category is required")
  }),
};

const params = {
  params: object({
    productId: string().required("productId is required"),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...params,
  ...payload,
});

export const deleteProductSchema = object({
  ...params,
});
