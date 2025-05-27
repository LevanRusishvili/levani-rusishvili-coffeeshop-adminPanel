const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const handleRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchCoffees = async () => {
  return handleRequest(`${BASE_URL}/coffees`);
};

export const createCoffee = async (coffeeData) => {
  return handleRequest(`${BASE_URL}/coffees`, {
    method: "POST",
    body: JSON.stringify(coffeeData),
  });
};

export const fetchIngredients = async () => {
  return handleRequest(`${BASE_URL}/ingredients`);
};

export const createIngredient = async (ingredientData) => {
  return handleRequest(`${BASE_URL}/ingredients`, {
    method: "POST",
    body: JSON.stringify(ingredientData),
  });
};

export const deleteCoffee = async (id) => {
  return handleRequest(`${BASE_URL}/coffees/${id}`, {
    method: "DELETE",
  });
};

export const deleteIngredient = async (id) => {
  return handleRequest(`${BASE_URL}/ingredients/${id}`, {
    method: "DELETE",
  });
};
