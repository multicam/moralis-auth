import {useRouter} from "next/router";
import {getSession} from "next-auth/react";
const {log} = console, {keys} = Object

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return { props: { user: session?.user ?? null } };
}

const ProtectedPage = ({user}) => {
    const {push} = useRouter();
    const address = user?.address
    return user ? (
        <div>
            <button onClick={() => push('/user')}>Profile</button>
            <h3>Protected Content</h3>
            <pre>connected to wallet {address}</pre>
        </div>
    ): 'no user'
}

export default ProtectedPage