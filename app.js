// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

// const app = express();
// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1/todolistDB");

// }

// // we store this data in database
// // const items = ["Wake Up 😃"];
// // const workItems = ["Hey There"];

// const itemsSchema = {
//     name:String
// }
// const Item = new mongoose.model("Item",itemsSchema);


// const item1 = new Item({
//     name:"Welcome to your to do list"
// });
// const item2 = new Item({
//     name:"Hit + button to add new item"
// });
// const item3 = new Item({
//     name:"## Hit this to delete an item"
// });

// const defaultItems =[item1,item2,item3];

// const listSchema = {
// 	name:String,
// 	items:[itemsSchema]
// };

// const List = new mongoose.model("List",listSchema);



// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// app.get("/", function (req, res) {

//     Item.find({},function(err,foundItems){

//         Item.find({},function(err,foundItems){
//             if (foundItems.length===0){
                
//              Item.insertMany(defaultItems,function(err){
//              console.log("successfully added Item");
//         });
//          res.redirect("/");

//             }
//             else{
//                 res.render("list", { listTitle: "Today", newListItems: foundItems });
				
//             }
//         });
    
       
//     });

//      app.get("/:customListName",function(req,res){
// 		const customListName = req.params.customListName;
       
// 		List.findOne({name:customListName},function(err,foundList){
// 			if(!err){
// 				if(!foundList){
// 					const list = new List({
// 						name:customListName,
// 						items:defaultItems
// 					});
// 					list.save();

// 					res.redirect("/"+customListName);
// 				}
// 				else{
// 					res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
// 				}
// 			}
// 		});
      



		
// 	 });


    


// 	// var today = new Date();

// 	// var options = {
// 	// 	weekday: "long",
// 	// 	day: "numeric",
// 	// 	month: "long",
// 	// };

// 	// const day = today.toLocaleDateString("en-Us", options);

	

// 	app.post("/", function (req, res) {
  
// 		const itemName = req.body.newItem;
// 		const listName = req.body.list;

// 		const item = new Item ({
// 			name:itemName
// 		});

// 		if(listName==="Today"){
// 			item.save();
// 			res.redirect("/");
	
// 		}
// 		else{
// 			List.findOne({name: listName},function (err,foundList) {
// 				foundList.items.push(item);
// 				foundList.save();
// 				res.redirect("/"+listName);
// 			});
// 		}
		
//    // NOW WE WILL DO SAME PROCESS IN MONGODB

//     	// if (req.body.list === "Work") {
// 		// 	workItems.push(item);
// 		// 	res.redirect("/work");
// 		// } else {
// 		// 	Item.push(item);
// 		// 	res.redirect("/"); 
			 
// 		// }

// 	});

// 	app.post("/delete",function(req,res){
// 		const checkedItemId = req.body.checkbox;
// 		const listName = req.body.listName;


// 		if(listName === "Today"){
// 			Item.findByIdAndRemove(checkedItemId,function(err){
// 				if(!err){
// 					console.log("successfully Deleted Checked Item.");
// 					res.redirect("/");
// 				}
// 			});
	
// 		}
// 		else {
// 			List.findOne({name:listName}, function(err, foundList){
// 				foundList.items.pull({id: checkedItemId});
// 				foundList.save(function(){
// 					res.redirect("/"+ listName);
// 				});
// 			});
// 		}

		
// 	});
	
// });

// // app.get("/work", function (req, res) {

// // 	res.render("list", { listTitle: "Work List", newListItems: workItems });
// // });


// app.listen(3000, function () {
// 	console.log("Server started at port 3000");
// });



const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");



main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect("mongodb+srv://mdrehanansari:rehan%40786@cluster0.ugpfz8x.mongodb.net/todolistDB");
}

const app = express();

// commented because now w'll store data in mongoose database
// const items = ["Wake Up 😃"];
// const workItems = ["Hey There"];

// mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = {
	name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item4 = new Item({
	    name:"Welcome to your to do list"
	});

const item2 = new Item({
	name: "Hit the + butto",
});

const item3 = new Item({
	name: "<-- Hit this to delete an item.",
});

// to add these in array

const defaultItems = [item4, item2, item3];

const listSchema = {
	name: String,
	items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
	Item.find({}, function (err, foundItems) {
		if (foundItems.length === 0) {
			Item.insertMany(defaultItems, function (err) {
				console.log("Successfully added items");
			});
			res.redirect("/");
		} else {
			res.render("list", { listTitle: "Today", newListItems: foundItems });
		}
	});

	app.get("/:customListName", function (req, res) {
		const customListName = req.params.customListName;

		// to find the list name inside the collection lists

		List.findOne({ name: customListName }, function (err, foundList) {
			if (!foundList) {
				// console.log("Doesn't Exists!!!");
			// Create a new List

			const list = new List({
				name: customListName,
				items: defaultItems,
			});
	
			list.save();
			res.redirect("/" + customListName);

			} else {
				// console.log("Already Existsss!!!");
				// Show an existing List

			res.render("list", {listTitle: foundList.name, newListItems: foundList.items});				

			}
		});

		
	});

	// var today = new Date();

	// var options = {
	// 	weekday: "long",
	// 	day: "numeric",
	// 	month: "long",
	// };

	// commented bcz res.render("list", { listTitle: day, newListItems: items }); changed
	// const day = today.toLocaleDateString("en-Us", options);

	app.post("/", function (req, res) {
		const itemName = req.body.newItem;
		const listName = req.body.list;

		const item = new Item({
			name: itemName
		});

		if(listName === "Today"){
			item.save();
		res.redirect("/");
		} else {
			List.findOne({name: listName}, function (err, foundList){
				foundList.items.push(item);
				foundList.save();
				res.redirect("/" + listName);
			});
		}

		
	});

	app.post("/delete", function (req, res) {
		const checkedItemId = req.body.checkbox;

		// to delete a item from customNameList
		const listName = req.body.listName;
	if (listName === "Today") {
		
		Item.findByIdAndRemove(checkedItemId, function (err) {
			// console.log("Successfully deleted checked item");
			res.redirect("/");
		});

	} else {
		// mongoose find one and update we'll use $pull check note
// pull method used in different way here from notes got this sol from comment section
		List.findOne({name:listName}, function(err, foundList){
			foundList.items.pull({ _id: checkedItemId }); 
			foundList.save(function(){

							res.redirect("/" + listName);
	})});
	
	}


	});

	//commented because now w'll do this with mongodb
	// if (req.body.list === "Work") {
	// 	workItems.push(item);
	// 	res.redirect("/work");
	// } else {
	// 	Item.push(item);
	// 	res.redirect("/");

	// }
});

// app.get("/work", function (req, res) {
// 	res.render("list", { listTitle: "Work List", newListItems: workItems });
// });

app.listen(3000, function () {
	console.log("Server started at port 3000");
});
