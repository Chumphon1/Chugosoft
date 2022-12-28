import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Data.css'

function Data() {

  const [barcode, setBarcode] = useState("")
  const [number, setNumber] = useState(1)
  const [dataBase, setDatabase] = useState([])


  let [num, setNum] = useState(1);

  const getNum = () => {
    const savedData = localStorage.getItem("num"); //ตั้งชื่อ key
    if (savedData) {
      return Number.parseInt(savedData); //แปลง string เป็น  javaScript
    } else {
      return 1;
    }
  }

  useEffect(() => {

    localStorage.setItem('num', num.toString()); //นำข้อมูลไปเก้บใน localStorage

  }, [num])




  async function getData(e) {
    await axios.get(`http://localhost:3000/stocks/7-11/${barcode}`, { crossdomain: true })
      .then(response => {
        console.log('response', response);


        // e.preventDefault(); //ป้องกันหน้าเว็ปrefresh

        if (response.data.length > 0) {
          setDatabase([
            ...dataBase,
            {
              id: dataBase.length + 1,
              text: response.data[0].productName.trim(), //ตัวสเปค
              price: response.data[0].price,
              number: number
            }
          ])
        }
      })

  }

  async function getPost() {

    setNum((getNum() + 1));

    let carts = []
    dataBase.map((data, index) => {
      const cart = {
        num: getNum(),
        id: index + 1,
        name: data.text,
        qty: data.number,
        price: data.price,
        sum: Number(data.number) * data.price,
      }
      carts.push(cart)
    })
    await axios.post('http://localhost:3000/stocks/7-11',
      carts
    )
    setDatabase([])

  }


  function bar_code(event) {
    setBarcode(event.target.value)

  }
  function num_ber(event) {
    setNumber(event.target.value)

  }


  const handleDeleteSelected = () => {
    setDatabase(dataBase.filter((item) => !item.checked));

  };

  const handleSelectOne = (id) => {
    setDatabase(
      dataBase.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  let sum = 0;
  dataBase.forEach(i => {
    sum = sum + Number(i.number)
  })
  let summon = 0;
  dataBase.forEach(i => {
    summon = summon + Number(i.price * i.number)
  })




  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setDatabase(dataBase.map((item) => ({ ...item, checked })));
  };


  return (

    <div className='app-container'>
      <h2>POS</h2>

      <div className='container'>
        <button className='button' onClick={handleDeleteSelected}  > Delete </button>
        <input className='input_barcode' type="text" name='barcode' value={barcode} onChange={bar_code} />
        <input className='input_number' type="number" name='number' value={number} onChange={num_ber} />
        <button className='button' onClick={async () => { getData() }} > OK </button>
      </div>

      <div className='table_scroll'>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={dataBase.every((item) => item.checked)}
                  onChange={handleSelectAll}
                />          </th>
              <th> No.</th>
              <th> ชื่อสินค้า </th>
              <th> จำนวนสินค้า </th>
              <th> ราคา/หน่วย </th>
              <th> จำนวนเงิน </th>
            </tr>
          </thead>
          <tbody>

            {dataBase.map((productName, index) => (
              <tr key={index + 1}>
                <td>
                  <input
                    type="checkbox"
                    checked={productName.checked}
                    onChange={() => handleSelectOne(productName.id)} />
                </td>

                <td >{index + 1} </td>
                <td> {productName.text}</td>
                <td> {productName.number} </td>
                <td> {productName.price}</td>
                <td> {productName.price * productName.number} </td>
                <p></p>
              </tr>


            ))}

          </tbody>
        </table>

      </div>
      <div > total: {sum} Price: {summon}
        <p>
          <button className='button-save' onClick={async () => { await getPost() }} > save </button>
        </p>

      </div>
    </div>


  )
}
export default Data