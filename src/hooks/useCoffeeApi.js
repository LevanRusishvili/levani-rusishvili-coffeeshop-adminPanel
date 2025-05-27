import { useState, useEffect } from "react";
import {
  fetchCoffees,
  createCoffee,
  fetchIngredients,
  createIngredient,
} from "../services/api";

export const useCoffeeApi = () => {
  const [coffees, setCoffees] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [coffeeData, ingredientData] = await Promise.all([
        fetchCoffees(),
        fetchIngredients(),
      ]);
      setCoffees(coffeeData);
      setIngredients(ingredientData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addCoffee = async (coffee) => {
    try {
      const newCoffee = await createCoffee(coffee);
      setCoffees((prev) => [...prev, newCoffee]);
      return newCoffee;
    } catch (err) {
      throw err;
    }
  };

  const addIngredient = async (ingredient) => {
    try {
      const newIngredient = await createIngredient(ingredient);
      setIngredients((prev) => [...prev, newIngredient]);
      return newIngredient;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    coffees,
    ingredients,
    loading,
    error,
    addCoffee,
    addIngredient,
    refresh: loadData,
  };
};
