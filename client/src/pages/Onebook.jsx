import React, { useState, useEffect } from "react";
import Navebar from "../component/Navebar";
import { useParams, useNavigate, Link } from "react-router-dom";

const Onebook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: "", review: "" });
  const [updatedBook, setUpdatedBook] = useState({
    bookName: "",
    author: "",
    genre: "",
    publishedDate: "",
    description: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const bookResponse = await fetch(`http://127.0.0.1:3000/book/${id}`);
        if (!bookResponse.ok) {
          throw new Error("Failed to fetch book details");
        }
        const bookData = await bookResponse.json();
        setBook(bookData);
        setUpdatedBook(bookData);

        const reviewsResponse = await fetch(`http://127.0.0.1:3000/reviews/${id}`);
        if (!reviewsResponse.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchBookData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook({ ...updatedBook, [name]: value });
  };

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:3000/reviews/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const addedReview = await response.json();
      setReviews([...reviews, addedReview]);
      setNewReview({ rating: "", review: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const updateBook = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:3000/updatebook/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      });
  
      if (!response.ok) throw new Error("Failed to update book");
  
      const updatedData = await response.json();
  
      setBook(updatedData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/deletebook/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      navigate("/view-book");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <>
      <Navebar />
      <div className="max-w-6xl mx-auto p-6">
        {book ? (
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="flex md:flex-row gap-10">
              {/* Book Details */}
              <div className="bg-gray-100 p-6 rounded-xl flex-1 shadow-md">
                <img
                  src={`http://127.0.0.1:3000${book.imageUrl}`}
                  alt={book.bookName}
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
                <h1 className="text-3xl font-semibold text-gray-800 mt-4">{book.bookName}</h1>
                <p className="text-gray-600">Author: <span className="font-medium">{book.author}</span></p>
                <p className="text-gray-600">Genre: <span className="font-medium">{book.genre}</span></p>
                <p className="text-gray-600">Published: <span className="font-medium">{book.publishedDate}</span></p>
                <p className="mt-4 text-gray-700">{book.description}</p>

                <div className="mt-6 flex space-x-4 justify-between">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className=" text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={handleDelete}
                    className=" text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                  >
                    🗑️ 
                  </button>
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-xl flex-1 shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Add Your Review</h2>
                <form onSubmit={submitReview}>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Rating:</label>
                    <div className="flex space-x-2 mt-2">
                      {["1", "2", "3", "4", "5"].map((star) => (
                        <label key={star} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="rating"
                            value={star}
                            checked={newReview.rating === star}
                            onChange={handleInputChange}
                            className="hidden"
                            required
                          />
                          <span className={`text-2xl ${newReview.rating === star ? "text-yellow-500" : "text-gray-400"} hover:text-yellow-500 transition`}>
                            ⭐
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Review:</label>
                    <textarea
                      name="review"
                      value={newReview.review}
                      onChange={handleInputChange}
                      placeholder="Write your review here..."
                      className="w-full p-3 border h-80 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 float-end rounded-lg shadow-md hover:bg-green-600 transition"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Reviews</h2>
          {reviews.length > 0 ? (
            <div className="grid gap-4">
              {reviews.map((review, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                  <p className="text-yellow-500 text-lg">⭐ {review.rating}</p>
                  <p className="text-gray-800 mt-2">{review.review}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>
            <form onSubmit={updateBook} className="space-y-4">
              <input
                type="text"
                name="bookName"
                value={updatedBook.bookName}
                onChange={handleBookChange}
                placeholder="Book Name"
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="text"
                name="author"
                value={updatedBook.author}
                onChange={handleBookChange}
                placeholder="Author"
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="text"
                name="genre"
                value={updatedBook.genre}
                onChange={handleBookChange}
                placeholder="Genre"
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="date"
                name="publishedDate"
                value={updatedBook.publishedDate}
                onChange={handleBookChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
              <textarea
                name="description"
                value={updatedBook.description}
                onChange={handleBookChange}
                placeholder="Description"
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
        )}
    </>
  );
};

export default Onebook;
