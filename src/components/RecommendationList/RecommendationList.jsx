import './RecommendationList.scss'

import { Recommendation } from './Recommendation'

export const RecommendationList = () => {
  return (
    <div className="recommendationContainer">
      <div className="title">推薦跟隨</div>
      <div className="people">
        <Recommendation />
      </div>
    </div>
  )
}