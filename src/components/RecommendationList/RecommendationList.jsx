import './RecommendationList.scss'

import { Recommendation } from './Recommendation'

const fake = [{id:1},{id:2},{id:3},{id:4},{id:5}]

export const RecommendationList = () => {

  const recommendations = fake.map(recommendation=>{
    return <Recommendation key={recommendation.id} recommendation={recommendation}/>
  })

  return (
    <div className="recommendationContainer">
      <div className="title">推薦跟隨</div>
      <div className="people">
        {recommendations}
      </div>
    </div>
  )
}