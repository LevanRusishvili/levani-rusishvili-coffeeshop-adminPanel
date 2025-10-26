import { createContext, useState, useCallback, useContext } from "react";

export const CoffeeContext = createContext();

export const CoffeeProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([
    {
      id: "Ing_scmppl1",
      name: "Arabica Beans",
      price: 15.99,
      description: "High-quality Arabica beans with a smooth flavor.",
      strength: "Medium",
      flavor: "Fruity",
    },
    {
      id: "Ing_scmppl2",
      name: "Robusta Beans",
      price: 12.99,
      description: "Strong Robusta beans with a bold taste.",
      strength: "High",
      flavor: "Earthy",
    },
    {
      id: "Ing_scmppl3",
      name: "Vanilla Syrup",
      price: 8.99,
      description: "Sweet vanilla syrup to enhance your coffee.",
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
      imageUrl:
        "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&h=300&fit=crop",
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
      imageUrl:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop",
      description:
        "Medium roast with a sweet and rich caramel flavor, balanced acidity and a clean finish...",
      ingredients: ["Ing_scmppl2", "Ing_scmppl3"],
    },
  ]);


   const handleEditIngredient = useCallback((id, updatedIngredient) => {
    setIngredients((prev) =>
      prev.map((ingredient) => {
        return ingredient.id === id
          ? { ...ingredient, ...updatedIngredient }
          : ingredient; 
      })
    );
  }, []);

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
        handleEditIngredient,
      }}
    >
      {children}
    </CoffeeContext.Provider>
  );
};

export const useCoffeeContext = () => useContext(CoffeeContext);
