# Mongo Aggregate Helper

![npm](https://img.shields.io/npm/v/mongo-aggregate-helper) ![npm](https://img.shields.io/npm/l/mongo-aggregate-helper)

The **Mongo Aggregate Helper** is a lightweight and intuitive library designed to streamline the construction and execution of MongoDB aggregation pipelines. With a focus on simplicity and usability, this library empowers developers to efficiently build complex aggregation queries without the overhead of verbose code.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Using MongoClient](#using-mongodb-client)
  - [Using Mongoose](#using-mongoose)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User-Friendly Interface**: The library offers a straightforward API that abstracts away the complexities of MongoDB's aggregation framework, allowing developers to focus on logic rather than syntax.
- **Versatile Functionality**: It supports a wide range of aggregation operations, including but not limited to `$group`, `$match`, `$project`, and more, making it suitable for various data processing tasks.

- **Enhanced Code Readability**: By promoting a clean and organized coding style, this helper facilitates maintainable and scalable projects, which is essential for both small and large applications.

- **Seamless Integration**: Easily integrate the library into any Node.js application with minimal setup, making it a great addition for projects that rely on MongoDB for data handling.

Whether you're building data-centric applications or performing data analysis, the Mongo Aggregate Helper simplifies your MongoDB aggregation queries and enhances your development experience.

## Installation

To install the package, run the following command:

```bash
npm install mongo-aggregate-helper
```

## Methods Available

- `match(condition)`: Adds a `$match` stage.
- `group(grouping)`: Adds a `$group` stage.
- `sort(order)`: Adds a `$sort` stage
- `project(fields)`: Adds a `$project` stage.
- `lookup(from, localField, foreignField, as)`: Adds a `$lookup` stage.
- `unwind(path)`: Adds a `$unwind` stage.
- `addFields(fields)`: Adds a `$addFields` stage.
- `paginate(skip, limit)`: Adds pagination using `$skip` and `$limit`.
- `search(field, keyword, exactMatch)`: Adds a search capability, Allowing both exact and regex-based matching.
- `facet(stages)`: Adds a `$facet` stage.
- `count(fieldName)`: Adds a `$count` stage.
- `execute()`: Execute the aggregation pipeline and return results.

## Usage

#### Using MongoClient

```
const MongoClient = require('mongodb').MongoClient;
const Aggregator = require("mongo-aggregate-helper");

// Example MongoDB connection (replace with your connection URI)
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function runAggregation() {
    try {
        await client.connect();
        const database = client.db('your_database_name');
        const collection = database.collection('your_collection_name');

        const aggregator = new Aggregator(collection);

        // Build your aggregation pipeline
        const result = await aggregator
            .match({ status: 'active' })            // Example match stage
            .group({ _id: '$country', count: { $sum: 1 } }) // Example group stage
            .execute(); // Execute the aggregation

        console.log(result);
    } finally {
        await client.close();
    }
}

runAggregation().catch(console.error);
```

### Notes:

- Ensure that the placeholders such as `your_database_name` and `your_collection_name` in the usage example are replaced with actual values relevant to your application.
- You can add any specific sections or information that you feel would enhance the usability of your package for developers.
- Make sure to include any additional dependencies or setup details that may be necessary for using your library effectively.

#### Using Mongoose

```
const mongoose = require('mongoose');
const Aggregator = require("mongo-aggregate-helper");

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/your_database_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a Mongoose schema
const exampleSchema = new mongoose.Schema({
    name: String,
    country: String,
    status: String,
});

// Create a Mongoose model
const ExampleModel = mongoose.model('Example', exampleSchema);

async function runAggregation() {
    try {
        // Ensure the connection is established
        await mongoose.connection.once('open', () => {
            console.log('Connected to MongoDB');
        });

        const aggregator = new Aggregator(ExampleModel); // Pass the Mongoose model

        // Build your aggregation pipeline
        const result = await aggregator
            .match({ status: 'active' }) // Example match stage
            .group({ _id: '$country', count: { $sum: 1 } }) // Example group stage
            .execute(); // Execute the aggregation

        console.log(result); // Output the aggregation results
    } catch (error) {
        console.error('Aggregation error:', error);
    } finally {
        await mongoose.connection.close(); // Close the connection
    }
}

// Run the aggregation
runAggregation().catch(console.error);
```

### Notes

- Replace `your_database_name` in the MongoDB connection string with the actual name of your MongoDB database.
- Adjust the schema according to the fields and structure of your actual collection.
- Make sure the necessary error handling and connection management is applied as relevant for your use case.

## API

### Aggregator

#### `new Aggregator(model)`

Creates a new Aggregator instance.

- **Parameters**:
  - `model`: The Mongoose model to aggregate.

---

#### 1. `match(condition)`

Adds a `$match` stage to filter documents based on the provided condition.

**Parameters**:

- `condition`: An object specifying the criteria to match.

**Returns**: The current `Aggregator` instance.

---

#### 2. `group(grouping)`

Adds a `$group` stage to group documents based on specified keys.

**Parameters**:

- `grouping`: An object defining the grouping criteria.

**Returns**: The current `Aggregator` instance.

---

#### 3. `sort(order)`

Adds a `$sort` stage to sort documents.

**Parameters**:

- `order`: An object specifying the sort order (e.g., `{ field: 1 }` for ascending).

**Returns**: The current `Aggregator` instance.

---

#### 4. `project(fields)`

Adds a `$project` stage to specify which fields to include or exclude.

**Parameters**:

- `fields`: An object defining fields to include or exclude from documents.

**Returns**: The current `Aggregator` instance.

---

#### 5. `lookup(from, localField, foreignField, as)`

Adds a `$lookup` stage to perform a left outer join with another collection.

**Parameters**:

- `from`: The collection to join.
- `localField`: The field from the input documents.
- `foreignField`: The field from the documents of the `from` collection.
- `as`: The name for the new array field to add to the input documents.

**Returns**: The current `Aggregator` instance.

---

#### 6. `unwind(path)`

Adds a `$unwind` stage to deconstruct an array field to generate a separate document for each element.

**Parameters**:

- `path`: The path to the array field to unwind.

**Returns**: The current `Aggregator` instance.

---

#### 7. `addFields(fields)`

Adds a `$addFields` stage to add new fields to documents.

**Parameters**:

- `fields`: An object defining the fields to add.

**Returns**: The current `Aggregator` instance.

---

#### 8. `paginate(skip = 0, limit)`

Adds pagination with `$skip` and optional `$limit`.

**Parameters**:

- `skip`: Number of documents to skip (default is `0`).
- `limit`: Maximum number of documents to return. If `undefined` or `null`, the `$limit` stage is not added.

**Returns**: The current `Aggregator` instance.

---

#### 9. `search(field, keyword, exactMatch = false)`

Adds a text or regex search stage.

**Parameters**:

- `field`: The field to search.
- `keyword`: The search keyword.
- `exactMatch`: Boolean indicating whether to match exactly (default is `false`).

**Returns**: The current `Aggregator` instance.

---

#### 10. `facet(stages)`

Adds a `$facet` stage for multi-faceted results.

**Parameters**:

- `stages`: An object specifying multiple aggregation pipelines.

**Returns**: The current `Aggregator` instance.

---

#### 11. `count(fieldName = "totalCount")`

Adds a `$count` stage to get the total count of documents.

**Parameters**:

- `fieldName`: Name of the field to store the count (default is `"totalCount"`).

**Returns**: The current `Aggregator` instance.

---

#### 12. `execute()`

Executes the aggregation pipeline and returns the results.

**Returns**: A Promise that resolves with the results of the aggregation.

### Example

Here's an example demonstrating the use of the API:

```javascript
const Aggregator = require("mongo-aggregate-helper");

const aggregator = new Aggregator(YourModel);

const results = await aggregator
  .match({ status: "active" })
  .group({ _id: "$country", count: { $sum: 1 } })
  .sort({ count: -1 })
  .project({ country: "$_id", count: 1 })
  .execute();

console.log(results);
```

### Notes

- The `Aggregator` class is designed to simplify the construction of MongoDB aggregation pipelines using Mongoose models.
- Each method returns the `Aggregator` instance, allowing for method chaining to build complex queries easily.
- Make sure to handle errors accordingly when executing the pipeline with `.execute()`, as it returns a promise that may reject on failure.
- You can use any combination of the provided methods to tailor your aggregation query to your specific needs.
- Refer to the official [MongoDB Aggregation Framework](https://docs.mongodb.com/manual/aggregation/) documentation for more details on aggregation stages and their usage.

## Contributing

We welcome contributions to enhance the `Aggregator` class and improve overall functionality. To get started, please follow these guidelines:

### How to Contribute

1. **Fork the Repository**

   - Click on the "Fork" button at the top right corner of the repository page to create your own copy of the project.

2. **Clone Your Fork**

   - Clone your forked repository to your local machine:

     ```bash
     git clone https://github.com/Mongo-Aggregate-Helper/mongo-aggregate-helper.git
     ```

3. **Create a Branch**

   - Create a new branch for your feature or bug fix:

     ```bash
     git checkout -b feature/your-feature-name
     ```

4. **Make Your Changes**

   - Implement your changes or improvements in your local branch.

5. **Run Tests**

   - Ensure that all existing and new tests pass by running the test suite:

     ```bash
     npm test
     ```

6. **Commit Your Changes**

   - Stage your changes and commit them with a clear message:

     ```bash
     git add .
     git commit -m "Add a brief description of your changes"
     ```

7. **Push to Your Fork**

   - Push your changes back to your forked repository:

     ```bash
     git push origin feature/your-feature-name
     ```

8. **Open a Pull Request**
   - Navigate to the original repository and submit a pull request. Provide a clear description of your changes and why they are beneficial.

### Guidelines

- Ensure that your code follows the project's coding style and conventions.
- Write tests for any new functionality or fixes you add.
- Document any changes you make in the code or the README file.

### Issues

If you encounter any bugs or have feature requests, feel free to open an issue in the repository. Please provide clear details about the problem or suggestion to help us address it effectively.

Thank you for considering contributing to this project! Your contributions are greatly appreciated.

## License

This project is licensed under the `MIT License`.

### Summary of the MIT License

The MIT License is a permissive free software license that allows users to do almost anything with your project, as long as they include a copy of the original MIT License and copyright notice with it.
