var expesss = require('express')
const { ObjectId } = require('mongodb')
const { insertProduct, allProduct, deleteProduct, updateProduct, findProductById,searchProductByName } = require('./CarModelService')
var app = expesss()


app.set('view engine','hbs')
app.use(expesss.urlencoded({extended:true}))

app.post('/search',async (req,res)=>{
    const search = req.body.search
    const results = await searchProductByName(search)
    console.log(results)
    res.render('allProduct',{'results':results})
})

app.post('/edit',async (req,res)=>{
    const id = req.body.id
    const name = req.body.txtName
    const price = req.body.txtPrice
    const type = req.body.txtType
    const picture = req.body.txtPic
    await updateProduct(id, name, price, type, picture)
    res.redirect('/allProduct')
})

app.get('/edit',async (req,res)=>{
    const id = req.query.id
    const productToEdit = await findProductById(id)
    res.render('edit',{product:productToEdit})
})

app.get('/delete',async (req,res)=>{
    const id = req.query.id
    await deleteProduct(id)
    res.redirect('/all')
})

app.get('/allProduct',async (req,res)=>{
    const results = await allProduct()
    res.render('allProduct',{'results':results})
})

app.post('/new',async (req,res)=>{
    const name = req.body.txtName
    const price = req.body.txtPrice
    const type = req.body.txtType
    const picUrl = req.body.txtPic
    const newProduct = {
        name :name,
        price: Number.parseFloat(price),
        type: type,
        picture: picUrl
    }
    let id = await insertProduct(newProduct)
    console.log(id)
    res.render('home')

})

app.get('/all',async (req,res)=>{
    const results = await allProduct()
    res.render('allProduct',{results:results})
})

app.get('/new',(req,res)=>{
    res.render('newProduct')
})

app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log("Server is running!")










