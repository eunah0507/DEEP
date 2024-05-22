import ReactPaginate from "react-paginate";
import { PaginateContainer } from "./Paginate.styles";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

function Paginate({ pageCount, onPageChange, currentPage }) {
    return (
        <PaginateContainer>
            <ReactPaginate
                previousLabel={<GoChevronLeft />}
                nextLabel={<GoChevronRight />}
                pageCount={pageCount}
                onPageChange={onPageChange}
                pageRangeDisplayed={10}
                containerClassName={"pagination"}
                pageLinkClassName={"pagination_link"}
                activeLinkClassName={"pagination_link_active"}
            />
        </PaginateContainer>
    );
}

export default Paginate;
