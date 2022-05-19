const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	const insale = products.filter(product => {
		return product.category === "in-sale"
	})
	
	const visited = products.filter(product => {
		return product.category === "visited"

	})
		res.render("index", {visited: visited, insale:insale})
	},
	search: (req, res) => {
		res.render("results")
	},
};

module.exports = controller;
