import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CoffeeContext } from "../context/CoffeeContext";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import IngredientsTable from "../components/tables/IngredientsTable";
import "../styles/components/pages/ingredients.css";
import "../styles/components/forms.css";
import "../styles/components/tables.css";
const Ingredients = () => {
  const { addIngredient } = useContext(CoffeeContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    strength: "Medium",
    flavor: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.price || isNaN(formData.price))
      newErrors.price = "Valid price is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addIngredient({
      ...formData,
      price: parseFloat(formData.price),
    });
    setFormData({
      name: "",
      price: "",
      strength: "Medium",
      flavor: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Manage Ingredients</h1>
        <Button variant="secondary" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>

      <div className="ingredients-container">
        <div className="ingredients-form">
          <h2>Add New Ingredient</h2>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-row">
              <Input
                label="Ingredient Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />

              <Input
                label="Price ($)"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="strength">Strength</label>
              <select
                id="strength"
                name="strength"
                value={formData.strength}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="flavor">Flavor Profile</label>
              <input
                id="flavor"
                type="text"
                name="flavor"
                value={formData.flavor}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-actions">
              <Button type="submit" variant="primary">
                Add Ingredient
              </Button>
            </div>
          </form>
        </div>

        <div className="ingredients-list">
          <IngredientsTable />
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
