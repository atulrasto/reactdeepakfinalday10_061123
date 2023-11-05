const graphql = require("graphql");
const product = require("./productData.json");
const { GraphQLObjectType, GraphQLList } = graphql;

let RatingType = new GraphQLObjectType({
  name: "RatingType",
  fields: () => ({
    rate: { type: graphql.GraphQLFloat },
    count: { type: graphql.GraphQLInt },
  }),
});

let ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: () => ({
    id: { type: graphql.GraphQLInt },
    title: { type: graphql.GraphQLString },
    price: { type: graphql.GraphQLFloat },
    description: { type: graphql.GraphQLString },
    category: { type: graphql.GraphQLString },
    image: { type: graphql.GraphQLString },
    rating: { type: RatingType },
  }),
});

let Query = {
  getProduct: {
    type: new GraphQLList(ProductType),
    args: { id: { type: graphql.GraphQLInt } },
    resolve: (resolver, args) => {
      if (args.id === undefined) {
        // SELECT * FROM products;
        // products.find()
        return product.products;
      } else {
        // SELECT * FROM products WHERE id=args.id;
        // products.find({id:args.id})
        let data = product.products.filter(
          (value) => value.id === Number(args.id)
        );
        return data;
      }
    },
  },
};

module.exports = Query;
