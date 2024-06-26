function buildCritiria(query) {
  const critiria = {};

  if (query.name) {
    critiria.name = { $regex: query.name, $options: "i" };
  }

  if (query.category) {
    critiria.category = { $regex: query.category, $options: "i" };
  }

  if (query.minPrice && !isNaN(query.minPrice)) {
    query.minPrice = parseFloat(query.minPrice);
    critiria.price = { $gte: query.minPrice };
  }

  if (query.maxPrice && !isNaN(query.maxPrice)) {
    query.maxPrice = parseFloat(query.maxPrice);
    if (!critiria.price) {
      critiria.price = {};
    }
    critiria.price.$lte = query.maxPrice;
  }

  return critiria;
}

module.exports = {
  buildCritiria,
};
