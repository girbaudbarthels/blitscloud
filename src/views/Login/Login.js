const Login = () => {
    console.log('enne')
    return (
        <div>
            <h2>Login</h2>
            <form>
                <label>
                    Email:
                    <input type="text" name="name" />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <form>
                <label>
                    Password:
                    <input type="text" name="name" />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <a href="register">Register</a>
        </div>
    );
}

export default Login;