const Category = require("../models/category");
const slugify = require("slugify");
const shortid=require("shortid");

exports.createCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
  };
  if (req.file) {
    let categoryUrl;
    categoryUrl = process.env.API + `/public/` + req.file.filename;
    categoryObj.categoryImage = categoryUrl;
  }
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId==undefined || parentId=="" || parentId.length==0) {
    category = categories.filter((cat) => cat.parentId == undefined || cat.parentId=="");
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type:cate.type,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
}

exports.getCategory = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (categories) {
      const categoryList = createCategories(categories);
      
      return res.status(200).json({ categoryList });
    }
  });
};


exports.updateCategory=async(req,res)=>{
  const {_id,name,parentId,type}=req.body;
  
  const updateCategories=[];
  if(name instanceof Array){
        for(let i=0;i<name.length;i++){
        const category={
          name: name[i],
          type: type[i], 
        };
        if(parentId[i]!=undefined && parentId[i] !=""){
                category.parentId=parentId[i];
        }
        const updateCategory=await Category.findOneAndUpdate({_id:_id[i]},category,{new:true});
        updateCategories.push(updateCategory);
    }
    return res.status(200).json({updateCategories});
  }else{
    const category={
      name,
      type
    };
    if(parentId!==""){
      category.parentId=parentId;
    }
    const updateCategory=await Category.findOneAndUpdate({_id},category,{new:true});
    return res.status(200).json({updateCategory});

  }
}


exports.deleteCategories=async(req,res)=>{

 const { ids } = req.body.payload;
 const deleted=[];
 for(let i=0;i<ids.length;i++){
  const deletecategory=await Category.findOneAndDelete({_id:ids[i]._id});
  deleted.push(deletecategory);
 }
 if(deleted.length===ids.length)
  res.status(200).json({message:"Categories removed"});
  else{
    res.status(400).json({error});
  }
}