import { useEffect, useState } from "react";
import { fetchCategories, deleteCategory } from "../services/admin"; // Assuming these functions are implemented
import UpdateCategory from "./Update-Category";
import Update from '../images/pencil-square.svg'
import Delete from '../images/trash3-fill.svg'

function AdminCategoryList() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            const response = await fetchCategories();
            console.log(response);
            setCategories(response.data); // Fetch the list of categories from the backend
        };
        getCategories();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            await deleteCategory(id); // Delete the category using its ID
            setCategories(categories.filter((category) => category.id !== id)); // Update the state to remove the deleted category
        }
    };

    const handleUpdate = (category) => {
        setSelectedCategory(category); // Set the selected category for update
    };

    const handleUpdateComplete = () => {
        setSelectedCategory(null); // Clear the selected category after update
        fetchCategories().then(response => setCategories(response.data)); // Refresh the category list
    };

    return (
        <div>
            <div className="container col-lg-12">
                <table className="table table-responsive table-striped bg-dark text-white text-center">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.id}>
                                <td>{index + 1}</td>
                                <td>{category.title}</td>
                                <td>
                                    <img src={category.image ? `data:image/svg+xml;base64,${category.image}` : null} alt={category.title} style={{ width: "50px", height: "50px" }} />
                                </td>
                                <td>{category.description}</td>
                                <td>
                                    <button className="btn btn-warning me-2" onClick={() => handleUpdate(category)}>
                                    <img src={Update} height="25" alt="Update" />
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(category.id)}>
                                    <img src={Delete} height="25" alt="Delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedCategory && (
                <UpdateCategory
                    id={selectedCategory.id}
                    currentTitle={selectedCategory.title}
                    currentImage={selectedCategory.image}
                    currentDescription={selectedCategory.description}
                    onUpdate={handleUpdateComplete}
                />
            )}
        </div>
    );
}

export default AdminCategoryList;
