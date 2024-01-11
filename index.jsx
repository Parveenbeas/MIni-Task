import React, { useState, useEffect } from "react";
import axios from "axios";

const CountTask = () => {
  const [count, setCount] = useState([]);
  const [isDropDown, setIsDropDown] = useState([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/users").then((response) => {
      const users = response.data.users;
      const filteredUsers = users?.filter((user) => user.id < 5);
      setCount(filteredUsers);

    }).catch((error)=>{ 
       console.log(error,"Some Error")
    })
  }, []);

  const toggleDropDown = (userId) => {
     setIsDropDown((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  return (
    <div className="container mx-auto p-4">
      {count?.map((user) => (
        <div
          className="space-y-2 my-2 border w-96 rounded-lg p-4 bg-white shadow-md"
          key={user.id}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 rounded-full overflow-hidden">
                <img src={user?.image} alt="user" className="h-16 w-16 object-cover" />
              </div>
              <div>
                <div className="font-semibold">
                  {user?.firstName} {user?.lastName}
                </div>
                <p className="text-sm text-gray-600"> {user?.email}</p>
              </div>
            </div>
            <button
              className={`px-4 py-2 rounded ${
                isDropDown.includes(user?.id) ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
              onClick={() => toggleDropDown(user?.id)}
            >
              {isDropDown.includes(user?.id) ? "Up" : "Down"}
            </button>
          </div>
          {isDropDown.includes(user?.id) && (
            <div className="mt-4">
              <div>
                <p className="font-semibold">{user?.firstName}</p>
                <p className="text-gray-600">{user?.address?.address}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CountTask;
