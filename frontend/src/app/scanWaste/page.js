"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import Footer from "@/components/footer";
import NavbarUser from "@/components/navbar-user";
import ProtectedRoute from "@/components/ProtectedRoute";

const Page = () => {
  const fileInputRef = useRef(null);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
        console.log("MobileNet model berhasil dimuat.");
      } catch (error) {
        console.error("Error saat memuat model MobileNet:", error);
      }
    };
    loadModel();
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);

    const img = new window.Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      if (model) {
        const preds = await model.classify(img);
        console.log("Prediksi:", preds);
        setPredictions(preds);
      }
    };
  };

  const handleBuangSampah = () => {
    router.push("/location");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col justify-between bg-gray-100 font-poppins">
        <NavbarUser />
        <div className="flex flex-col items-center mt-[18vh] mb-[5vh]">
          <div className="w-[60vw] px-[4vw] py-[5vh] rounded-3xl bg-[#A9C46C80] flex flex-col gap-6 items-center">
            <h2 className="text-4xl font-bold text-black">Scan Waste</h2>
            <p className="text-xl text-black text-center">
              Understand waste types and dispose of them properly to protect our
              environment. Scan to recognize, sort to recycle!
            </p>
            <button
              className="w-[20vw] rounded-xl bg-[#5D8736] px-4 py-3 flex items-center justify-center gap-3 cursor-pointer"
              onClick={handleButtonClick}
            >
              <p className="text-xl font-bold text-black">Upload Files</p>
              <Image
                src="/upload_file.png"
                alt="upload_files_image"
                width={30}
                height={30}
              />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {previewUrl && (
              <div className="mt-4 flex flex-col items-center">
                <Image
                  src={previewUrl}
                  alt="preview"
                  width={224}
                  height={224}
                  className="rounded-md"
                />
                {predictions.length > 0 && (
                  <>
                    <div className="mt-2 text-xl font-bold text-black">
                      {predictions.map((pred, idx) => (
                        <p key={idx}>
                          {pred.className}:{" "}
                          {(pred.probability * 100).toFixed(2)}%
                        </p>
                      ))}
                    </div>
                    <button
                      className="mt-4 w-[20vw] rounded-xl bg-[#5D8736] px-4 py-3 text-xl font-bold text-black cursor-pointer"
                      onClick={handleBuangSampah}
                    >
                      Buang Sampah
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Page;
