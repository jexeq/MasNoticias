import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUser } from "../../../redux/actions/user/userActions";


import SetAdminUser from "./SetAdminUser";
import SetEditorUser from "./SetEditorUser";
import BannAdminUser from "./BannUser";
import ForcePasswordResetButton from "./ForcePSWreset";



export default function UsersAdmin(props) {
  const dispatch = useDispatch();
  var [usersSelected, setUsersSelected] = useState([]);
  const [changed, setChanged] = useState(false);
  const [loading, setLoading] = useState(true);

  const storeUsers = useSelector((state) => state.userReducer.users);



  function selectUser(e) {
    var userId = e.target.value;
    if (!e.target.checked) {
      let selecteds = usersSelected.filter((u) => u.id !== userId);
      setUsersSelected(selecteds);
    } else {
      let added = storeUsers.find((u) => u.id === userId);

      setUsersSelected([...usersSelected, added]);
    }
  }

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  useEffect(() => {
    var checkeds = document.getElementsByClassName("checkbox");

    for (let i = 0; i < checkeds.length; i++) {
      checkeds[i].checked = false;
    }
    setUsersSelected([]);
    dispatch(getAllUser());
  }, [changed]);

  useEffect(() => {
    if(storeUsers.length>0) {
      setLoading(false)
    }
  }, [storeUsers]);

  return !loading ? (
    <div className="table-responsive">
      <h1 className="text-center mt-4">Control de usuarios</h1>
      <div className="table">
        <div id="tableleft" className="d-table-cell me-5">
          <div className="mt-3">
            <SetAdminUser
              users={usersSelected}
              changed={changed}
              setChanged={setChanged}
            />
          </div>
          <div className="mt-3">
            <SetEditorUser
              users={usersSelected}
              changed={changed}
              setChanged={setChanged}
            />
          </div>

          <div className="mt-3">
            <BannAdminUser
              users={usersSelected}
              changed={changed}
              setChanged={setChanged}
            />
          </div>

          <div className="mt-3">
            <ForcePasswordResetButton
              users={usersSelected}
              changed={changed}
              setChanged={setChanged}
            />
          </div>
        </div>

        <table id="tableright" className="d-table-cell">
          <thead class="thead-warning">
            <tr>
              <th>Email</th>
              <th>Usuario</th>
              <th>Estado</th>
              <th>Administrador</th>
              <th>check</th>
            </tr>
          </thead>

          <tbody>
            {storeUsers.map((u) => (
             
             <tr key={u.id}>
                <td>{u.email}</td>
                <td>{u.lastname + " " + u.name}</td>
                <td>{u.active ? "Habilitado" : "Inhabilitado"}</td>
                <td>{u.type}</td>
                <td>
                  {u.type != "sudo"?<input
                    className="checkbox"
                    type="checkbox"
                    value={u.id}
                    onChange={(e) => selectUser(e)}
                    defaultChecked={false}
                  ></input> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <p className="text-dark text-center mt-4">Loading...</p>
  );
}