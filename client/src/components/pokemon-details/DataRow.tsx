
interface Props {
    label: string;
    value: React.ReactNode;
}
export default function DataRow({ label, value }: Props) {
    const rowStyle = "grid grid-cols-2 py-1 items-center py-2 gap-2";
    const headStyle = "flex flex-wrap text-sm text-text-secondary";
    return (
        <div className={rowStyle}>
            <span className={headStyle}>{label}</span>
            {(typeof(value) === "string")? <span>{value}</span> : <div>{value}</div>}
        </div>
    );
}