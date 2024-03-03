import React from "react";

function FavCard() {
  return (
    <div className="p-4">
      <div className="max-w-xs rounded-md overflow-hidden">
        <div>
          <img src="/assets/img/auth.jpg" alt="thumbnail" />
        </div>
        <div>
          <h5>Ankara villa house</h5>
          <p>Shiraz - Qasrdasht</p>
          <span>2,5000,000 USD</span>
        </div>
      </div>
    </div>
  );
}

export default FavCard;
