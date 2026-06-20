import DataRow from "./DataRow";
interface Props {
    title: string;
    content: Array<{
        label: string;
        value: React.ReactNode;
    }>;
}
export default function DataCol({ title, content }: Props) {
    const colStyle = "grid grid-cols-1 divide-y divide-gray-200";
    return (
        <div className="grid grid-cols-1 gap-2">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <div className={colStyle}>
                {content.map((c) => {
                    return (
                        <DataRow key={c.label} label={c.label} value={c.value} />
                    );
                })}
            </div>

        </div>
    );
}