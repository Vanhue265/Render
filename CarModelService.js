var MongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://vanhue265:vanhue265@cluster0.vmlyo6j.mongodb.net/test'
const { Int32, ObjectId } = require('bson')

async function insertProduct(newProduct) {
    let client = await MongoClient.connect(url)
    let db = client.db("Asm2")
    let id = await db.collection("products").insertOne(newProduct)
    return id
}

async function allProduct() {
    let client = await MongoClient.connect(url)
    let db = client.db("Asm2")
    let results = await db.collection("products").find().toArray()
    return results
}

async function deleteProduct(id) {
    let client = await MongoClient.connect(url)
    let db = client.db("Asm2")
    await db.collection("products").deleteOne({ _id: ObjectId(id) })
}

async function updateProduct(id, name, price, type, picture) {
    let client = await MongoClient.connect(url)
    let db = client.db("Asm2")
    await db.collection("products").updateOne({ _id: ObjectId(id) },
        { $set: { "name": name, "price": price, "type": type, "picture": picture } })
}

async function findProductById(id) {
    let client = await MongoClient.connect(url)
    let db = client.db("Asm2")
    const productToEdit = await db.collection("products").findOne({ _id: ObjectId(id) })
    return productToEdit
}

async function searchProductByName(name){
    let client = await MongoClient.connect(url)
    let db = client.db("Asm2")
    const results = await db.collection("products").find({ name: new RegExp(name,'i') }).toArray()
    return results
}
module.exports = {insertProduct, allProduct, deleteProduct, updateProduct, findProductById, searchProductByName}