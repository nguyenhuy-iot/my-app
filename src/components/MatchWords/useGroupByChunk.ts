import { useMemo, useState } from "react";

const GROUP_SIZE = 5;

export function useGroupByChunk<T>(data: T[]) {
    const [groupIndex, setGroupIndex] = useState(0);

    const groups = useMemo(() => {
        const res: T[][] = [];
        for (let i = 0; i < data.length; i += GROUP_SIZE) {
            res.push(data.slice(i, i + GROUP_SIZE));
        }
        return res;
    }, [data, GROUP_SIZE]);

    const totalGroups = groups.length
    const isHasNext = groupIndex < totalGroups - 1

    const currentGroup = useMemo(() => {
        return groups[groupIndex] || [];
    }, [groups, groupIndex]);

    const nextGroup = () => {
        if (isHasNext) {
            setGroupIndex(groupIndex + 1);
        }
    };

    const reset = () => setGroupIndex(0);

    return {
        currentGroup,
        isHasNext,
        nextGroup,
        reset,
    };
}