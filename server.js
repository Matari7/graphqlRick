const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Definir el esquema GraphQL
const typeDefs = gql`
  type Character {
    id: ID!
    name: String!
    status: String!
    species: String!
    type: String
    gender: String!
    origin: Origin!
    location: Location!
    image: String!
    created: String!
  }

  type Origin {
    name: String!
    url: String!
  }

  type Location {
    name: String!
    url: String!
  }

  type Query {
    characters: [Character]
    character(id: ID!): Character
  }
`;

// Resolvers para las consultas GraphQL
const resolvers = {
  Query: {
    characters: async () => {
      // Aquí realizarías una llamada a la API de Rick and Morty para obtener los personajes
      // Por ahora, simularemos algunos datos de ejemplo
      return [
        { id: '1', name: 'Rick Sanchez', status: 'Alive', species: 'Human', gender: 'Male' },
        { id: '2', name: 'Morty Smith', status: 'Alive', species: 'Human', gender: 'Male' }
      ];
    },
    character: async (_, { id }) => {
      // Aquí también realizarías una llamada a la API de Rick and Morty para obtener un personaje específico
      // Por ahora, simularemos datos de ejemplo
      return { id, name: 'Rick Sanchez', status: 'Alive', species: 'Human', gender: 'Male' };
    }
  }
};

async function startApolloServer() {
  // Inicializar Apollo Server con el esquema y resolvers
  const server = new ApolloServer({ typeDefs, resolvers });

  // Iniciar el servidor Apollo
  await server.start();

  // Configurar Express para usar Apollo Server
  const app = express();
  server.applyMiddleware({ app });

  // Puerto en el que escuchará el servidor
  const PORT = process.env.PORT || 4000;

  // Iniciar el servidor Express
  app.listen(PORT, () => {
    console.log(`Servidor GraphQL listo en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Llamar a la función para iniciar el servidor
startApolloServer();
