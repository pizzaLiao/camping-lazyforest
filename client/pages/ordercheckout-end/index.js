import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/testcart.module.scss'
export default function CartIndex() {
  const [reservationData, setReservationData] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [orderData, setOrderData] = useState([])
  const [ordercheckoutData, setOrdercheckoutData] = useState([])

  useEffect(() => {
    const reservationFromLocalStorage = JSON.parse(
      localStorage.getItem('reservationData')
    )
    const startDateFromLocalStorage = localStorage.getItem('startDate')
    const endDateFromLocalStorage = localStorage.getItem('endDate')
    const orderFromLocalStorage = JSON.parse(localStorage.getItem('orderData'))
    const ordercheckoutFromLocalStorage = JSON.parse(
      localStorage.getItem('ordercheckoutData')
    )

    if (reservationFromLocalStorage)
      setReservationData(reservationFromLocalStorage)
    if (startDateFromLocalStorage) setStartDate(startDateFromLocalStorage)
    if (endDateFromLocalStorage) setEndDate(endDateFromLocalStorage)
    if (orderFromLocalStorage) setOrderData(orderFromLocalStorage)
    if (ordercheckoutFromLocalStorage)
      setOrdercheckoutData(ordercheckoutFromLocalStorage)
  }, [])

  //定義變數
  const netTotal = orderData?.netTotal
  const orderDate = orderData?.orderDate
  const buyername = ordercheckoutData?.name
  const buyerphoneNumber = ordercheckoutData?.phoneNumber
  const buyeremail = ordercheckoutData?.email
  const buyermemo = ordercheckoutData?.memo
  const invoiceType = ordercheckoutData?.invoiceType
  const inputValue = ordercheckoutData?.inputValue
  const payMethod = ordercheckoutData?.payMethod
  const memo = ordercheckoutData?.memo

  const handleSubmit = () => {
    // 從localStorage中獲取數據
    const reservationData = JSON.parse(localStorage.getItem('reservationData'))
    // const startDateData = localStorage.getItem('startDate')
    // const endDateData = localStorage.getItem('endDate')
    const orderData = JSON.parse(localStorage.getItem('orderData'))
    const ordercheckoutData = JSON.parse(
      localStorage.getItem('ordercheckoutData')
    )

    const combinedData = {
      reservationData: reservationData,
      // startDateData: startDateData,
      // endDateData: endDateData,
      orderData: orderData,
      ordercheckoutData: ordercheckoutData,
    }

    fetch('http://localhost:3005/ordercheckout-end', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(combinedData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // 在这里处理后端的响应
        // console.log('Backend response:', responseData)
        console.log(responseData)
        // 判断responseData中是否有url属性，然后重定向
        if (responseData.url) {
          window.location.href = responseData.url
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <>
      <div className="container">
        <div className=" cart-area">
          <div className="row">
            <div className="mb-5 text-center text-sm-start fs-1">
              CONFIRM | 預約確認
            </div>
          </div>
          {/* 流程圖 */}
          <div className="mb-5">
            <div className={`${styles.circlescontainer}`}>
              <div
                className={`${styles.circle} d-flex align-items-center justify-content-center text-light bg-secondary fs-3 `}
              >
                <i className="bi bi-cart text-light"></i>
              </div>
              <div className={`${styles.line}`}></div>
              <div
                className={`${styles.circle} d-flex align-items-center justify-content-center text-light bg-secondary fs-3 bg-dark`}
              >
                <i className="bi bi-file-earmark-text text-light"></i>
              </div>
              <div className={`${styles.line}`}></div>
              <div
                className={`${styles.circle} d-flex align-items-center justify-content-center text-light bg-secondary fs-3 `}
              >
                <i className="bi bi-file-earmark-check-fill text-light"></i>
              </div>
            </div>
          </div>
        </div>
        {/* 填寫送貨資訊 */}
        <div className="my-3 d-none d-md-block text-secondary">
          {/* 訂單編號 LF20231027000392 */}
          請確認訂單明細
        </div>
        <div className="my-3 d-block d-md-none text-center text-secondary">
          請確認訂單明細
        </div>
        {/* 商品資訊*/}
        <div>
          {/* 桌機版顯示 d-none d-md-block */}
          <div className="d-none d-md-block border">
            <table className="table">
              <thead>
                <tr>
                  <th
                    className={`bg-dark text-light text-center ${styles.title}`}
                  >
                    營地
                  </th>
                  <th
                    className={`bg-dark text-light text-center ${styles.title}`}
                  >
                    營區
                  </th>
                  <th
                    className={`bg-dark text-light text-center ${styles.title}`}
                  >
                    帳數
                  </th>
                  <th
                    className={`bg-dark text-light text-center ${styles.title}`}
                  >
                    價格
                  </th>
                  <th
                    className={`bg-dark text-light text-center ${styles.title}`}
                  >
                    小計
                  </th>
                </tr>
              </thead>
              <tbody>
                {reservationData?.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center align-middle">
                      {item.camp_name}
                    </td>
                    <td className="text-center align-middle">
                      {item.zone_name}
                    </td>
                    <td className="text-center align-middle">
                      {item.quantity}
                    </td>
                    <td className="text-center align-middle">
                      NT ${item.zone_price}
                    </td>
                    <td className="text-center align-middle">
                      NT$ {item.quantity * item.zone_price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="">
              <p className="card-text d-flex justify-content-between align-items-center fs-5 px-3 fw-bold mb-5">
                合計: <span>NT$ {netTotal}</span>
              </p>
            </div>
          </div>
          {/* 手機版顯示 d-block d-md-none */}
          <div className="d-block d-md-none border mb-3">
            <div
              className={`mb-3 bg-dark text-light ${styles.title} d-flex align-items-center `}
            >
              商品明細
            </div>
            <div>
              <div>
                <table className="table">
                  <tbody>
                    {reservationData?.map((item, index) => (
                      <tr key={index}>
                        <td colSpan="7">
                          <div className="row mb-2">
                            <div className="col-5">
                              <img
                                className={styles.product}
                                src={item.img}
                                alt={item.name}
                              />
                            </div>
                            <div className="col-7 mt-3">{item.name}</div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-8">夏日歡慶95折</div>
                            <div className="col-4">NT ${item.price}</div>
                          </div>
                          <div className="row">
                            <div className="col-8">{item.quantity} 件</div>
                            <div className="col-4 ">NT ${item.itemTotal}</div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <div className="d-flex justify-content-between p-2 ">
                    <div>運費:</div>
                    <div>已達免運門檻</div>
                  </div>
                  <div className="d-flex justify-content-between p-2">
                    <div>合計:</div>
                    <div>NT$ {netTotal}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 訂單明細 */}
        {/* 手機版顯示 d-block d-md-none */}
        <div className="border mb-3">
          <div
            className={`fw-bold bg-dark text-light ${styles.checkouttitle}  align-items-center ps-4 d-none d-md-flex`}
          >
            訂單明細
          </div>
          <div
            className={`bg-dark text-light ${styles.title} d-flex align-items-center d-md-none`}
          >
            訂單資訊
          </div>
          <div className=" mx-1 fs-5">
            <div className="d-flex justify-content-between mt-4 mb-3 px-5">
              <div>訂購日期: </div>
              <div>{orderDate}</div>
            </div>
            {/* <hr /> */}
            <div className="d-flex justify-content-between my-3 px-5">
              <div>入住日期: </div>
              <div>{startDate}</div>
            </div>
            {/* <hr /> */}
            <div className="d-flex justify-content-between my-3 px-5">
              <div>退營日期: </div>
              <div>{endDate}</div>
            </div>
            {/* <hr /> */}
            <div className="d-flex justify-content-between my-3 px-5">
              <div>付款方式: </div>
              <div>{payMethod}</div>
            </div>
            {/* <hr /> */}
            <div className="d-flex justify-content-between my-3 px-5">
              <div>訂購人姓名: </div>
              <div>{buyername}</div>
            </div>
            {/* <hr /> */}
            <div className="d-flex justify-content-between my-3 px-5">
              <div>訂購人電話: </div>
              <div>{buyerphoneNumber}</div>
            </div>
            <div className="d-flex justify-content-between my-3 px-5">
              <div>訂單備註: </div>
              <div>{memo}</div>
            </div>
          </div>
        </div>

        {/* 回首頁 */}
        {/* <Link href="/"> */}
        <div>
          <Image
            src="./LINE-Pay(h)_W119_n.png"
            className={`btn btn-primary mb-3 d-block mx-auto mx-sm-0 ms-sm-auto`}
            onClick={handleSubmit}
            width={120}
            height={45}
            alt="LINE-Pay"
          />
          {/* <button
            onClick={handleSubmit}
            className={`${styles.button} btn btn-primary mb-3 d-block mx-auto mx-sm-0 ms-sm-auto`}
          >
            前往付款
          </button> */}
        </div>

        {/* </Link> */}
      </div>
    </>
  )
}
