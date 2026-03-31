'use client';
import { Provider } from "react-redux";
import { store } from "@/store";

export const StoreProvider = (props: { children: React.ReactNode }) => {
    return (
        <div>
            <Provider store={store}>
                {props.children}
            </Provider>
        </div>
    )
}