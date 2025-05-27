import { useState } from "react";
import { useCoffeeContext } from "../../context/CoffeeContext";
import Button from "../common/Button";
import CoffeeDetailsModal from "./CoffeeDetailsModal";
import "../../styles/components/tables.css";
const CoffeeTable = () => {
  const { coffees, deleteCoffee } = useCoffeeContext();
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (coffee) => {
    setSelectedCoffee(coffee);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this coffee?")) {
      deleteCoffee(id);
    }
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Origin</th>
            <th>Caffeine</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coffees.map((coffee) => (
            <tr key={coffee.id}>
              <td>{coffee.id}</td>
              <td>{coffee.name}</td>
              <td>{coffee.origin}</td>
              <td>{coffee.caffeine}</td>
              <td>${coffee.price.toFixed(2)}</td>
              <td className="actions-cell">
                <Button variant="primary" onClick={() => handleView(coffee)}>
                  View
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(coffee.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <CoffeeDetailsModal
          coffee={selectedCoffee}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CoffeeTable;
