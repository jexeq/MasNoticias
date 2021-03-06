import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUser, getUser } from "../../../redux/actions/user/userActions";
import { useHistory } from "react-router";

import SetAdminUser from "./SetAdminUser";
import SetEditorUser from "./SetEditorUser";
import BannAdminUser from "./BannUser";
import ForcePasswordResetButton from "./ForcePSWreset";
import CheckUser from "../../utils/CheckUser";



export default function UsersAdmin(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  var [usersSelected, setUsersSelected] = useState([]);
  const [changed, setChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("mas-noticias");
  const storeUser = useSelector((state) => state.userReducer.user)
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
    if(!storeUser){
      dispatch(getUser(userId))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(storeUser){
      if(!CheckUser(storeUser)){
        history.push("/not-found")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeUser])

  useEffect(() => {
    var checkeds = document.getElementsByClassName("checkbox");

    for (let i = 0; i < checkeds.length; i++) {
      checkeds[i].checked = false;
    }
    setUsersSelected([]);
    dispatch(getAllUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changed]);

  useEffect(() => {
    if(storeUsers.length>0) {
      setLoading(false)
    }
  }, [storeUsers]);

  return !loading ? (
    <div>
      <h1 className="text-center mt-4">Control de usuarios</h1>
      <div className="container">
        <div  id="tableleft" className="d-flex">
          {storeUser?.type === "sudo" &&
          <div hidden={usersSelected.length === 0} className="mt-3">
            <SetAdminUser
              users={usersSelected}
              changed={changed}
              setChanged={setChanged}
            />
          </div>}
          <div hidden={usersSelected.length === 0} className="mt-3">
            <SetEditorUser
              users={usersSelected}
              changed={changed}
              setChanged={setChanged}
            />
          </div>

          <div hidden={usersSelected.length === 0} className="mt-3">
            <BannAdminUser
              users={usersSelected}
              changed={changed}
              setChanged={setChanged}
            />
          </div>

          <div hidden={usersSelected.length === 0} className="mt-3">
            <ForcePasswordResetButton
              users={usersSelected}
              changed={changed}
              setChanged={setChanged}
            />
          </div>
        </div>

        <table id="tableright" className="table">
          <thead className='table-responsive'>
            <tr >
              <th>Email</th>
              <th>Usuario</th>
              <th>Estado</th>
              <th>Tipo</th>
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
                  {u.type !== "sudo"?<input
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
