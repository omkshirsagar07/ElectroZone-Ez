import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateCategory } from "../services/admin";

function UpdateCategory({ id, currentTitle, currentImage, currentDescription, onUpdate }) {
    console.log(id, currentTitle, currentImage, currentDescription);
    const [title, setTitle] = useState(currentTitle || '');
    const [description, setDescription] = useState(currentDescription || '');
    const [image, setImage] = useState(null);

    useEffect(() => {
        setTitle(currentTitle);
    }, [currentTitle]);

    useEffect(() => {
        setDescription(currentDescription);
    }, [currentDescription]);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Get the selected file
    };

    const handleUpdateCategory = async () => {
        if (title.length === 0) {
            toast.warning("Category Title must be filled");
        } else if (description.length === 0) {
            toast.warning("Description must be filled");
        } else if (!image && !currentImage) {
            toast.warning("Image must be uploaded");
        } else {
            try {
                const result = await updateCategory(id, title, image, description);
                if (result.status === 200) {
                    toast.success("Category updated successfully");
                    onUpdate(); // Callback to refresh the category list after update
                }
            } catch (error) {
                toast.error("Failed to update category");
            }
        }
    };

    return (
        <div className="col-lg-12 mb-5 mb-lg-0">
            <div className="card">
                <div className="card-body py-5 px-md-5 bg-dark text-white justify-content-center">
                    <div style={{ textAlign: "center" }}>
                        <h3>Update Category</h3>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <div data-mdb-input-init className="form-outline">
                                <input
                                    type="text"
                                    id="form3Example1"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                            </div>
                        </div>
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <textarea
                            type="text"
                            id="form3Example3"
                            className="form-control"
                            placeholder="Enter description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input
                            type="file"
                            id="form3Example3"
                            className="form-control"
                            placeholder="Upload File"
                            onChange={handleFileChange}
                        />
                        {currentImage && (
                            <img
                                src={currentImage ? `data:image/svg+xml;base64,${currentImage}` : null}
                                alt="Current category"
                                style={{ width: "50px", height: "50px", marginTop: "10px" }}
                            />
                        )}
                    </div>
                    <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-success btn-block mb-4 align-items-center"
                        onClick={handleUpdateCategory}
                    >
                        Update Category
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateCategory;
