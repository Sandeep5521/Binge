# BingeQL Documentation

BingeQL is a GraphQL API built using Node.js, Express, and MongoDB. It provides a robust backend for managing movies, shows, tags, and users. This API is used by **Binge**, a React web app deployed on Vercel. This document provides an overview of the API schema, queries, mutations, and sample usage.

## Table of Contents
- [Schema Overview](#schema-overview)
- [Queries](#queries)
  - [Movies Query](#movies-query)
  - [Movie Query](#movie-query)
  - [Shows Query](#shows-query)
  - [Show Query](#show-query)
  - [Tags Query](#tags-query)
  - [Tag Query](#tag-query)
- [Mutations](#mutations)
  - [CreateMovie](#createmovie)
  - [CreateShow](#createshow)
  - [UpdateMovieThumbnail](#updatemoviethumbnail)
  - [UpdateEpisode](#updateepisode)
  - [DeleteMovie](#deletemovie)
  - [UpdateMovieShots](#updatemovieshots)
- [Authentication](#authentication)
- [Sample Queries and Mutations](#sample-queries-and-mutations)

## Schema Overview

### Types
#### Links
```graphql
type Links {
  quality: String
  link: String
}
```
#### Downloads
```graphql
type Downloads {
  english: [Links]
  hindi: [Links]
  subbed: [Links]
}
```
#### Movie
```graphql
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
```
#### Show
```graphql
type Show {
  showName: String!
  seasonNum: String!
  showDescription: String!
  showThumbnail: String!
  showCreators: [String!]
  showTags: [String!]
  showShots: [String!]
  showReview: String
  showEpisodes: [Episode!]!
}
```
#### Episode
```graphql
type Episode {
  downloads: Downloads
  episodeId: String!
  episodeName: String
  episodeNum: String
}
```
#### Tag
```graphql
type Tag {
  tagName: String!
  tagDescription: String!
  tagMovies: Int
  tagShows: Int
}
```
#### User
```graphql
type User {
  userName: String!
  userEmail: String!
  password: String!
}
```

## Queries

### Movies Query
Fetch movies based on filters like release year, tag, name, page, and limit.
```graphql
query GetMovies($year: Int, $tag: String, $page: Int, $limit: Int, $name: String) {
  Movies(year: $year, tag: $tag, page: $page, limit: $limit, name: $name) {
    _id
    movieName
    movieDescription
    releaseYear
    movieTags
  }
}
```

### Movie Query
Fetch a specific movie by ID, name, or tag.
```graphql
query GetMovie($id: ID, $name: String, $tag: String) {
  Movie(id: $id, name: $name, tag: $tag) {
    _id
    movieName
    movieDescription
    movieThumbnail
  }
}
```

### Shows Query
Fetch shows with optional pagination and filtering by tag.
```graphql
query GetShows($tag: String, $page: Int, $limit: Int) {
  Shows(tag: $tag, page: $page, limit: $limit) {
    showName
    seasonNum
    showDescription
  }
}
```

### Show Query
Fetch a specific show by ID or name.
```graphql
query GetShow($id: ID, $name: String) {
  Show(id: $id, name: $name) {
    showName
    showDescription
    showEpisodes {
      episodeName
    }
  }
}
```

### Tags Query
Fetch all available tags.
```graphql
query GetTags {
  Tags {
    tagName
    tagDescription
  }
}
```

### Tag Query
Fetch details for a specific tag.
```graphql
query GetTag($tag: String) {
  Tag(tag: $tag) {
    tagName
    tagDescription
  }
}
```

## Mutations

### CreateMovie
Add a new movie to the database.
```graphql
mutation CreateNewMovie($movie: IMovie) {
  CreateMovie(movie: $movie) {
    movieName
    releaseYear
  }
}
```

### CreateShow
Add a new show to the database.
```graphql
mutation CreateNewShow($show: IShow) {
  CreateShow(show: $show) {
    showName
    seasonNum
  }
}
```

### UpdateMovieThumbnail
Update the thumbnail of a specific movie.
```graphql
mutation UpdateThumbnail($movieId: ID, $thumbnail: String) {
  UpdateMovieThumbnail(movieId: $movieId, thumbnail: $thumbnail) {
    movieThumbnail
  }
}
```

### UpdateEpisode
Add or update an episode for a show.
```graphql
mutation UpdateShowEpisode($showId: ID, $episode: IEpisode) {
  UpdateEpisode(showId: $showId, episode: $episode) {
    episodeName
  }
}
```

### DeleteMovie
Delete a movie by its ID.
```graphql
mutation RemoveMovie($id: ID) {
  DeleteMovie(id: $id) {
    movieName
  }
}
```

### UpdateMovieShots
Update screenshots for a movie.
```graphql
mutation UpdateShots($movieId: ID, $screenShots: String) {
  UpdateMovieShots(movieId: $movieId, screenShots: $screenShots) {
    movieShots
  }
}
```

## Authentication
A valid token is required for most mutations. The token can be retrieved using the `Token` query and should be passed as a Bearer token in the `Authorization` header.

## Sample Queries and Mutations
### Fetch Movies by Tag
```graphql
query {
  Movies(tag: "Action", limit: 5, page: 1) {
    movieName
    releaseYear
  }
}
```

### Add a New Movie
```graphql
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
```

### Delete a Movie
```graphql
mutation {
  DeleteMovie(id: "63f12d8d8f1f2a0012345678") {
    movieName
  }
}
```

For more details, explore the schema and experiment with queries and mutations using tools like GraphQL Playground or Postman.
