import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import InvoiceOptions from '@/components/invoiceOptions'
import CityDistrictSelector from '@/components/citydistrict'
import styles from '@/styles/testcart.module.scss'
import { useRouter } from 'next/router'
import { useShip711StoreOpener } from '@/hooks/use-ship-711-store'

// import Cookie from 'js-cookie'
export default function CartIndex() {
  const { store711, openWindow, closeWindow } = useShip711StoreOpener(
    'http://localhost:3005/api/shipment/711',
    { autoCloseMins: 1 } // x分鐘沒完成選擇會自動關閉，預設5分鐘。
  )

  // 建立狀態變數
  // const router = useRouter() // 初始化router
  // const [isSubmitted, setIsSubmitted] = useState(false)
  // const [errors, setErrors] = useState({})
  //鄉鎮市區
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')

  //發票
  const [invoiceType, setInvoiceType] = useState('')
  const [inputValue, setInputValue] = useState('')

  //付款方式及運送方式
  const [payMethod, setPayMethod] = useState('')
  const [shippingMethod, setShippingMethod] = useState('')

  //訂購日
  // const [orderDate, setOrderDate] = useState('')

  // 訂購人資訊
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
  })
  // 收件人資訊
  const [receiverInfo, setReceiverInfo] = useState({
    receiverName: '',
    receiverPhoneNumber: '',
    receiverEmail: '',
    receiverAddress: '',
  })
  //選縣市+區域
  const [buyerCity, setBuyerCity] = useState('')
  const [buyerDistrict, setBuyerDistrict] = useState('')
  const [receiverCity, setReceiverCity] = useState('')
  const [receiverDistrict, setReceiverDistrict] = useState('')
  // const [isInfoSame, setIsInfoSame] = useState(false)

  //打勾
  const [isSameInfo, setIsSameInfo] = useState(false)

  const handleCheckboxChange = () => {
    // setIsSubmitted(true)
    if (!isSameInfo) {
      // 將訂購人資訊複製到收件人資訊中
      setReceiverInfo({
        receiverName: buyerInfo.name,
        receiverPhoneNumber: buyerInfo.phoneNumber,
        receiverEmail: buyerInfo.email,
        receiverAddress: buyerInfo.address,
      })
      setReceiverCity(buyerCity)
      setReceiverDistrict(buyerDistrict)
    } else {
      // 清空收件人資訊
      setReceiverInfo({
        receiverName: '',
        receiverPhoneNumber: '',
        receiverEmail: '',
        receiverAddress: '',
      })
      setReceiverCity('')
      setReceiverDistrict('')
    }
    setIsSameInfo(!isSameInfo)
  }

  // 台灣固定電話和手機號碼的正則表達式
  // const phoneRegex = /^(0\d{1,2}-?\d{6,8}|09\d{2}-?\d{3}-?\d{3})$/
  // // 驗證function
  // const validatePhoneNumber = (number) => {
  //   return phoneRegex.test(number)
  // }
  // const handlePhoneNumberChange = (e) => {
  //   const phoneNumber = e.target.value
  //   setBuyerInfo({
  //     ...buyerInfo,
  //     phoneNumber: phoneNumber,
  //   })
  // }

  const handleSubmit = () => {
    const currentDate = new Date() // 取得當下日期
    const formattedDate = currentDate.toISOString().split('T')[0] // 格式化日期为 'YYYY-MM-DD'
    // setOrderDate(formattedDate) // 将格式化后的日期设置为 orderDate 的值

    // 從localStorage中獲取購物車數據
    // const cartData = JSON.parse(localStorage.getItem('cart'))

    const checkoutdata = {
      ...buyerInfo,
      ...receiverInfo,
      invoiceType: invoiceType,
      inputValue: inputValue,
      orderDate: formattedDate,
      payMethod: payMethod,
      shippingMethod: shippingMethod,
      buyerCity: buyerCity,
      buyerDistrict: buyerDistrict,
      receiverCity: receiverCity,
      receiverDistrict: receiverDistrict,
    }
    // 沒有錯誤時，才寫到localstorage
    // if (Object.keys(newErrors).length === 0) {
    localStorage.setItem('checkoutdata', JSON.stringify(checkoutdata))
    // 使用router進行頁面跳轉
    //   router.push('/testcheckout-end')
    // }
    // localStorage.setItem('checkoutdata', JSON.stringify(checkoutdata))
  }

  return (
    <>
      <tw-address name="bill-address"></tw-address>
      <div className="container">
        <div className="mt-5">
          <div className=" cart-area">
            <div className="row">
              <div className="mb-5 text-center text-sm-start fs-1">
                CHECKOUT | 結帳
              </div>
            </div>
            {/* 流程圖 */}
            <div>
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
                  className={`${styles.circle} d-flex align-items-center justify-content-center text-light bg-secondary fs-3`}
                >
                  <i className="bi bi-file-earmark-check-fill text-light"></i>
                </div>
              </div>
            </div>
          </div>
          {/* 填寫送貨資訊 */}
          <div className="my-4 d-none d-md-block text-secondary">
            填寫訂購資訊
          </div>
          <div className="my-5 d-block d-md-none text-center text-secondary">
            填寫訂購資訊
          </div>
          {/* 顧客資訊*/}

          {/* 桌機版顯示 d-none d-md-block */}
          <div className=" border rounded mb-5">
            <div
              className={`fw-bold bg-dark text-light ${styles.checkouttitle}  align-items-center ps-4 d-none d-md-flex`}
            >
              訂購人資訊
              <p className="text-light ms-auto pe-2 mt-4 me-4 fs-6">
                <span className="text-primary ">快速註冊/登入</span> !
                以會員身分快速結帳
              </p>
            </div>
            <div>
              <div
                className={`mb-3 bg-dark text-light ${styles.title} d-flex align-items-center d-md-none`}
              >
                訂購人資訊
              </div>
              <div className="">
                <div className="row m-md-4 d-flex justify-content-md-around align-items-center">
                  <div className="col-md-auto col-sm-12 text-center mt-1  ">
                    {/* <div className="mb-0 mb-md-1"> */}
                    <input
                      type="text"
                      placeholder=" 訂購人姓名"
                      className={` ${styles.checkoutsize}`}
                      value={buyerInfo.name}
                      onChange={(e) =>
                        setBuyerInfo({ ...buyerInfo, name: e.target.value })
                      }
                    />
                    {/* </div>
                    <span>請填寫訂購人姓名</span> */}
                  </div>
                  <div className="col-md-auto col-sm-12 text-center mt-1">
                    {/* <div className="mb-0 mb-md-1"> */}
                    {/* <input
                        type="text"
                        placeholder={errors.phoneNumber || '訂購人電話'}
                        className={`${styles.checkoutsize} ${
                          errors.phoneNumber ? 'invalidinput' : ''
                        }`}
                        value={buyerInfo.phoneNumber}
                        onChange={handlePhoneNumberChange}
                      /> */}
                    <input
                      type="text"
                      placeholder=" 訂購人電話"
                      className={styles.checkoutsize}
                      value={buyerInfo.phoneNumber}
                      onChange={(e) =>
                        setBuyerInfo({
                          ...buyerInfo,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                    {/* </div>
                    <span>請填寫訂購人電話</span> */}
                    {/* <i className="bi bi-check2-circle ms-2 text-success"></i> */}
                  </div>
                </div>
                <div className="col-md-auto col-sm-12 text-center mt-1">
                  {/* <div className="mb-0 mb-md-1"> */}
                  <input
                    type="text"
                    placeholder=" 訂購人email"
                    className={styles.checkoutsize2}
                    value={buyerInfo.email}
                    onChange={(e) =>
                      setBuyerInfo({ ...buyerInfo, email: e.target.value })
                    }
                  />
                  {/* </div>
                  <span>請填寫訂購人email</span> */}
                </div>
                {/* <div className="row m-md-4 d-flex justify-content-md-around align-items-center"> */}
                {/* <TWzipcode /> */}
                <CityDistrictSelector
                  // selectedCity={selectedCity}
                  // setSelectedCity={setSelectedCity}
                  // selectedDistrict={selectedDistrict}
                  // setSelectedDistrict={setSelectedDistrict}
                  selectedCity={buyerCity}
                  setSelectedCity={setBuyerCity}
                  selectedDistrict={buyerDistrict}
                  setSelectedDistrict={setBuyerDistrict}
                />
                <div className="col-md-auto col-sm-12 text-center mt-2">
                  {/* <div className="mb-0 mb-md-1"> */}
                  <input
                    type="text"
                    placeholder=" 訂購人地址"
                    className={styles.checkoutsize2}
                    value={buyerInfo.address}
                    onChange={(e) =>
                      setBuyerInfo({ ...buyerInfo, address: e.target.value })
                    }
                  />
                  {/* </div>
                  <span>請填寫訂購人地址</span> */}
                </div>
              </div>
            </div>
          </div>

          {/* 送貨資訊 */}
          {/* 手機版顯示 d-block d-md-none */}
          <div className="border mb-5">
            <div
              className={`fw-bold bg-dark text-light ${styles.checkouttitle}  align-items-center ps-4 d-none d-md-flex`}
            >
              收件人資訊
            </div>
            <div
              className={`mb-3 bg-dark text-light ${styles.title} d-flex align-items-center d-md-none`}
            >
              收件人資訊
            </div>
            <div className="m-2">
              {/* <div className="mb-2">已選擇送貨方式： 宅配到家</div> */}
              <div className="mb-3 ms-1">
                <input
                  className="mb-2 ms-5 mt-3"
                  type="checkbox"
                  checked={isSameInfo}
                  onChange={handleCheckboxChange}
                />
                &nbsp;收件人資訊與訂購人資訊相同
              </div>
            </div>
            <div className="">
              <div className="row mx-md-4 my-md-3 d-flex justify-content-md-around align-items-center">
                <div className="col-md-auto col-sm-12 text-center">
                  {/* <div className="mb-0 mb-md-1"> */}
                  <input
                    type="text"
                    placeholder=" 收件人姓名"
                    className={` ${styles.checkoutsize}`}
                    value={receiverInfo.receiverName}
                    onChange={(e) =>
                      setReceiverInfo({
                        ...receiverInfo,
                        receiverName: e.target.value,
                      })
                    }
                  />
                  {/* </div>
                  <span>請填寫姓名</span> */}
                </div>
                <div className="col-md-auto col-sm-12 text-center">
                  {/* <div className="mb-0 mb-md-1"> */}
                  <input
                    type="text"
                    placeholder=" 收件人電話"
                    className={styles.checkoutsize}
                    value={receiverInfo.receiverPhoneNumber}
                    onChange={(e) =>
                      setReceiverInfo({
                        ...receiverInfo,
                        receiverPhoneNumber: e.target.value,
                      })
                    }
                  />
                  {/* </div>
                  <span>請填寫電話</span> */}
                </div>
              </div>
              <CityDistrictSelector
                selectedCity={receiverCity}
                setSelectedCity={setReceiverCity}
                selectedDistrict={receiverDistrict}
                setSelectedDistrict={setReceiverDistrict}
              />
              <div className="col-md-auto col-sm-12 text-center mt-2">
                {/* <div className="mb-0 mb-md-1"> */}
                <input
                  type="text"
                  placeholder=" 收件人地址"
                  className={styles.checkoutsize2}
                  value={receiverInfo.receiverAddress}
                  onChange={(e) =>
                    setReceiverInfo({
                      ...receiverInfo,
                      receiverAddress: e.target.value,
                    })
                  }
                />
                {/* </div>
                <span>請填寫收件人地址</span> */}
              </div>
              <div className="ms-2">
                {/* <div className="mb-2">已選擇送貨方式： 宅配到家</div> */}
                <div className="mb-3 ms-1">
                  <input className="mb-2 ms-5 mt-1" type="checkbox" />
                  &nbsp;儲存為預設地址
                </div>
              </div>
            </div>
          </div>
          {/* 發票資訊 */}
          <div>
            {/* 桌機版顯示 d-none d-md-block */}
            <div className=" border rounded mb-5">
              <div
                className={`fw-bold bg-dark text-light ${styles.checkouttitle}  align-items-center ps-4 d-none d-md-flex`}
              >
                發票資訊
              </div>
              <div
                className={`mb-3 bg-dark text-light ${styles.title} d-flex align-items-center d-md-none`}
              >
                發票資訊
              </div>
              <InvoiceOptions
                invoiceType={invoiceType}
                setInvoiceType={setInvoiceType}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </div>
          </div>
          {/* 付款方式與運送方式 */}
          <div>
            {/* 桌機版顯示 d-none d-md-block */}
            <div className=" border rounded mb-5">
              <div
                className={`fw-bold bg-dark text-light ${styles.checkouttitle}  align-items-center ps-4 d-none d-md-flex`}
              >
                選擇付款與運送方式
              </div>
              <div
                className={`mb-3 bg-dark text-light ${styles.title} d-flex align-items-center d-md-none`}
              >
                選擇付款與運送方式
              </div>
              <div className="row mx-4 d-flex justify-content-md-around align-items-center">
                <div className="col-md-auto col-sm-12 text-center ">
                  <select
                    className={` ${styles.citysize} my-3 mb-md-3`}
                    value={payMethod}
                    onChange={(e) => setPayMethod(e.target.value)}
                  >
                    <option value="" disabled>
                      選擇付款方式
                    </option>
                    <option value="貨到付款">貨到付款</option>
                    <option value="LinePay">LinePay</option>
                  </select>
                </div>
                <div className="col-md-auto col-sm-12 text-center">
                  <select
                    className={`${styles.citysize} my-3 mb-md-3`}
                    value={shippingMethod}
                    onChange={(e) => setShippingMethod(e.target.value)}
                  >
                    <option value="" disabled>
                      選擇運送方式
                    </option>
                    <option value="宅配到府">宅配到府</option>
                    <option value="超商店取">超商店取</option>
                  </select>
                </div>
                {/* 使用條件渲染來顯示/隱藏門市選擇部分 */}
                {shippingMethod === '超商店取' && (
                  <>
                    {!store711.storeid ? (
                      <div className={`${styles.seven}`}>
                        <div className="d-flex align-items-center my-1">
                          <div className="me-2">
                            <img
                              src="./seven-eleven.png"
                              alt="Seven Eleven Logo"
                            />
                          </div>
                          <div>選擇門市</div>
                        </div>
                        <div className="text-center">
                          <button
                            className={`${styles.search} my-2 rounded`}
                            onClick={openWindow}
                          >
                            搜尋門市
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={`${styles.eleven}`}>
                        <div className="d-flex align-items-center my-1">
                          <div className="me-2">
                            <img
                              src="./seven-eleven.png"
                              alt="Seven Eleven Logo"
                            />
                          </div>
                          <div>選擇門市</div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center my-2">
                          <div>已選擇門市店號:</div>
                          <div>
                            <input
                              type="text"
                              value={store711.storeid}
                              disabled
                              className={`${styles.addresslength}`}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div>已選擇門市名稱:</div>
                          <div>
                            <input
                              type="text"
                              value={store711.storename}
                              disabled
                              className={`${styles.addresslength}`}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-2 ">
                          <div>門市地址:</div>
                          <div>
                            <input
                              type="text"
                              value={store711.storeaddress}
                              disabled
                              className={`${styles.addresslength}`}
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            className={`${styles.search} my-2 rounded`}
                            onClick={openWindow}
                          >
                            更改門市
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {/* <hr />
                <h3>以下為測試</h3>
                <div>
                  <button
                    onClick={() => {
                      closeWindow()
                    }}
                  >
                    關閉跳出的7-11選擇視窗(測試用，不需要)
                  </button>
                </div>
                <p>得到的物件值: {JSON.stringify(store711)}</p> */}
              </div>
            </div>
          </div>

          {/* 下單前必看公告 */}
          <div className="bg-secondary mb-3">
            <h2 className="text-light ps-md-5 pt-md-4 mb-md-4 p-3">
              下單前必看公告
            </h2>
            <p className="text-light ps-md-5 py-1 px-3 fs-5 ">
              1.如無法正常下單請聯繫客服（可點擊右下角藍色圖示或私訊粉絲專頁客服
            </p>
            <p className="text-light ps-md-5 p-3 fs-5 ">
              2.購物金折抵上限為每筆訂單總金額之 10%，
              1000元可折抵100元購物金，2000元可折抵200元購物金，依此類推
            </p>
            <div className="d-flex me-2">
              <input className="ms-auto me-1" type="checkbox" />
              <p className="text-light me-1 pt-3">
                我同意網站<span className="text-primary">服務條款</span>及
                <span className="text-primary">隱私權政策</span>
              </p>
            </div>
          </div>
          <Link href="/testcheckout-end">
            <button
              onClick={handleSubmit}
              className={`${styles.button} btn btn-primary mb-3 d-block mx-auto mx-sm-0 ms-sm-auto`}
            >
              提交訂單
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
