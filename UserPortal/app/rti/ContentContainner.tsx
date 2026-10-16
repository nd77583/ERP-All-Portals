import RightCol from './right_col'
import Mannual from './Mannual'

const ContentContainner = () => {
  return (
    <div className="w-full bg-[#F8F9FF] px-5 py-6">
      <div className="mx-auto grid w-full w-full grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-6">
        <Mannual />
        <RightCol />
      </div>
    </div>
  )
}

export default ContentContainner