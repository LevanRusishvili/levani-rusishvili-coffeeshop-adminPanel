import { createContext, useState, useCallback, useContext } from "react";

export const CoffeeContext = createContext();

export const CoffeeProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([
    {
      id: "Ing_scmppl1",
      name: "Arobica Beans",
      price: 15.99,
      strength: "Medium",
      flavor: "Fruity",
    },
    {
      id: "Ing_scmppl2",
      name: "Robusta Beans",
      price: 12.99,
      strength: "High",
      flavor: "Earthy",
    },
    {
      id: "Ing_scmppl3",
      name: "Vanilla Syrup",
      price: 8.99,
      strength: "Low",
      flavor: "Sweet",
    },
  ]);

  const [coffees, setCoffees] = useState([
    {
      id: "cod_compiel",
      name: "Ethiopian Yirgacheffe",
      origin: "Ethiopia",
      caffeine: "100mg",
      price: 4.99,
      description:
        "A light roasted coffee with bright acidity, and complex fruit and floral notes...",
      ingredients: ["Ing_scmppl1"],
    },
    {
      id: "cod_compie2",
      name: "Colombian Supremo",
      origin: "Colombia",
      caffeine: "140mg",
      price: 5.49,
      description:
        "Medium roast with a sweet and rich caramel flavor, balanced acidity and a clean finish...",
      ingredients: ["Ing_scmppl2"],
    },
  ]);

  const addIngredient = useCallback((ingredient) => {
    setIngredients((prev) => [
      ...prev,
      {
        ...ingredient,
        id: `Ing_${Math.random().toString(36).substr(2, 8)}`,
      },
    ]);
  }, []);

  const addCoffee = useCallback((coffee) => {
    setCoffees((prev) => [
      ...prev,
      {
        ...coffee,
        id: `cod_${Math.random().toString(36).substr(2, 8)}`,
      },
    ]);
  }, []);

  const updateCoffee = useCallback((id, updatedCoffee) => {
    setCoffees((prev) =>
      prev.map((coffee) =>
        coffee.id === id ? { ...coffee, ...updatedCoffee } : coffee
      )
    );
  }, []);

  const deleteCoffee = useCallback((id) => {
    setCoffees((prev) => prev.filter((coffee) => coffee.id !== id));
  }, []);

  const deleteIngredient = useCallback((id) => {
    setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id));
  }, []);

  const computeTotalPrice = useCallback(
    (basePrice, selectedIngredients) => {
      const ingredientsTotal = selectedIngredients.reduce(
        (total, ingredientId) => {
          const ingredient = ingredients.find((ing) => ing.id === ingredientId);
          return total + (ingredient?.price || 0);
        },
        0
      );
      return (basePrice + ingredientsTotal).toFixed(2);
    },
    [ingredients]
  );

  return (
    <CoffeeContext.Provider
      value={{
        ingredients,
        coffees,
        addIngredient,
        addCoffee,
        updateCoffee,
        deleteCoffee,
        deleteIngredient,
        computeTotalPrice,
      }}
    >
      {children}
    </CoffeeContext.Provider>
  );
};

export const useCoffeeContext = () => useContext(CoffeeContext);
