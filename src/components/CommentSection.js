import React, { useRef, useEffect } from 'react';

const CommentSection = () => {
  const commentRef = useRef(null);

  useEffect(() => {
    const commentBox = commentRef.current;
    if (commentBox) {
      const script = document.createElement('script');
      script.src = 'https://utteranc.es/client.js';
      script.async = true;
      script.setAttribute('repo', 'luizcsbh/luiz-blog-fronteand');
      script.setAttribute('issue-term', 'pathname');
      script.setAttribute('theme', 'github-light');
      script.crossOrigin = 'anonymous';
      commentBox.appendChild(script);
    }
  }, []);

  return <div ref={commentRef} id="comment-box" />;
};

export default CommentSection;