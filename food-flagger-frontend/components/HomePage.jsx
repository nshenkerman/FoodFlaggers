// HomePage component
import Head from "next/head";
import Event from "./Event";
import Header from "./Header";
const HomePage = ({ signOut }) => (
    <div>
        <Header />
        <Event /> 
    </div>
    );
export default HomePage