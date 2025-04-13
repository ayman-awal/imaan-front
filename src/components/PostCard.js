import React from "react";

function PostCard({ title, question, onClick }) {
  return (
    <div onClick={onClick} className='post-card'>
      <h3 className='post-card-title'>
        {title}
      </h3>
      <p className='post-card-question'>
        {question}
      </p>
    </div>
  );
}

export default PostCard;
