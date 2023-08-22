import './User.scss'

// import dependencies
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import { useNavigate } from 'react-router-dom'

// import components
import { EditModal } from 'components/Modal/EditModal'
import { Tab } from 'components/Tab/Tab'

// import icons
import { ReactComponent as BackIcon } from 'assets/icons/back.svg'
import { TabContext } from 'context/TabContext'

export const User = () => {
  const { showModal, setShowModal } = useContext(ModalContext)
  const { setFollowTab } = useContext(TabContext)
  const navigate = useNavigate()

  return (
    <div className="userContainer">
      <div className="topSection">
        <div className="title">
          <div className="iconBox" onClick={() => navigate('/home')}>
            <BackIcon />
          </div>
          <div className="titleContent">
            <div className="name">Liz</div>
            <div className="tweets">45 推文</div>
          </div>
        </div>
        {showModal &&
          <EditModal />
        }
        <div className="userBox">
          <div className="coverBox">
            <img src="https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095_3x2.jpg" alt="coverImage" />
          </div>
          <div className="infoBox">
            <button onClick={() => {
              setShowModal(true)
              navigate('edit')
            }}>
              編輯個人資料
            </button>
            <div className="avatarBox">
              <img className="avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="avatar" />
            </div>
            <div className="info">
              <div className="name">Liz</div>
              <div className="account">@liz</div>
              <div className="description">I am a beautiful girl.</div>
              <div className="countData">
              <div className="following">
                <b onClick={() => {
                  setFollowTab('following')
                  navigate('following')
                }}>
                  10個
                </b>
                  追蹤中
              </div>
              <div className="follower">
                <b onClick={() => {
                  setFollowTab('follower')
                  navigate('follower')
                }}>
                  9位
                </b>
                  追蹤者
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <Tab />
    </div>
  )
}

// export const OtherUser = () => {
//   const { showModal, setShowModal } = useContext(ModalContext)
  
//   return (
//     <div className="userContainer">
//       <div className="topSection">
//         <div className="title">
//           <div className="iconBox">
//             <BackIcon />
//           </div>
//           <div className="titleContent">
//             <div className="name">Liz</div>
//             <div className="tweets">45 推文</div>
//           </div>
//         </div>
//         {showModal &&
//           <EditModal />
//         }
//         <div className="userBox">
//           <div className="coverBox">
//             <img src="https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095_3x2.jpg" alt="coverImage" />
//           </div>
//           <div className="infoBox">
//             <button onClick={() => setShowModal(true)}>
//             編輯個人資料
//             </button>
//             <div className="avatarBox">
//               <img className="avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="avatar" />
//             </div>
//             <div className="info">
//               <div className="name">Liz</div>
//               <div className="account">@liz</div>
//               <div className="description">I am a beautiful girl.</div>
//               <div className="countData">
//               <div className="following">
//                 <b onClick={() => navigate('follow')}>10個</b>追蹤中
//               </div>
//               <div className="follower">
//                 <b onClick={() => navigate('follow')}>39位</b>追蹤者
//               </div>
//             </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Tab />
//     </div>    
//   )
// }