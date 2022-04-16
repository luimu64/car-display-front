import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import classNames from "classnames";

interface ButtonProps {
    text: string;
    clickFunc: () => any;
}

const Button: FunctionComponent<ButtonProps> = (props) => {
    const classes = classNames(
        `py-2 px-5 w-60 text-center rounded bg-green-500 text-white hover:bg-green-700 transition select-none`
    )

    return (
        <div onClick={props.clickFunc} class={classes}>{props.text}</div>
    )
}

interface ButtonGroupProps {
    options: string[];
    changeFunc: (value: number) => void
}

const ButtonGroup: FunctionComponent<ButtonGroupProps> = (props) => {
    const [selected, setSelected] = useState<number>(0);

    const handleChange = (i: number) => {
        setSelected(i);
        props.changeFunc(i)
    }

    return (
        <div class="flex gap-1 m-5">
            {props.options.map((option, i) => (
                <p class={classNames("py-2 px-5 rounded bg-green-500 text-white hover:bg-green-700 transition select-none", i === selected && "bg-green-700")}
                    onClick={() => handleChange(i)}
                >{option}</p>
            ))}
        </div>
    )
}

interface TextFieldProps {
    changeFunc: (value: string) => void;
    placeholder: string;
}

const TextField: FunctionComponent<TextFieldProps> = (props) => {
    const [text, setText] = useState<string>('');

    const handleChange = (newValue: string) => {
        setText(newValue);
        props.changeFunc(newValue);
    }

    return (
        <input
            type="text"
            placeholder={props.placeholder}
            value={text}
            onChange={(e) => handleChange(e.currentTarget.value)}
            class="bg-slate-500 w-60 text-white p-3 rounded !outline-0"
        />
    )
}

export {
    Button,
    ButtonGroup,
    TextField
}
