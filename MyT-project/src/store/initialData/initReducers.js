import dataActions from "./initTypes";
import UserActions from "../editUser/editUserTypes";
import firstLoginActions from "../firstLogin/flTypes";
import todoListsActions from "../todoLists/lists/listsTypes";
import todoActions from "../todoLists/todo/todoTypes";
import searchActions from "../search/searchTypes";
import addPostsActions from "../posts/addPost/addPostActions";
import likePostActions from "../likes/likeTypes";
import editPostActions from "../posts/editPost/editPostTypes";
import commentPostTypes from "../posts/postsComments/commentsTypes";
import userImgActions from "../userImg/userImgTypes";
import userActions from "../user/userTypes";

const initialState = {
  users: [],
  posts: [],
  user: {},
  userTodos: [],
  userPosts: [],
  imgs: [],
  loading: false,
  error: "",
  search: "",
};

/* fetch data */
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case dataActions.FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dataActions.FETCH_DATA_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        users: action.payload.users,
        user: action.payload.user,
        userTodos: action.payload.userTodos,
        imgs: action.payload.imgs,
      };

    case dataActions.FETCH_DATA_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /**** add post ****/
    case addPostsActions.ADD_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case addPostsActions.ADD_POSTS_SUCCESS:
      const newId =
        action.payload.user._id + "-" + (action.payload.user.posts_count + 1);
      const userName =
        action.payload.user.first_name + " " + action.payload.user.last_name;
      let posts = [
        {
          user_id: action.payload.user._id,
          post: action.payload.post,
          likes: [],
          comments: [],
          user_name: userName,
          id: newId,
          isEditOn: false,
          isCommentsOn: false,
        },
        ...state.posts,
      ];
      state.user.posts_count += 1;
      return {
        ...state,
        posts,
      };

    case addPostsActions.ADD_POSTS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /**** like post ****/
    case likePostActions.LIKE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case likePostActions.LIKE_POST_SUCCESS:
      const likePost = state.posts.find((post) => {
        return post.id === action.payload.postId;
      });
      likePost.likes = [...likePost.likes, action.payload.userId];
      return {
        ...state,
      };

    case likePostActions.LIKE_POST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /**** un-like post ****/
    case likePostActions.UNLIKE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case likePostActions.UNLIKE_POST_SUCCESS:
      const unLikePost = state.posts.find((post) => {
        return post.id === action.payload.postId;
      });
      unLikePost.likes = unLikePost.likes.filter((like) => {
        return like === action.payload.userId;
      });
      return {
        ...state,
      };

    case likePostActions.UNLIKE_POST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /**** edit post-on post ****/
    case editPostActions.EDIT_ON:
      const editOn = state.posts.find((post) => {
        return post.id === action.payload.postId;
      });
      editOn.isEditOn = true;
      return {
        ...state,
      };

    /**** edit post off post ****/
    case editPostActions.EDIT_OFF:
      const editOff = state.posts.find((post) => {
        return post.id === action.payload.postId;
      });
      editOff.isEditOn = false;
      return {
        ...state,
      };

    /**** edit post  ****/
    case editPostActions.EDIT_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case editPostActions.EDIT_POST_SUCCESS:
      const editpost = state.posts.find((post) => {
        return post.id === action.payload.postId;
      });
      editpost.post = action.payload.value;
      return {
        ...state,
      };
    case editPostActions.EDIT_POST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /**** add comment post  ****/
    case commentPostTypes.ADD_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case commentPostTypes.ADD_COMMENT_SUCCESS:
      const addcComment = state.posts.find((post) => {
        return post.id === action.payload.postId;
      });
      addcComment.comments.push(action.payload.comment);
      return {
        ...state,
      };
    case commentPostTypes.ADD_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /****  post comments on ****/
    case commentPostTypes.COMMENTS_POST_ON:
      const commentsOn = state.posts.find((post) => {
        return post.id === action.payload.postId;
      });
      commentsOn.isCommentsOn = true;

      return {
        ...state,
      };

    /****  post comments off ****/
    case commentPostTypes.COMMENTS_POST_OFF:
      const commentsOff = state.posts.find((post) => {
        return post.id === action.payload.postId;
      });
      commentsOff.isCommentsOn = false;
      return {
        ...state,
      };

    /**** edit comment post  ****/
    case commentPostTypes.EDIT_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case commentPostTypes.EDIT_COMMENT_SUCCESS:
      const editComment = state.posts.find((post) => {
        return post.id === action.payload.postId;
      });
      const comment = editComment.comments.find((comment) => {
        return comment.id === action.payload.comment.id;
      });
      comment.comment = action.payload.newValue;
      return {
        ...state,
      };
    case commentPostTypes.EDIT_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* comments in edit mode */
    case commentPostTypes.COMMENTS_IN_EDIT:
      const CommentsEdit = state.posts.find((post) => {
        return post.id === action.payload.postId;
      });
      const inCommentEdit = CommentsEdit.comments.find((comment) => {
        return comment.id === action.payload.commentId;
      });
      inCommentEdit.inEdit = true;

      return {
        ...state,
      };

    /* comments out edit mode */
    case commentPostTypes.COMMENTS_OUT_EDIT:
      const CommentsEditOut = state.posts.find((post) => {
        return post.id === action.payload.postId;
      });
      const outCommentEdit = CommentsEditOut.comments.find((comment) => {
        return comment.id === action.payload.commentId;
      });
      outCommentEdit.inEdit = false;

      return {
        ...state,
      };

    /**** delete comment post  ****/
    case commentPostTypes.DELETE_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case commentPostTypes.DELETE_COMMENT_SUCCESS:
      const deleteComment = state.posts.find((post) => {
        return post.id === action.payload.postId;
      });
      deleteComment.comments = deleteComment.comments.filter((comment) => {
        return comment.id !== action.payload.comment.id;
      });
      return {
        ...state,
      };
    case commentPostTypes.DELETE_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /**** DELETE post  ****/
    case editPostActions.DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case editPostActions.DELETE_POST_SUCCESS:
      const deletePost = state.posts.filter((post) => {
        return post.id !== action.payload.postId;
      });
      return {
        ...state,
        posts: deletePost,
      };
    case editPostActions.DELETE_POST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* edit user */
    case UserActions.EDIT_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UserActions.EDIT_USER_SUCCESS:
      const editedUser = action.payload.user;
      editedUser._id = action.payload.userId;
      return {
        ...state,
        user: { ...state.user, editedUser },
      };

    case UserActions.EDIT_USER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* upload user img */
    case userImgActions.USER_UPLOAD_IMG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userImgActions.USER_UPLOAD_IMG_SUCCESS:
      const uploadImg = action.payload.user;
      uploadImg.haveImg = true;
      return {
        ...state,
      };

    case userImgActions.USER_UPLOAD_IMG_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* add img */
    case userImgActions.ADD_IMG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userImgActions.ADD_IMG_SUCCESS:
      const imgId = `${action.payload.userId}-${action.payload.imgCount}`;
      const imgBool = action.payload.imgCount === 1 ? true : false;
      const addImg = {
        imageName: "",
        imageData: action.payload.urlImg,
        user_id: action.payload.userId,
        id: imgId,
        isProfileImg: imgBool,
        inEditMode: false,
      };

      return {
        ...state,
        imgs: [...state.imgs, addImg],
      };

    case userImgActions.ADD_IMG_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* change profile img */
    case userImgActions.PROFILE_IMG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userImgActions.PROFILE_IMG_SUCCESS:
      const falseImg = state.imgs.find((img) => {
        return (
          img.user_id === action.payload.userId && img.isProfileImg === true
        );
      });
      falseImg.isProfileImg = false;
      const changeImg = state.imgs.find((img) => {
        return img.id === action.payload.imgId;
      });
      changeImg.isProfileImg = true;

      const ChangeUserImg = state.users.find((user) => {
        return user._id === action.payload.userId;
      });
      ChangeUserImg.profile_img = action.payload.imgId;
      return {
        ...state,
      };

    case userImgActions.PROFILE_IMG_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* img in edit mode */
    case userImgActions.IN_IMG_EDIT_MODE:
      const inEditMode = state.imgs.find((img) => {
        return img.id === action.payload.imgId;
      });
      inEditMode.inEditMode = true;
      return {
        ...state,
      };

    /* img out edit mode */
    case userImgActions.OUT_IMG_EDIT_MODE:
      const outEditMode = state.imgs.find((img) => {
        return img.id === action.payload.imgId;
      });
      outEditMode.inEditMode = false;
      return {
        ...state,
      };

    /*  img counter increment */
    case userImgActions.IMG_COUNTER_INC_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userImgActions.IMG_COUNTER_INC_SUCCESS:
      state.user.imgCounter += 1;
      return {
        ...state,
      };

    case userImgActions.IMG_COUNTER_INCT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* DELETE img */
    case userImgActions.DELETE_IMG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userImgActions.DELETE_IMG_SUCCESS:
      const deleteImg = state.imgs.filter((img) => {
        return img.id !== action.payload.imgId;
      });
      return {
        ...state,
        imgs: deleteImg,
      };

    case userImgActions.DELETE_IMG_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    /* -------------------------------- */
    /* first Login */
    case firstLoginActions.FIRST_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case firstLoginActions.FIRST_LOGIN_SUCCESS:
      let user = action.payload.user;
      user.firstLogin = true;
      return {
        ...state,
        user: user,
      };
    case firstLoginActions.FIRST_LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* ------- todoLists ----------*/
    /* add list */
    case todoListsActions.ADD_TODOLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoListsActions.ADD_TODOLIST_SUCCESS:
      // let listId = action.payload.user_id + action.payload.id;
      let userTodos = [
        {
          list_name: action.payload.list_name,
          user_id: action.payload.user_id,
          todos: [
            {
              id: 1,
              isChecked: true,
              title: "my first task",
              isDeleted: false,
            },
          ],
          list_color: action.payload.list_color,
          id: action.payload.id,
          isDeleted: false,
          todosCount: 1,
          deleted_todos: [],
          inEditTitle: false,
        },
        ...state.userTodos,
      ];
      return {
        ...state,
        userTodos,
      };
    case todoListsActions.ADD_TODOLIST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* increment user todoLists count */
    case todoListsActions.INC_LIST_COUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoListsActions.INC_LIST_COUNT_SUCCESS:
      let userInc = action.payload.user;
      userInc.todoLists_count = action.payload.newCount;
      return {
        ...state,
        user: userInc,
      };
    case todoListsActions.INC_LIST_COUNT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* list name in edit */
    case todoListsActions.IN_EDIT_LIST:
      const listNameInEdit = state.userTodos.find((list) => {
        return list.id === action.payload.listId;
      });
      listNameInEdit.inEditTitle = true;
      return {
        ...state,
      };

    /* list name out edit */
    case todoListsActions.OUT_EDIT_LIST:
      const listNameOutEdit = state.userTodos.find((list) => {
        return list.id === action.payload.listId;
      });
      listNameOutEdit.inEditTitle = false;
      return {
        ...state,
      };

    /* edit list name */
    case todoListsActions.EDIT_LIST_NAME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoListsActions.EDIT_LIST_NAME_SUCCESS:
      let editListName = state.userTodos.find((list) => {
        return list.id === action.payload.listId;
      });
      editListName.list_name = action.payload.value;
      return {
        ...state,
      };
    case todoListsActions.EDIT_LIST_NAME_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* CHANGE LIST COLOR */
    case todoListsActions.CHANGE_LIST_COLOR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoListsActions.CHANGE_LIST_COLOR_SUCCESS:
      return {
        ...state,
        userTodos: state.userTodos.map((list) => {
          if (list.id === action.payload.list.id) {
            list.list_color = null;
            list.list_color = action.payload.color;
          }
          return list;
        }),
      };
    case todoListsActions.CHANGE_LIST_COLOR_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* remove todoLists  */
    case todoListsActions.REMOVE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoListsActions.REMOVE_LIST_SUCCESS:
      let removeList = action.payload.list;
      removeList.isDeleted = true;
      return {
        ...state,
      };
    case todoListsActions.REMOVE_LIST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* restore todoLists  */
    case todoListsActions.RESTORE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoListsActions.RESTORE_LIST_SUCCESS:
      let restoreList = action.payload.list;
      restoreList.isDeleted = false;
      return {
        ...state,
      };
    case todoListsActions.RESTORE_LIST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* DELETE todoLists  */
    case todoListsActions.DELETE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoListsActions.DELETE_LIST_SUCCESS:
      return {
        ...state,
        userTodos: state.userTodos.filter(
          (list) => list.id !== action.payload.list.id
        ),
      };
    case todoListsActions.DELETE_LIST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* ------- todos----------*/
    /* add Todo */
    case todoActions.ADD_TODO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoActions.ADD_TODO_SUCCESS:
      let list = state.userTodos.find((list) => {
        return list.id === action.payload.listId;
      });
      list.todos = [...list.todos, action.payload.todo];
      return {
        ...state,
      };
    case todoActions.ADD_TODO_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* edit Todo */
    case todoActions.EDIT_TODO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoActions.EDIT_TODO_SUCCESS:
      let editTodo = state.userTodos.find((list) => {
        return list.id === action.payload.listId;
      });
      editTodo.todos.map((todo) => {
        if (todo.id === action.payload.todo.id)
          todo.title = action.payload.newText;
        return todo;
      });
      return {
        ...state,
      };
    case todoActions.EDIT_TODO_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* toggle Todo isChecked*/
    case todoActions.TOGGLE_ISCHECKED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoActions.TOGGLE_ISCHECKED_SUCCESS:
      let toggleIsChecked = state.userTodos.find((list) => {
        return list.id === action.payload.listId;
      });
      toggleIsChecked.todos.map((todo) => {
        if (todo.id === action.payload.todo.id)
          !todo.isChecked ? (todo.isChecked = true) : (todo.isChecked = false);
        return todo;
      });
      return {
        ...state,
      };
    case todoActions.TOGGLE_ISCHECKED_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* increment todos count */
    case todoActions.INC_TODOS_COUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoActions.INC_TODOS_COUNT_SUCCESS:
      let incTodos = state.userTodos.find((list) => {
        return list.id === action.payload.listId;
      });
      incTodos.todosCount += 1;
      return {
        ...state,
      };
    case todoActions.INC_TODOS_COUNT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* todo in edit */
    case todoActions.IN_EDIT_TODO:
      let todoInEdit = state.userTodos.find((list) => {
        return list.id === action.payload.listId;
      });
      todoInEdit.todos.map((todo) => {
        if (todo.id === action.payload.todo.id) todo.inEdit = true;
        return todo;
      });
      return {
        ...state,
      };

    /* todo out edit */
    case todoActions.OUT_EDIT_TODO:
      let todoOutEdit = state.userTodos.find((list) => {
        return list.id === action.payload.listId;
      });
      todoOutEdit.todos.map((todo) => {
        if (todo.id === action.payload.todo.id) todo.inEdit = false;
        return todo;
      });
      return {
        ...state,
      };

    /* remove Todo */
    case todoActions.REMOVE_TODO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoActions.REMOVE_TODO_SUCCESS:
      let removeListTodo = state.userTodos.find((list) => {
        return list.id === action.payload.listId;
      });
      removeListTodo.todos.map((todo) => {
        if (todo.id === action.payload.todo.id) todo.isDeleted = true;
        return todo;
      });
      return {
        ...state,
      };
    case todoActions.REMOVE_TODO_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* restore Todo */
    case todoActions.RESTORE_TODO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoActions.RESTORE_TODO_SUCCESS:
      let restoreListTodo = state.userTodos.find((list) => {
        return list.id === action.payload.listId;
      });
      restoreListTodo.todos.map((todo) => {
        if (todo.id === action.payload.todo.id) todo.isDeleted = false;
        return todo;
      });
      return {
        ...state,
      };
    case todoActions.RESTORE_TODO_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* DELETE Todo */
    case todoActions.DELETE_TODO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoActions.DELETE_TODO_SUCCESS:
      let deleteListTodo = state.userTodos.find((list) => {
        return list.id === action.payload.listId;
      });
      const deletedTodos = deleteListTodo.todos.filter((todo) => {
        return todo.id !== action.payload.todo.id;
      });
      deleteListTodo.todos = [];
      deleteListTodo.todos = deletedTodos;
      return {
        ...state,
      };
    case todoActions.DELETE_TODO_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* todos history btn toggler */
    case todoListsActions.HISTORY_BTN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoListsActions.HISTORY_BTN_SUCCESS:
      const historyToggle = action.payload;
      if (!historyToggle.todos_history) {
        historyToggle.todos_history = true;
      } else if (historyToggle.todos_history) {
        historyToggle.todos_history = false;
      }
      return {
        ...state,
      };
    case todoListsActions.HISTORY_BTN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* Search ***** */
    case searchActions.SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case searchActions.SEARCH_SUCCESS:
      const search = action.payload.value;
      return {
        ...state,
        search,
      };
    case searchActions.SEARCH_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* ---------------------- */
    /* DELETE user */
    case userActions.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userActions.DELETE_USER_SUCCESS:
      const deltedUser = state.users.filter((user) => {
        return user._id !== action.payload.userId;
      });
      return {
        ...state,
        users: deltedUser,
      };

    case userActions.DELETE_USER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    /* ********************** */
    default:
      return state;
  }
};

export default dataReducer;
