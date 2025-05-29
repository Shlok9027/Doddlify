import React, { useState, useEffect, useRef, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";


const stickerOptions = [
  "https://em-content.zobj.net/thumbs/160/apple/354/fire_1f525.png",
  "https://em-content.zobj.net/thumbs/160/apple/354/red-heart_2764-fe0f.png",
  "https://em-content.zobj.net/thumbs/160/apple/354/star_2b50.png",
];


const fontOptions = [
  { name: "Poppins", label: "Modern" },
  { name: "Cursive", label: "Cursive" },
  { name: "Times New Roman", label: "Elegant" },
  { name: "Comic Sans MS", label: "Playful" },
  { name: "Impact", label: "Bold" },
  { name: "Montserrat", label: "Sleek" },
  { name: "Lobster", label: "Creative" },
  { name: "Roboto Mono", label: "Techy" },
  { name: "Pacifico", label: "Stylish" },
  { name: "Space Grotesk", label: "Futuristic" },
];
const Customize = () => {
  const { currency, addToCart } = useContext(ShopContext);
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSide, setSelectedSide] = useState("front");
  const [size, setSize] = useState("M");
  const canvasRef = useRef(null);

  const [designs, setDesigns] = useState({
    front: {
      text: "",
      textColor: "#000000",
      fontSize: 24,
      fontFamily: "Poppins",
      textPosition: { x: 50, y: 50 },
      image: null,
      imagePosition: { x: 50, y: 70 },
      imageSize: 50,
    },
    back: {
      text: "",
      textColor: "#000000",
      fontSize: 24,
      fontFamily: "Poppins",
      textPosition: { x: 50, y: 50 },
      image: null,
      imagePosition: { x: 50, y: 70 },
      imageSize: 50,
    },
  });

  const [dragTarget, setDragTarget] = useState(null);
  const currentDesign = designs[selectedSide];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw text
    if (currentDesign.text) {
      ctx.font = `${currentDesign.fontSize}px ${currentDesign.fontFamily}`;
      ctx.fillStyle = currentDesign.textColor;
      ctx.textAlign = "center";
      const x = (currentDesign.textPosition.x / 100) * canvas.width;
      const y = (currentDesign.textPosition.y / 100) * canvas.height;
      ctx.fillText(currentDesign.text, x, y);
    }

    // Draw image
    if (currentDesign.image) {
      const img = new Image();
      img.src = currentDesign.image;
      img.onload = () => {
        const x = (currentDesign.imagePosition.x / 100) * canvas.width;
        const y = (currentDesign.imagePosition.y / 100) * canvas.height;
        const size = currentDesign.imageSize;
        ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
      };
    }
  }, [designs, selectedSide]);

  const handleCanvasMouseDown = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const dxText = Math.abs(currentDesign.textPosition.x - x);
    const dyText = Math.abs(currentDesign.textPosition.y - y);
    if (currentDesign.text && dxText < 10 && dyText < 10) {
      return setDragTarget("text");
    }

    const dxImage = Math.abs(currentDesign.imagePosition.x - x);
    const dyImage = Math.abs(currentDesign.imagePosition.y - y);
    if (currentDesign.image && dxImage < 10 && dyImage < 10) {
      return setDragTarget("image");
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (!dragTarget) return;
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setDesigns((prev) => ({
      ...prev,
      [selectedSide]: {
        ...prev[selectedSide],
        ...(dragTarget === "text"
          ? { textPosition: { x, y } }
          : { imagePosition: { x, y } }),
      },
    }));
  };

  const handleMouseUp = () => setDragTarget(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setDesigns((prev) => ({
        ...prev,
        [selectedSide]: {
          ...prev[selectedSide],
          image: e.target.result,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddToCart = () => {
    if (!size) {
      alert("Please select a size");
      return;
    }

    const customData = {
      color: selectedColor,
      designs,
    };

    addToCart("custom-shirt", size, customData);
  };

  return (
    <div className="px-4 py-8 bg-gradient-to-br from-white via-purple-50 to-purple-200 rounded-xl">
      <Title text1="Design Your" text2=" Custom T-Shirt" />

      <div className="flex flex-wrap justify-center gap-4 my-6">
        {["white", "black"].map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 ${
              selectedColor === color
                ? "bg-purple-600 text-white shadow-lg scale-105"
                : "bg-white text-purple-600 hover:bg-purple-50"
            }`}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)} Shirt
          </button>
        ))}
        {["front", "back"].map((side) => (
          <button
            key={side}
            onClick={() => setSelectedSide(side)}
            className={`py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 ${
              selectedSide === side
                ? "bg-purple-600 text-white shadow-lg scale-105"
                : "bg-white text-purple-600 hover:bg-purple-50"
            }`}
          >
            {side.charAt(0).toUpperCase() + side.slice(1)}
          </button>
        ))}
      </div>

      <div className="relative w-fit mx-auto mb-6">
        <canvas
          ref={canvasRef}
          width={300}
          height={400}
          className="bg-transparent border rounded-lg cursor-move"
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        <img
          src={assets[`${selectedColor}-shirt${selectedSide === "back" ? "-back" : ""}`]}
          alt="T-Shirt"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[400px] opacity-60 pointer-events-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
            <input
              type="text"
              placeholder="Enter text"
              value={currentDesign.text}
              onChange={(e) =>
                setDesigns((prev) => ({
                  ...prev,
                  [selectedSide]: {
                    ...prev[selectedSide],
                    text: e.target.value,
                  },
                }))
              }
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">✔️Text Color</label>
            <input
              type="color"
              value={currentDesign.textColor}
              onChange={(e) =>
                setDesigns((prev) => ({
                  ...prev,
                  [selectedSide]: {
                    ...prev[selectedSide],
                    textColor: e.target.value,
                  },
                }))
              }
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Style</label>
            <select
              value={currentDesign.fontFamily}
              onChange={(e) =>
                setDesigns((prev) => ({
                  ...prev,
                  [selectedSide]: {
                    ...prev[selectedSide],
                    fontFamily: e.target.value,
                  },
                }))
              }
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {fontOptions.map((font) => (
                <option key={font.name} value={font.name}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
            <input
              type="range"
              min="12"
              max="48"
              value={currentDesign.fontSize}
              onChange={(e) =>
                setDesigns((prev) => ({
                  ...prev,
                  [selectedSide]: {
                    ...prev[selectedSide],
                    fontSize: parseInt(e.target.value),
                  },
                }))
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image Size</label>
            <input
              type="range"
              min="30"
              max="150"
              value={currentDesign.imageSize}
              onChange={(e) =>
                setDesigns((prev) => ({
                  ...prev,
                  [selectedSide]: {
                    ...prev[selectedSide],
                    imageSize: parseInt(e.target.value),
                  },
                }))
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quick Stickers</label>
            <div className="flex gap-2">
              {stickerOptions.map((sticker, i) => (
                <img
                  key={i}
                  src={sticker}
                  alt="sticker"
                  onClick={() =>
                    setDesigns((prev) => ({
                      ...prev,
                      [selectedSide]: {
                        ...prev[selectedSide],
                        image: sticker,
                      },
                    }))
                  }
                  className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-2xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4">
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="border px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <option value="">Select Size</option>
            {["S", "M", "L", "XL"].map((sz) => (
              <option key={sz} value={sz}>
                {sz}
              </option>
            ))}
          </select>
          <p className="text-xl font-semibold text-purple-700">{currency} 1499</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto bg-purple-700 hover:bg-purple-600 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!size}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customize;