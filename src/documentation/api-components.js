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
      CategoryListResponse: {
        type: "array",
        items: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description: "Category name",
              example: "Beef",
            },
            _id: {
              type: "string",
              description: "User's id",
              example: "6478d1857194b94d73dc99ac",
            },
          },
        },
        example: [
          {
            category: "Beef",
            _id: "6478d1857194b94d73dc99ac",
          },
        ],
      },
      IngredientRequest: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "id of ingredient",
            example: "640c2dd963a319ea671e372c",
          },
          measure: {
            type: "string",
            description: "amount and measure type",
            example: "1 spn",
          },
        },
      },
      AddOwnRecipeRequest: {
        type: "object",
        // required: [
        //   "title",
        //   "description",
        //   "category",
        //   "time",
        //   "ingredient",
        //   "instructions",
        // ],
        properties: {
          title: {
            type: "string",
            description: "title of recipe",
            example: "Pizza",
          },
          description: {
            type: "string",
            description: "Brief description of dish",
            example: "Italian cuisine",
          },
          category: {
            type: "string",
            description:
              'One of this: "Beef","Breakfast", "Chicken", "Dessert", "Goat", "Lamb", "Miscellaneous", "Pasta", "Pork", "Seafood", "Side", "Starter", "Vegan", "Vegetarian"',
            example: "Miscellaneous",
          },
          time: {
            type: "sting",
            description: "time of cooking",
            example: "30",
          },
          ingredients: {
            type: "array",
            //   // items: {
            //   //   type: "object",
            //   //   properties: {
            //   //     id: {
            //   //       type: "string",
            //   //       description: "id of ingredient",
            //   //       example: "640c2dd963a319ea671e372c",
            //   //     },
            //   //     measure: {
            //   //       type: "string",
            //   //       description: "amount and measure type",
            //   //       example: "1 spn",
            //   //     },
            //   //   },
            //   // },
            items: {
              $ref: "#/components/schemas/IngredientRequest",
            },
          },
          instructions: {
            type: "string",
            description: "Cooking instructions",
            example: "bake 15 minutes",
          },
          preview: {
            type: "string",
            description: "uploaded image (png, jpg, jpeg)",
            format: "binary",
          },
        },
      },
      AddOwnRecipeResponse: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "title of recipe",
            example: "Pizza",
          },
          description: {
            type: "string",
            description: "Brief description of dish",
            example: "Italian cuisine",
          },
          category: {
            type: "string",
            description:
              'One of this: "Beef","Breakfast", "Chicken", "Dessert", "Goat", "Lamb", "Miscellaneous", "Pasta", "Pork", "Seafood", "Side", "Starter", "Vegan", "Vegetarian"',
            example: "Miscellaneous",
          },
          time: {
            type: "string",
            description: "time of cooking",
            example: "30",
          },
          ingredient: {
            type: "array",
            items: {
              $ref: "#/components/schemas/IngredientRequest",
            },
          },
          instructions: {
            type: "string",
            description: "Cooking instructions",
            example: "bake 15 minutes",
          },
          preview: {
            type: "string",
            description: "uploaded image (png, jpg, jpeg)",
            example: "url string",
          },
        },
        example: {
          title: "Pizza",
          description: "Miscellaneous",
          category: "Miscellaneous",
          time: 5,
          ingredients: [
            {
              id: "640c2dd963a319ea671e365b",
              measure: " 5 spn",
            },
            {
              id: "640c2dd963a319ea671e365b",
              measure: " 5 spn",
            },
          ],
          preview:
            "http://res.cloudinary.com/dcxlayslv/image/upload/v1/ownrecipe/duuq0zozan84bqffgirk",
          instructions: "bake 15 minutes",
        },
      },
      GetOwnRecipeResponse: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Id of the recipe",
              example: "647c86459fec93f88e9aaa28",
            },
            title: {
              type: "string",
              description: "title of recipe",
              example: "Pizza",
            },
            description: {
              type: "string",
              description: "Brief description of dish",
              example: "Italian cuisine",
            },
            time: {
              type: "integer",
              description: "time of cooking",
              example: 30,
            },
            description: {
              type: "string",
              description: "url of image ( if it not provided - empty string",
              example:
                "http://res.cloudinary.com/dcxlayslv/image/upload/v1/ownrecipe/khzieh9fkxkrvyitgxa3",
            },
          },
        },
      },
      IngredientResponse: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            description: "ID of ingredient",
            example: "640c2dd963a319ea671e365b",
          },
          desc: {
            type: "string",
            description: "Description of ingr",
            example: "Very tasty",
          },
          ttl: {
            type: "string",
            description: "Name of ingr",
            example: "Chicken",
          },
          measure: {
            type: "string",
            description: "amount and measure of ingr",
            example: "300 g",
          },
          thb: {
            type: "string",
            description: "url of image",
            example:
              "https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678564123/rw8pn3541bmukb8d3mio.png",
          },
        },
      },
      GetOwnRecipeByIDResponse: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Id of the recipe",
              example: "647c86459fec93f88e9aaa28",
            },
            title: {
              type: "string",
              description: "title of recipe",
              example: "Pizza",
            },
            description: {
              type: "string",
              description: "Brief description of dish",
              example: "Italian cuisine",
            },
            category: {
              type: "string",
              description: "Category of dish",
              example: "Miscellaneous",
            },
            time: {
              type: "string",
              description: "time of cooking",
              example: "30",
            },
            ingredients: {
              type: "array",
              items: {
                $ref: "#/components/schemas/IngredientResponse",
              },
            },
            instructions: {
              type: "string",
              description: "Instruction regarding procedures",
              example: "Bake 30 minutes",
            },
            preview: {
              type: "string",
              description: "url of image ( if it not provided - empty string",
              example:
                "http://res.cloudinary.com/dcxlayslv/image/upload/v1/ownrecipe/khzieh9fkxkrvyitgxa3",
            },
          },
        },
      },
      RecipeFromMainPage: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            description: "Id of recipe",
            example: "640cd5ac2d9fecf12e8897fc",
          },
          title: {
            type: "string",
            description: "Title of recipe",
            example: "Spaghetti Bolognese",
          },
          preview: {
            type: "string",
            description: "Url of preview image",
            example:
              "https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560401/huqdxgwkvbhsfjqtexsm.jpg",
          },
          thumb: {
            type: "string",
            description: "Url of image",
            example:
              "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg",
          },
          description: {
            type: "string",
            description: "Brif descr of dish",
            example: "An Italian pasta dish",
          },
          time: {
            type: "string",
            description: "time of cooking",
            example: "45",
          },
        },
      },
      CatGroupMainPage: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            description: "Id",
            example: "647c86459fec93f88e9aaa28",
          },
          recipes: {
            type: "array",
            items: {
              $ref: "#/components/schemas/RecipeFromMainPage",
            },
          },
          points: {
            type: "number",
            description: "Rating of popularity",
            example: 122,
          },
          category: {
            type: "integer",
            description: "time of cooking",
            example: "Beef",
          },
        },
      },
      MainPageResponse: {
        type: "array",
        items: {
          $ref: "#/components/schemas/CatGroupMainPage",
        },
      },
      RecibeByIdResponse: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Id of the recipe",
              example: "647c86459fec93f88e9aaa28",
            },
            title: {
              type: "string",
              description: "title of recipe",
              example: "Pizza",
            },
            description: {
              type: "string",
              description: "Brief description of dish",
              example: "Italian cuisine",
            },
            category: {
              type: "string",
              description: "Category of dish",
              example: "Miscellaneous",
            },
            area: {
              type: "string",
              description: "Area of dish",
              example: "Italian",
            },
            time: {
              type: "string",
              description: "time of cooking",
              example: "30",
            },
            instructions: {
              type: "string",
              description: "Instruction regarding procedures",
              example: "Bake 30 minutes",
            },
            preview: {
              type: "string",
              description: "url of preview image ",
              example:
                "http://res.cloudinary.com/dcxlayslv/image/upload/v1/ownrecipe/khzieh9fkxkrvyitgxa3",
            },
            thumb: {
              type: "string",
              description: "Url of large image ",
              example:
                "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg",
            },
            popularity: {
              type: "integer",
              description: "for BE use",
            },
            favorites: {
              type: "array",
              description: "array of ID's",
            },
            likes: {
              type: "array",
              description: "array of ID's",
            },
            youtube: {
              type: "string",
              example: "https://www.youtube.com/watch?v=-gF8d-fitkU",
            },
            tags: {
              type: "array",
            },
            ingredients: {
              type: "array",
              items: {
                $ref: "#/components/schemas/IngredientResponse",
              },
            },
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
