const Login=({username,password,handleUsername,handlePassword,handleLogin})=>{
    return(
       <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <div>
                Usernamessss
                <input 
                  value={username}
                  onChange={handleUsername}
                />
            </div>
            <div>
                Password
                <input
                 type='password'
                 value={password}
                 onChange={handlePassword} 
                 />
            </div>
            <button type='submit'>Log in</button>
        </form>
       </div>
    )
    
}

export default Login