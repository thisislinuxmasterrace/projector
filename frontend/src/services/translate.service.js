export const translateTaskSize = size => {
    if (size === "none") {
        return "нет";
    }
    return size;
};

export const translateTaskPriority = priority => {
    if (priority === "none") {
        return "нет";
    }

    if (priority === "low") {
        return "низкий";
    }

    if (priority === "medium") {
        return "средний";
    }

    if (priority === "high") {
        return "высокий";
    }

    return priority;
};

export const translateTaskPriorityToColor = priority => {
    if (priority === "low") {
        return "green darken-2";
    }

    if (priority === "medium") {
        return "orange darken-4";
    }

    if (priority === "high") {
        return "red darken-4";
    }

    return "white black-text";
};