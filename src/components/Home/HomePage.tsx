import VideoHomepage from "../../assets/video-homepage.mp4"
import "../../App.scss"
// to use autoplay we must add muted because it impact on user experience
const HomePage = () => {
  return (
    <div>
      <div className="homepage-container">
        <video autoPlay muted loop>
          <source 
            src={VideoHomepage}
            type="video/mp4"
          />
        </video> 
        <div className="homepage-content">
        <div className="title-1">There's a better way to ask</div>
        <div className="title-2">
          If you make a boring Quiz,
          Your audience won't answer one.
          You have found one of the highest-quality quiz pages in the world by clicking on this website.
        </div>
        <div className="title-3">
          <button>Get's started. It's free</button>
        </div>
        <div className="title-4">
        
        </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
