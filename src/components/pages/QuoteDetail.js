import React from 'react';
import { Route, useParams } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import Comments from '../comments/Comments';

const QuoteDetail = () => {
  const params = useParams();

  return (
    <Fragment>
      <h2>Quote Detail Page</h2>
      <p>params: {params.quoteId}</p>
      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
