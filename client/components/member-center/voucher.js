import React from 'react'
import styles from './member-voucher.module.scss'
import Image from 'next/image'

export default function Voucher() {
  return (
    <>
      <div className={styles.screen}>
        <div className={styles.member_vouchers_wrapper}>
          <div className={styles.member_vouchers}>
            <div className={styles.my_voucher_title}>
              <p className={styles.voucher}>
                <span className={styles.text_wrapper}>VOUCHER</span>
                <span className={styles.span}>｜</span>
                <span className={styles.text_wrapper_2}>優惠卷</span>
              </p>
            </div>
            <div className={styles.my_vouchers}>
              <div className={styles.voucher_detail}>
                <div className={styles.th}>
                  <div className={styles.div}>商品明細</div>
                  <div className={styles.text_wrapper_3}>12</div>
                </div>
                <div className={styles.th_2}>
                  <div className={styles.div}>最高優惠</div>
                  <div className={styles.text_wrapper_3}>75%OFF</div>
                </div>
                <div className={styles.th_2}>
                  <div className={styles.div}>已累積省下</div>
                  <div className={styles.text_wrapper_3}>NT$ 1,000</div>
                </div>
                <div className={styles.frame_wrapper}>
                  <button className={styles.frame}>
                    <div className={styles.text_wrapper_4}>一鍵領取</div>
                  </button>
                </div>
              </div>
              <div className={styles.vouchers}>
                <div className={styles.vouches_staright}>
                  <div className={styles.coupon}>
                    <div className={styles.frame_2}>
                      <div className={styles.frame_3}>
                        <div className={styles.text_wrapper_5}>
                          2023/12/31 24:00前失效
                        </div>
                        <div className={styles.text_wrapper_6}>
                          低消NT$ 1,000
                        </div>
                      </div>
                      <div className={styles.frame_4}>
                        <div className={styles.text_wrapper_7}>優惠代碼</div>
                        <div className={styles.group}>
                          <div className={styles.overlap_group}>
                            <div className={styles.rectangle_wrapper}>
                              <div className={styles.rectangle} />
                            </div>
                            <div className={styles.frame_5}>
                              <div className={styles.text_wrapper_8}>
                                SUMMER95
                              </div>
                              <button className={styles.div_wrapper}>
                                <div className={styles.text_wrapper_9}>
                                  領取
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.frame_6}>
                      <div className={styles.text_wrapper_8}>夏日歡慶</div>
                      <div className={styles.text_wrapper_10}>95% OFF</div>
                    </div>
                    <div className={styles.line_wrapper}>
                      <Image
                        src="/member-center/dash_line.png"
                        alt="line"
                        width={2}
                        height={165}
                      />
                    </div>
                  </div>
                  <div className={styles.coupon}>
                    <div className={styles.frame_2}>
                      <div className={styles.frame_3}>
                        <div className={styles.text_wrapper_5}>
                          2023/12/31 24:00前失效
                        </div>
                        <div className={styles.text_wrapper_6}>
                          低消NT$ 1,000
                        </div>
                      </div>
                      <div className={styles.frame_4}>
                        <div className={styles.text_wrapper_7}>優惠代碼</div>
                        <div className={styles.group}>
                          <div className={styles.overlap_group}>
                            <div className={styles.rectangle_wrapper}>
                              <div className={styles.rectangle} />
                            </div>
                            <div className={styles.frame_5}>
                              <div className={styles.text_wrapper_8}>
                                SUMMER95
                              </div>
                              <div className={styles.div_wrapper}>
                                <div className={styles.text_wrapper_9}>
                                  領取
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.frame_6}>
                      <div className={styles.text_wrapper_8}>夏日歡慶</div>
                      <div className={styles.text_wrapper_10}>95% OFF</div>
                    </div>
                    <div className={styles.line_wrapper}>
                      <Image
                        src="/member-center/dash_line.png"
                        alt="line"
                        width={2}
                        height={165}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.vouches_staright}>
                  <div className={styles.coupon}>
                    <div className={styles.frame_2}>
                      <div className={styles.frame_3}>
                        <div className={styles.text_wrapper_5}>
                          2023/12/31 24:00前失效
                        </div>
                        <div className={styles.text_wrapper_6}>
                          低消NT$ 1,000
                        </div>
                      </div>
                      <div className={styles.frame_4}>
                        <div className={styles.text_wrapper_7}>優惠代碼</div>
                        <div className={styles.group}>
                          <div className={styles.overlap_group}>
                            <div className={styles.rectangle_wrapper}>
                              <div className={styles.rectangle} />
                            </div>
                            <div className={styles.frame_5}>
                              <div className={styles.text_wrapper_8}>
                                SUMMER95
                              </div>
                              <div className={styles.div_wrapper}>
                                <div className={styles.text_wrapper_9}>
                                  領取
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.frame_6}>
                      <div className={styles.text_wrapper_8}>夏日歡慶</div>
                      <div className={styles.text_wrapper_10}>95% OFF</div>
                    </div>
                    <div className={styles.line_wrapper}>
                      <Image
                        src="/member-center/dash_line.png"
                        alt="line"
                        width={2}
                        height={165}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
