import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import { planets } from "./data";

const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();
app.use(cors());

app.get("/planets", async (req, res) => {
	const offset = Number(req.query.offset || 0);

	if (offset <= 270) {
		// Return data from the imported planets array
		const slicedPlanets = planets.slice(offset, offset + 30); // Assuming you want to return a slice of 10 planets for each offset
		console.log(
			`Serving data from the planets array for offset ${offset}.`
		);
		return res.json(slicedPlanets);
	}

	try {
		const response = await axios.get(
			`https://api.api-ninjas.com/v1/planets?min_distance_light_year=0.0007&offset=${offset}`,
			{
				headers: {
					"X-Api-Key": process.env.API_KEY,
				},
			}
		);
		// Return the data from the API response
		console.log(`Fetching data from API for offset ${offset}.`);
		return res.json(response.data);
	} catch (error) {
		console.error("Error fetching data:", error);
		res.status(500).send("Failed to fetch planets data");
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
