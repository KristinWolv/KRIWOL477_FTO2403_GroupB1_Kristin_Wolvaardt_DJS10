import { useState, useEffect } from "react";
import blogPostsImage from "./assets/images/blog-posts.png";
import errorMessageImage from "./assets/images/error-message.png";

// Function to fetch posts from the API
const fetchPosts = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      // If the response status is not "ok", throw an error with the status
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // Return the parsed JSON data
  } catch (error) {
    // Throw an error to be caught by the calling function
    throw new Error(error.message);
  }
};

// Main component of the app
export default function App() {
  const [data, setData] = useState([]); // State to store fetched data
  const [error, setError] = useState(null); // State to store any error messages
  const [loading, setLoading] = useState(true); // State to manage the loading state

  useEffect(() => {
    // Function to load data from the API and handle state updates
    const loadData = async () => {
      try {
        const result = await fetchPosts(); // Fetch data from the API
        setData(result); // Update state with the fetched data
      } catch (error) {
        setError("Failed to fetch data. Please try again later."); // Update state with an error message
      } finally {
        setLoading(false); // Set loading state to false after the fetch attempt
      }
    };

    loadData(); // Trigger data loading when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  // Render loading message if data is being fetched
  if (loading) {
    return <div className="loading-div">Loading...</div>;
  }

  // Render error message if there was an issue fetching data
  if (error) {
    return (
      <div className="error-div">
        <img src={errorMessageImage} alt="Error Message" />
        <p>An error has occurred: {error}</p>
      </div>
    );
  }

  // Render fetched data as a list of posts
  return (
    <div>
      <h1>Posts</h1>
      <img src={blogPostsImage} alt="Blog Posts" />
      <ol>
        {data.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>  
            <p>{post.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}