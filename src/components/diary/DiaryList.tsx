import type {DiaryItem} from '@/libs/notion';
import DiaryCard from '@/components/diary/DiaryCard';

interface DiaryListProps {
    list: DiaryItem[];
}

function DiaryList(props: DiaryListProps) {
    return (
        <div className="grid grid-cols-1 gap-6 select-none">
            {props.list.map((item: DiaryItem) => (
                <DiaryCard key={item.id} diary={item} />
            ))}
        </div>
    )
}

export default DiaryList
