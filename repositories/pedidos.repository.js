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

// async function byId(id) {
//   const data = JSON.parse(await readFile(fileName));
//   const account = data.accounts.find((account) => account.id === parseInt(id));
//   if (account === undefined) {
//     throw new Error("Record not found");
//   }
//   return account;
// }

// async function remove(id) {
//   const data = JSON.parse(await readFile(fileName));
//   data.accounts = data.accounts.filter(
//     (account) => account.id !== parseInt(id)
//   );
//   await writeFile(fileName, JSON.stringify(data, null, 2));
// }

// async function update(account, id) {
//   const data = JSON.parse(await readFile(fileName));
//   const index = data.accounts.findIndex(
//     (account) => account.id === parseInt(id)
//   );
//   if (index === -1) {
//     throw new Error("Record not found");
//   }
//   data.accounts[index].name = account.name;
//   data.accounts[index].balance = account.balance;
//   await writeFile(fileName, JSON.stringify(data, null, 2));
//   return data.accounts[index];
// }

export default {
  all,
  save,
  // byId,
  // remove,
  // update,
  // updateBalance,
};
