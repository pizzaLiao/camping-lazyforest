import React, { useState, useEffect, useRef } from 'react'
import styles from './member-order.module.scss'
import Image from 'next/image'
import OrderItem from './order-item'
import ReactPaginate from 'react-paginate'

export default function OrderRecord() {
  console.log({ component: 'OrderRecord' })
  const [orders, setOrders] = useState([])
  const [ordersFilter, setOrdersFilter] = useState([])
  const [selectedOrder, setSelectedOrder] = useState({})
  const [orderOffset, setOrderOffset] = useState(0)
  const pageRootRef = useRef(null)

  useEffect(() => {
    const loadOrderList = async () => {
      console.log({ action: 'loadOrderList' })
      try {
        const response = await fetch(
          'http://localhost:3005/order-record/my_orders',
          {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
          }
        )

        const data = await response.json()
        console.log({ data })
        setOrders(data)
        setOrdersFilter(data.slice(0, 3))
      } catch (error) {
        console.log({ error })
      }
    }

    loadOrderList()
  }, [])

  // 點選分頁
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 3) % orders.length
    setOrderOffset(newOffset)
  }
  useEffect(() => {
    if (pageRootRef.current) {
      // 滾動到根元素的頂部
      pageRootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setOrdersFilter(orders.slice(0 + orderOffset, 3 + orderOffset))
  }, [orderOffset])

  return (
    <>
      <div className={styles.screen} ref={pageRootRef}>
        <div className={styles.all_wrapper}>
          <div className={styles.all}>
            <div className={styles.div_wrapper}>
              <p className={styles.order_record}>
                <span className={styles.text_wrapper}>ORDER RECORD</span>
                <span className={styles.span}>｜</span>
                <span className={styles.text_wrapper_2}>訂單記錄</span>
              </p>
            </div>
            {/* <div className={styles.search_bar}>
              <div className={styles.date_search}>
                <div className={styles.date_select}>
                  <div className={styles.text_wrapper_3}>日期區間查詢</div>
                  <div className={styles.frame}>
                    <div className={styles.input}>
                      <input className={styles.text_input} />
                      <FaRegCalendarDays className={styles.icon} />
                    </div>
                    <FaRegWindowMinimize />
                    <div className={styles.input}>
                      <input className={styles.text_input} />
                      <FaRegCalendarDays className={styles.icon} />
                    </div>
                  </div>
                </div>
                <div className={styles.btn_search}>
                  <div className={styles.div}>查詢</div>
                </div>
              </div>
              <div className={styles.btn_all_order}>
                <div className={styles.text_btn}>所有訂單</div>
                <FaCircleChevronDown className={styles.icon} />
              </div>
            </div>

            <div className={styles.div_wrapper}>
              <div className={styles.text_wrapper_6}>
                您的查詢區間為2023/08/01至2023/09/01，結果如下
              </div>
            </div> */}

            {ordersFilter &&
              ordersFilter.map((order) => (
                <div key={order.order_id} className={styles.oreder_list_close}>
                  <OrderItem order={order} />
                </div>
              ))}
            {/* 分頁 */}
            <div className="mt-5">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={Math.ceil(orders.length / 3)}
                previousLabel="<"
                renderOnZeroPageCount={null}
                // page-item
                pageClassName="pageBtn"
                previousClassName="pageBtn goBtn"
                nextClassName="pageBtn goBtn"
                breakClassName="pageBtn"
                //active
                activeClassName="pageActive"
                //container
                containerClassName="pageContainer"
                //link
                pageLinkClassName="pageLink"
                previousLinkClassName="pageLink goLink"
                nextLinkClassName="pageLink goLink"
                breakLinkClassName="pageLink"
              />
            </div>
            {/* <div className={styles.order_past_list}>
              <div className={styles.div_2}>
                <div className={styles.th}>
                  <div className={styles.th_2}>訂單編號</div>
                </div>
                <div className={styles.th}>
                  <div className={styles.th_2}>訂單日期</div>
                </div>
                <div className={styles.th_wrapper}>
                  <div className={styles.th_2}>訂單狀態</div>
                </div>
                <div className={styles.th}>
                  <div className={styles.th_2}>訂單總額</div>
                </div>
                <div className={styles.th}>
                  <div className={styles.th_2}>{''}</div>
                </div>
              </div>
              <div className={styles.tr_th}>
                <div className={styles.th_3}>
                  <div className={styles.th_4}>23071870987771</div>
                </div>
                <div className={styles.th_3}>
                  <div className={styles.th_4}>2023/08/18 21:29</div>
                </div>
                <div className={styles.th_5}>
                  <p className={styles.p}>
                    <span className={styles.text_wrapper_7}>已完成</span>
                    <span className={styles.text_wrapper_8}>&nbsp;</span>
                  </p>
                </div>
                <div className={styles.th_3}>
                  <div className={styles.th_4}>NT$ 36,900</div>
                </div>
                <div className={styles.th_3}>
                  <button className={styles.btn}>
                    <div className={styles.text_wrapper_9}>商品明細</div>
                    <FaCircleChevronUp className={styles.circle_chevron_down} />
                  </button>
                </div>
              </div>

              <div className={styles.frame_2}>
                <div className={styles.div_2}>
                  <div className={styles.th_6}>
                    <div className={styles.th_2}>商品</div>
                  </div>
                  <div className={styles.th_7}>
                    <div className={styles.th_8}>優惠</div>
                  </div>
                  <div className={styles.th_9}>
                    <p className={styles.th_10}>
                      <span className={styles.text_wrapper_10}>單價</span>
                      <span className={styles.text_wrapper_8}>&nbsp;</span>
                    </p>
                  </div>
                  <div className={styles.th_11}>
                    <div className={styles.th_8}>數量</div>
                  </div>
                  <div className={styles.th_12}>
                    <div className={styles.th_8}>小計</div>
                  </div>
                </div>
                <div className={styles.orderlist_detail}>
                  <div className={styles.th_13}>
                    <Image
                      src="/member-center/product.png"
                      alt="product"
                      width={113}
                      height={113}
                    />
                    <p className={styles.text_wrapper_11}>
                      TAKIBI Canvas Bell Hat 漁夫帽 - 橄欖綠
                    </p>
                  </div>
                  <div className={styles.th_3}>
                    <div className={styles.th_4}>夏日歡慶95折</div>
                  </div>
                  <div className={styles.th_5}>
                    <div className={styles.flexcontainer}>
                      <p className={styles.text}>
                        <span className={styles.text_wrapper_12}>
                          NT$ 2,000
                          <br />
                        </span>
                      </p>
                      <p className={styles.text}>
                        <span className={styles.text_wrapper_13}>
                          NT$ 1,700
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className={styles.th_14}>
                    <div className={styles.th_4}>1</div>
                  </div>
                  <div className={styles.th_15}>
                    <div className={styles.th_16}>NT$ 1,700</div>
                  </div>
                </div>
                <Image
                  src="/member-center/line.png"
                  alt="line"
                  width={1056}
                  height={1}
                />
                <div className={styles.orderlist_detail_2}>
                  <div className={styles.th_13}>
                    <Image
                      src="/member-center/product.png"
                      alt="product"
                      width={113}
                      height={113}
                    />
                    <p className={styles.text_wrapper_11}>
                      TAKIBI Canvas Bell Hat 漁夫帽 - 橄欖綠
                    </p>
                  </div>
                  <div className={styles.th_3}>
                    <div className={styles.th_4}>夏日歡慶95折</div>
                  </div>
                  <div className={styles.th_5}>
                    <div className={styles.flexcontainer}>
                      <p className={styles.text}>
                        <span className={styles.text_wrapper_12}>
                          NT$ 2,000
                          <br />
                        </span>
                      </p>
                      <p className={styles.text}>
                        <span className={styles.text_wrapper_13}>
                          NT$ 1,700
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className={styles.th_14}>
                    <div className={styles.th_4}>1</div>
                  </div>
                  <div className={styles.th_15}>
                    <div className={styles.th_16}>NT$ 1,700</div>
                  </div>
                </div>
                <Image
                  src="/member-center/line.png"
                  alt="line"
                  width={1056}
                  height={1}
                />
                <div className={styles.orderlist_detail_2}>
                  <div className={styles.th_13}>
                    <Image
                      src="/member-center/product.png"
                      alt="product"
                      width={113}
                      height={113}
                    />
                    <p className={styles.text_wrapper_11}>
                      TAKIBI Canvas Bell Hat 漁夫帽 - 橄欖綠
                    </p>
                  </div>
                  <div className={styles.th_3}>
                    <div className={styles.th_4}>夏日歡慶95折</div>
                  </div>
                  <div className={styles.th_5}>
                    <div className={styles.flexcontainer}>
                      <p className={styles.text}>
                        <span className={styles.text_wrapper_12}>
                          NT$ 2,000
                          <br />
                        </span>
                      </p>
                      <p className={styles.text}>
                        <span className={styles.text_wrapper_13}>
                          NT$ 1,700
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className={styles.th_14}>
                    <div className={styles.th_4}>1</div>
                  </div>
                  <div className={styles.th_15}>
                    <div className={styles.th_16}>NT$ 1,700</div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className={styles.oreder_list_close}>
              <div className={styles.div_2}>
                <div className={styles.th}>
                  <div className={styles.th_2}>訂單編號</div>
                </div>
                <div className={styles.th}>
                  <div className={styles.th_2}>訂單日期</div>
                </div>
                <div className={styles.th_wrapper}>
                  <div className={styles.th_2}>訂單狀態</div>
                </div>
                <div className={styles.th}>
                  <div className={styles.th_2}>訂單總額</div>
                </div>
                <div className={styles.th}>
                  <div className={styles.th_2}>{''}</div>
                </div>
              </div>
              <div className={styles.tr_th}>
                <div className={styles.th_3}>
                  <div className={styles.th_4}>23071870987771</div>
                </div>
                <div className={styles.th_3}>
                  <div className={styles.th_4}>2023/08/18 21:29</div>
                </div>
                <div className={styles.th_5}>
                  <p className={styles.p}>
                    <span className={styles.text_wrapper_7}>已完成</span>
                    <span className={styles.text_wrapper_8}>&nbsp;</span>
                  </p>
                </div>
                <div className={styles.th_3}>
                  <div className={styles.th_4}>NT$ 36,900</div>
                </div>
                <div className={styles.th_3}>
                  <button className={styles.btn}>
                    <div className={styles.text_wrapper_9}>商品明細</div>
                    <FaCircleChevronDown
                      className={styles.circle_chevron_down}
                    />
                  </button>
                </div>
              </div>
            </div> */}
            {/* <div className={styles.oreder_list_close}>
              <div className={styles.div_2}>
                <div className={styles.th}>
                  <div className={styles.th_2}>訂單編號</div>
                </div>
                <div className={styles.th}>
                  <div className={styles.th_2}>訂單日期</div>
                </div>
                <div className={styles.th_wrapper}>
                  <div className={styles.th_2}>訂單狀態</div>
                </div>
                <div className={styles.th}>
                  <div className={styles.th_2}>訂單總額</div>
                </div>
                <div className={styles.th}>
                  <div className={styles.th_2}>{''}</div>
                </div>
              </div>
              <div className={styles.tr_th}>
                <div className={styles.th_3}>
                  <div className={styles.th_4}>23071870987771</div>
                </div>
                <div className={styles.th_3}>
                  <div className={styles.th_4}>2023/08/18 21:29</div>
                </div>
                <div className={styles.th_5}>
                  <p className={styles.p}>
                    <span className={styles.text_wrapper_7}>已完成</span>
                    <span className={styles.text_wrapper_8}>&nbsp;</span>
                  </p>
                </div>
                <div className={styles.th_3}>
                  <div className={styles.th_4}>NT$ 36,900</div>
                </div>
                <div className={styles.th_3}>
                  <button className={styles.btn}>
                    <div className={styles.text_wrapper_9}>商品明細</div>
                    <FaCircleChevronDown
                      className={styles.circle_chevron_down}
                    />
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}
