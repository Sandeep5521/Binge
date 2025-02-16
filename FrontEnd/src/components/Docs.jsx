import React, { useState } from "react";

const Docs = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-gray-900"}`}>
      {/* Header */}
      <header className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">BingeQL Documentation</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Table of Contents */}
        <aside className="md:col-span-1">
          <nav className={`sticky top-6 p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#schema-overview" className="hover:text-blue-500">Schema Overview</a></li>
              <li><a href="#queries" className="hover:text-blue-500">Queries</a></li>
              <li><a href="#mutations" className="hover:text-blue-500">Mutations</a></li>
              <li><a href="#authentication" className="hover:text-blue-500">Authentication</a></li>
              <li><a href="#samples" className="hover:text-blue-500">Sample Queries & Mutations</a></li>
            </ul>
          </nav>
        </aside>

        {/* Documentation Content */}
        <section className="md:col-span-3">
          {/* Schema Overview */}
          <section id="schema-overview" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Schema Overview</h2>
            <p className="mb-4">
              BingeQL is a GraphQL API built using Node.js, Express, and MongoDB. It provides a robust backend for managing movies, shows, tags, and users.
            </p>
            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
              <pre className="overflow-x-auto">
                <code className="text-sm">
                  {`
type Movie {
  _id: ID!
  movieName: String!
  movieDescription: String!
  movieThumbnail: String!
  releaseYear: Int!
  movieDirectors: [String!]
  movieTags: [String!]!
  movieShots: [String!]
  movieReview: String
  movieDownloads: Downloads
}
                  `}
                </code>
              </pre>
            </div>
          </section>

          {/* Queries */}
          <section id="queries" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Queries</h2>
            <div className="space-y-6">
              {/* Movies Query */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Movies Query</h3>
                <p className="mb-2">
                  Fetch movies based on filters like release year, tag, name, page, and limit.
                </p>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                  <pre className="overflow-x-auto">
                    <code className="text-sm">
                      {`
query GetMovies($year: Int, $tag: String, $page: Int, $limit: Int, $name: String) {
  Movies(year: $year, tag: $tag, page: $page, limit: $limit, name: $name) {
    _id
    movieName
    movieDescription
    releaseYear
    movieTags
  }
}
                      `}
                    </code>
                  </pre>
                </div>
                <p className="mt-2">
                  <strong>Example:</strong> Fetch the first 5 movies tagged as "Action".
                </p>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                  <pre className="overflow-x-auto">
                    <code className="text-sm">
                      {`
query {
  Movies(tag: "Action", limit: 5, page: 1) {
    _id
    movieName
    releaseYear
  }
}
                      `}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Movie Query */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Movie Query</h3>
                <p className="mb-2">
                  Fetch a specific movie by ID, name, or tag.
                </p>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                  <pre className="overflow-x-auto">
                    <code className="text-sm">
                      {`
query GetMovie($id: ID, $name: String, $tag: String) {
  Movie(id: $id, name: $name, tag: $tag) {
    _id
    movieName
    movieDescription
    movieThumbnail
  }
}
                      `}
                    </code>
                  </pre>
                </div>
                <p className="mt-2">
                  <strong>Example:</strong> Fetch a movie by its name.
                </p>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                  <pre className="overflow-x-auto">
                    <code className="text-sm">
                      {`
query {
  Movie(name: "Inception") {
    _id
    movieName
    movieDescription
  }
}
                      `}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Add other queries similarly */}
            </div>
          </section>

          {/* Mutations */}
          <section id="mutations" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Mutations</h2>
            <div className="space-y-6">
              {/* CreateMovie Mutation */}
              <div>
                <h3 className="text-xl font-semibold mb-2">CreateMovie</h3>
                <p className="mb-2">
                  Add a new movie to the database.
                </p>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                  <pre className="overflow-x-auto">
                    <code className="text-sm">
                      {`
mutation CreateNewMovie($movie: IMovie) {
  CreateMovie(movie: $movie) {
    movieName
    releaseYear
  }
}
                      `}
                    </code>
                  </pre>
                </div>
                <p className="mt-2">
                  <strong>Example:</strong> Add a new movie.
                </p>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                  <pre className="overflow-x-auto">
                    <code className="text-sm">
                      {`
mutation {
  CreateMovie(movie: {
    movieName: "Inception",
    releaseYear: 2010,
    movieDescription: "A mind-bending thriller.",
    movieTags: ["Sci-Fi", "Thriller"],
    movieThumbnail: "inception.jpg"
  }) {
    movieName
    releaseYear
  }
}
                      `}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Add other mutations similarly */}
            </div>
          </section>

          {/* Authentication */}
          <section id="authentication" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Authentication</h2>
            <p>
              A valid token is required for most mutations. The token can be retrieved using the Token query and should be passed as a Bearer token in the Authorization header.
            </p>
          </section>

          {/* Sample Queries and Mutations */}
          <section id="samples" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Sample Queries & Mutations</h2>
            <div className="space-y-6">
              {/* Fetch Movies by Tag */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Fetch Movies by Tag</h3>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                  <pre className="overflow-x-auto">
                    <code className="text-sm">
                      {`
query {
  Movies(tag: "Action", limit: 5, page: 1) {
    movieName
    releaseYear
  }
}
                      `}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Add a New Movie */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Add a New Movie</h3>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                  <pre className="overflow-x-auto">
                    <code className="text-sm">
                      {`
mutation {
  CreateMovie(movie: {
    movieName: "Inception",
    releaseYear: 2010,
    movieDescription: "A mind-bending thriller.",
    movieTags: ["Sci-Fi", "Thriller"],
    movieThumbnail: "inception.jpg"
  }) {
    movieName
    releaseYear
  }
}
                      `}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Delete a Movie */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Delete a Movie</h3>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                  <pre className="overflow-x-auto">
                    <code className="text-sm">
                      {`
mutation {
  DeleteMovie(id: "63f12d8d8f1f2a0012345678") {
    movieName
  }
}
                      `}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Docs;