import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState(null);

  useEffect(() => {
    getImages();
  }, []);

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post(
      "http://localhost:3000/upload-image",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const getImages = async () => {
    const result = await axios.get("http://localhost:3000/get-image");
    setAllImage(result.data.data);
    console.log(result);
  };

  return (
    <div>
      <form onSubmit={submitImage}>
        <input type="file" accept="image/*" onChange={onInputChange} />
        <button type="submit">Submit</button>
      </form>

      {allImage === null
        ? ""
        : allImage.map((data) => {
            return (
              <img
                src={`../src/assets/${data.image}`}
                height={200}
                width={200} key={data._id}
              />
            );
          })}
    </div>
  );
}

export default App;
