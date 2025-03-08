import React from "react";

const Docs = () => {
  document.title = 'BingeQL Documentation';

  return (
    <div className="min-h-screen dark:bg-black dark:text-white bg-white text-gray-900">
      {/* Header */}
      <header className="p-6 border-b dark:border-gray-700 border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">BingeQL Documentation</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Table of Contents */}
        <aside className="md:col-span-1">
          <nav className="sticky top-6 p-4 rounded-lg dark:bg-gray-800 bg-gray-100">
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
            <div className="p-4 rounded-lg dark:bg-gray-800 bg-gray-100">
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
              <div>
                <h3 className="text-xl font-semibold mb-2">Movies Query</h3>
                <p className="mb-2">Fetch movies based on filters like release year, tag, name, page, and limit.</p>
                <div className="p-4 rounded-lg dark:bg-gray-800 bg-gray-100">
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
              </div>
            </div>
          </section>

          {/* Mutations */}
          <section id="mutations" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Mutations</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">CreateMovie</h3>
                <p className="mb-2">Add a new movie to the database.</p>
                <div className="p-4 rounded-lg dark:bg-gray-800 bg-gray-100">
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
              </div>
            </div>
          </section>

          {/* Authentication */}
          <section id="authentication" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Authentication</h2>
            <p>A valid token is required for most mutations. The token can be retrieved using the Token query and should be passed as a Bearer token in the Authorization header.</p>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Docs;
