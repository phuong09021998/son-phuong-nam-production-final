import React, { useEffect, useState } from 'react';
import styles from './Other.module.scss'
import { connect } from 'react-redux'
import { getSiteInfo, getSiteCarousel, updateSiteCarousel, updateSiteInfo } from 'redux/actions/admins'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

function AdminOthers({ carousels, siteInfos, updateSiteCarousel,getSiteInfo, getSiteCarousel, updateSiteInfo }: any) {
  
  const [carouselLoading, setCarouselLoading] = useState(true)
  const [siteInfoLoading, setSiteInfoLoading] = useState(true)
  const [carouseIndex, setCarouselIndex] = useState(0)

  useEffect(() => {
    getSiteInfo()
    getSiteCarousel()
  }, [])

  useEffect(() => {
    if (carousels) {
      setCarouselLoading(false)
    }
  }, [carousels])

  useEffect(() => {
    if (siteInfos) {
      setSiteInfoLoading(false)
    }
  }, [siteInfos])

  const handleUploadCarousel = (e: any) => {
    // console.log(e.target.files)c
    // console.log(index)
    updateSiteCarousel({key: carouseIndex, data: e.target.files[0]})
    setCarouselLoading(true)
  }

  const handleSetIndex = (index: number) => {
    setCarouselIndex(index)
  }

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    // console.log(e)
    // @ts-ignore
    const address = document.getElementById('address').value
    // @ts-ignore
    const zalo = document.getElementById('zalo').value
    // @ts-ignore
    const facebook = document.getElementById('facebook').value
    // @ts-ignore
    const phone = document.getElementById('phone').value
    // @ts-ignore
    const gmail = document.getElementById('gmail').value
    console.log(address, zalo, facebook, phone, gmail)
    updateSiteInfo({infos: {address, zalo, facebook, phone, gmail}})
  }

  return <div className={styles.contentWrapper}>
    <div className={styles.item}>
      <div className={styles.title}>
        Hình ảnh băng chuyền
      </div>
      {!carouselLoading ? Object.values(carousels).map((item: any, index: number) => (
        
        <div className={styles.carouselItem} key={index}>
          <div className={styles.name}>Ảnh {index + 1}</div>
          {/* {console.log(i)} */}
          <div className={styles.img}>
            <img src={`data:${item.contentType};base64,${Buffer.from(item.data)}`} alt="Thi công sơn epoxy, sơn nền nhà xưởng hcm" />
          </div>
          <div className={styles.input}>
            {/* @ts-ignore */}
            <label htmlFor="carousel-upload" onClick={() => handleSetIndex(index)}>Thay đổi ảnh</label>
            <input type="file" name="img" accept="image/*" id="carousel-upload" hidden onChange={(e) => handleUploadCarousel(e)}/>
          </div>
        </div>
      )): <div className={styles.loading}><CircularProgress /></div>}
    </div>
    <div className={styles.item} style={{marginTop: '5em'}}>
      <div className={styles.title}>
        Thông tin liên hệ
      </div>
      {siteInfoLoading ?  <div className={styles.loading}><CircularProgress /></div> : (
        <form onSubmit={e => handleSubmitForm(e)} id="site-info">
          <div className={styles.formItem}>
            {console.log(siteInfos)}
            <div className={styles.name} >
              Địa chỉ:
            </div>
            <input type="text" defaultValue={siteInfos.address} id="address"/>
          </div>
          <div className={styles.formItem}>
            <div className={styles.name}>
              Facebook:
            </div>
            <input type="text" defaultValue={siteInfos.facebook} id="facebook"/>
          </div>
          <div className={styles.formItem}>
            <div className={styles.name}>
              Zalo:
            </div>
            <input type="text" defaultValue={siteInfos.zalo} id="zalo"/>
          </div>
          <div className={styles.formItem}>
            <div className={styles.name}>
              Gmail:
            </div>
            <input type="text" defaultValue={siteInfos.gmail} id="gmail"/>
          </div>
          <div className={styles.formItem}>
            <div className={styles.name}>
              Di động:
            </div>
            <input type="text" defaultValue={siteInfos.phone} id="phone"/>
          </div>
          <Button variant="contained" style={{backgroundColor: '#318fb5', color: 'white'}} form="site-info" type="submit">
            Cập nhật
          </Button>
        </form>
      )
      }
    </div>
  </div>;
}

const mapStateToProps = (state: any) => ({
  carousels: state.admins.carousels,
  siteInfos: state.admins.siteInfos
})

export default connect(mapStateToProps, { getSiteInfo,updateSiteCarousel, getSiteCarousel, updateSiteInfo })(AdminOthers)