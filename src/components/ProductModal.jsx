import React, { useEffect } from 'react';

const ProductModal = ({ product, open, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open || !product) return null;

  return (
    <div className="modal" id="product-modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <button className="modal-close" id="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-body" id="modal-body">
          <img src={product.image} alt={product.name} className="modal-product-image" />
          <h2 className="modal-product-title">{product.name}</h2>
          <div style={{ marginTop: 24 }}>
            <button className="btn btn--primary btn--full-width" id="inquire-button" onClick={onClose}>
              Inquire About This Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;