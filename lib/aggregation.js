class Aggregator {
  constructor(model) {
    this.model = model; // The Mongoose model
    this.pipeline = []; // The aggregation pipeline
  }

  // Add a $match stage
  match(condition) {
    this.pipeline.push({ $match: condition });
    return this;
  }

  // Add a $group stage
  group(grouping) {
    this.pipeline.push({ $group: grouping });
    return this;
  }

  // Add a $sort stage
  sort(order) {
    this.pipeline.push({ $sort: order });
    return this;
  }

  // Add a $project stage
  project(fields) {
    this.pipeline.push({ $project: fields });
    return this;
  }

  // Add a $lookup stage
  lookup(from, localField, foreignField, as) {
    this.pipeline.push({
      $lookup: { from, localField, foreignField, as },
    });
    return this;
  }

  // Add a $unwind stage
  unwind(path) {
    this.pipeline.push({ $unwind: path });
    return this;
  }

  // Add a $addFields stage
  addFields(fields) {
    this.pipeline.push({ $addFields: fields });
    return this;
  }

  // Add pagination with skip and limit
  paginate(skip = 0, limit = 10) {
    this.pipeline.push({ $skip: skip }, { $limit: limit });
    return this;
  }

  // Add a search stage (text or regex based)
  search(field, keyword, exactMatch = false) {
    if (exactMatch) {
      this.pipeline.push({ $match: { [field]: keyword } });
    } else {
      this.pipeline.push({
        $match: {
          [field]: { $regex: keyword, $options: "i" },
        },
      });
    }
    return this;
  }

  // Add a $facet stage for multi-faceted results
  facet(stages) {
    this.pipeline.push({ $facet: stages });
    return this;
  }

  // Add a $count stage to get the total count
  count(fieldName = "totalCount") {
    this.pipeline.push({ $count: fieldName });
    return this;
  }

  // Execute the aggregation pipeline
  async execute() {
    try {
      return await this.model.aggregate(this.pipeline).exec();
    } catch (error) {
      throw new Error(`Aggregation Error: ${error.message}`);
    }
  }
}

module.exports = Aggregator;
