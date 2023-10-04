export const PostList =() => {

    const posts = [
        // Your array of crime incident posts
      ];

    return (
        <div>
            {posts.map((post) => (
        <div key={post.id} className="mb-4 border p-4 rounded-lg">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-gray-600">{post.description}</p>
          {/* Display other post details */}
        </div>
      ))}
        </div>
    )
}