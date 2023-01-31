import PedidosRepository from "../repositories/pedidos.repository.js";

async function all() {
  return await PedidosRepository.all();
}

async function save(pedido) {
  return await PedidosRepository.save(pedido);
}

async function update(pedido, id) {
  return await PedidosRepository.update(pedido, id);
}

async function updateEntregue(entregue, id) {
  return await PedidosRepository.update(entregue, id);
}

// async function byId(id) {
//   return await AccountRepository.byId(id);
// }

async function remove(id) {
  return await PedidosRepository.remove(id);
}

// async function updateBalance(balance, id) {
//   return await AccountRepository.updateBalance(balance, id);
// }

export default {
  all,
  save,
  update,
  updateEntregue,
  //   byId,
  remove,
  //   update,
  //   updateBalance,
};
