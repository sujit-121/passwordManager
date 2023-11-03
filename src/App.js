import './App.css'
import {useState} from 'react'
import {v4} from 'uuid'

const PassITem = props => {
  const {item, deleteItem, isShow} = props
  const onDelete = () => {
    deleteItem(item.id)
  }
  return (
    <li>
      <p className="li1">{item.web[0]}</p>
      <div className="li-data">
        <p>{item.web}</p>
        <p>{item.username}</p>
        <p>
          {isShow ? (
            item.pass
          ) : (
            <img
              className="stars"
              alt="stars"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            />
          )}
        </p>
      </div>
      <button
        type="button"
        className="del"
        onClick={onDelete}
        data-testid="delete"
      >
        <img
          className="delete-img"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

const App = () => {
  const [passwordList, setPasswordList] = useState([])
  const [username, setUsername] = useState('')
  const [web, setWeb] = useState('')
  const [pass, setPass] = useState('')
  const [searchEl, setSearchEl] = useState('')
  const [isShow, setisShow] = useState(false)

  const updateShow = () => {
    setisShow(!isShow)
  }

  const deleteItem = id => {
    const newlist = passwordList.filter(ele => ele.id !== id)
    setPasswordList(newlist)
  }

  const addToList = e => {
    e.preventDefault()
    const obj = {
      id: v4(),
      username,
      web,
      pass,
    }
    setPasswordList(prev => [...prev, obj])
    console.log(passwordList)
  }
  const updateWeb = e => {
    setWeb(e.target.value)
  }

  const updatePass = e => {
    setPass(e.target.value)
  }
  const updateUser = e => {
    setUsername(e.target.value)
  }
  const updateSearchEl = e => {
    setSearchEl(e.target.value)
  }
  const list = passwordList.filter(ele =>
    ele.web.toLowerCase().includes(searchEl.toLowerCase()),
  )
  return (
    <div className="container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        className="top-logo"
        alt="app logo"
      />
      <div className="middle">
        <form className="card">
          <h1 className="head1">Add New Password</h1>
          <div className="inputEl">
            <img
              className="img2"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
            />
            <input placeholder="Enter Website" onChange={updateWeb} />
          </div>
          <div className="inputEl">
            <img
              className="img2"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
            />
            <input placeholder="Enter Username" onChange={updateUser} />
          </div>
          <div className="inputEl">
            <img
              className="img2"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
            />
            <input
              placeholder="Enter Password"
              type="password"
              onChange={updatePass}
            />
          </div>
          <button type="submit" className="btn1" onClick={addToList}>
            Add
          </button>
        </form>
        <img
          className="img3"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          alt="password manager"
        />
      </div>
      <div className="bottom">
        <div className="bottom-navbar">
          <div>
            <div className="pass-title">
              <h1 className="head-pass">Your Passwords </h1>
              <p>{list.length}</p>
            </div>
          </div>
          <div className="inputEl">
            <img
              className="img2"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
            />
            <input
              placeholder="Search"
              type="search"
              onChange={updateSearchEl}
            />
          </div>
        </div>
        <hr className="bottom-hr" />
        {list.length === 0 ? (
          <>
            <img
              className="nopass"
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
            />
            <p className="nohead">No Passwords</p>
          </>
        ) : (
          <>
            <div className="show-pass">
              <input type="checkbox" id="check" onClick={updateShow} />
              <label htmlFor="check">Show passwords</label>
            </div>
            <ul>
              {list.map(ele => (
                <PassITem
                  item={ele}
                  key={ele.id}
                  deleteItem={deleteItem}
                  isShow={isShow}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default App
