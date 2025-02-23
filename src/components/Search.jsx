import { useState } from "react";

export default function Search() {
  const [data, setData] = useState(""); // State to store the search query
  const [results, setResults] = useState([]); // Store search results
  const [loading, setLoading] = useState(false); // To handle loading state

  // Function to call the API and get search results
  const searchResult = async () => {
    if (data.trim()) {
      setLoading(true); // Set loading state to true while fetching
      try {
        const response = await fetch("bookbackend.railway.internal/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Correct content type
          },
          body: JSON.stringify({
            userInput: `%${data}%`, // Using the data in the search query
          }),
        });

        const jsonResponse = await response.json();
        console.log(jsonResponse);

        if (Array.isArray(jsonResponse)) {
          setResults(jsonResponse.data); // Set the results from the API
        } else {
          setResults([]); // If response is not an array, set empty results
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setResults([]); // In case of error, clear the results
      } finally {
        setLoading(false); // Set loading state to false when done
      }
    }
  };

  const handleChange = (e) => {
    setData(e.target.value); // Update 'data' with the input value
  };

  const handleSearchClick = () => {
    searchResult(); // Call the searchResult function when the button is clicked
  };

  return (
    <>
      <input
        type="text"
        onChange={handleChange}
        value={data}
        placeholder="Search..."
      />
      <button onClick={handleSearchClick} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {/* Display search results */}
      {results.length === 0 && !loading && data.trim() !== "" ? (
        <p>No results found</p> // Display message if no results
      ) : (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              {/* Adjust the field name here based on your API response */}
              {result.name || "No name available"}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
