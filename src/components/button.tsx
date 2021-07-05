import {ButtonHTMLAttributes} from 'react';

import '../styles/button.scss';

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(Props: buttonProps) {

    return (

        <button className="button" {...Props} />
    )
}