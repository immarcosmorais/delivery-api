import PedidosRepository from "../repositories/pedidos.repository.js";

async function all() {
  return await PedidosRepository.all();
}

// async function save(account) {
//   return await AccountRepository.save(account);
// }

// async function byId(id) {
//   return await AccountRepository.byId(id);
// }

// async function remove(id) {
//   return await AccountRepository.remove(id);
// }

// async function update(account, id) {
//   return await AccountRepository.update(account, id);
// }

// async function updateBalance(balance, id) {
//   return await AccountRepository.updateBalance(balance, id);
// }

export default {
  all,
  //   save,
  //   byId,
  //   remove,
  //   update,
  //   updateBalance,
};
