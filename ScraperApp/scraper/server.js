const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const pool = require("./database");




const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.post('/scrape', cors(), async (req, res) => {
  var str = req.body.url;
  if (str.includes("www.etsy.com")) {
    const product = await addingProduct(str);
    res.json(product)
    insert(product.name, product.img, product.price, str);
  }
  else { console.log("Please check the URL") }
  console.log("URL: " + str);

});
app.post('/getProducts', cors(), async (req, res) => {
  try {
    const data = await getAll();
    res.json(data.rows);
  } catch (error) {
    console.error(error);
  }


});
app.post('/getProduct', cors(), async (req, res) => {
  try {
    const id = req.body.id;
    const data = await getProduct(id);
    res.json(data.rows);
  } catch (error) {
    console.error(error);
  }


});
const port = 5000;

app.listen(port, () => `Server running on port ${port}`);

async function addingProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const product = {
    img: "",
    price: "",
    name: ""

  }
  const [img] = await page.$x('//*[@id="listing-right-column"]/div/div[1]/div[1]/div/div/div/div/div[1]/ul/li[1]/img');
  const srcI = await img.getProperty('src');
  product.img = await srcI.jsonValue();

  const [price] = await page.$x('//*[@id="listing-page-cart"]/div[3]/div[1]/div[1]/div/div[1]/p');
  const srcP = await price.getProperty('innerText');
  product.price = await srcP.jsonValue();

  const [productName] = await page.$x('//*[@id="listing-page-cart"]/div[2]/h1');
  const srcN = await productName.getProperty('innerText');
  product.name = await srcN.jsonValue();
  if (url.includes("uk") == false) {
    var thenum = product.price.replace(/^\D+/g, '');
    product.price = thenum;
  }


  
  console.log(product);
  browser.close();
  return product;
  

}

async function insert(name, img, price, url) {
  await pool.query("INSERT INTO public.products( name, img, price, url)VALUES ($1, $2, $3, $4); ", [name, img, price, url]);
}
async function getProduct(id) {
  const product = await pool.query("SELECT * FROM products where id = $1", [id]);
  return product;
}
async function getAll() {
  const products = await pool.query("SELECT * FROM products");
  return products;
}