import 'styled-components';

declare module 'styled-components' {
    export interface defaultTheme {
        title: string,
    
        colors: {
            primary: string,
            secondary: string,
            text: string
        },
    }
}