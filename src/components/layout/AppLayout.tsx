import { FC, ReactNode } from "react";
import { Navbar } from "../ui";

interface Props {
    children: ReactNode;
}

export const AppLayout:FC<Props> = ({ children }) => {
return (
    <>
        <nav>
            <Navbar />
        </nav>

        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px',
        }}>
            {children}
        </main>
    </>
)
}