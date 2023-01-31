import PedidosService from "../service/pedidos.service.js";

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

// async function byId(req, res, next) {
//   try {
//     logger.info("GET /account/:id");
//     res.send(await AccountService.byId(req.params.id));
//   } catch (err) {
//     next(err);
//   }
// }

// async function remove(req, res, next) {
//   try {
//     await AccountService.remove(req.params.id);
//     logger.info(`DELETE /account/:id - ${req.params.id}`);
//     res.send({ deleted: true });
//   } catch (err) {
//     next(err);
//   }
// }

// async function update(req, res, next) {
//   try {
//     const account = req.body;
//     if (!account.name || account.balance == null) {
//       throw new Error("Filds 'name' and 'balance' are mandatorie.");
//     }
//     logger.info("UPDATE /account/:id");
//     res.send(await AccountService.update(account, req.params.id));
//   } catch (err) {
//     next(err);
//   }
// }

// async function updateBalance(req, res, next) {
//   try {
//     const account = req.body;
//     if (account.balance == null) {
//       throw new Error("Fild 'balance' is mandatorie.");
//     }
//     logger.info(`PUT /account - ${JSON.stringify(account)}`);
//     res.send(
//       await AccountService.updateBalance(account.balance, req.params.id)
//     );
//   } catch (err) {
//     next(err);
//   }
// }

export default {
  all,
  save,
  //   byId,
  //   remove,
  //   update,
  //   updateBalance,
};
