import React, { FC } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Pagination } from 'react-bootstrap'

const Paginate: FC<{ pages: number; page: number; isAdmin: boolean; keyword: string }> = ({
  pages,
  page,
  isAdmin = false,
  keyword = ''
}) => {
  return pages > 1 ? (
    <Pagination>
      {[...new Array(pages)].map((_, i) => (
        <LinkContainer
          key={i + 1}
          to={
            !isAdmin
              ? keyword !== ''
                ? `/search/${keyword}/page/${i + 1}`
                : `/page/${i + 1}`
              : `/admin/productlist/${i + 1}`
          }
        >
          <Pagination.Item active={i + 1 === page}>{i + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  ) : null
}

export default Paginate
