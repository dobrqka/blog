const PostThumbnail = ({ title, content, thumbnail }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <img className="thumbnail" src={thumbnail}></img>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default PostThumbnail;
