import React, { useState} from 'react'
import moment from 'moment'

const Profile = () => {

  const [Profile, setProfile] = useState({})
      
  const handleChange = (e) => {
    setProfile(prevProfile => ({...prevProfile, [e.target.name] : e.target.value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`you've submitted ${JSON.stringify(Profile)}`)
  }

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <label >First Name:
            <input type='text' name="firstName" value={Profile.firstName} onChange={handleChange}/>
        </label>
        <label >Last Name:
            <input type='text' name="lastName" value={Profile.lastName} onChange={handleChange}/>
        </label>
        <label >Email:
            <input type='email' name="email" value={Profile.email} onChange={handleChange}/>
        </label>
        <label>Birthday: 
            <input type="date" name="dob" value={Profile.dob} min="1910-01-01" max={moment().format("YYYY-MM-DD")} onChange={handleChange}></input>
        </label>
        <label >Mobile Phone:
            <input type='tel' name="tel" value={Profile.tel} onChange={handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>

  )
}

export default Profile