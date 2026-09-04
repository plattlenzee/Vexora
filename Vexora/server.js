const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Permet de recevoir du JSON
app.use(express.json());

// Sert le site Vexora
app.use(express.static(path.join(__dirname, "public")));

// Test de l'API
app.get("/api/status", (req, res) => {
    res.json({
        online: true,
        message: "Vexora API est en ligne !"
    });
});

// Liste temporaire des projets
const projects = [];

// Récupérer les projets
app.get("/api/projects", (req, res) => {
    res.json(projects);
});

// Créer un projet
app.post("/api/projects", (req, res) => {
    const { name, prompt } = req.body;

    if (!name || !prompt) {
        return res.status(400).json({
            error: "Le nom et le prompt sont obligatoires."
        });
    }

    const project = {
        id: Date.now().toString(),
        name,
        prompt,
        createdAt: new Date().toISOString()
    };

    projects.push(project);

    res.status(201).json({
        success: true,
        project
    });
});

// Route principale
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Vexora est lancée sur le port ${PORT}`);
});
