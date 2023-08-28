import './Modal.scss'

// import dependencies
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

// import components
import { Tweet, ReplyInfo } from 'components/TweetList/Tweet/Tweet'

// import icons
import { ReactComponent as Close } from 'assets/icons/close.svg'
import { useState, useEffect } from 'react'

// import api
import { postTweet, getAllTweets } from 'api/tweets'

const CloseIcon = () => {
  const path = useLocation().pathname
  let toPath = ''

  if (path === '/main/tweet' || path === '/main/reply_modal') {
    toPath = '/main'
  } else if (path === '/reply_list/reply_modal') {
    toPath = '/reply_list'
  }

  return (
    <Link to={toPath}>
      <Close className='closeIcon' />
    </Link>
  )
}

export const Modal = ({ placeholder, buttonContext, showModal, setShowModal, showReplyModal, setShowReplyModal, type }) => {
  const navigate = useNavigate()

  // 取得使用者資料
  const { avatar } = JSON.parse(localStorage.getItem("userInfo"))

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
    await postTweet({ description: content })
  
    // 發佈成功提示
    Swal.fire({
      position: 'top',
      title: '貼文已發佈！',
      timer: 1000,
      icon: 'success',
      showConfirmButton: false,
    });

    // 關閉modal並清空content
    setShowModal(false)
    setContent('')
    navigate('/main')
  }

  useEffect(() => {
    content ? setContentIsValid(true) : setContentIsValid(false)
  })

  const checkModalType = ()  => {
    if(type === 'post') {
      setShowModal(false)
    } else if(type === 'reply')
      setShowReplyModal(false)
  }

  return (
    <div className={clsx('', {postModalBox: showModal, replyModalBox: showReplyModal })}>
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
                checkModalType()
              } 
            })

            // 若無內容，直接關閉視窗
          } else {
            checkModalType()
          }
        }}>
          <CloseIcon onClick={() => checkModalType()}/>
        </div>
      </div>
      {showReplyModal &&
        <Tweet children={<ReplyInfo />} />
      }
      <div className="modalAvatarBox">
        <img className="avatar" src={avatar} alt="avatar" />
      </div>
      <textarea 
        name="tweet" 
        className="addTweetContent" 
        type="text" 
        placeholder={placeholder} 
        onChange={(e) => {
          checkContent(e.target.value)
          setContent(e.target.value)
        }}
      >
      </textarea>
      {alert && <div className='alert'>推文字數超過上限！（最多160字）</div>}
      <div className="wordCount">
        {contentLength}/{contentLimit}
      </div>
      <button 
        className={contentIsValid ? 'submitValid' : 'submitInvalid'}
        onClick={(e) => onSubmit(e)}
      >
        {buttonContext}
      </button>
    </div>
  )
}