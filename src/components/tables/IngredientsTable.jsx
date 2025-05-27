import { useContext } from "react";
import { CoffeeContext } from "../../context/CoffeeContext";
import Button from "../common/Button";
import "../../styles/components/tables.css";

const IngredientsTable = () => {
  const { ingredients, deleteIngredient } = useContext(CoffeeContext);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ingredient?")) {
      deleteIngredient(id);
    }
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Strength</th>
            <th>Flavor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.id}>
              <td>{ingredient.id}</td>
              <td>{ingredient.name}</td>
              <td>${ingredient.price.toFixed(2)}</td>
              <td>{ingredient.strength}</td>
              <td>{ingredient.flavor}</td>
              <td className="actions-cell">
                <Button
                  variant="danger"
                  onClick={() => handleDelete(ingredient.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientsTable;
