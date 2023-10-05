export const Post = ({post}) => {
    return (
        <div className="w-2/4 bg-white p-4 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
      {!post.anonymous && (
        <p className="text-gray-600 mb-2">Author: {post.authorName}</p>
      )}
      {post.anonymous && (
        <p className="text-gray-600 mb-2">Anonymous</p>
      )}
      <p className="text-gray-700 mb-4">{post.description}</p>
      {post.image && (
        <div>
         
            <div className="mb-2">
              <img
                src={post.image}
                alt={`Image`}
                className="max-w-full h-auto rounded"
              />
            </div>
          
        </div>
      )}
    </div>
    )
}