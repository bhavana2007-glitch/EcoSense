import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", aiEnabled: !!ai });
});

// AI Waste Classifier Route
app.post("/api/classify", async (req: express.Request, res: express.Response) => {
  try {
    const { image, description } = req.body;

    if (!image && !description) {
       res.status(400).json({ error: "Missing image or description for classification." });
       return;
    }

    if (!ai) {
      // Fallback response when GEMINI_API_KEY is not configured
       res.json({
        itemName: description || "Plastic Bottle",
        category: "Plastic",
        hazardStatus: "SAFE",
        confidence: 92.5,
        points: 15,
        disposalSteps: [
          "Rinse the bottle thoroughly to remove leftover liquids.",
          "Crush the bottle flat to conserve space in the recycling bin.",
          "Screw the cap back on (or recycle it separately based on local rules).",
          "Place in your blue recycling bin for rigid plastics."
        ],
        sustainableAlternatives: [
          "Switch to a reusable stainless steel flask.",
          "Use water filtration pitchers at home."
        ],
        specialInstructions: "Standard PET (Type 1) recycling. Widely accepted.",
        fallback: true
      });
      return;
    }

    let prompt = "Classify this waste item and provide sorting details. Be precise and realistic.";
    let contents: any[] = [];

    if (image) {
      // The image is base64 encoded with prefix data:image/...;base64,
      const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        contents.push({
          inlineData: {
            mimeType: matches[1],
            data: matches[2]
          }
        });
      } else {
        contents.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: image
          }
        });
      }
    }

    if (description) {
      prompt += ` Description/Clue: "${description}"`;
    }
    contents.push({ text: prompt });

    // Request structured JSON response
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: `You are an advanced EcoSense AI Waste Sorting Assistant. Your job is to classify any waste item shown in images or described, categorize it accurately, rate its hazard status (SAFE, WARNING, HAZARDOUS), calculate confidence, assign EcoPoints (5 for Organic, 10 for Paper, 15 for Plastic/Glass/Metal, 25 for Hazardous/E-waste), and output step-by-step sorting rules and eco-friendly alternatives.
Return JSON that strictly matches this schema:
{
  "itemName": "Specific item name identified",
  "category": "Organic" | "Plastic" | "Paper" | "Glass" | "Metal" | "E-Waste" | "Hazardous" | "Other",
  "hazardStatus": "SAFE" | "WARNING" | "HAZARDOUS",
  "confidence": number (between 0 and 100),
  "points": number,
  "disposalSteps": string[],
  "sustainableAlternatives": string[],
  "specialInstructions": string
}`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itemName: { type: Type.STRING },
            category: { type: Type.STRING },
            hazardStatus: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            points: { type: Type.INTEGER },
            disposalSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            sustainableAlternatives: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            specialInstructions: { type: Type.STRING }
          },
          required: ["itemName", "category", "hazardStatus", "confidence", "points", "disposalSteps", "sustainableAlternatives", "specialInstructions"]
        }
      }
    });

    const textResult = response.text;
    if (!textResult) {
      throw new Error("Empty response from AI model.");
    }

    const parsedResult = JSON.parse(textResult.trim());
     res.json(parsedResult);
  } catch (error: any) {
    console.error("AI Classification Error:", error);
     res.status(500).json({
      error: "AI Classification failed",
      message: error.message || "An unexpected error occurred."
    });
  }
});

// Start server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
