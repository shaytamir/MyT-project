import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "../../../store/initialData/initActions";
import { firstLogin } from "../../../store/firstLogin/flActions";
import { addTodoList } from "../../../store/todoLists/lists/listsActions";
import TodoLists from "./lists";
import NewListForm from "./newListForm";
import { randColor } from "../../../services/colorService";
import HistoryButton from "./historyBtn";
import HistoryLists from "./HistoryLists";
import { Redirect } from "react-router-dom";
import Header from "../../common/header";
import { todosSearchFilter } from "../../../services/searchService";
import { getCurrentUser } from "../../../services/userService";

class MyTodos extends Component {
  state = {
    title: "Todos",
    sortLists: "asc",
  };

  async componentDidMount() {
    const { user } = this.props.data;

    if (user.firstLogin === false) {
      await this.hadleFirstTodoList(user);
    }
  }

  async hadleFirstTodoList(user) {
    const list = {
      list_name: "My First TodoList",
      user_id: user._id,
      id: user._id + "-" + 1,
      list_color: await randColor(),
    };
    await this.props.addTodoList(list);
    await this.props.firstLogin(user);
  }

  sortChange(e) {
    this.setState({ sortLists: e.target.value });
  }

  render() {
    const { user, search } = this.props.data;
    let { userTodos } = this.props.data;
    /* redirect !user */
    let userLog = getCurrentUser();
    if (userLog === null) return <Redirect to="/" />;

    let title;
    let history = user.todos_history;
    history ? (title = "Todos History") : (title = this.state.title);
    /* search */
    if (search.length > 0) {
      userTodos = todosSearchFilter(userTodos, search);
      title += " Search";
    }
    /* sort */
    if (this.state.sortLists === "desc") {
      userTodos = userTodos.reverse();
    }

    return (
      <div className={!history ? "todos" : "todos_history"}>
        <div className="strech">
          <Header title={title} />
          <hr />
          {/* todos manu div */}
          <div className="todos_manu">
            <NewListForm />
            <HistoryButton />
          </div>
          <div className="container">
            <hr />
            {/* sort todos div */}
            <div className="select_div">
              <select
                onChange={(e) => {
                  this.sortChange(e);
                }}
              >
                <option value="asc">new to old</option>
                <option value="desc">old to new</option>
              </select>
            </div>
            {/* user todolist  lists */}
            <div className="lists">
              {!user.todos_history &&
                userTodos &&
                userTodos.length > 0 &&
                userTodos.map((list, i) => (
                  <React.Fragment key={i}>
                    {!list.isDeleted && <TodoLists list={list} i={i} />}
                  </React.Fragment>
                ))}
              {/* no lists (from not deleted lists) */}
              {!user.todos_history &&
                userTodos &&
                userTodos.filter((list) => {
                  return list.isDeleted !== true;
                }).length === 0 && (
                  <div className="noTodos_div">
                    <div>no active todoList, start a new list</div>
                  </div>
                )}
              {/* user todolist history lists */}
              {user.todos_history &&
                userTodos &&
                userTodos.length > 0 &&
                userTodos.map((list, i) => (
                  <React.Fragment key={i}>
                    {list.isDeleted && <HistoryLists list={list} i={i} />}
                  </React.Fragment>
                ))}
              {/* no hystory lists (from deleted lists) */}
              {user.todos_history &&
                userTodos &&
                userTodos.filter((list) => {
                  return list.isDeleted === true;
                }).length === 0 && (
                  <div className="noTodos_div">
                    <div>no deleted TodoList, mabie next time..</div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, more) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData()),
    firstLogin: (user) => dispatch(firstLogin(user)),
    addTodoList: (list) => dispatch(addTodoList(list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTodos);
