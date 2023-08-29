const asyncErrorWrapper = require("express-async-handler")
const CustomError = require("../../Helpers/error/CustomError");
const Story = require("../../Models/story")


const checkStoryExist = asyncErrorWrapper(async (req,res,next) => {
    console.log("checkStoryExist")
    const {slug} = req.params  ;
    const story = await Story.findOne({
      slug : slug
    })

    if(!story) {
        return next(new CustomError("There is no such story with that slug ",400))
    }

    next() ; 

})


const checkUserAndStoryExist = asyncErrorWrapper(async(req, res, next) => {
    console.log("checkUserAndStoryExist")
    const {slug} =req.params 

 

    const story = await Story.findOne({
        slug : slug
    })
    

    console.log("story check ",story)
    if (!story ) {
        return next(new CustomError("There is no story with that slug associated with User ",400))
    }

    next() ; 

})

module.exports ={
    checkStoryExist,
    checkUserAndStoryExist
}
