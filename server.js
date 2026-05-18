const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(__dirname));

function getRelevantContext(
    philosopher,
    message
){

    try {

        const fileName =
            philosopher
            .toLowerCase()
            .replace(/\s+/g, "");

        const filePath = path.join(
            __dirname,
            "rag_data",
            `${fileName}.txt`
        );

        const text =
            fs.readFileSync(
                filePath,
                "utf8"
            );

        const chunks =
            text.split("###");

        const lowerMessage =
            message.toLowerCase();

        let bestChunks = [];

        chunks.forEach(chunk => {

            if(
                chunk
                .toLowerCase()
                .includes(lowerMessage)
            ){

                bestChunks.push(chunk);
            }
        });

        if(bestChunks.length === 0){

            return text.slice(0, 2500);
        }

        return bestChunks
            .join("\n")
            .slice(0, 3500);

    } catch {

        return "";
    }
}

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");
});

app.post("/chat", async (req, res) => {

    const {
        philosopher,
        school,
        personality,
        message,
        model
    } = req.body;

    try {

        const context =
            getRelevantContext(
                philosopher,
                message
            );

        const ollamaResponse = await fetch(
            "http://127.0.0.1:11434/api/generate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    model:
                        model || "phi3",

                    stream: false,

                    keep_alive: "30m",

                    prompt: `

${personality}

Below are writings,
ideas,
and passages associated with this philosopher:

${context}

Use these ideas naturally.

Stay fully in character as ${philosopher}.

Never mention that you are an AI.

Respond conversationally.

Respond in complete thoughts.

Do not abruptly stop mid-sentence.

User: ${message}
                    `,

                    options: {

                        num_predict: 500,

                        temperature: 0.9
                    }
                })
            }
        );

        const data =
            await ollamaResponse.json();

        res.json({
            reply: data.response
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            reply:
            "Failed connecting to Ollama."
        });
    }
});

const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `Lyceum running at http://localhost:${PORT}`
    );
});