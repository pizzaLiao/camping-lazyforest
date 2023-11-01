import React, { useState } from 'react'
import Link from 'next/link'
import InvoiceOptions from '@/components/invoiceOptions'
import styles from '@/styles/testcart.module.scss'
export default function CartIndex() {
  // 建立狀態變數

  //發票
  const [invoiceType, setInvoiceType] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [payMethod, setPayMethod] = useState('')

  // 訂購人資訊
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    memo: '',
  })

  const handleSubmit = () => {
    const ordercheckoutData = {
      ...buyerInfo,
      invoiceType: invoiceType,
      inputValue: inputValue,
      payMethod: payMethod,
    }
    localStorage.setItem('ordercheckoutData', JSON.stringify(ordercheckoutData))
  }

  return (
    <>
      <div className="container">
        <div>
          <div className=" cart-area">
            <div className="row">
              <div className="mb-5 text-center text-sm-start fs-1">
                CONFIRM | 預約確認
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
                    <input
                      type="text"
                      placeholder=" 訂購人姓名"
                      className={` ${styles.checkoutsize}`}
                      value={buyerInfo.name}
                      onChange={(e) =>
                        setBuyerInfo({ ...buyerInfo, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-auto col-sm-12 text-center mt-1">
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
                  </div>
                </div>
                <div className="col-md-auto col-sm-12 text-center mt-1">
                  <input
                    type="text"
                    placeholder=" 訂購人email"
                    className={styles.checkoutsize2}
                    value={buyerInfo.email}
                    onChange={(e) =>
                      setBuyerInfo({ ...buyerInfo, email: e.target.value })
                    }
                  />
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
          {/* 付款方式 */}
          <div>
            {/* 桌機版顯示 d-none d-md-block */}
            <div className=" border rounded mb-5">
              <div
                className={`fw-bold bg-dark text-light ${styles.checkouttitle}  align-items-center ps-4 d-none d-md-flex`}
              >
                付款方式
              </div>
              <div
                className={`mb-3 bg-dark text-light ${styles.title} d-flex align-items-center d-md-none`}
              >
                付款方式
              </div>
              <div className="mt-4 ms-5 ps-2 mb-3 pt-3">
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className={` ${styles.checkoutsize2}`}
                >
                  <option value="">請選擇付款方式</option>
                  <option value="現場付款">現場付款</option>
                  <option value="LINEPAY">LINEPAY</option>
                </select>
              </div>
            </div>
          </div>
          {/* 訂單備註 */}
          <div>
            {/* 桌機版顯示 d-none d-md-block */}
            <div className=" border rounded mb-5">
              <div
                className={`fw-bold bg-dark text-light ${styles.checkouttitle}  align-items-center ps-4 d-none d-md-flex`}
              >
                訂單備註
              </div>
              <div
                className={`mb-3 bg-dark text-light ${styles.title} d-flex align-items-center d-md-none`}
              >
                訂單備註
              </div>
              <div className="d-flex justify-content-center align-items-center p-4">
                <textarea
                  rows="5"
                  cols="143"
                  placeholder=" 有甚麼想告訴營主的嗎?"
                  value={buyerInfo.memo}
                  onChange={(e) =>
                    setBuyerInfo({ ...buyerInfo, memo: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
          </div>
          <Link href="/ordercheckout-end">
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
