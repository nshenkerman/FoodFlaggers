// SignInPage component
// This component renders a sign-in page with form elements for email, NetID, and password,
// along with buttons for submitting the form and browsing as a guest.
const SignInPage = ({ signIn, signInAsGuest }) => {

    // handleSubmit function handles the form submission.
    // It prevents the default form submission behavior, extracts form data,
    // and then calls the signIn function with the extracted credentials.
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const netid = formData.get('netid');
        const password = formData.get('password');
        signIn(email, netid, password); // Calls signIn function with credentials
    };
    
    // JSX structure of the component
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {/* Form element with onSubmit event handler */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email input field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" required 
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </input>
                        </div>
                    </div>

                    {/* NetID input field */}
                    <div>
                        <label htmlFor="netid" className="block text-sm font-medium leading-6 text-gray-900">
                            NetID
                        </label>
                        <div className="mt-2">
                            <input id="netid" name="netid" type="netid" autoComplete="netid" required 
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </input>
                        </div>
                    </div>

                    {/* Password input field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" required 
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                        </div>
                    </div>

                    {/* Sign in button */}
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Sign in
                        </button>
                    </div>

                    {/* Guest browsing button */}
                    <div>
                        <button
                            type="button"
                            onClick={signInAsGuest}
                            className="flex w-full justify-center rounded-md border border-transparent bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                        >
                            Browse as Guest
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;
