import { LegacyRef, useEffect, useRef, useState } from "react";
import "./inputGenerator.css";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
import validator from "validator";

function InputGenerator() {
  const [url, setUrl] = useState<string>("");
  const [qrIsVisible, setQrIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const qrCodeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!url) {
      setQrIsVisible(false);
      setErrorMessage("");
    }
  }, [url, qrIsVisible, setQrIsVisible]);

  const handleGenerate = () => {
    if (!url) {
      return;
    }

    if (validator.isURL(url)) {
      setQrIsVisible(true);
    } else {
      setErrorMessage("Invalid URL input, enter valid URL!");
    }
  };

  const downloadQrCode = () => {
    htmlToImage
      .toPng(qrCodeRef.current as HTMLElement)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qr-code.png";
        link.click();
      })
      .catch((error) => {
        console.log("Error generating QR code:", error);
      });
  };

  return (
    <div className="main-container-generator">
      <div className="inputGenerator">
        <div className="inputGenerator-heading">
          <h1>Enter your URL here:</h1>
        </div>
        <div className="inputGenerator-form-div">
          <input
            type="url"
            placeholder="Enter a URL..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          <p className="error-message">{errorMessage}</p>
          <button className="generator-button" onClick={handleGenerate}>
            Generate QR Code
          </button>
        </div>
      </div>
      <div className="qr-code-div-download">
        {qrIsVisible && (
          <>
            <div
              className="generated-qr-code"
              ref={qrCodeRef as LegacyRef<HTMLDivElement> | undefined}
            >
              <QRCode value={url} size={300} />
            </div>
            <button className="download-button" onClick={downloadQrCode}>
              Download QR Code
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default InputGenerator;
