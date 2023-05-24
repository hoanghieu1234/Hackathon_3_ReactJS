import React, { useState } from "react";

export const Content = () => {
  const [Player, setPlayer] = useState("");
  const [obj, setObj] = useState([]);

  // Render dữ liệu
  const handleChangePlayerName = (e) => {
    let inputNamePlayer = e.target.value;
    setPlayer(inputNamePlayer);
  };
  const handleAddPlayer = (e) => {
    e.preventDefault();
    setObj([...obj, { Player, point: 0 }]);
  };
  // XOá dữ liệu
  const handleDeletePlayer = (index) => {
    const updateObj = [...obj];
    updateObj.splice(index, 1);
    setObj(updateObj);
  };
  // Tăng giảm số lượng
  const handleDecreasePoints = (index) => {
    const updatedObj = [...obj];
    if (updatedObj[index].point > 0) {
      updatedObj[index].point -= 1;
      setObj(updatedObj);
    }
  };

  const handleIncreasePoints = (index) => {
    const updatedObj = [...obj];
    updatedObj[index].point += 1;
    setObj(updatedObj);
  };
  // Tính tổng điểm
  const calculatorTotalPoint = () => {
    let total = 0;
    for(let i=0; i< obj.length;i++) {
        total += obj[i].point;
    }
    return total;
  }
  return (
    <div>
      <table className="table m-auto border" style={{ width: 800 }}>
        <thead className="bg-info text-white">
          <tr>
            <th scope="col">
              <tr>Player: {obj.length}</tr>
              <tr>Total Point: {calculatorTotalPoint()}</tr>
            </th>
            <th scope="col">
              <p className="text-left">Bảng Điểm</p>
            </th>
          </tr>
        </thead>
        <tbody className="text-black">
          {obj.map((value, index) => {
            return (
              <tr>
                <div>
                  <td className="d-flex">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => {
                        handleDeletePlayer(index);
                      }}
                    >
                      X
                    </button>
                    <p>{value.Player}</p>
                  </td>
                </div>
                <td>
                  <div className="d-flex justify-content-around">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => handleDecreasePoints(index)}
                    >
                      -
                    </button>
                    <span>{value.point}</span>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => handleIncreasePoints(index)}
                    >
                      +
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* ADD */}
      <nav
        className="navbar navbar-light bg-info text-white justify-content-between m-auto"
        style={{ width: 800 }}
      >
        <input
          className="form-control mr-sm-2 m-auto"
          type="text"
          placeholder="Enter Player Name"
          aria-label="Search"
          style={{ width: 600 }}
          value={Player.PlayerName}
          name="player"
          onChange={handleChangePlayerName}
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0 m-auto"
          type="submit"
          onClick={handleAddPlayer}
        >
          Add Player
        </button>
      </nav>
    </div>
  );
};
