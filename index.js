import express from "express";
import cors from "cors";

import { MercadoPagoConfig, Preference } from "mercadopago";
const client = new MercadoPagoConfig({
    accessToken: "APP_USR-3992847979749211-040815-9b0211ddfb88f4d9a321fab43bf614e7-2381296632",
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Soy el server :)")
});

app.post("/create_preference", async (req, res) => {
    try {
        const body = {
            items: [{
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price),
                currency_id: "ARS"
            }],
            back_urls: {
                success:"https://nererusso.github.io/faerie-soerie/carrito.html?success=true",
                failure:"https://nererusso.github.io/faerie-soerie/carrito.html?failure=true",
                pending:"https://nererusso.github.io/faerie-soerie/carrito.html?pending=true"
            },
            auto_return: "approved",
        };

        const preference = new Preference(client);
        const result = await preference.create({body});
        res.json({
            id: result.id,
        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            error: "Error al crear la preferencia :("
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor andando en el puerto ${port}`)
});