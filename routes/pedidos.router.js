import express from "express";
const router = express.Router();
import PedidosController from "../controller/pedidos.controller.js";

router.get("/", PedidosController.all);
router.get("/produtosMaisVendidos", PedidosController.produtosMaisVendidos);
router.get("/:id", PedidosController.byId);
router.post("/", PedidosController.save);
router.put("/:id", PedidosController.update);
router.patch("/updateEntregue/:id", PedidosController.updateEntregue);
router.delete("/:id", PedidosController.remove);
router.post(
  "/valorTotalDePedidosPorCliente",
  PedidosController.valorTotalDePedidosPorCliente
);

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
