const { MongoClient } = require("mongodb");
const products = require("./model/products")

const uri = "mongodb://127.0.0.1:27017";
const dbName = "mongodb_day42_challenge";

const client = new MongoClient(uri, { useUnifiedTopology: true })
console.log("================================\n");

console.log(products)
async function run(){
  try{
    await client.connect()
    const db = client.db(dbName)
      console.log("connected successfully to the mongodb database")

    // console.log(phones)
    // const collection = db.collection("products");
    // collection.insertMany(products, (err, result) => {
    //   if (err) {
    //     console.error('Failed to insert document:', err);
    //     return;
    //   }
    //   console.log('Document inserted:', result.insertedId);
    // });
    return db;
  }catch(err){
    console.log(err.message)
  }
}
console.log("================================\n");
// client.connect(function (err) {
//   if(err) {
//     console.error('error occurred while connecting to mongoDB',err)
//     return;
//   }
//   console.log("Connected to mongoDB server");
//   // const db = client.db(dbName)
//   // Access the collection with text index
//   const collection = db.collection('products');

  // // Perform a text search for 'MongoDB'
  // collection.find({ $text: { $search: 'MongoDB' } }).toArray(function (err, result) {
  //   if (err) {
  //     console.error('Error occurred while performing text search', err);
  //     return;
  //   }

  //   console.log('Search results for "MongoDB":');
  //   console.log(result);
  //   // Close the client
  //   client.close();
  // });
  // return db;
// });

// const db = client.db(dbName);
// // db.collection('products');
// // console.log(db.aggregate);

// console.log("================================\n");


// // console.log(phones)
// const collection = db.collection("products");
// collection.insertMany(products, (err, result) => {
//   if (err) {
//     console.error('Failed to insert document:', err);
//     return;
//   }
//   console.log('Document inserted:', result.insertedId);
// });
// console.log(db);
module.exports = {run}



 











// const { MongoClient } = require("mongodb");

// const uri = "mongodb://127.0.0.1:27017";
// const dbName = "products"; // Replace with your actual database name

// const client = new MongoClient(uri);
// async function run() {

//       try {
//         await client.connect();
//         const db = client.db(dbName);
//         console.log("Connected to database");
//         return db;
//       } catch (error) {
//         console.error("Error connecting to database:", error.message);
//       }

// }

// module.exports = { run };
