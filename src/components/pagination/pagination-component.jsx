import { Pagination } from "flowbite-react"

export default function PaginationComponent({currentPage, pageNumbers, onPageChange }) {
  return (
    <div className='m-6 px-8 overflow-x-hidden grid grid-cols-1 justify-items-center pb-2'>
    <Pagination
        currentPage={currentPage}
        totalPages={pageNumbers}
        onPageChange={onPageChange}
    />
</div>
  )
}
