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
      //   UpdateAvatarRequest: {
      //     type: "object",
      //     required: ["email", "password"],
      //     properties: {
      //       avatarUrl: {
      //         type: "string",
      //         description: "User's email",
      //         format: "email",
      //       },
      //       password: {
      //         type: "string",
      //         description: "User's password",
      //         example: "qwerty123",
      //       },
      //     },
      //   },
      //   UpdateAvatarResponse: {
      //     type: "array",
      //     items: {
      //       type: "object",
      //       properties: {
      //         token: {
      //           type: "string",
      //           description: "Bearer token",
      //           example: "string",
      //         },
      //         user: {
      //           name: {
      //             type: "string",
      //             description: "User's name",
      //             example: "testUser",
      //           },

      //           email: {
      //             type: "string",
      //             description: "User's email",
      //             format: "email",
      //           },
      //           userId: {
      //             type: "string",
      //             description: "User's id",
      //             example: "32143232436545474",
      //           },
      //         },
      //       },
      //     },
      //     example: [
      //       {
      //         token: "string",
      //         user: {
      //           name: "testUser",
      //           email: "user@example.com",
      //           userId: "32143232436545474",
      //         },
      //       },
      //     ],
      //   },
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
