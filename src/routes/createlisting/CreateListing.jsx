import "./createlisting.scss";
import { useState } from "react";
import subcategoryFields from "./categorydata";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CREATE_PRODUCT_ROUTE } from "../../utils/constants";
import { apiClient } from "../../lib/api-client";
import { useAppStore } from "../../store";

const categories = {
  Electronics: ["Headphones", "Mobile", "Charger", "Laptop"],
  Bicycle: ["Mountain Bike", "Road Bike", "Hybrid Bike"],
  Books: ["Fiction", "Non-fiction", "Educational", "Comics"],
  Clothes: ["Shirt", "Pants", "Dress", "Jacket"],
  Furniture: ["Table", "Chair", "Sofa", "Bed"],
  Others: ["Miscellaneous"],
};

const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];
const CreateListing = () => {
  const { userInfo, setProductsTriggered } = useAppStore();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const handleImageUpload = (e) => {
    const newImages = Array.from(e.target.files);

    const validImages = newImages.filter((file) =>
      allowedImageTypes.includes(file.type)
    );

    if (images.length + validImages.length > 8) {
      alert("You can only upload a maximum of 8 images.");
      return;
    }
    const newImagesobject = validImages.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImagesobject]);
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleBackClick = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setStep(2);
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setStep(3);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      details: {
        ...prevFormData.details,
        [name]: value,
      },
    }));
  };

  const updatedFormData = {
    ...formData,
    category: selectedCategory,
    subcategory: selectedSubcategory,
    title: formData.details?.title,
    location: formData.details?.location,
    owner: userInfo.first_name + " " + userInfo.last_name,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length < 1) {
      alert("Please upload at least one image.");
      return;
    }
    const formDataToSend = new FormData();
    console.log(updatedFormData);

    Object.keys(updatedFormData).forEach((key) => {
      if (key === "details") {
        formDataToSend.append(key, JSON.stringify(updatedFormData[key]));
        return;
      }
      formDataToSend.append(key, updatedFormData[key]);
    });
    images.forEach((image) => {
      formDataToSend.append("images", image.file);
    });

    try {
      const data = await apiClient.post(CREATE_PRODUCT_ROUTE, formDataToSend, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data) {
        console.log(data);
        setFormData({});
        setProductsTriggered(true);
        navigate("/mylistings");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const data = await apiClient.post(CREATE_PRODUCT_ROUTE, updatedFormData, {
  //       withCredentials: true,
  //     });
  //     if (data) {
  //       console.log(data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   // console.log("Form Data Submitted:", formData);
  // };

  return (
    <div className="create-listing-main-container">
      <button className="back-btn" onClick={handleBackClick}>
        <ArrowLeft /> Back
      </button>
      <div className="main-listing-form">
        <div className="listing-form">
          {step === 1 && (
            <div>
              <h2>Select a Category</h2>
              {Object.keys(categories).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          )}

          {step === 2 && selectedCategory && (
            <div>
              <h2>
                Select a Subcategory for{" "}
                {selectedCategory.charAt(0).toUpperCase() +
                  selectedCategory.slice(1)}
              </h2>
              {categories[selectedCategory].map((subcategory) => (
                <button
                  key={subcategory}
                  onClick={() => handleSubcategorySelect(subcategory)}
                >
                  {subcategory}
                </button>
              ))}
              <button onClick={() => setStep(1)}>Back</button>
            </div>
          )}

          {step === 3 && selectedSubcategory && (
            <div>
              <h2>Enter Details for {selectedSubcategory}</h2>
              <form onSubmit={handleSubmit}>
                {subcategoryFields[selectedSubcategory].map((field, index) => (
                  <div key={index} className="form-group">
                    <label>{field.label}:</label>
                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select...</option>
                        {field.options.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        onChange={handleInputChange}
                        required
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        onChange={handleInputChange}
                        min={0}
                        required
                      />
                    )}
                  </div>
                ))}

                {/* Image Upload Section */}
                <div className="upload-container">
                  <input
                    type="file"
                    accept={allowedImageTypes.join(",")}
                    multiple
                    onChange={handleImageUpload}
                    id="image-upload"
                    className="upload-input"
                  />
                  <label htmlFor="image-upload" className="upload-label">
                    Upload Images
                  </label>
                  <h2>Click on uploaded Photos to delete</h2>

                  <div className="image-preview-container">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="image-preview"
                        onClick={() => handleImageRemove(index)}
                      >
                        <img src={image.preview} alt="Preview" />
                        <div className="delete-overlay">×</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit">Submit Listing</button>
                <button onClick={() => setStep(2)}>Back</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
