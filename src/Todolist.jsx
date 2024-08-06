import React, { useEffect, useState } from "react";
import {
  getUserTodos,
  deleteTodos,
  updateTodos,
  addTodos,
} from "./utils/Api_integration";

const Todolist = () => {
  const [text, settext] = useState("");
  const [todo, settodo] = useState([]);
  const [toggle, settoggle] = useState(false);
  const [todoId, setTodoId] = useState("");

  useEffect(() => {
    getUserTodos(settodo);
  }, []);

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
            className="border-1 rounded border-gray-400 w-full h-12 pl-6 text-2xl  "
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
            }}
            placeholder="Enter the Todo's "
          />
        </div>
        <div className="flex justify-center items-center">
          {toggle ? (
            <button
              onClick={() =>
                updateTodos(todoId, text, settoggle, settext, settodo)
              }
              className="bg-black text-white ml-2 p-2 text-xl rounded "
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontStyle: "normal",
              }}
            >
              updateTodo
            </button>
          ) : (
            <button
              onClick={() => addTodos(text, settext, settodo)}
              className="bg-black text-white ml-2 p-2 text-xl rounded "
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontStyle: "normal",
              }}
            >
              Add Todo
            </button>
          )}
        </div>
      </div>

      <div
        className="text-center text-2xl font-semibold mt-8"
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontStyle: "normal",
        }}
      >
        TodoList items
      </div>

      <div className="flex flex-col items-center">
        {todo.map((ele, index) => {
          const { text } = ele;
          return (
            <React.Fragment key={index}>
              <div className="flex border-1 border-gray-300 w-1/2 rounded mt-2 justify-between p-2">
                <p  className="text-2xl" style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
              }}>{index+1}. {text}</p>
                <div className="flex gap-3 justify-start">
                  <button
                    className="bg-green-500  font-semibold text-white px-2 py-2 flex items-center h-8 rounded"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontStyle: "normal",
                    }}
                    onClick={() => newUpdatedTodo(ele._id, ele.text)}
                  >
                    update
                  </button>
                  <button
                    className="bg-red-500  font-semibold text-white px-2 py-2 flex items-center h-8 rounded"
                    onClick={() => deleteTodos(ele._id, settext, settodo)}
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontStyle: "normal",
                    }}
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
