import Swal from "sweetalert2";
// export const baseurl = "http://localhost:5000";
export const baseurl = "https://todolist-with-jwt-backend.onrender.com";

const getToken = () => localStorage.getItem("loginToken");

// getAllTodos
const getUserTodos = async (settodo) => {
  const userToken = getToken();
  if (!userToken) {
    alert("User not logged in or token missing");
    return;
  }

  try {
    let response = await fetch(`${baseurl}/todos`, {
      method: "GET",
      headers: {
        token: userToken,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {

      alert("Something went wrong");
      return;
    }

    let data = await response.json();

    if (Array.isArray(data.todo)) {
      settodo(data.todo);
    } else {
      console.error("Unexpected data format:", data);
      alert("Unexpected data format received");
    }
  } catch (error) {
    console.error("Error in getUserTodos:", error);
    alert("Something went wrong");
  }
};

// deleteTodos
const deleteTodos = async (todoId, settext, settodo) => {
  const userToken = getToken();
  if (!userToken) {
    alert("User not logged in or token missing");
    return;
  }

  try {
    const response = await fetch(`${baseurl}/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        token: userToken,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      getUserTodos(settodo);
      settext("");
      Swal.fire("Todo list is deleted successfully");
    }
  } catch (error) {
    alert("Something went wrong");
  }
};

// updateTodos
const updateTodos = async (todoId, text, settoggle, settext, settodo) => {
  const userToken = getToken();
  if (!userToken) {
      Swal.fire("Todo list is deleted successfully");
    return;
  }

  try {
    const response = await fetch(`${baseurl}/todos/${todoId}`, {
      method: "PUT",
      headers: {
        token: userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todoId, text }),
    });
    if (response.ok) {
      settoggle(false);
      getUserTodos(settodo);
      settext("");
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong, could not update todolist",
    });
  }
};

// AddTodos
const addTodos = async (text, settext, settodo) => {

   if(text=='' || text==false){
    Swal.fire("Enter the Todo , field must not be Empty.");
    return 
   }

  const userToken = getToken();
  if (!userToken) {
    alert("User not logged in or token missing");
    return;
  }

  try {
    const response = await fetch(`${baseurl}/todos`, {
      method: "POST",
      headers: {
        token: userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    if (response.ok) {
      settext("");
      getUserTodos(settodo);
    } else {
      const errorData = await response.json();
      console.error("AddTodo Error Response Data:", errorData);
    }
  } catch (error) {
    console.error("AddTodo Catch Error:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong, could not add the todolist",
    });
  }
};

export { getUserTodos, deleteTodos, updateTodos, addTodos };
