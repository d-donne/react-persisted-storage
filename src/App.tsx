import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import { getItems, removeAllItems, storeItems } from "./utils/localStorage";

export type User = {
  name: string;
  age: number | unknown;
};

function App() {
  const [userData, setUserData] = useState<User[]>(getItems("users"));

  const [newUser, setNewUser] = useState<User>({ name: "", age: undefined });

  useEffect(() => {
    storeItems("users", userData);
  }, [userData]);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!newUser || newUser?.age as number <= 0) return;
    setUserData([...userData, newUser!]);
    setNewUser({ name: "", age: ""});
  }

  return (
    <>
      <h1 className="font-bold text-4xl underline mb-10">Users</h1>

      <form onSubmit={handleSubmit} className="flex flex-col w-[50%] gap-5 mx-auto">
        <label htmlFor="name">
          Name:
          <input type="text" name="name" value={newUser.name} onChange={(event) => setNewUser({ ...newUser, name: event.target.value })} />
        </label>
        <label htmlFor="age">
          Age:
          <input type="number" min={0} name="age" value={newUser.age as number } onChange={(event) => setNewUser({ ...newUser, age: Number(event.target.value) })} />
        </label>

        <input type="submit" value={"Add User"} className="bg-green-400 rounded-xl w-9/12 mx-auto active:bg-green-700" />
        
        <button onClick={() => { removeAllItems("users");  setUserData([])}} className="bg-red-400 rounded-xl w-9/12 mx-auto active:bg-red-700">Delete All Users</button>
      </form>


      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
