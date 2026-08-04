import DataRow from "./DataRow";
interface DataColsProps {
    title: string;
    content: Array<{
        label: string;
        value: React.ReactNode;
    }>;
}
export default function DataCol({ title, content }: DataColsProps) {
    const colStyle = "flex flex-col w-full min-w-2xs divide-y divide-gray-200";
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-semibold">{title} Data</h2>
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