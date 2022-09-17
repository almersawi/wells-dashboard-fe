type Props = {
    condition: boolean,
    trueComponent?: JSX.Element,
    falseComponent?: JSX.Element,
}


const IF = ({ condition, trueComponent, falseComponent } : Props) => {
    return condition ? trueComponent ?? <></> : falseComponent ?? <></>;
}

export default IF;