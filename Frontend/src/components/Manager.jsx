import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manger = () => {

  const passwordRef = useRef();
  const eyeRef = useRef();

  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
  });

  const [passwordArray, setpasswordArray] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);



  // FETCH PASSWORDS
  const getPasswords = async () => {

    try {

      const res = await fetch("http://localhost:8080/all");
      const data = await res.json();

      setpasswordArray(data);

    } catch (error) {

      console.log(error);
      toast.error("Backend connection error");

    }

  };



  useEffect(() => {

    getPasswords();

  }, []);



  // SHOW PASSWORD
  const showPassword = () => {

    if (passwordRef.current.type === "password") {

      passwordRef.current.type = "text";
      eyeRef.current.src = "/eyecross.png";

    } else {

      passwordRef.current.type = "password";
      eyeRef.current.src = "/eye.png";

    }

  };



  // COPY FUNCTION
  const copyText = (text) => {

    navigator.clipboard.writeText(text);
    toast.success("Copied!");

  };



  // EDIT PASSWORD
  const editPassword = (item) => {

    setform({
      site: item.site,
      username: item.username,
      password: item.password,
    });

    setEditId(item._id);

  };



  // SAVE PASSWORD
  const savePassword = async () => {

    if (
      form.site.length < 3 ||
      form.username.length < 3 ||
      form.password.length < 3
    ) {
      toast.error("Fill all fields properly!");
      return;
    }

    try {

      if (editId) {

        await fetch(`http://localhost:8080/update/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        toast.success("Password Updated");
        setEditId(null);

      } else {

        await fetch("http://localhost:8080/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        toast.success("Password Saved");

      }

      setform({ site: "", username: "", password: "" });

      getPasswords();

    } catch (error) {

      console.log(error);
      toast.error("Error");

    }

  };



  // DELETE PASSWORD
  const DeletePassword = async (id) => {

    await fetch(`http://localhost:8080/delete/${id}`, {
      method: "DELETE",
    });

    toast.success("Password Deleted!");

    getPasswords();

  };



  // HANDLE INPUT
  const handleChange = (e) => {

    setform({ ...form, [e.target.name]: e.target.value });

  };



  // SEARCH FILTER
  const filteredPasswords = passwordArray.filter((item) =>
    item.site.toLowerCase().includes(search.toLowerCase())
  );



  return (

    <>

      <ToastContainer />

      <div className="min-h-screen bg-[#0f172a] text-white p-4">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl md:text-5xl font-bold text-center mb-2">
            <span className="text-red-500">&lt;</span>
            Pass
            <span className="text-green-500">OP/&gt;</span>
          </h1>

          <p className="text-center text-gray-400 mb-6">
            Your Own Professional Password Manager
          </p>



          {/* FORM */}

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg space-y-4">

            <input
              value={form.site}
              onChange={handleChange}
              placeholder="Enter Website URL"
              className="w-full rounded-full px-4 py-2 text-black"
              name="site"
            />

            <div className="flex flex-col md:flex-row gap-4">

              <input
                value={form.username}
                onChange={handleChange}
                placeholder="Enter Username"
                className="w-full rounded-full px-4 py-2 text-black"
                name="username"
              />

              <div className="relative w-full">

                <span
                  className="absolute right-3 top-2 cursor-pointer"
                  onClick={showPassword}
                >
                  <img ref={eyeRef} src="/eye.png" width={25} alt="eye" />
                </span>

                <input
                  ref={passwordRef}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full rounded-full px-4 py-2 pr-10 text-black"
                  type="password"
                  name="password"
                />

              </div>

            </div>

            <button
              onClick={savePassword}
              className="bg-green-400 hover:bg-green-500 text-black font-bold px-6 py-2 rounded-full"
            >
              {editId ? "Update Password" : "Save Password"}
            </button>

          </div>



          {/* SEARCH */}

          <div className="mt-6">

            <input
              type="text"
              placeholder="Search by Website..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 rounded-full px-4 py-2 text-black"
            />

          </div>



          {/* TABLE */}

          <div className="mt-6 overflow-x-auto">

            <table className="min-w-[700px] w-full bg-white text-black rounded-lg overflow-hidden">

              <thead className="bg-green-600 text-white">

                <tr>
                  <th className="py-2 px-4">Site</th>
                  <th className="py-2 px-4">Username</th>
                  <th className="py-2 px-4">Password</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredPasswords.length === 0 ? (

                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No Passwords Found
                    </td>
                  </tr>

                ) : (

                  filteredPasswords.map((item) => (

                    <tr key={item._id} className="text-center border-b">

                      <td className="py-2 px-4">
                        {item.site}
                        <button onClick={() => copyText(item.site)}>📋</button>
                      </td>

                      <td className="py-2 px-4">
                        {item.username}
                        <button onClick={() => copyText(item.username)}>📋</button>
                      </td>

                      <td className="py-2 px-4">
                        {item.password}
                        <button onClick={() => copyText(item.password)}>📋</button>
                      </td>

                      <td className="py-2 px-4 space-x-3">

                        <button
                          onClick={() => editPassword(item)}
                          className="text-blue-600"
                        >
                          ✏️
                        </button>

                        <button
                          onClick={() => DeletePassword(item._id)}
                          className="text-red-600"
                        >
                          🗑️
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </>

  );

};

export default Manger;
