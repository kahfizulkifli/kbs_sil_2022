import React from "react";
import Spinner from "../../components-v2/Spinner";

const Dummy = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center h-100"
      style={{ backgroundColor: "#FBFCFE" }}
    >
      <div className="col-xl-6 text-center">
        <img
          style={{ width: 300 }}
          src="https://res.cloudinary.com/farmaklik/image/upload/v1661940323/pos.farmaklik.com/pages/soon/soon_wj7jfz.png"
        />
        <h3 className="mt-4">Fitur ini masih dalam tahap pengembangan.</h3>
        <p className="mt-4 medium-body-reg" style={{ opacity: "75%" }}>
          Fitur ini akan segera hadir untuk memenuhi kebutuhan aplikasi POS
          kamu.
        </p>
      </div>
    </div>
  );
};

export default Dummy;
