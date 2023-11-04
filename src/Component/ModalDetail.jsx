import { Modal } from 'flowbite-react';
import urlAPI from '../Support/Constant/urlAPI';
import Rating from 'react-rating';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export default function ModalDetail(props) {
  return (
    <>
      <Modal
        dismissible
        show={props.show}
        onClose={() => {
          props.funcShow(false);
        }}
      >
        <Modal.Header>
          <div className="text-xl">Detail Restaurant</div>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img
              src={`${urlAPI}/images/large/${props.data?.pictureId}`}
              alt="gambar"
              className="w-full"
            ></img>
            <div className="text-2xl my-2">{props.data?.name}</div>
            <div>{props.data?.description}</div>
            <div className="mt-2">{props.data?.city}</div>
            <div className="">{props.data?.address}</div>
            <div className="mt-2 border-t pt-2">
              <Rating
                start={0}
                stop={5}
                step={1}
                direction="ltr"
                readonly={true}
                initialRating={props.data?.rating}
                emptySymbol={<BsStar color="#002b56" />}
                fullSymbol={<BsStarFill color="#002b56" />}
              />
            </div>
            <div className="flex justify-between border-b pb-2">
              <div>{props.data?.rating}</div>
              <div className="flex items-center gap-2">
                <IoIosArrowDown />
                <div>
                  Customer reviews ({props.data?.customerReviews?.length})
                </div>
              </div>
            </div>
            <div className='pt-2'>
              <div>Menu :</div>
              <div className='flex items-center gap-2'>
                Foods ({props.data?.menus?.foods?.length})<IoIosArrowDown />
              </div>
              <div className='flex items-center gap-2'>
                Drinks ({props.data?.menus?.drinks?.length})<IoIosArrowDown />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
