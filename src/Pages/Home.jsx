import axios from 'axios';
import Card from '../Component/Card';
import urlAPI from '../Support/Constant/urlAPI';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import ModalDetail from '../Component/ModalDetail';

export default function Home() {
  const [restoList, setRestoList] = useState();
  const [pickRating, setPickRating] = useState('');
  const [open, setOpen] = useState(false);
//   const [detailId, setDetailId] = useState('');
  const [detailResto, setDetailResto] = useState('');
  const [limit, setLimit] = useState(8);
  const _searchName = useRef();
  const rating = [1, 2, 3, 4, 5];

  const getRestoList = async () => {
    try {
      const result = await axios.get(`${urlAPI}/list`);
      if (pickRating) {
        const filteredRestaurants = result.data.restaurants.filter(
          (restaurant) =>
            restaurant.rating >= pickRating &&
            restaurant.rating < Number(pickRating) + 1
        );
        setRestoList(filteredRestaurants);
      } else {
        setRestoList(result.data.restaurants);
      }
      _searchName.current.value = '';
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSearch = async () => {
    try {
      const result = await axios.get(
        `${urlAPI}/search?q=${_searchName.current.value}`
      );
      if (pickRating) {
        const filteredRestaurants = result.data.restaurants.filter(
          (restaurant) =>
            restaurant.rating >= pickRating &&
            restaurant.rating < Number(pickRating) + 1
        );
        setRestoList(filteredRestaurants);
      } else {
        setRestoList(result.data.restaurants);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onDetail = async (id) => {
    try {
      //   if (detailId) {
      //     }
      const result = await axios.get(`${urlAPI}/detail/${id}`);
      setDetailResto(result.data.restaurant);
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadMore = () => {
    setLimit(limit + limit);
  };

  const onClear = () => {
    getRestoList();
    _searchName.current.value = '';
    setPickRating('');
  };

  useEffect(() => {
    getRestoList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickRating]);

  return (
    <>
      <div>
        <div className="ml-10">
          <div className="text-5xl mt-3">Restaurants</div>
          <div className="my-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            ipsa accusamus corporis
            <br /> incidunt ea dignissimos, eum animi officia adipisci molestias
            aut.{' '}
          </div>
        </div>
        {/* bar filter */}
        <div className="flex justify-between items-center border-y border-black py-5 px-10">
          <div className="flex gap-5 items-center">
            <div>Filter By: </div>
            <select
              onChange={(e) => {
                setPickRating(e.target.value);
              }}
              value={pickRating}
              className="border-0 border-b"
            >
              <option value="none" hidden>
                Rating
              </option>
              {rating.map((value, index) => {
                return <option key={index}>{value}</option>;
              })}
            </select>
            <div className="flex items-center">
              <input
                type="text"
                ref={_searchName}
                placeholder="Search"
                className="border-0 border-b"
              />
              <button className="font-semibold" onClick={onSearch}>
                <AiOutlineSearch />
              </button>
            </div>
          </div>
          <button onClick={onClear} className="border px-5 py-2 hover:bg-gray-500 hover:text-white">
            CLEAR ALL
          </button>
        </div>
        <div></div>
        <div className="grid grid-cols-4 gap-5 justify-items-center mx-5 mt-5">
          <Card
            data={restoList}
            funcShow={setOpen}
            funcDetail={onDetail}
            limit={limit}
          />
        </div>
        {limit >= restoList?.length ? null : (
          <div className="flex justify-center my-10">
            <button
              onClick={loadMore}
              className="w-[350px] py-3 border border-[#002b56] text-[#002b56] hover:bg-gray-500 hover:text-white"
            >
              LOAD MORE
            </button>
          </div>
        )}
      </div>
      <ModalDetail show={open} funcShow={setOpen} data={detailResto} />
    </>
  );
}
