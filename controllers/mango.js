const mango = require('../models/mango');
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
    res.error(500,`{"error": ${err}}`);
    }
    };
// Handle mango delete form on DELETE.
exports.mango_delete = function(req, res) {
res.send('NOT IMPLEMENTED: mango delete DELETE ' + req.params.id);
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