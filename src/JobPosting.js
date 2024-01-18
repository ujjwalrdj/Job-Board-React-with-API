import React from 'react';
import './style.css';
function JobPosting({ url, title, by, time }) {
  const formatedTime = new Date(time * 1000).toLocaleString();
  return (
    <>
      <div className="post" role="listItem">
        <h2 className="post__title">
          <a
            className={url ? '' : 'inactiveLink'}
            target="_blank"
            rel="noopener"
            href={url}
          >
            {title}
          </a>
        </h2>
        <span className="post__metadata">
          By {by} - {formatedTime}
        </span>
      </div>
    </>
  );
}

export default JobPosting;
