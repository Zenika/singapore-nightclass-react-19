const Database = require("better-sqlite3");

// Connecting to or creating a new SQLite database file
const db = new Database("./test.db", { verbose: console.log });

db.prepare(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT,
        description TEXT,
        img TEXT,
        stock INTEGER CHECK (stock >= 0)
      )`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS carts (
        id INTEGER PRIMARY KEY,
        items INTEGER CHECK (items >= 0)
      )`).run();

db.prepare("INSERT INTO carts (id, items) VALUES (1, 0)").run();

const insert = db.prepare(
	"INSERT INTO products (name, description, img, stock) VALUES (@name, @description, @img, @stock)",
);

const insertMany = db.transaction((products) => {
	for (const product of products) insert.run(product);
});

insertMany([
	{
		name: "Sweater",
		description:
			"This high-quality crewneck is perfect for your everyday look. Made with 100% cotton, it's soft, comfortable, and undeniably stylish. Full sleeved for a classic look and effortlessly versatile, this cotton crewneck is a must-have in any wardrobe.",
		img: "https://cdn.shopify.com/s/files/1/0688/1755/1382/products/GreenMenscrew01.jpg?v=1675454919",
		stock: 2,
	},
	{
		name: "Sunglasses",
		description:
			"These modern black sunglasses provide 100% UV400 protection from harmful sunrays and feature mirrored lenses for a timeless and stylish look. With lightweight construction and comfortable fit, you can look cool and stay safe in any situation.",
		img: "https://cdn.shopify.com/s/files/1/0688/1755/1382/products/Blacksunnies.jpg?v=1675447388",
		stock: 4,
	},
	{
		name: "Slides",
		description:
			"Simple, minimal and comfortable, these slides feature a classic design in the perfect shade of iron. Whether you're just lounging around the house or running errands, these slides will offer all-day comfort.",
		img: "https://cdn.shopify.com/s/files/1/0688/1755/1382/products/slides.jpg?v=1675447358",
		stock: 1,
	},
]);
