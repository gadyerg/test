import { useState, useEffect } from "react";

function Image() {
  const [image, setImage] = useState();

  useEffect(() => {
    function getImage() {
      fetch("http://localhost:5000/image")
        .then((data) => data.json())
        .then((data) => setImage(data.link));
    }
    getImage();
  }, []);

  async function deleteImage() {
    await fetch("http://localhost:5000/image", { method: "DELETE" });

    setImage();
  }

  async function onImageUpdate(evt) {
    let formData = new FormData();
    formData.append("stock", evt.target.files[0]);
    fetch("http://localhost:5000/image", { method: "POST", body: formData });

    const selectedImage = URL.createObjectURL(evt.target.files[0]);
    setImage(selectedImage);
  }

  return (
    <div className="flex-col m-auto w-1/3 mt-36 rounded">
      <img
        src={image}
        className="min-h-full min-w-full rounded-t-md drop-shadow-md"
      />
      <div className="flex-row w-full">
        <input
          id="image-select"
          type="file"
          onChange={onImageUpdate}
          accept="image/jpeg, image/png"
          hidden={true}
        />
        <button
          type="button"
          className="bg-blue-500 text-white w-1/2 h-10 text-lg rounded-bl-md"
        >
          <label htmlFor="image-select" className="w-full text-lg block hover:cursor-pointer">Change</label>
        </button>
        <button
          className="bg-green-500 rounded-sm text-white w-1/2 h-10 text-lg rounded-br-md"
          onClick={deleteImage}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Image;
