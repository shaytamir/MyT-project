/*****  for search in todos ***** */
export function todosSearchFilter(todos, search) {
  return todos.filter((item) => {
    return (
      item.list_name.toLowerCase().includes(search.toLowerCase()) ||
      item.todos.find((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  });
}

/*****  for search in posts ***** */
export function postsSearchFilter(posts, search) {
  return posts.filter((post) => {
    return (
      post.user_name.toLowerCase().includes(search.toLowerCase()) ||
      post.post.toLowerCase().includes(search.toLowerCase())

      /* ****for search in comments ********* */

      // || post.comments.some((comment) => {
      //   return comment.comment.toLowerCase().includes(search.toLowerCase());
      // }) || post.comments.some((comment) => {
      //   return comment.name.toLowerCase().includes(search.toLowerCase());
      // })

      /* ****** not works for non-subscribe-user ****/
    );
  });
}
