// const mango = require('../models/mango');
var Mango = require('../models/mango');
// List of all mangos
exports.mango_list = async function(req, res) {
    try{
    themangos = await Mango.find();
    res.send(themangos);
    }
    catch(err){
    res.error(500,`{"error": ${err}}`);
    }
    };
// for a specific mango.
exports.mango_detail = async function(req, res) {
    console.log("detail"  + req.params.id)
    try {
        result = await Mango.findById( req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle Costume create on POST.
exports.mango_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Mango();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costumetype":"goat", "cost":12, "size":"large"}
    document.Mangoname = req.body.Mangoname;
    document.type = req.body.type;
    document.price = req.body.price;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
        res.status(500)
        res.send(err)
    }
    };

// Handle mango update form on PUT.
exports.mango_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body 
    ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Mango.findById( req.params.id)
        if(req.body.Mangoname) toUpdate.Mangoname = req.body.Mangoname;
        if(req.body.type) toUpdate.type = req.body.type;
        if(req.body.price) toUpdate.price = req.body.price;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }



};
// VIEWS
// Handle a show all view
exports.mango_view_all_Page = async function(req, res) {
    try{
    themangos = await Mango.find();
    res.render('mango', { title: 'Mangoes Search Results', results: themangos });
    }
    catch(err){
    res.error(500,`{"error": ${err}}`);
    }
    };
// Handle Costume delete on DELETE.
exports.mango_delete = async function(req, res) {
    console.log("delete "  + req.params.id)
    try {
        result = await Mango.findByIdAndDelete( req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle a show one view with id specified by query
exports.mango_view_one_Page = async function(req, res) {
    console.log("single view for id "  + req.query.id)
    try{
        result = await Mango.findById( req.query.id)
        res.render('mangodetail', 
{ title: 'Mango Detail', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.mango_create_Page =  function(req, res) {
    console.log("create view")
    try{
        res.render('mangocreate', { title: 'Mango Create'});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a costume.
// query provides the id
exports.mango_update_Page =  async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
        let result = await Mango.findById(req.query.id)
        console.log(result)
        res.render('mangoupdate', { title: 'mango Update', toShow: result });
        // console.log(toShow)
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle a delete one view with id from query
exports.mango_delete_Page = async function(req, res) {
    console.log("Delete view for id "  + req.query.id)
    try{
        result = await Mango.findById(req.query.id)
        res.render('mangodelete', { title: 'mango Delete', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};


