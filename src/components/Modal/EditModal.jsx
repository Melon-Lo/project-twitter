import './EditModal.scss'

// import dependencies
import { useContext, useState, useEffect } from 'react'
import { ModalContext } from 'context/ModalContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

// import icons
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'
import { ReactComponent as AddPhotoIcon } from 'assets/icons/add_photo_hollow.svg'

// api
import { putUserData } from 'api/users'

export const EditModal = ({ avatar, banner }) => {
  const { setShowModal } = useContext(ModalContext)
  const navigate = useNavigate()

  // 設置輸入資料的狀態
  const [name, setName] = useState('')
  const [introduction, setIntroduction] = useState('')

  // 字數限制
  const nameLimit = 50
  const introductionLimit = 160

  // 設置驗證狀態
  const [nameIsValid, setNameIsValid] = useState(false)
  const [introductionIsValid, setIntroductionIsValid] = useState(false)

  // 驗證提示
  const [nameAlert, setNameAlert] = useState(false)
  const [introductionAlert, setIntroductionAlert] = useState(false)

  useEffect(() => {
    name ? setNameIsValid(true) : setNameIsValid(false)
    introduction ? setIntroductionIsValid(true) : setIntroductionAlert(false)
  })

  // 表單送出函式，當驗證全通過時才會送出
  const onFormSubmit = async (e) => {
    e.preventDefault()

    // 認證不通過：不送出
    if(!nameIsValid || !introductionIsValid) {
      return
    }

    // const res = await putUserData({id, name, introduction, banner})

    // 等api修改完成
    // const res = await putUserData({id, account, name, email})

    // 認證通過：送出資料，彈出成功視窗
    Swal.fire("修改成功！")

    // 送出後清空
    setName('')
    setIntroduction('')
  }

  // 驗證函式
  function checkName(inputValue) {
    // 如果名字大於50個字符，不通過
    if(inputValue.trim().length > nameLimit) {
      setNameAlert(true)
    } else {
      setNameAlert(false)
      setNameIsValid(true)
    }
  }
  function checkIntroduction(inputValue) {
    // 如果自我介紹大於160個字符，不通過
    if(inputValue.trim().length > introductionLimit) {
      setIntroductionAlert(true)
    } else {
      setIntroductionAlert(false)
      setIntroductionIsValid(true)
    }
  }

  return (
    <div className="editModalBox">
      <div className="topBar">
        <div className="iconBox" onClick={() => {
          setShowModal(false)
          navigate('/user/self')
        }}>
          <CloseIcon className="closeIcon" />
        </div>
        <div className="title">
          編輯個人資料
        </div>
        <button className="save">儲存</button>
      </div>
      <div className="coverBox">
        <img src={banner} alt="cover"/>
        <CloseIcon style={{fill: 'white'}}className="closeIcon" />
        <AddPhotoIcon className="photoIcon" />
      </div>
      <div className="editSection">
        <div className="avatarBox">
          <img src={avatar} alt="avatar"/>
        </div>
        <div className="avatarBoxCover">
          <AddPhotoIcon className="photoIcon" />
          <input 
            type="file" 
            accept="image/jpeg, image/png"
            onChange={(e) => {
              const selectedFile = e.target.files[0]
              console.log(selectedFile)
            }}
          />
        </div>
        <div className="edit">
          <div className="nameInput">
            <div className="label">名稱</div>
            <input 
              name="name" 
              type="text"
              onChange={(e) => {
                checkName(e.target.value)
                setName(e.target.value)
              }}
            />
            {nameAlert && <div className='nameValidationAlert'>名稱字數超過上限！（最多50個字）</div>}
            <div className="words">{name.length}/{nameLimit}</div>
          </div>
          <div className="introInput">
            <div className="label">自我介紹</div>
            <textarea 
              name="" 
              id="" 
              cols="30" 
              rows="10"
              onChange={(e) => {
                checkIntroduction(e.target.value)
                setIntroduction(e.target.value)
              }}
            ></textarea>
            {introductionAlert && <div className='introValidationAlert'>名稱字數超過上限！（最多50個字）</div>}
            <div className="words">{introduction.length}/{introductionLimit}</div>
          </div>
        </div>
      </div>
    </div>
  )
}