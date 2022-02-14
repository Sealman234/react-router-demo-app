import { useEffect, useRef } from 'react';

import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './NewCommentForm.module.css';

import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const { sendRequest, status, error } = useHttp(addComment);

  // 送出留言後，告訴 Comments 讓它重新取得所有留言
  const { onAddComment } = props;
  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddComment();
    }
  }, [status, error, onAddComment]);

  // 送出留言
  const submitFormHandler = (event) => {
    event.preventDefault();

    // optional: Could validate here
    const enteredText = commentTextRef.current.value;
    if (enteredText.trim() === '') return;

    // send comment to server
    sendRequest({
      commentData: { text: enteredText },
      quoteId: props.quoteId,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div>
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
