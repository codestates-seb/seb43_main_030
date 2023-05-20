import PaginationCuston from 'react-js-pagination';
import { ReactComponent as ArrowNext } from '../images/arrow-next.svg';
import { ReactComponent as ArrowPrev } from '../images/arrow-prev.svg';

function Pagination(props) {
  const {
    currentPage,
    itemsCountPerPage,
    onChange,
    // pageRageDisplayed = 5,
    count,
  } = props;
  return (
    <div className="pagination gab-2 mt-50 flex justify-center p-16">
      <PaginationCuston
        activePage={currentPage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={count}
        onChange={onChange}
        pageRageDisplayed={5}
        prevPageText={<ArrowPrev />}
        nextPageText={<ArrowNext />}
        lastPageText={
          <div className="flex">
            <ArrowNext className="mr-[-6px]" />
            <ArrowNext className="mr-[-3px]" />
          </div>
        }
        firstPageText={
          <div className="flex">
            <ArrowPrev className="mr-[-6px]" />
            <ArrowPrev className="mr-[2px]" />
          </div>
        }
      />
    </div>
  );
}

export default Pagination;
