// import { Html } from '@react-email/html';

export default function Email({displayName}) {
    return (
        // <Html lang="en">
            <div>
                <p>Hello {displayName}!</p>
                <p>Hope you'll enjoy the package!</p>
            </div>
        // </Html>
    )
}