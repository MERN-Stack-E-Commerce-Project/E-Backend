const Product = require("../models/product");

const shortid=require("shortid");
const { default: slugify } = require("slugify");


exports.createProduct = (req, res) => {

    // res.status(200).json({ file: req.files, body:req.body });
    const {
     name, 
     price,
     description,
      quantity,
     category,
    
 }=req.body;
  let   productPictures=[];
   if(req.files.length>0){
       productPictures=req.files.map(file=>{
        return {img: `${process.env.API}/public/${file.filename}`}
       })
   }

    const product = new Product({
      name,
      price,
      quantity,
      description,
      productPictures,
      category,
      createdBy: req.user._id,
      slug: slugify(name)
    });
  
    product.save((error,_product)=>{
        if(error){
            return res.status(400).json({error});
        }
        if(_product){
           return res.status(200).json({_product});
        }
    })


};
