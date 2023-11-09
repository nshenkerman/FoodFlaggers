// SignInPage component
const SignInPage = ({ signIn }) => {
    // Sign in form submission logic
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const netid = formData.get('netid');
        const password = formData.get('password');
        // Dummy sign-in logic, replace with actual authentication
        signIn(username, netid, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
            </div>
            <div>
                <label htmlFor="netid">NetID:</label>
                <input type="text" id="netid" name="netid" required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SignInPage;
