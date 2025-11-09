const getInitials = (name?: string): string => {
    if (!name) {
        return '!';
    }

    const words = name.trim().split(' ');
    if (words.length === 1) {
        return words[0][0] ? words[0][0].toUpperCase() : '!';
    }

    const letter1 = words[0][0];
    const letter2 = words[words.length - 1][0];

    return (letter1 + letter2).toUpperCase();
};

export default getInitials