import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QRCodeGenerator = ({ profileLink }) => {
  return (
    <div className="flex mb-5">
      <h2 className="text-xl font-semibold mb-4">
        Scan QR Code to Reach Profile
      </h2>
      <div className="mx-auto">
        <QRCodeSVG value={profileLink} />
      </div>
    </div>
  );
};

export default QRCodeGenerator;
