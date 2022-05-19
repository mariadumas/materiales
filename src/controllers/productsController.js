const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render("products", {products: products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		const productoDetalle = products.find(product =>{
			return product.id == req.params.id
		})

		res.render("detail", {productoDetalle: productoDetalle, title: productoDetalle.name})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let ultimo = products.length -1;
		let idnuevo = products[ultimo].id + 1;  
			
		let newProduct = {
			id: idnuevo,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.file.filename
		}
		// Tengo que guardar esta info en algún lado
		
		// Primero leer lo que ya había en el archivo json
		let productsEnJSON = fs.readFileSync(productsFilePath, {encoding: "utf-8"});

		let productos
		
		if (productsEnJSON == "") {
			productos = [];			
		}
		else {
			productos = JSON.parse(productsEnJSON)
		}
		productos.push(newProduct);

		let productosJSON =  JSON.stringify(productos, null, "\t");

		fs.writeFileSync(productsFilePath, productosJSON)

		res.redirect("/products")
	},

	// Update - Form to edit
	edit: (req, res) => {
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		const productToEdit = products.find(product => {
			return product.id == req.params.id
		})

		res.render("product-edit-form", {productToEdit: productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		products.find(product => {
			
			if (product.id === parseInt(req.params.id)) {
				
				product.name = req.body.name,
				product.price = req.body.price,
				product.discount = req.body.discount,
				product.description = req.body.description,
				product.image = req.file.filename
			};
	
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, "\t"))
		res.redirect("/products/")
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// const productToDelete= products.find(product => product.id === parseInt(req.params.id));
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let productsNewList = products.filter(product => product.id !== parseInt(req.params.id))

		fs.writeFileSync(productsFilePath, JSON.stringify(productsNewList, null, "\t"))

		res.redirect("/")
	}
};

module.exports = controller;