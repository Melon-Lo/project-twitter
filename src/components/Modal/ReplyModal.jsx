import './ReplyModal.scss'

// import components
import { Tweet, ReplyInfo } from 'components/TweetList/Tweet/Tweet'

// import dependencies
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

// import icons
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// api
import { postReply } from 'api/tweets'

export const ReplyModal = ({ setShowReplyModal }) => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname

  const location = useLocation()
  const { id, name, account, avatar, description, createdAt } = location.state

  // 取得使用者資料
  const userAvatar = JSON.parse(localStorage.getItem("userInfo")).avatar

  // 設置textarea的狀態
  const [content, setContent] = useState('')

  // 數字統計與字數限制
  const contentLength = content.length
  const contentLimit = 160

  // 設置驗證狀態
  const [contentIsValid, setContentIsValid] = useState(false)

  // 設置驗證提示，若沒通過則跳出
  const [alert, setAlert] = useState(false)

  // 驗證函式，每次textarea改變時執行
  function checkContent(inputValue) {
    // 如果推文超過160個字符，不通過
    if(inputValue.trim().length > contentLimit) {
      return setAlert(true)
    } else {
      setAlert(false)
      setContentIsValid(true)
    }
  }

  // 發佈貼文函式
  const onSubmit = async (e) => {
    e.preventDefault()

    // 驗證不通過：不送出
    if(!contentIsValid) return

    // 發佈貼文
    await postReply(id, { comment: content })
  
    // 發佈成功提示
    Swal.fire({
      position: 'top',
      title: '回覆已發佈！',
      timer: 1000,
      icon: 'success',
      showConfirmButton: false,
    });

    // 關閉modal並清空content
    setShowReplyModal(false)
    setContent('')
    
    navigate('/main')
  }

  useEffect(() => {
    content ? setContentIsValid(true) : setContentIsValid(false)
  })

  return (
    <div className="replyModalBox">
      <div className="topBar">
        <div className="iconBox" onClick={() => {
          // 如果已經有輸入內容，跳出「確定退出」提示
          if(content) {
            Swal.fire({
              title: "你確定要退出嗎？",
              text: "已輸入的內容不會被保存哦！",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "確定",
              confirmButtonColor: "#FF6600",
              cancelButtonText: "取消"
            }).then((result) => {

              // 按下「確認」後，執行動作
              if(result.isConfirmed) {
                setShowReplyModal(false)
                navigate('/main')
              } 
            })

            // 若無內容，直接關閉視窗
          } else {
            setShowReplyModal(false)
            if(pathname === '/reply_list/reply_modal') {
              navigate('/reply_list', {state: { id, name, account, avatar, description, createdAt }})
            } else if(pathname === '/main/reply_modal') {
              navigate('/main')
            }
          }
        }}>
          <CloseIcon className='closeIcon'/>
        </div>
      </div>
      {/* 等抓到該tweet資料 */}
      <Tweet 
      // 這個是登入者的資料，不是發文的人
        avatar={avatar} 
        name={name} 
        account={account}
        description={description}
        createdAt={createdAt}
        updatedAt={createdAt}
        children={<ReplyInfo account={account} />} 
      />
      <div className="modalAvatarBox">
        <img className="avatar" src={userAvatar} alt="avatar" />
      </div>
      <textarea 
        name="tweet"
        className="addTweetContent" 
        type="text" 
        placeholder="推你的回覆" 
        onChange={(e) => {
          checkContent(e.target.value)
          setContent(e.target.value)
        }}
      >
      </textarea>
      {alert && <div className='alert'>回覆字數超過上限！（最多160字）</div>}
      <div className="wordCount">
        {contentLength}/{contentLimit}
      </div>
      <button
        className={contentIsValid ? 'submitValid' : 'submitInvalid'}
        onClick={(e) => onSubmit(e)}
      >
        回覆
      </button>
    </div>
  )
}