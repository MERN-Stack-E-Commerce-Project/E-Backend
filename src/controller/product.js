const Product = require("../models/product");
const Category=require("../models/category.js");
const shortid = require("shortid");
const { default: slugify } = require("slugify");
const product = require("../models/product");

exports.createProduct = (req, res) => {
  // res.status(200).json({ file: req.files, body:req.body });
  const { name, price, description, quantity, category } = req.body;
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: `${process.env.API}/public/${file.filename}` };
    });
  }

  const product = new Product({
    name,
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
    slug: slugify(name),
  });

  product.save((error, _product) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (_product) {
      return res.status(200).json({ _product });
    }
  });
};


exports.getProductBySlug=(req,res)=>{
    const {slug}= req.params;
    
    Category.findOne({slug:slug})
    .select("_id name")
    .exec((error,category)=>{

        if(error){
            return res.status(400).json({error});
        }

        if(category){
            Product.find({category: category._id})
            .exec((error,products)=>{

                if(error){
                    return res.status(400).json({error});
                }

                if(products.length>0){
                  
                    res.status(200).json({
                        products,
                        productByPrice:{
                            under5k:products.filter(product=>product.price<=5000),
                            under10k:products.filter(product=>(product.price>5000  && product.price<=10000 )),
                            under20k:products.filter(product=>( product.price>10000 && product.price<=20000 )),
                            under30k:products.filter(product=>(product.price>20000 && product.price<=30000 )),
                        },
                        category:category.name,
                    });
                }
            })
        }



    })
}



exports.getProductDetailsById=(req,res)=>{
  const {productId}= req.params;
  if(productId){
      Product.findOne({_id:productId})
      .exec((error,product)=>{
        if(error) return res.status(400).json({error});
        if(product){
          res.status(200).json({product});
        }
      })
    }
  else{
    return res.status(400).json({error:"params required"});
  }
}