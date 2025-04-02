import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navebar from "../component/Navebar";

const Updatebook = () => {

  const { id } = useParams();
  const [book, setBook] = useState({
    bookName: "",
    author: "",
    genre: "",
    publishedDate: "",
    description: "",
    imageUrl: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/book/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:3000/updatebook/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error("Failed to update book");
      }

      const updatedBook = await response.json();
      console.log(updatedBook);

      navigate('/view-book');

    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <>
      <Navebar />
      <div
        className="h-screen flex items-center justify-center bg-cover bg-center p-8"
        style={{ backgroundImage: "url('/Images/bg.jpg')" }}
      >
        <div className="max-w-2xl w-full mx-auto p-8 bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Update Book
          </h1>
  
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Side Inputs */}
              <div>
                <label htmlFor="bookName" className="block text-sm font-semibold text-gray-800">
                  Book Name
                </label>
                <input
                  type="text"
                  id="bookName"
                  name="bookName"
                  value={book.bookName}
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
                />
              </div>
  
              <div>
                <label htmlFor="author" className="block text-sm font-semibold text-gray-800">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
                />
              </div>
  
              <div>
                <label htmlFor="genre" className="block text-sm font-semibold text-gray-800">
                  Genre
                </label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  value={book.genre}
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
                />
              </div>
  
              <div>
                <label htmlFor="publishedDate" className="block text-sm font-semibold text-gray-800">
                  Published Date
                </label>
                <input
                  type="date"
                  id="publishedDate"
                  name="publishedDate"
                  value={book.publishedDate}
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
                />
              </div>
            </div>
  
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-800">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={book.description}
                onChange={handleChange}
                rows="4"
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
              ></textarea>
            </div>
  
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
  
};

export default Updatebook;
