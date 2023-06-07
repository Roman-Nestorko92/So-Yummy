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
            description: "User with such Email already exist",
          },
          500: { description: "Server error" },
        },
      },
    },
    "/api/auth/login": {
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
    "/api/auth/current": {
      get: {
        tags: ["Auth"],
        summary: "Get current user info",
        parameters: [],
        security: [{ Bearer: [] }],
        responses: {
          200: {
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
    "/api/auth/logout": {
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
    "/api/auth/edit": {
      patch: {
        tags: ["Auth"],
        summary: "Update of user's data",
        parameters: [],
        security: [{ Bearer: [] }],
        requestBody: {
          description: "Object with image and name",
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/UpdateUserDataRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Data updated",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdateUserDataResponse",
                },
              },
            },
          },
          401: { description: "Unauthorized" },

          500: { description: "Server error" },
        },
      },
    },
    "/api/subscribe": {
      post: {
        tags: ["Subscribe"],
        summary: "Subscribtion user on a newsletter",
        parameters: [],
        security: [{ Bearer: [] }],
        requestBody: {
          description: "susbcription of user",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SubscribeRequest",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Email send",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SubscribeResponse",
                },
              },
            },
          },
          401: { description: "Unauthorized" },
          404: {
            description: "Only registrated users can subscribe ",
          },
          409: {
            description: "User is subscribed already",
          },
          500: { description: "Server error" },
        },
      },
    },
    "/api/subscribe/{id}": {
      get: {
        tags: ["Subscribe"],
        summary: "Unubscribtion user on a newsletter",
        parameters: [
          { in: "path", name: "id", required: "true", type: "string" },
        ],
        responses: {
          204: {
            description: "Unsubscribed",
          },
          404: {
            description: "This user is not subsribed",
          },
          500: { description: "Server error" },
        },
      },
    },
    "/api/recipes/category-list": {
      get: {
        tags: ["Category List"],
        summary: "List of available categories",
        parameters: [],
        security: [{ Bearer: [] }],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CategoryListResponse",
                },
              },
            },
          },
          401: { description: "Unauthorized" },

          500: { description: "Server error" },
        },
      },
    },
    "/api/ingredients/list": {
      get: {
        tags: ["Ingredient List"],
        summary: "List of available ingredients",
        parameters: [],
        security: [{ Bearer: [] }],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/IngredientListResponse",
                },
              },
            },
          },
          400: { description: "Bad request" },
          401: { description: "Unauthorized" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/ownRecipes": {
      get: {
        tags: ["Own Recipes"],
        summary: "Creating user's own recipe",
        parameters: [
          {
            name: "page",
            in: "query",
            description: "Page number (default 1)",
            schema: {
              type: "integer",
              minimum: 1,
              default: 1,
            },
          },
          {
            name: "limit",
            in: "query",
            description: "Item per page(default 4)",
            schema: {
              type: "integer",
              minimum: 1,
              default: 4,
            },
          },
        ],
        security: [{ Bearer: [] }],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GetOwnRecipeResponse",
                },
              },
            },
          },
          400: { description: "Bad request / Invalid page or limit value" },
          401: { description: "Unauthorized" },
          500: { description: "Server error" },
        },
      },
      post: {
        tags: ["Own Recipes"],
        summary: "Creating user's own recipe",
        parameters: [
          // {
          //   name: "ingredients",
          //   in: "formData",
          //   description: "My array data",
          //   required: true,
          //   type: "array",
          //   items: {
          //     type: "object",
          //     properties: {
          //       id: {
          //         type: "string",
          //         description: "id of ingredient",
          //         example: "640c2dd963a319ea671e372c",
          //       },
          //       measure: {
          //         type: "string",
          //         description: "amount and measure type",
          //         example: "1 spn",
          //       },
          //     },
          //   },
          // },
        ],
        security: [{ Bearer: [] }],
        requestBody: {
          description: "Object with info regarding recipe",
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/AddOwnRecipeRequest",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AddOwnRecipeResponse",
                },
              },
            },
          },
          400: { description: "Bad request / Unsupported file format" },
          401: { description: "Unauthorized" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/ownRecipes/{ownRecipeId}": {
      get: {
        tags: ["Own Recipes"],

        summary: "Get own recipe by ID",
        parameters: [
          {
            name: "ownRecipeId",
            in: "path",
            description: "Own recipe ID",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        security: [{ Bearer: [] }],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GetOwnRecipeByIDResponse",
                },
              },
            },
          },
          400: { description: "Bad request / Invalid page or limit value" },
          404: {
            description: "Recipe with id is missing",
          },
          401: { description: "Unauthorized" },
          500: { description: "Server error" },
        },
      },
      delete: {
        tags: ["Own Recipes"],
        summary: "Delete own recipe by ID",
        parameters: [
          {
            name: "ownRecipeId",
            in: "path",
            description: "Own recipe ID",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        security: [{ Bearer: [] }],
        responses: {
          204: {
            description: "Deleted",
          },
          400: { description: "Bad request" },
          401: { description: "Unauthorized" },
          404: {
            description: 'Recipe with id "647c86459fec93f88e9aaa28" is missing',
          },
          500: { description: "Server error" },
        },
      },
    },
    "/api/recipes/main-page": {
      get: {
        tags: ["Recipes"],
        summary: "Recipes for main page",
        parameters: [
          {
            name: "categoryLimit",
            in: "query",
            description: "Number of requested categories (default 4)",
            schema: {
              type: "integer",
              minimum: 1,
              default: 4,
            },
          },
          {
            name: "recipeLimit",
            in: "query",
            description: "Number of requested recipes per category (default 4)",
            schema: {
              type: "integer",
              minimum: 1,
              default: 4,
            },
          },
        ],
        security: [{ Bearer: [] }],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MainPageResponse",
                },
              },
            },
          },
          400: {
            description:
              "Bad request / Invalid categoryLimit or recipeLimit query parameter",
          },
          401: { description: "Unauthorized" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/recipes/category/{category}": {
      get: {
        tags: ["Recipes"],
        summary: "Get recipes by category",
        parameters: [
          {
            name: "recipeLimit",
            in: "query",
            description: "Limit of recipes you request by category (default 8)",
            schema: {
              type: "integer",
              minimum: 1,
              default: 8,
            },
          },
          {
            name: "category",
            in: "path",
            required: true,
            description: "Category that you request (ex. Beef)",
            schema: {
              type: "string",
            },
          },
        ],
        security: [{ Bearer: [] }],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MainPageResponse",
                },
              },
            },
          },
          400: {
            description: "Bad request / Invalid recipeLimit parameter / ",
          },
          404: {
            description: "Not found / Category is not valid",
          },
          401: { description: "Unauthorized" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/recipes/{id}": {
      get: {
        tags: ["Recipes"],
        summary: "Get single recipe by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of Recipe",
            schema: {
              type: "string",
              example: "640cd5ac2d9fecf12e8897fc",
            },
          },
        ],
        security: [{ Bearer: [] }],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RecibeByIdResponse",
                },
              },
            },
          },
          400: {
            description: "Bad request / Invalid recipeLimit parameter ",
          },
          404: {
            description:
              "Not found / ID is not valid /Recipe with such ID is not found",
          },
          401: { description: "Unauthorized" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/favorites": {
      get: {
        tags: ["Favorites"],
        summary: "List of favorite recipes",
        parameters: [
          {
            name: "page",
            in: "query",
            description: "Page, (default = 1)",
            schema: {
              type: "integer",
              minimum: 1,
              default: 1,
            },
          },
          {
            name: "limit",
            in: "query",
            description: "Per page(default 4)",
            schema: {
              type: "integer",
              minimum: 1,
              default: 4,
            },
          },
        ],
        security: [{ Bearer: [] }],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RecibeByIdResponse",
                },
              },
            },
          },
          400: {
            description: "Bad request / Invalid page or limit value ",
          },
          401: { description: "Unauthorized" },
          404: {
            description: "Not found",
          },

          500: { description: "Server error" },
        },
      },
    },
    "/api/favorites/{id}": {
      patch: {
        tags: ["Favorites"],
        summary: "Toggle favorite recipe",
        security: [{ Bearer: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of Recipe",
            schema: {
              type: "string",
              example: "640cd5ac2d9fecf12e8897f7",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ToggleFavoriteResponse",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
          401: { description: "Unauthorized" },
          404: {
            description:
              "Not found / ID is not valid /Recipe with such ID is not found",
          },

          500: { description: "Server error" },
        },
      },
    },
    "/api/search": {
      get: {
        tags: ["Search"],
        summary: "Search recipes by name/by ingredient name",
        parameters: [
          {
            name: "title",
            in: "query",
            description: "title of recipe to be searched",
            schema: {
              type: "string",
              example: "Potato Gratin",
            },
          },
          {
            name: "ingredient",
            in: "query",
            description: "Name of ingredient that recipes should include",
            schema: {
              schema: {
                type: "string",
                example: "Chiken",
              },
            },
          },
          {
            name: "page",
            in: "query",
            description: "Page, (default = 1)",
            schema: {
              type: "integer",
              minimum: 1,
              default: 1,
            },
          },
          {
            name: "limit",
            in: "query",
            description: "Per page(default 12)",
            schema: {
              type: "integer",
              minimum: 1,
              default: 12,
            },
          },
        ],
        security: [{ Bearer: [] }],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/ToggleFavoriteResponse",
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request / Invalid page or limit value ",
          },
          401: { description: "Unauthorized" },
          404: {
            description: "Not found",
          },

          500: { description: "Server error" },
        },
      },
    },
  },
};

module.exports = authPath;
