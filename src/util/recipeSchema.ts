// src/components/recipes/recipeSchema.ts
import * as yup from "yup";

export const recipeSchema = yup.object({
  title: yup.string().required("Title is required").max(100),
  description: yup.string().required("Description is required").max(1000),
  image: yup.mixed<File>().nullable(),
  ingredients: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("Ingredient name required"),
        amount: yup
          .number()
          .typeError("Please enter a valid number") // 👈 overrides that NaN message
          .positive("Amount must be positive")
          .required("Amount is required"),
        units: yup.string().required("Unit required"),
      })
    )
    .min(1, "At least one ingredient is required"),
  steps: yup
    .array()
    .of(
      yup.object({
        stepNumber: yup.number().required(),
        description: yup.string().required("Step description required"),
      })
    )
    .min(1, "At least one step is required"),
});

export type RecipeFormValues = yup.InferType<typeof recipeSchema>;
