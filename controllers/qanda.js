const cloudinary = require("../middleware/cloudinary");
const Qa = require("../models/Qanda");

module.exports = {
  createQA: async (req, res) => {
    try {
      await Qa.create({
        question: req.body.question,
        answer: req.body.answer,
        user: req.user.id
      });
      console.log("Q&A has been added!");
      res.redirect("/newqa");
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
    let menu = Qa;
    let q = req.body.searchInput;
    let menuData = null;
    let sesh = req.session;
    let qry = {question:{$regex:'^' + q, $options:'i'}};
  
    if (q != null) {
      let menuResult = await menu.find(qry).then( (data) => {
        menuData = data;
      });
    } else {
      q = 'Search';
      let menuResult = await menu.find({}).then( (data) => {
        menuData = data;
      });
    }
  
    res.render('find', {title:'Menu App', data:menuData, search:q, loggedIn:sesh.loggedIn});
    
  }


}