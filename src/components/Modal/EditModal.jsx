import './EditModal.scss'

// import dependencies
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import { useNavigate } from 'react-router-dom'

// import icons
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'
import { ReactComponent as AddPhotoIcon } from 'assets/icons/add_photo_hollow.svg'

export const EditModal = ({ avatar, banner }) => {
  const { setShowModal } = useContext(ModalContext)
  const navigate = useNavigate()

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
        <div className="edit">
          <div className="nameInput">
            <div className="label">名稱</div>
            <input name="name" type="text"/>
            <div className="words">8/50</div>
          </div>
          <div className="introInput">
            <div className="label">自我介紹</div>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <div className="words">9/160</div>
          </div>
        </div>
      </div>
    </div>
  )
}