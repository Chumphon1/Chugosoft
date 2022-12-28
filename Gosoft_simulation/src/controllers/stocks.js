const connection = require("../services/database");

const getStocks = async (req, res) => {
   const barcode = req.params.barcode
   const [stocks] = await connection.query('select * from product where barcode =?', [barcode]);
   // const [stocks] = await connection.query('select * from stocks ');
   console.log(stocks);
   res.status(200).send(stocks);
}
const getPost = async (req, res) => {
   const array = req.body;
   const string = `${array.map(data => `(${data.num},${data.id},'${data.name}',${data.qty},${data.price},${data.sum})`).join(',')}`;
   console.log(string);
   await connection.query(`INSERT INTO shopping_cart (receipNo, productNo, productName, qty, price, priceSum) VALUES ${string}`);
   res.status(200).send('stocks1');
}

const deletePost = async (req, res) => {
   const productNo = req.params.productNo
   const [stocks2] = await connection.query('DELETE FROM stocks WHERE productNo = ' + productNo);
   console.log(stocks2);
   res.status(200).send(stocks2);
}
module.exports = {
   getStocks,
   getPost,
   deletePost
}