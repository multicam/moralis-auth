import { getSession, signOut } from "next-auth/react";
import {useRouter} from "next/router";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    // redirect if not authenticated
    if (!session) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }

    return {
        props: { user: session.user },
    };
}


// gets a prop from getServerSideProps
function User({ user }) {
    const { push } = useRouter();
    return (
        <div>
            <h4>User session:</h4>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button onClick={() => signOut({ redirect: "/signin" })}>Sign out</button>
            <button onClick={() => push("/protected" )}>Protected Page</button>
        </div>
    );
}

export default User;
