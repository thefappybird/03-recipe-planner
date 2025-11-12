<template>
  <transition name="slide">
    <Form
      v-if="isFormDrawerOpen"
      :key="currentRecipe ? currentRecipe.recipeId : 'new'"
      :validation-schema="recipeSchema"
      :initial-values="initialValues"
      @submit="handleSubmit"
      class="recipe-form"
      v-slot="{ setFieldValue }"
    >
      <div class="form-header">
        <p>{{ currentRecipe ? "Edit Recipe" : "Add Recipe" }}</p>
        <button
          type="button"
          class="form-drawer-btn"
          @click="modalStore.toggleFormDrawer(false)"
        >
          ✕
        </button>
      </div>

      <!-- Title -->
      <FormFields modelName="title" title="Recipe Title">
        <Field
          name="title"
          placeholder="Enter recipe title"
          class="input-area"
        />
        <ErrorMessage name="title" class="error" />
      </FormFields>

      <!-- Description -->
      <FormFields modelName="description" title="Description">
        <Field
          as="textarea"
          name="description"
          placeholder="Write a short description"
          class="input-area"
        />
        <ErrorMessage name="description" class="error" />
      </FormFields>

      <!-- Image -->
      <FormFields modelName="image" title="Image">
        <input
          type="file"
          accept="image/*"
          @change="(e) => handleFileChange(e, setFieldValue)"
          class="file-input"
        />
      </FormFields>

      <!-- Ingredients -->
      <FormFields modelName="ingredients" title="Ingredients">
        <FieldArray name="ingredients" v-slot="{ fields, push, remove }">
          <div
            v-for="(ingredient, i) in fields"
            :key="i"
            class="array-fields ingredients-group"
          >
            <FormFields modelName="ingredients[${i}].name" title="Name">
              <Field
                :name="`ingredients[${i}].name`"
                placeholder="Name"
                class="ingredient-name"
              />
              <ErrorMessage :name="`ingredients[${i}].name`" class="error" />
            </FormFields>
            <div class="ingredient-section">
              <FormFields modelName="ingredients[${i}].amount" title="Amount">
                <Field
                  type="number"
                  :name="`ingredients[${i}].amount`"
                  placeholder="Amount"
                  class="ingredient-amt"
                />
                <ErrorMessage
                  :name="`ingredients[${i}].amount`"
                  class="error"
                />
              </FormFields>
              <FormFields modelName="ingredients[${i}].units" title="Units">
                <Field
                  :name="`ingredients[${i}].units`"
                  placeholder="Unit"
                  class="ingredient-units"
                />
                <ErrorMessage :name="`ingredients[${i}].units`" class="error" />
              </FormFields>
              <button type="button" @click="remove(i)" class="remove-btn">
                ✕
              </button>
            </div>
          </div>
          <button
            type="button"
            class="add-btn"
            @click="push({ name: '', amount: 1, units: '' })"
          >
            + Add new ingredient
          </button>
        </FieldArray>
      </FormFields>

      <!-- Steps -->
      <FormFields modelName="steps" title="Steps">
        <FieldArray name="steps" v-slot="{ fields, push, remove }">
          <div
            v-for="(step, i) in fields"
            :key="i"
            class="array-fields steps-group"
          >
            <div class="steps-header">
              <FormFields
                modelName="steps[${i}].stepNumber"
                title="Step Number"
              >
                <Field
                  :name="`steps[${i}].stepNumber`"
                  type="number"
                  placeholder="Step #"
                  class="step-number"
                />
              </FormFields>
              <button type="button" @click="remove(i)" class="remove-btn">
                ✕
              </button>
            </div>
            <FormFields modelName="steps[${i}].description" title="Description">
              <Field
                :name="`steps[${i}].description`"
                as="textarea"
                placeholder="Describe this step"
                class="step-area"
              />
              <ErrorMessage :name="`steps[${i}].description`" class="error" />
            </FormFields>
          </div>
          <button
            type="button"
            class="add-btn"
            @click="push({ stepNumber: fields.length + 1, description: '' })"
          >
            + Add new step
          </button>
        </FieldArray>
      </FormFields>

      <button type="submit" class="btn-primary">
        {{ isInteracting ? "Update Recipe" : "Create Recipe" }}
      </button>
      <button
        type="reset"
        class="btn-cancel"
        @click="modalStore.toggleFormDrawer(false)"
      >
        Cancel
      </button>
    </Form>
  </transition>
</template>

<script setup lang="ts">
import FormFields from "@/components/auth/recipe/FormFields.vue";
import { useModalStore } from "@/stores/modalStore";
import type { Recipe } from "@/types/interfaces";
import { recipeSchema, type RecipeFormValues } from "@/util/recipeSchema";
import { storeToRefs } from "pinia";
import { Form, Field, ErrorMessage, FieldArray } from "vee-validate";
import { useRecipeStore } from "@/stores/recipeStore";
import { computed, onMounted, ref, watch } from "vue";

const recipeStore = useRecipeStore();
const { isInteracting } = storeToRefs(recipeStore);

const modalStore = useModalStore();
const { isFormDrawerOpen } = storeToRefs(modalStore);
const currentRecipe = ref<Recipe | null>(null);

const emit = defineEmits<{
  (e: "submit", values: RecipeFormValues): void;
}>();

