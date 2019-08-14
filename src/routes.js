const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const Post = require("./models/Post");

routes.post("/post", multer(multerConfig).single("file"), async (req, res) => {
	const { originalname: name, size, key, location: url = "" } = req.file;
	const post = await Post.create({
		name,
		size,
		key,
		url
	});
	return res.json(post);
});
routes.get("/post", async (req, res) => {
	const post = await Post.find();
	return res.json(post);
});

routes.delete("/post/:id", async (req, res) => {
	const post = await Post.findByIdAndDelete(req.params.id);
	await post.remove();

	return res.send("Delected with success!");
});
module.exports = routes;
