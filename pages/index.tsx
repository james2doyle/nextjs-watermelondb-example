import * as React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';

const IndexPage: React.FunctionComponent = ({ comments, addComment, deleteComment }) => {
  async function handleSubmit(e) {
    e.persist();
    if (e) {
      e.preventDefault();
    }

    const inputVal = e.target[0].value;

    if (inputVal.length < 1) {
      alert('Need some input bro!');

      return false;
    }

    await addComment({
      body: inputVal.length > 0 ? inputVal : 'New Comment ' + Date.now()
    });

    e.target.reset();

    return false;
  }

  return (
    <Layout title="Comments | Next.js + TypeScript Example">
      <h1>Comments</h1>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}><button type="button" onClick={() => deleteComment(comment)}>&times;</button> {comment.body}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Comment body" autoFocus />
        <button type="submit">Add</button>
      </form>
    </Layout>
   );
};

export default withDatabase(withObservables([], ({ database }) => {
  const commentsCollection = database.collections.get('comments');
  const comments = commentsCollection.query().observe();

  const addComment = async (comment) => {
    return await database.action(async () => {
      return await commentsCollection.create(newComment => {
        newComment.body = comment.body;
      });
    });
  };

  const deleteComment = async (comment) => {
    return await database.action(async () => {
      return await comment.destroyPermanently();
    });
  };

  return {
    comments,
    addComment: Promise.resolve(addComment),
    deleteComment: Promise.resolve(deleteComment),
  };
})(IndexPage));
