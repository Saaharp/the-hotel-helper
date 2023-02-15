const cloudinary = require("../middleware/cloudinary");
const Qa = require("../models/Qanda");

module.exports = {
  createQA: async (req, res) => {
    try {
      await Qa.create({
        question: req.body.question,
        answer: req.body.answer,
        user: req.user.id,
      });
      console.log("Q&A has been added!");
      res.redirect("/myaccount");
    } catch (err) {
      console.log(err);
    }
  },
  getNewQA: async (req, res) => {
    try {
      res.render("newqa.ejs");
    } catch (err) {
      console.log(err);
    }
  },
  getMyAccount: async (req, res) => {
    try {
      const qas = await Qa.find({ user: req.user.id });
      res.render("myaccount.ejs", { qas: qas, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getQASearch: async (req, res) => {
    try {
      const qas = await Qa.find().sort({ createdAt: "desc" }).lean();
      res.render("search.ejs", { qas: qas });
    } catch (err) {
      console.log(err);
    }
  },
  getQAFind: async (req, res) => {
    try {
      const qas = await Qa.find().sort({ createdAt: "desc" }).lean();
      res.render("find.ejs", {qas: qas, search: null, data: null });
    } catch (err) {
      console.log(err);
    }
  },
  deleteQA: async (req, res) => {
    try {
      // Find post by id
      let qas = await Qa.findById({ _id: req.params.id });

      // Delete post from db
      await Qa.remove({ _id: req.params.id });
      console.log("Deleted Q & A");
      res.redirect("/myaccount");
    } catch (err) {
      res.redirect("/myaccount");
    }
  },
  getSearch: async(req, res) => {
    try{
        const q = req.body.searchInput;
        let sesh = req.session
        const menuData = await Qa.find({question:{$regex: q, $options: 'i'}})
        
        q.length === 0 ? res.render('find', {message: 'Please enter a topic or question!', search:null,data:null}) : res.render('find',{data:menuData, search:q, loggedIn:sesh.loggedIn})

    }catch(err){
        console.log(err)
    }

  },
  editQA: async(req, res) => {
    try{
      let qas = await Qa.findById({ _id: req.params.id });
      res.render("edit.ejs", {qas: qas})
    }catch(err){
      res.redirect("/myaccount")
    }
  },
  saveQA: async (req, res) => {
    try{
      await Qa.findOneAndUpdate(
        {_id: req.params.id},
        {
          question: req.body.newQuestion,
          answer: req.body.newAnswer
        }
      )
      console.log("QA saved")
      res.redirect('/myaccount')
    }catch(err){
      console.log(err)
    }
  }
}