const initialValues = computed<RecipeFormValues>(() => {
  if (currentRecipe.value) {
    return {
      title: currentRecipe.value.title,
      description: currentRecipe.value.description,
      image: null, // no file selected yet
      ingredients: currentRecipe.value.ingredients,
      steps: currentRecipe.value.steps,
    };
  }
  return {
    title: "",
    description: "",
    image: null,
    ingredients: [{ name: "", amount: 1, units: "" }],
    steps: [{ stepNumber: 1, description: "" }],
  };
});

function handleFileChange(e: Event, setFieldValue: any) {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) setFieldValue("image", file);
}

function handleSubmit(values: any) {
  const { image, ...newValues } = values;
  modalStore.toggleFormDrawer(false);
  const valuesToSubmit = image ? values : { ...newValues, image: null };
  recipeStore.addOrEditRecipe(isInteracting.value ? valuesToSubmit : values);
}

onMounted(async () => {
  if (isInteracting.value) {
    currentRecipe.value = await recipeStore.getRecipeById();
  }
});

watch(isInteracting, async (newId, oldId) => {
  if (isInteracting.value) {
    currentRecipe.value = await recipeStore.getRecipeById(
      newId ? newId : oldId
    );
  } else {
    currentRecipe.value = null;
  }
});

// optional: clear currentRecipe when the drawer closes
watch(isFormDrawerOpen, (open) => {
  if (!open) {
    recipeStore.toggleIsInteracting("");
    currentRecipe.value = null;
  }
});
</script>

<style scoped lang="scss">
.recipe-form {
  border: 1px solid black;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 75%;
  max-width: 500px;
  background-color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  .form-header {
    @include flex-type(row, space-between, center);
    width: 100%;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ccc;
    p {
      font-size: 1.25rem;
      font-weight: bold;
    }
  }
  .form-drawer-btn {
    background: none;
    border: none;
    align-self: flex-start;
    margin-bottom: 1rem;
    margin-left: auto;
    cursor: pointer;

    svg {
      width: 24px;
      height: 24px;
    }
  }
  .array-fields {
    display: flex;
  }
  .error {
    color: #d9534f;
    font-size: 0.85rem;
    margin-top: 0.25rem;
  }

  .input-area {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #ccc;
    font-size: 1rem;

    &:focus {
      border-color: #4caf50;
      outline: none;
    }
  }

  input[type="file"]::file-selector-button {
    @include main-card();
    padding: 8px 16px;
    border: none;
    cursor: pointer;
  }

  .ingredients-group {
    flex-direction: column;
    .ingredient-name {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
    }
    .ingredient-section {
      display: flex;
      width: 100%;
      gap: 0.5rem;
      .ingredient-amt {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
      }
      .ingredient-units {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
      }
    }
  }
  .steps-group {
    display: flex;
    flex-direction: column; // Stack step number and description vertically
    margin-bottom: 1rem;
    transition: all 0.2s ease-in-out;

    // Each field container (FormFields wrapper)
    .form-group {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .step-number {
      width: 100px;
      padding: 0.5rem;
      border: 1px solid #ccc;
      font-size: 1rem;
    }

    .step-area {
      width: 100%;
      min-height: 80px; // initial height
      resize: vertical; // allow user resizing
      padding: 0.5rem 0.75rem;
      border: 1px solid #ccc;
      font-size: 1rem;
      line-height: 1.4;
      font-family: inherit;
      box-sizing: border-box;

      &:focus {
        border-color: #4caf50;
        outline: none;
      }
    }

    // Let each step block grow naturally
    textarea {
      overflow-y: hidden; // smooth auto-resize behavior
    }
    .steps-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      gap: 0.5rem;
    }
  }

  .remove-btn {
    background: transparent;
    border: none;
    color: #d9534f;
    font-size: 1.5rem;
    cursor: pointer;
    align-self: center;
  }
  .add-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.75rem;
    background: #f3fff3; /* subtle green background */
    border: 1px solid #cfe7cf;
    color: #2f6f2f;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    transition: background 120ms ease, transform 80ms ease,
      box-shadow 120ms ease;
    align-self: flex-start;

    svg {
      /* if you include an icon */
      width: 1rem;
      height: 1rem;
      flex: 0 0 auto;
    }

    &:hover {
      background: #e8ffea;
      box-shadow: 0 2px 6px rgba(46, 125, 50, 0.12);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.18);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    @media (min-width: 768px) {
      font-size: 1rem;
      padding: 0.5rem 0.9rem;
    }
  }
  .btn-primary {
    @include flex-type(row, center, center);
    padding: 0.25rem;
    width: 100%;
    margin-bottom: 0.5rem;
    background-color: $color-background-secondary;
    font-size: 16px;
    font-weight: bold;
    transition: background 0.3s, color 0.3s;
    &:hover {
      @include main-card();
    }
  }
  .btn-cancel {
    @include flex-type(row, center, center);
    padding: 0.25rem;
    width: 100%;
    margin-bottom: 0.5rem;
    background-color: rgb(216, 119, 119);
    font-size: 16px;
    font-weight: bold;
    transition: background 0.3s, color 0.3s;
    color: white;
    &:hover {
      @include color-set(rgb(216, 77, 77), $color-text-header);
    }
  }
}
</style>
