import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/planets", async (req, res) => {
	const offset = req.query.offset || 0;

	try {
		const response = await axios.get(
			`https://api.api-ninjas.com/v1/planets?max_distance_light_year=100000&offset=${offset}`,
			{
				headers: {
					"X-Api-Key": process.env.API_KEY,
				},
			}
		);

		res.json(response.data);
	} catch (error) {
		console.error("Error fetching data:", error);
		res.status(500).send("Failed to fetch planets data");
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
