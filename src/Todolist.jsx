import React, { useEffect, useState } from "react";
import { baseurl } from "./utils/Api_integration";
import Swal from 'sweetalert2';


const Todolist = () => {
  const [text, settext] = useState("");
  const [todo, settodo] = useState([]);
  const [toggle, settoggle] = useState(false);
  const [todoId, setTodoId] = useState("");

  useEffect(() => {
    getUserTodos();
  }, []);

  const userToken = localStorage.getItem("loginToken");

  //  Getalltodos
  const getUserTodos = async () => {
    try {
      let response = await fetch(`${baseurl}/todos`, {
        method: "GET",
        headers: {
          token: `${userToken}`,
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      if (response.ok) {
        console.log(data);
        settodo(data.todo);
        settext("");
      } else {
        alert("response is not ok");
      }
    } catch (error) {
      console.log(error, "error");
      alert("Something went wrong , can't fetch all todos");
    }
  };

  // delete todo
  const deleteTodos = async (todoId) => {
    try {
      const response = await fetch(`${baseurl}/todos/${todoId}`, {
        method: "DELETE",
        headers: {
          token: `${userToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        getUserTodos();
        settext("");
        // alert("todolist is deleted successfully");
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Todo list is deleted successfully',
        });
      } else {
        alert("response is not ok");
      }
    } catch (error) {
      console.log(error, "error");
      alert("Something went wrong , todolist is not deleted");
    }
  };

  // udpateTodos
  const updateTodos = async () => {
    console.log(todoId, text);
    try {
      const response = await fetch(`${baseurl}/todos/${todoId}`, {
        method: "PUT",
        headers: {
          token: `${userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todoId, text }),
      });
      if (response.ok) {
        settoggle(false);
        getUserTodos();
        settext("");
        alert("todo updated successfully");
      } else {
        alert("response is not ok");
      }
    } catch (error) {
      console.log(error, "error");
      alert("Something went wrong couldnot update todolist");
    }
  };

  // Add Todo
  const addTodos = async () => {
    try {
      const response = await fetch(`${baseurl}/todos`, {
        method: "POST",
        headers: {
          token: `${userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        settext("");
        getUserTodos();
        alert("todo added successfull");
      } else {
        alert("response is not ok");
      }
    } catch (error) {
      console.log(error, "error");
      alert("some thing went wrong , could not add the todolist");
    }
  };

  const newUpdatedTodo = (todoId, todotext) => {
    settoggle(true);
    setTodoId(todoId);
    settext(todotext);
  };

  return (
    <>
      <div className="mt-4 w-full  flex justify-center">
        <div className="w-1/2 flex justify-center ">
          <input
            type="text"
            name="text"
            autoComplete="off"
            value={text}
            onChange={(e) => settext(e.target.value)}
            className="border-1 rounded border-gray-400 w-full h-12 pl-2 text-2xl font-mono "
            placeholder="Enter the Todo's... "
          />
        </div>
        <div className="flex justify-center items-center">
          {toggle ? (
            <button
              onClick={updateTodos}
              className="bg-black text-white ml-2 p-2 text-xl rounded "
            >
              updateTodo
            </button>
          ) : (
            <button
              onClick={addTodos}
              className="bg-black text-white ml-2 p-2 text-xl rounded "
            >
              Add Todo
            </button>
          )}
        </div>
      </div>

      <div className="text-center text-xl font-semibold mt-8">
        TodoList items
      </div>

      <div className="flex flex-col items-center">
        {todo.map((ele, index) => {
          const { text } = ele;
          return (
            <React.Fragment key={index}>
              <div className="flex border-1 border-gray-400 w-1/2 rounded mt-2 justify-between p-2">
                <p>{text}</p>
                <div className="flex gap-3 justify-start">
                  <button
                    className="bg-green-400 font-semibold text-black px-2 h-8 rounded"
                    onClick={() => newUpdatedTodo(ele._id, ele.text)}
                  >
                    update
                  </button>
                  <button
                    className="bg-red-500  font-semibold text-white px-2 h-8 rounded"
                    onClick={() => deleteTodos(ele._id)}
                  >
                    delete
                  </button>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Todolist;
