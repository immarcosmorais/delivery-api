import express from "express";
const router = express.Router();
import PedidosController from "../controller/pedidos.controller.js";

router.get("/", PedidosController.all);
router.post("/", PedidosController.save);
// router.get("/:id", AccountController.byId);
// router.delete("/:id", AccountController.remove);
// router.put("/:id", AccountController.update);
// router.patch("/updateBalance/:id", AccountController.updateBalance);

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
