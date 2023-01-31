import { promises as fs } from "fs";
const { readFile, writeFile } = fs;

async function all() {
  const data = JSON.parse(await readFile(fileName));
  return data.pedidos;
}

async function save(pedido) {
  const data = JSON.parse(await readFile(fileName));
  pedido = {
    id: data.nextId++,
    cliente: pedido.cliente,
    produto: pedido.produto,
    valor: pedido.valor,
    entregue: false,
    timestamp: new Date(),
  };
  data.pedidos.push(pedido);
  await writeFile(fileName, JSON.stringify(data, null, 2));
  return pedido;
}

async function update(pedido, id) {
  const data = JSON.parse(await readFile(fileName));
  const index = getIndex(data, id);
  data.pedidos[index].cliente = pedido.cliente;
  data.pedidos[index].produto = pedido.produto;
  data.pedidos[index].valor = pedido.valor;
  data.pedidos[index].entregue = pedido.entregue;
  await writeFile(fileName, JSON.stringify(data, null, 2));
  return data.pedidos[index];
}

async function updateEntregue(entregue, id) {
  let pedido = await byId(id);
  pedido.entregue = entregue;
  return await update(pedido, id);
}

function getIndex(data, id) {
  const index = data.pedidos.findIndex((item) => item.id === parseInt(id));
  if (index === -1) {
    throw new Error("Registro não encontrado");
  }
  return index;
}

async function byId(id) {
  const data = JSON.parse(await readFile(fileName));
  const index = getIndex(data, id);
  return data.pedidos[index];
}

// async function remove(id) {
//   const data = JSON.parse(await readFile(fileName));
//   data.accounts = data.accounts.filter(
//     (account) => account.id !== parseInt(id)
//   );
//   await writeFile(fileName, JSON.stringify(data, null, 2));
// }

export default {
  all,
  save,
  update,
  updateEntregue,
  // byId,
  // remove,
  // update,
  // updateBalance,
};
