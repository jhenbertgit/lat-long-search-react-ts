import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

type PaginationProps = {
  startPage: number;
  endPage: number;
  totalPages: number;
  currentPage: number;
  onPageChange(args: number): void;
};

function Paginations({
  startPage,
  endPage,
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <Pagination>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink first onClick={() => onPageChange(1)} />
      </PaginationItem>

      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          previous
          onClick={() => onPageChange(currentPage - 1)}
        />
      </PaginationItem>

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <PaginationItem
          key={startPage + i}
          active={startPage + i === currentPage}
        >
          <PaginationLink onClick={() => onPageChange(startPage + i)}>
            {startPage + i}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink next onClick={() => onPageChange(currentPage + 1)} />
      </PaginationItem>

      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink last onClick={() => onPageChange(totalPages)} />
      </PaginationItem>
    </Pagination>
  );
}

export default Paginations;
