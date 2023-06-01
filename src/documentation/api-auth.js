const authPath = {
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "User registration",
        parameters: [],

        requestBody: {
          description: "Registration's object",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegistrationRequest",
              },
            },
          },
        },
        responses: {
          201: {
            description: "User's registration passed successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RegistrationResponse",
                },
              },
            },
          },
          400: {
            description: "Bad request ",
          },
          409: {
            description: "Email already exist",
          },
          500: { description: "Server error" },
        },
      },
    },
    "api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "User login",
        parameters: [],
        requestBody: {
          description: "Login object",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "User is logged in",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginResponse",
                },
              },
            },
          },
          400: {
            description: "Bad request ",
          },
          401: {
            description: "Unauthorized",
          },
          500: { description: "Server error" },
        },
      },
    },
    "api/auth/current": {
      get: {
        tags: ["Auth"],
        summary: "Get current user info",
        parameters: [],
        security: [{ Bearer: [] }],
        responses: {
          200: {
            description: "User is logged in",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CurrentResponse",
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
          },
          500: { description: "Server error" },
        },
      },
    },
    "api/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Logout user",
        parameters: [],
        security: [{ Bearer: [] }],
        responses: {
          200: {
            description: "User is logged out",
          },

          401: { description: "Unauthorized" },

          500: { description: "Server error" },
        },
      },
    },
    // "api/auth/avatars": {
    //   patch: {
    //     tags: ["Auth"],
    //     summary: "Update of user's avatar",
    //     parameters: [],
    //     security: [{ Bearer: [] }],
    //     requestBody: {
    //       description: "Login object",
    //       required: true,
    //       content: {
    //         "application/json": {
    //           schema: {
    //             $ref: "#/components/schemas/UpdateAvatarRequest",
    //           },
    //         },
    //       },
    //     },
    //     responses: {
    //       200: {
    //         description: "User is logged in",
    //         content: {
    //           "application/json": {
    //             schema: {
    //               $ref: "#/components/schemas/UpdateAvatarRequest",
    //             },
    //           },
    //         },
    //       },
    //       401: { description: "Unauthorized" },

    //       500: { description: "Server error" },
    //     },
    //   },
    // },
  },
};
module.exports = authPath;
