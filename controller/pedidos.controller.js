import PedidosService from "../service/pedidos.service.js";

function isBoolean(val) {
  return val === false || val === true;
}

async function all(req, res, next) {
  try {
    logger.info("GET /pedidos");
    res.send(await PedidosService.all());
  } catch (err) {
    next(err);
  }
}

async function save(req, res, next) {
  try {
    let pedido = req.body;
    if (!pedido.cliente || !pedido.produto || pedido.valor == null) {
      throw new Error("Campo 'cliente', 'produto' e 'valor' são obrigatorios");
    }
    pedido = await PedidosService.save(pedido);
    logger.info(`POST /pedido - ${JSON.stringify(pedido)}`);
    res.send(pedido);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const pedido = req.body;
    if (
      !pedido.cliente ||
      !pedido.produto ||
      pedido.valor == null ||
      !isBoolean(pedido.entregue)
    ) {
      throw new Error(
        "Campo 'cliente', 'produto', 'valor' e 'entregue' são obrigatorios"
      );
    }
    logger.info("UPDATE /pedido/:id");
    res.send(await PedidosService.update(pedido, req.params.id));
  } catch (err) {
    next(err);
  }
}

async function updateEntregue(req, res, next) {
  try {
    const pedido = req.body;
    if (!isBoolean(pedido.entregue)) {
      throw new Error("Campo 'entregue' são obrigatorios");
    }
    logger.info("UPDATE /updateEntregue/:id");
    res.send(
      await PedidosService.updateEntregue(pedido.entregue, req.params.id)
    );
  } catch (err) {
    next(err);
  }
}

async function byId(req, res, next) {
  try {
    logger.info("GET /pedido/:id");
    res.send(await PedidosService.byId(req.params.id));
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await PedidosService.remove(req.params.id);
    logger.info(`DELETE /pedido/:id - ${req.params.id}`);
    res.send({ deleted: true });
  } catch (err) {
    next(err);
  }
}

async function valorTotalDePedidosPorCliente(req, res, next) {
  try {
    let pedido = req.body;
    if (!pedido.cliente) {
      throw new Error("Campo 'cliente', é obrigatorio");
    }
    const valorTotal = await PedidosService.valorTotalDePedidosPorCliente(
      pedido.cliente
    );
    logger.info(
      `POST /valorTotalDePedidosPorCliente - ${JSON.stringify(valorTotal)}`
    );
    res.send({ valor_total: valorTotal });
  } catch (err) {
    next(err);
  }
}

async function produtosMaisVendidos(req, res, next) {
  try {
    logger.info("GET /produtosMaisVendidos");
    res.send(await PedidosService.produtosMaisVendidos());
  } catch (err) {
    next(err);
  }
}

export default {
  all,
  save,
  update,
  updateEntregue,
  byId,
  remove,
  valorTotalDePedidosPorCliente,
  produtosMaisVendidos,
};
