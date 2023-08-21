import './EditModal.scss'

// import dependencies
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'

// import icons
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'
import { ReactComponent as AddPhotoIcon } from 'assets/icons/add_photo_hollow.svg'

export const EditModal = () => {
  const { setShowModal } = useContext(ModalContext)

  return (
    <div className="editModalBox">
      <div className="topBar">
        <div className="iconBox" onClick={() => setShowModal(false)}>
          <CloseIcon className="closeIcon" />
        </div>
        <div className="title">
          編輯個人資料
        </div>
        <button className="save">儲存</button>
      </div>
      <div className="coverBox">
        <img src="https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095_3x2.jpg" alt="cover"/>
        <CloseIcon style={{fill: 'white'}}className="closeIcon" />
        <AddPhotoIcon className="photoIcon" />
      </div>
      <div className="editSection">
        <div className="avatarBox">
          <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="avatar"/>
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