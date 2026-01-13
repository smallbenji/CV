import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const PROM_URL = "http://ssh.smallbenji.tech:9090";
const app = express();

app.use(cors());

app.get("/api/status", async (req, res) => {
    try {
        const query = "probe_success{job=\"blackbox\"}";
        const url = `${PROM_URL}/api/v1/query?query=${encodeURIComponent(query)}`;

        const r = await fetch(url, {timeout: 5000});
        if (!r.ok) throw new Error("Prometheus error");

        const data = await r.json();

        const result = [];
        for (const item of data.data.result) {
            const target = item.metric.instance || "unknown";

            if (target == "https://mail.smallbenji.tech") continue;

            result.push({
                site: target,
                up: item.value[1] === "1" ? true : false
            });
        }

        res.json(result);
    } catch (err) {
        res.status(502).json({error: "Prometheus unavailable"});
    }
});

app.listen(3000, () => {
    console.log("API listening on port 3000");
})