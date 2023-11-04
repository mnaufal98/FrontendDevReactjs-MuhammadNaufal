import Rating from 'react-rating';
import { BsStar, BsStarFill } from 'react-icons/bs';
import urlAPI from '../Support/Constant/urlAPI';

export default function Card(props) {
    const limitData = props.data?.slice(0, props.limit)
  return (
    <>
      {limitData?.length === 0 ? (
        <div>Data Not Found...</div>
      ) : (
        limitData?.map((value, index) => {
          return (
            <div key={index} className=" w-[300px] mb-5">
              <img
                src={`${urlAPI}/images/small/${value.pictureId}`}
                alt="gambar"
                className="h-[200px]"
              ></img>
              <div className="text-2xl my-2">{value.name}</div>
              <div className="my-2">
                <Rating
                  start={0}
                  stop={5}
                  step={1}
                  direction="ltr"
                  readonly={true}
                  initialRating={value.rating}
                  emptySymbol={<BsStar color="#002b56" />}
                  fullSymbol={<BsStarFill color="#002b56" />}
                />
              </div>
              <div className="mb-2">{value.city}</div>
              <button
                onClick={() => {props.funcShow(true); props.funcDetail(value.id)}}
                className="py-3 border w-full bg-[#002b56] text-white"
              >
                LEARN MORE
              </button>
            </div>
          );
        })
      )}
    </>
  );
}
