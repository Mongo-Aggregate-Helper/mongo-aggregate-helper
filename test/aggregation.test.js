// test/aggregation.test.js
const mongoose = require("mongoose");
const Aggregator = require("../lib/index");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  country: String,
});

const User = mongoose.model("User", userSchema);

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

describe("Mongo Aggregator Tests", () => {
  before(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany([
      { name: "Alice", age: 25, country: "USA" },
      { name: "Bob", age: 30, country: "USA" },
      { name: "Charlie", age: 35, country: "Canada" },
      { name: "Charlie", age: 35, country: "Canada" },
    ]);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("should perform aggregation correctly", async () => {
    const aggregator = new Aggregator(User);

    const results = await aggregator
      .match({ age: { $gte: 30 } })
      .group({ _id: "$country", count: { $sum: 1 } })
      .sort({ count: -1 })
      .execute();

    console.log(results);
    // Expected output should show number of users grouped by country
  });
});
