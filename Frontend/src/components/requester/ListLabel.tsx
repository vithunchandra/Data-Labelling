import Label from "../../interface/LabelInterface";

export default function ListLabel({label} : {label : Label[]}) {
    return (
        // <table>

        // </table>
        <div>
            {label[0].label}
        </div>
    )
}