import "../../styles/components/modal.css";

const CoffeeDetailsModal = ({ coffee, onClose }) => {
  if (!coffee) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{coffee.name}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{coffee.description}</p>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Origin:</span>
              <span>{coffee.origin}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Caffeine:</span>
              <span>{coffee.caffeine}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Price:</span>
              <span>${coffee.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetailsModal;
