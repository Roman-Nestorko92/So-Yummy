const components = {
  components: {
    schemas: {
      RegistrationRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: {
            type: "string",
            description: "User's name",
            example: "testUser",
          },
          email: {
            type: "string",
            description: "User's email",
            format: "email",
          },
          password: {
            type: "string",
            description: "User's password",
            example: "qwerty123",
          },
        },
      },
      RegistrationResponse: {
        type: "array",
        items: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "Bearer token",
              example: "string",
            },
            user: {
              name: {
                type: "string",
                description: "User's name",
                example: "testUser",
              },

              email: {
                type: "string",
                description: "User's email",
                format: "email",
              },
              userId: {
                type: "string",
                description: "User's id",
                example: "32143232436545474",
              },
            },
          },
        },
        example: [
          {
            token: "string",
            user: {
              name: "testUser",
              email: "user@example.com",
              userId: "32143232436545474",
            },
          },
        ],
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            description: "User's email",
            format: "email",
          },
          password: {
            type: "string",
            description: "User's password",
            example: "qwerty123",
          },
        },
      },
      LoginResponse: {
        type: "array",
        items: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "Bearer token",
              example: "string",
            },
            user: {
              name: {
                type: "string",
                description: "User's name",
                example: "testUser",
              },

              email: {
                type: "string",
                description: "User's email",
                format: "email",
              },
              userId: {
                type: "string",
                description: "User's id",
                example: "32143232436545474",
              },
            },
          },
        },
        example: [
          {
            token: "string",
            user: {
              name: "testUser",
              email: "user@example.com",
              userId: "32143232436545474",
            },
          },
        ],
      },
      CurrentResponse: {
        type: "array",
        items: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "Bearer token",
              example: "string",
            },
            user: {
              name: {
                type: "string",
                description: "User's name",
                example: "testUser",
              },

              email: {
                type: "string",
                description: "User's email",
                format: "email",
              },
              userId: {
                type: "string",
                description: "User's id",
                example: "32143232436545474",
              },
            },
          },
        },
        example: [
          {
            token: "string",
            user: {
              name: "testUser",
              email: "user@example.com",
              userId: "32143232436545474",
            },
          },
        ],
      },
      UpdateUserDataRequest: {
        type: "object",
        properties: {
          avatar: {
            type: "string",
            description: "uplodaded image ( png, jpg, jpeg )",
            format: "binary",
          },
          name: {
            type: "string",
            description: "Updated user's name",
            example: "testUserUPD",
          },
        },
      },
      UpdateUserDataResponse: {
        type: "array",
        items: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "Bearer token",
              example: "string",
            },
            user: {
              name: {
                type: "string",
                description: "User's name",
                example: "testUser",
              },

              email: {
                type: "string",
                description: "User's email",
                format: "email",
              },
              userId: {
                type: "string",
                description: "User's id",
                example: "32143232436545474",
              },
            },
          },
        },
        example: [
          {
            token: "string",
            user: {
              name: "testUser",
              email: "user@example.com",
              userId: "32143232436545474",
            },
          },
        ],
      },
      SubscribeRequest: {
        type: "object",
        required: ["email"],
        properties: {
          email: {
            type: "string",
            description: "User's email",
            format: "email",
          },
        },
      },
    },
    securitySchemes: {
      Bearer: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

module.exports = components;
