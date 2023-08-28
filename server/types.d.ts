
interface UserSessionData extends SessionData {
    user: {
        id: number;
        email: string;
        name: string;
    };
}

declare module 'express-session' {
    interface Session {
        user: {
            id: number;
            email: string;
            name: string;
        };
    }
}