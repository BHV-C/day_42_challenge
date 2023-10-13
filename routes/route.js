const express=require("express")
const route= express.Router()
const products= require("../model/products")
const checkTimeMiddleware= require("../middleware/checkTime")
// const {run}=require('../db')
const {run}=require('../db')

// route.use(checkTimeMiddleware)
run();

route.get("/", async (req,res)=>{
      const db= await run()

      const phones = await db.collection("products").find().toArray()
      console.log(phones);
      res.send(phones)
})
route.get("/one", async (req,res)=>{
      const db= await run();
      const query = {model:{$regex :/iphone/i}};
      const phones = await db.collection("products").findOne(query);
      console.log(phones);
      res.send(phones)
});

route.get("/cat", async (req,res)=>{
      const db= await run()
      const query = {model:{$regex :/iphone/i},price:{$lte:3000},properties:"5G support"}
      const phones = await db.collection("products").count(query)
      console.log(phones);
      // res.sendStatus(201).send(phones)
})
route.get("/filter", async (req,res)=>{
      const {minPrice, maxPrice, name}=req.body;
      let query={}
      if(minPrice && maxPrice){
            query.price={$lte:parseFloat(maxPrice),
            $gte:parseFloat(minPrice)}
      }else if(minPrice){
            query.price={$gte:parseFloat(minPrice)}

      }else if(maxPrice){
            query.price={$lte:parseFloat(maxPrice)}
      }else{
            query.name={$regex :new RegExp(name,'i')}      }

      const db= await run()
      // const query = {model:{$regex :/iphone/i},price:{$lte:3000},properties:"5G support"}

      const phones = await db.collection("products").find(query).toArray()
      console.log(phones);
      res.send(phones)
})

route.get("/less", async (req,res)=>{
      const db= await run()
      
      const phones = await db.collection("products").find({price: {$lte:5000, $gte:3000}}).project({model:1,price:1,_id:0}).toArray()
      console.log(phones);
      res.send(phones)
})


route.post("/", async (req,res)=>{
      const db = await run()
      const productsAdded =  db.collection("products");
      // productsAdded.insertMany(products); //all data 
      // collection.insertMany(products); //all data 

      const {model, price, quantity, properties, dateOfCreation} = req.body

      const newProduct = {
            model,
            price,
            quantity,
            properties,
            dateOfCreation
      }
      // productAdded = await db.collection("phones").insertOne(newProduct)
       productsAdded.insertOne(newProduct)
      // console.log(newProduct);
      res.send(db)





      // if (!name || !price) {
      //       return res.status(400).send("Invalid request body. 'name' and 'price' are required.");
      //     }

      // const newProduct={
      //       id:products.length+1,
      //       name,
      //       price
      // }

      // products.push(newProduct)
      res.status(201).json(productsAdded); 
})

route.put("/:id",(req,res)=>{
      const {id} = req.params
      const {name, price} = req.body

      const productIndex = products.findIndex((product)=>product.id===parseInt(id))
      
      const updateProduct= {
            ...products[productIndex],
            name:name,
            price:price
      }
      console.log(updateProduct)
      products[productIndex] = updateProduct;

      res.json(updateProduct)
})

route.delete("/",async (req,res)=>{


      const db= await run()

      const phones = await db.collection("products").deleteMany()
      console.log(phones);
      res.send(phones)

      // const {id}=req.body
      // const index = products.findIndex((product)=>product.id===id)

      // if(index !== -1){
      //       products.splice(index,1)
      //       res.status(201).send("product deleted")
      }


















      // const {id} = req.params


      // const index = products.findIndex(product => product.id === parseInt(id));

      // if (index === -1) {
      //   return res.status(404).send("Product not found.");
      // }
    
      // // Remove the product from the array
      // products.splice(index, 1);
    
      // // Update the file with the modified products array
    
      // res.send("Product deleted successfully.");
)
module.exports = route
