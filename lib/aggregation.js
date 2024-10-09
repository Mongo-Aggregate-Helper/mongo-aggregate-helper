// lib/aggregation.js
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
