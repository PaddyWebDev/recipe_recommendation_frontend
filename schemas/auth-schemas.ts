import { z, ZodSchema } from "zod";


export const LoginSchema = z.object({
  email: z
    .string()
    .min(8, {
      message: "Email must contain at least 8 character(s)",
    })
    .max(40, {
      message: "Email must contain up to 40 character(s) only",
    })
    .email(),
  password: z
    .string()
    .min(8, {
      message: "Password must contain at least 8 character(s)",
    })
    .max(35, {
      message: "Password must contain up to 35 character(s) only",
    }),
});

export const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 character(s)" })
    .max(35, { message: "Password must contain up to 35 character(s) only" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must contain at least 8 character(s)" })
    .max(35, { message: "Password must contain up to 35 character(s) only" }),
});


export const authUpdatePasswordSchema = z.object({
  existingPassword: z.string()
    .min(8, { message: "Password must contain at least 8 character(s)" })
    .max(35, { message: "Password must contain up to 35 character(s) only" }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 character(s)" })
    .max(35, { message: "Password must contain up to 35 character(s) only" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must contain at least 8 character(s)" })
    .max(35, { message: "Password must contain up to 35 character(s) only" }),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  gender: z.string().min(1, {
    message: "Gender is required"
  }),
  phoneNumber: z.string().regex(/^\d{10}$/, {
    message: "Please enter a valid 10-digit phone number.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),

});
export const resetPassSchema = z.object({
  email: z
    .string()
    .min(8, { message: "Email must contain at least 8 character(s)" })
    .max(40, { message: "Email must contain up to 40 character(s) only" })
    .email({ message: "Must be a valid email address" }),
});

export const homeSearchForm = z.object({
  query: z.string().min(1, {
    message: "Field must be atleast 5 characters"
  }).max(20, {
    message: "Field must be atmost 20 characters"
  })
})



export const updateUserSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phoneNumber: z.string().regex(/^\d{10}$/, {
    message: "Please enter a valid 10-digit phone number.",
  }),
  gender: z.string().min(1, {
    message: "Gender is required"
  })
});

export const contactSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(2, {
    message: "Message should be greater than 2 characters",
  }),
});

export const recipeFormSchema = z.object({
  Ingredients: z
    .array(z.string().min(1, "Empty tag not allowed"))
    .min(1, "At least one tag is required"),
  cooking_time: z
    .string()
    .regex(/^([1-9]|[1-9][0-9]|1[0-9]{2}|2[0-9]{2}|300)$/, {
      message: "Enter a number between 1 and 300",
    }),
  cuisine: z.string().min(1, {
    message: "Cuisine is required",
  }),
  diet: z.string().min(1, {
    message: "Diet is required",
  }),
  course: z.string().min(1, {
    message: "Course is required",
  })
});



export function validateFields(data: z.infer<typeof schema>, schema: ZodSchema) {
  const result = schema.safeParse(data);
  if (!result.success) {
    return result.error;
  }
  return result.data;
}


export const courseValues: string[] = [
  "Appetizer",
  "Brunch",
  "Dessert",
  "Dinner",
  "Eggetarian",
  "High Protein Vegetarian",
  "Indian Breakfast",
  "Lunch",
  "Main Course",
  "No Onion No Garlic (Sattvic)",
  "Non Vegeterian",
  "North Indian Breakfast",
  "One Pot Dish",
  "Side Dish",
  "Snack",
  "South Indian Breakfast",
  "Sugar Free Diet",
  "Vegan",
  "Vegetarian",
  "World Breakfast"
];

export const cuisineValues: string[] = [
  "Afghan",
  "African",
  "American",
  "Andhra",
  "Appetizer",
  "Arab",
  "Asian",
  "Assamese",
  "Awadhi",
  "Bengali Recipes",
  "Bihari",
  "British",
  "Brunch",
  "Burmese",
  "Cantonese",
  "Caribbean",
  "Chettinad",
  "Chinese",
  "Coastal Karnataka",
  "Continental",
  "Coorg",
  "Dessert",
  "Dinner",
  "European",
  "French",
  "Fusion",
  "Goan Recipes",
  "Greek",
  "Gujarati Recipes",
  "Haryana",
  "Himachal",
  "Hunan",
  "Hyderabadi",
  "Indian",
  "Indo Chinese",
  "Indonesian",
  "Italian Recipes",
  "Japanese",
  "Jewish",
  "Jharkhand",
  "Karnataka",
  "Kashmiri",
  "Kerala Recipes",
  "Kongunadu",
  "Konkan",
  "Korean",
  "Lucknowi",
  "Lunch",
  "Maharashtrian Recipes",
  "Malabar",
  "Malaysian",
  "Malvani",
  "Mangalorean",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Mughlai",
  "Nagaland",
  "Nepalese",
  "North East India Recipes",
  "North Indian Recipes",
  "North Karnataka",
  "Oriya Recipes",
  "Pakistani",
  "Parsi Recipes",
  "Punjabi",
  "Rajasthani",
  "Shandong",
  "Sichuan",
  "Side Dish",
  "Sindhi",
  "Snack",
  "South Indian Recipes",
  "South Karnataka",
  "Sri Lankan",
  "Tamil Nadu",
  "Thai",
  "Udupi",
  "Uttar Pradesh",
  "Uttarakhand-North Kumaon",
  "Vietnamese",
  "World Breakfast"
];

export const dietValues: string[] = [
  "Diabetic Friendly",
  "Eggetarian",
  "Gluten Free",
  "High Protein Non Vegetarian",
  "High Protein Vegetarian",
  "No Onion No Garlic (Sattvic)",
  "Non Vegeterian",
  "Sugar Free Diet",
  "Vegan",
  "Vegetarian"
];

