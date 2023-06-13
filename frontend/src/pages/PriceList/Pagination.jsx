/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { getProducts  } from '../../actions/products';
import useStyles from './styles2';

const Paginate = ({ page }) => {


console.log("MA Pag"+page ) 
  const  numberOfPages  = useSelector((state) => state.products.numberOfPages);
//  const currentPage = useSelector((state) => state.priceList.currentPage);
  const filters = useSelector((state)=> state?.filters.filters)
  console.log("pagi" );
  console.log(numberOfPages +"+" )
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (page) {

      dispatch(getProducts(page));
    }
  }, [dispatch, page , filters]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/products?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
